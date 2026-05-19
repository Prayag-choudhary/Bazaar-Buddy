import { useState, useRef } from "react";
import { getAllItems, findShopsForItem, MOCK_SHOPS } from "../../data/mockDatabase";

// ============================================================
// AI DETECTION SIMULATION
// In production: POST image to Python FastAPI /detect endpoint
// which runs YOLOv8 / OpenCV / CNN classification
// Returns: { label, confidence, category, matched_items[] }
// ============================================================

const DETECTION_SCENARIOS = [
  {
    label: "Chino Pants",
    confidence: 0.94,
    category: "Fashion",
    tags: ["pants", "chino", "casual", "beige"],
    emoji: "👖",
    matchIds: ["lev_003", "lev_004"],
    description: "Slim-fit chino trousers detected. Beige/khaki color variant. Regular waist.",
  },
  {
    label: "RAM Module - 16GB DDR5",
    confidence: 0.97,
    category: "Electronics",
    tags: ["RAM", "DDR5", "16GB", "memory"],
    emoji: "🧠",
    matchIds: ["sam_003", "cor_002"],
    description: "DDR5 SDRAM module detected. Estimated capacity: 16GB. Compatible with Intel 12th/13th gen.",
  },
  {
    label: "Running Sneakers",
    confidence: 0.91,
    category: "Fashion",
    tags: ["shoes", "sneakers", "athletic", "Nike"],
    emoji: "👟",
    matchIds: ["nik_001", "nik_002", "nik_005"],
    description: "Athletic sneakers detected. Mesh upper, rubber sole. Likely running/training use.",
  },
  {
    label: "Intel CPU Processor",
    confidence: 0.99,
    category: "Electronics",
    tags: ["CPU", "processor", "Intel", "Core i7"],
    emoji: "⚡",
    matchIds: ["int_002", "int_003", "int_004"],
    description: "Intel LGA1700 socket processor detected. Core i-series generation based on IHS markings.",
  },
  {
    label: "Denim Jeans",
    confidence: 0.96,
    category: "Fashion",
    tags: ["jeans", "denim", "Levi's", "slim"],
    emoji: "🩳",
    matchIds: ["lev_001", "lev_002"],
    description: "Slim-fit denim jeans detected. Dark wash. Button fly. Likely Levi's 5xx series.",
  },
];

function simulateAIDetection(file) {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = DETECTION_SCENARIOS[Math.floor(Math.random() * DETECTION_SCENARIOS.length)];
      const allItems = getAllItems();
      const matched = result.matchIds.map(id => allItems.find(i => i.id === id)).filter(Boolean);
      const shops = result.matchIds.flatMap(id => findShopsForItem(id)).filter((s, i, arr) =>
        arr.findIndex(x => x.id === s.id) === i
      );
      resolve({ ...result, matched, shops });
    }, 2200);
  });
}

export default function AIDetector() {
  const [state, setState] = useState("idle"); // idle | loading | result | error
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const fileRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setState("loading");
    setResult(null);
    try {
      const detected = await simulateAIDetection(file);
      setResult(detected);
      setState("result");
    } catch {
      setState("error");
    }
  };

  const reset = () => {
    setState("idle");
    setResult(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-lg">AI Item Detector</h2>
            <p className="text-xs text-gray-400">Powered by CNN + OpenCV</p>
          </div>
        </div>
        <div className="bg-violet-50 rounded-2xl p-3 flex gap-2">
          <span className="text-violet-500 text-lg">💡</span>
          <p className="text-xs text-violet-700">Snap or upload a photo of any clothing item or computer part. Our AI will identify it and find where to buy it locally.</p>
        </div>
      </div>

      {/* Tech badges */}
      <div className="flex gap-2 mb-5 overflow-x-auto">
        {["YOLOv8 Detection", "CNN Classifier", "OpenCV", "Fashion Model", "PC Parts Model"].map(t => (
          <span key={t} className="flex-shrink-0 bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
            {t}
          </span>
        ))}
      </div>

      {/* Upload area */}
      {state === "idle" && (
        <div>
          <div
            className="border-2 border-dashed border-violet-200 rounded-3xl p-8 text-center bg-violet-50/50 mb-4 cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-all"
            onClick={() => fileRef.current?.click()}>
            <div className="text-5xl mb-3">📸</div>
            <h3 className="font-bold text-gray-700 mb-1">Upload or Drop Image</h3>
            <p className="text-gray-400 text-sm">Clothing, shoes, PC parts, gadgets</p>
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={e => handleFile(e.target.files[0])} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => fileRef.current?.click()}
              className="bg-violet-600 text-white font-bold py-3 rounded-2xl text-sm">
              📁 Upload Photo
            </button>
            <button onClick={() => fileRef.current?.click()}
              className="bg-white text-violet-600 font-bold py-3 rounded-2xl text-sm border-2 border-violet-200">
              📷 Use Camera
            </button>
          </div>

          {/* Examples */}
          <div className="mt-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Try detecting these</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { emoji: "👖", label: "Chino Pants", sub: "Fashion detection" },
                { emoji: "🧠", label: "RAM 16GB DDR5", sub: "PC part detection" },
                { emoji: "👟", label: "Sneakers", sub: "Shoe detection" },
                { emoji: "⚡", label: "Intel CPU", sub: "Processor detection" },
              ].map(({ emoji, label, sub }) => (
                <div key={label} className="bg-white rounded-2xl p-3 border border-gray-100 flex items-center gap-2">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{label}</p>
                    <p className="text-xs text-gray-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {state === "loading" && (
        <div className="text-center py-8">
          {preview && (
            <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden mb-5 relative">
              <img src={preview} alt="Uploaded" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-violet-900/40 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {["🔍 Preprocessing image...", "🧠 Running CNN inference...", "🔎 Matching catalog items...", "📍 Finding local shops..."].map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-2">
                <span className="animate-pulse">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {state === "result" && result && (
        <div>
          {/* Detection card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="text-4xl">{result.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{result.label}</h3>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {Math.round(result.confidence * 100)}% match
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{result.description}</p>
                <div className="flex flex-wrap gap-1">
                  {result.tags.map(t => (
                    <span key={t} className="bg-white text-gray-600 text-xs px-2 py-0.5 rounded-full border border-gray-200">#{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Matched items */}
          <h4 className="font-bold text-gray-900 text-sm mb-3">🛍️ Matching Items in Catalog</h4>
          <div className="space-y-2 mb-4">
            {result.matched.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-100">
                <span className="text-2xl">{item.companyLogo}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.company} • SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-violet-600 text-sm">₹{item.price.toLocaleString()}</p>
                  <p className="text-xs text-green-600">In stock: {item.stock}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shops selling this */}
          <h4 className="font-bold text-gray-900 text-sm mb-3">📍 Nearby Shops That Sell This</h4>
          <div className="space-y-2 mb-4">
            {result.shops.map(shop => (
              <div key={shop.id} className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                  shop.open ? "bg-violet-50" : "bg-gray-100"
                }`}>🏪</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{shop.name}</p>
                  <p className="text-xs text-gray-400">{shop.distance} • ⭐ {shop.rating}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  shop.open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"
                }`}>
                  {shop.open ? "Open" : "Closed"}
                </span>
              </div>
            ))}
          </div>

          <button onClick={reset}
            className="w-full bg-violet-600 text-white font-bold py-3 rounded-2xl">
            📸 Detect Another Item
          </button>
        </div>
      )}
    </div>
  );
}
