"""
LocalMarket AI Detection Backend
=================================
Tech Stack: FastAPI + PyTorch CNN + YOLOv8 + OpenCV
Run: uvicorn main:app --reload --port 8000

Install deps:
    pip install fastapi uvicorn pillow torch torchvision ultralytics opencv-python-headless pymongo python-multipart

Endpoints:
    POST /detect          — Upload image, get detected item + local shop matches
    GET  /companies       — List all company catalogs
    GET  /shops/nearby    — Get nearby shops (+ optional lat/lng filter)
    POST /shops/inventory — Update shopkeeper inventory
"""

from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models
from PIL import Image
import cv2
import numpy as np
import io
import base64
import logging
from datetime import datetime

# ──────────────────────────────────────────────
# App Setup
# ──────────────────────────────────────────────
app = FastAPI(title="LocalMarket AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ──────────────────────────────────────────────
# Mock Database (Replace with MongoDB)
# ──────────────────────────────────────────────
CATALOG_DB = {
    "chino_pants": {"label": "Chino Pants", "category": "fashion", "brands": ["Levi's", "H&M"], "price_range": [1499, 4999]},
    "denim_jeans": {"label": "Denim Jeans", "category": "fashion", "brands": ["Levi's", "Wrangler"], "price_range": [2499, 6999]},
    "sneakers":    {"label": "Sneakers", "category": "fashion", "brands": ["Nike", "Adidas"], "price_range": [3999, 14999]},
    "ram_module":  {"label": "RAM Module", "category": "electronics", "brands": ["Samsung", "Corsair"], "price_range": [3999, 12999]},
    "cpu_processor": {"label": "CPU Processor", "category": "electronics", "brands": ["Intel", "AMD"], "price_range": [9999, 44999]},
    "graphics_card": {"label": "Graphics Card", "category": "electronics", "brands": ["Nvidia", "Intel"], "price_range": [19999, 89999]},
    "smartphone":  {"label": "Smartphone", "category": "electronics", "brands": ["Samsung", "Apple"], "price_range": [14999, 99999]},
    "t_shirt":     {"label": "T-Shirt", "category": "fashion", "brands": ["Nike", "FabIndia"], "price_range": [499, 2999]},
}

SHOPS_DB = [
    {"id": 1, "name": "TechZone Electronics", "lat": 18.52, "lng": 73.85, "open": True, "categories": ["electronics"]},
    {"id": 2, "name": "Style Street", "lat": 18.521, "lng": 73.851, "open": True, "categories": ["fashion"]},
    {"id": 3, "name": "Gadget Galaxy", "lat": 18.519, "lng": 73.849, "open": False, "categories": ["electronics"]},
]


# ──────────────────────────────────────────────
# CNN Classification Model
# ──────────────────────────────────────────────
CLASS_NAMES = list(CATALOG_DB.keys())  # 8 classes

class ItemClassifierCNN(nn.Module):
    """
    Transfer learning: MobileNetV3-Small backbone + custom head.
    Lightweight and fast for mobile deployment.
    
    For production, train on a curated dataset:
    - Fashion: DeepFashion2 dataset (https://github.com/switchablenorms/DeepFashion2)
    - PC parts: Custom scraped dataset from e-commerce sites
    
    Alternative: Use CLIP (OpenAI) for zero-shot classification
      → No training needed, just compare image embedding with text labels
    """
    def __init__(self, num_classes: int = 8):
        super().__init__()
        # MobileNetV3 backbone (fast, accurate for mobile)
        backbone = models.mobilenet_v3_small(weights=None)
        self.features = backbone.features
        self.avgpool = backbone.avgpool
        # Custom classification head
        self.classifier = nn.Sequential(
            nn.Linear(576, 256),
            nn.Hardswish(),
            nn.Dropout(p=0.2),
            nn.Linear(256, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.features(x)
        x = self.avgpool(x)
        x = x.flatten(1)
        return self.classifier(x)


# Image preprocessing pipeline
TRANSFORM = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])


def load_model() -> ItemClassifierCNN:
    """
    Load trained model weights.
    In production: load from model_weights/best_model.pth
    Here we use untrained model (random weights) for demo.
    """
    model = ItemClassifierCNN(num_classes=len(CLASS_NAMES))
    model.eval()
    # To load real weights:
    # model.load_state_dict(torch.load("model_weights/best_model.pth", map_location="cpu"))
    logger.info("Model loaded successfully")
    return model


MODEL = load_model()


# ──────────────────────────────────────────────
# OpenCV Preprocessing
# ──────────────────────────────────────────────
def preprocess_with_opencv(image_bytes: bytes) -> np.ndarray:
    """
    OpenCV pipeline:
    1. Decode image
    2. Background removal (GrabCut) — isolates main object
    3. Edge enhancement — highlights product boundaries
    4. Noise reduction
    """
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Could not decode image")

    # Resize for processing
    img = cv2.resize(img, (640, 640))

    # --- Background separation via GrabCut ---
    mask = np.zeros(img.shape[:2], np.uint8)
    bgd_model = np.zeros((1, 65), np.float64)
    fgd_model = np.zeros((1, 65), np.float64)
    h, w = img.shape[:2]
    rect = (int(w * 0.05), int(h * 0.05), int(w * 0.9), int(h * 0.9))  # center ROI
    try:
        cv2.grabCut(img, mask, rect, bgd_model, fgd_model, iterCount=3, mode=cv2.GC_INIT_WITH_RECT)
        fg_mask = np.where((mask == 2) | (mask == 0), 0, 1).astype("uint8")
        img_fg = img * fg_mask[:, :, np.newaxis]
    except Exception:
        img_fg = img  # fallback if grabcut fails

    # --- Edge sharpening ---
    kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
    img_sharp = cv2.filter2D(img_fg, -1, kernel)

    # --- Bilateral filter: smooth while preserving edges ---
    img_clean = cv2.bilateralFilter(img_sharp, d=9, sigmaColor=75, sigmaSpace=75)

    return img_clean


def detect_color(img_bgr: np.ndarray) -> dict:
    """Extract dominant color info from the image."""
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    pixels = img_rgb.reshape(-1, 3).astype(np.float32)
    # K-means for dominant color
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
    _, _, centers = cv2.kmeans(pixels, K=3, bestLabels=None, criteria=criteria,
                                attempts=3, flags=cv2.KMEANS_RANDOM_CENTERS)
    dominant = centers[0].astype(int)
    return {"r": int(dominant[0]), "g": int(dominant[1]), "b": int(dominant[2])}


# ──────────────────────────────────────────────
# YOLOv8 Object Detection (Optional Enhancement)
# ──────────────────────────────────────────────
# Uncomment to use YOLOv8 for object localization:
#
# from ultralytics import YOLO
# YOLO_MODEL = YOLO("yolov8n.pt")  # nano variant for speed
#
# def detect_objects_yolo(image_bytes: bytes) -> list:
#     nparr = np.frombuffer(image_bytes, np.uint8)
#     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
#     results = YOLO_MODEL(img, conf=0.3)
#     detections = []
#     for r in results:
#         for box in r.boxes:
#             detections.append({
#                 "class": YOLO_MODEL.names[int(box.cls)],
#                 "confidence": float(box.conf),
#                 "bbox": box.xyxy[0].tolist()
#             })
#     return detections


# ──────────────────────────────────────────────
# Main Inference Pipeline
# ──────────────────────────────────────────────
def run_inference(image_bytes: bytes) -> dict:
    """
    Full pipeline:
    1. OpenCV preprocessing
    2. CNN classification
    3. Post-process results
    4. Match to catalog
    """
    # Step 1: OpenCV preprocessing
    cv_img = preprocess_with_opencv(image_bytes)
    dominant_color = detect_color(cv_img)

    # Step 2: Convert to PIL → torch tensor
    pil_img = Image.fromarray(cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB))
    tensor = TRANSFORM(pil_img).unsqueeze(0)  # [1, 3, 224, 224]

    # Step 3: CNN inference
    with torch.no_grad():
        logits = MODEL(tensor)                     # [1, num_classes]
        probs = torch.softmax(logits, dim=1)[0]    # [num_classes]
        top5 = torch.topk(probs, k=min(5, len(CLASS_NAMES)))

    # Step 4: Build result
    predictions = []
    for conf, idx in zip(top5.values.tolist(), top5.indices.tolist()):
        class_name = CLASS_NAMES[idx]
        predictions.append({
            "class": class_name,
            "label": CATALOG_DB[class_name]["label"],
            "confidence": round(conf, 4),
            "category": CATALOG_DB[class_name]["category"],
        })

    top_pred = predictions[0]
    catalog_info = CATALOG_DB[top_pred["class"]]

    return {
        "detected": top_pred["label"],
        "class_key": top_pred["class"],
        "confidence": top_pred["confidence"],
        "category": top_pred["category"],
        "color": dominant_color,
        "brands": catalog_info["brands"],
        "price_range": catalog_info["price_range"],
        "top5_predictions": predictions,
    }


# ──────────────────────────────────────────────
# API Routes
# ──────────────────────────────────────────────
@app.get("/health")
async def health():
    return {"status": "ok", "model": "ItemClassifierCNN", "version": "1.0.0"}


@app.post("/detect")
async def detect_item(
    file: UploadFile = File(...),
    lat: Optional[float] = None,
    lng: Optional[float] = None,
):
    """
    Upload an image → get item detection + nearby shops.

    Args:
        file: Image file (JPG/PNG)
        lat: Customer latitude (for shop proximity filtering)
        lng: Customer longitude

    Returns:
        {
          detected, confidence, category, brands,
          price_range, color, nearby_shops, top5_predictions
        }
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    image_bytes = await file.read()
    if len(image_bytes) > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=413, detail="Image too large. Max 10MB.")

    try:
        result = run_inference(image_bytes)
    except Exception as e:
        logger.error(f"Inference error: {e}")
        raise HTTPException(status_code=500, detail=f"Detection failed: {str(e)}")

    # Filter shops that sell this category
    category = result["category"]
    matched_shops = [s for s in SHOPS_DB if category in s["categories"]]

    # TODO: Sort by distance if lat/lng provided
    # matched_shops.sort(key=lambda s: haversine(lat, lng, s["lat"], s["lng"]))

    return {
        **result,
        "nearby_shops": matched_shops,
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.get("/companies")
async def get_companies():
    """Return all company catalogs (for shopkeeper inventory selection)."""
    return {
        "companies": [
            {
                "name": "Samsung", "category": "Electronics", "logo": "🔵",
                "item_count": 6, "website": "https://samsung.com/in"
            },
            {
                "name": "Levi's", "category": "Fashion", "logo": "🔴",
                "item_count": 6, "website": "https://levis.com/in"
            },
            {
                "name": "Intel", "category": "Electronics", "logo": "🟦",
                "item_count": 5, "website": "https://intel.com"
            },
            {
                "name": "Nike", "category": "Fashion", "logo": "⚫",
                "item_count": 5, "website": "https://nike.com"
            },
            {
                "name": "Corsair", "category": "Electronics", "logo": "🟡",
                "item_count": 5, "website": "https://corsair.com"
            },
        ]
    }


@app.get("/shops/nearby")
async def get_nearby_shops(
    lat: float = 18.52,
    lng: float = 73.85,
    radius_km: float = 5.0,
    category: Optional[str] = None,
):
    """Get shops near the given coordinates."""
    shops = SHOPS_DB
    if category:
        shops = [s for s in shops if category.lower() in s["categories"]]
    return {"shops": shops, "count": len(shops)}


class InventoryUpdate(BaseModel):
    shop_id: int
    item_ids: List[str]

@app.post("/shops/inventory")
async def update_inventory(payload: InventoryUpdate):
    """
    Save shopkeeper's selected inventory.
    In production: update MongoDB shops collection.
    """
    # db.shops.update_one({"_id": payload.shop_id}, {"$set": {"inventory": payload.item_ids}})
    logger.info(f"Shop {payload.shop_id} inventory updated: {len(payload.item_ids)} items")
    return {"success": True, "shop_id": payload.shop_id, "item_count": len(payload.item_ids)}


# ──────────────────────────────────────────────
# Training Script (Run separately to train CNN)
# ──────────────────────────────────────────────
"""
To train the CNN model:

1. Prepare dataset:
   data/
     chino_pants/     ← 500+ images per class
     denim_jeans/
     sneakers/
     ram_module/
     cpu_processor/
     graphics_card/
     smartphone/
     t_shirt/

2. Run training:

import torch
from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder

dataset = ImageFolder("data/", transform=TRANSFORM)
train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size
train_ds, val_ds = torch.utils.data.random_split(dataset, [train_size, val_size])

train_loader = DataLoader(train_ds, batch_size=32, shuffle=True, num_workers=4)
val_loader = DataLoader(val_ds, batch_size=32, shuffle=False, num_workers=4)

model = ItemClassifierCNN(num_classes=len(CLASS_NAMES))
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=30)
criterion = nn.CrossEntropyLoss(label_smoothing=0.1)

for epoch in range(30):
    model.train()
    for images, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
    scheduler.step()

torch.save(model.state_dict(), "model_weights/best_model.pth")
"""

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
