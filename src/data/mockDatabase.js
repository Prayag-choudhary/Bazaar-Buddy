// ============================================================
// MOCK DATABASE — Replace with real API calls / MongoDB / Firebase
// ============================================================

export const COMPANY_CATALOG = {
  Samsung: {
    logo: "🔵",
    category: "Electronics",
    items: [
      { id: "sam_001", name: "Galaxy S24 Ultra", price: 89999, sku: "SAM-S24U", stock: 15 },
      { id: "sam_002", name: "Galaxy A54 5G", price: 29999, sku: "SAM-A54", stock: 40 },
      { id: "sam_003", name: "DDR5 RAM 16GB", price: 4999, sku: "SAM-RAM16", stock: 100 },
      { id: "sam_004", name: "DDR5 RAM 32GB", price: 8999, sku: "SAM-RAM32", stock: 60 },
      { id: "sam_005", name: '65" QLED TV', price: 74999, sku: "SAM-TV65", stock: 8 },
      { id: "sam_006", name: "Galaxy Watch 6", price: 24999, sku: "SAM-W6", stock: 25 },
    ],
  },
  Levi_s: {
    logo: "🔴",
    category: "Fashion",
    items: [
      { id: "lev_001", name: "512 Slim Taper Jeans", price: 4999, sku: "LEV-512", stock: 80 },
      { id: "lev_002", name: "501 Original Jeans", price: 4599, sku: "LEV-501", stock: 120 },
      { id: "lev_003", name: "Chino Pants - Khaki", price: 3499, sku: "LEV-CH1", stock: 60 },
      { id: "lev_004", name: "Chino Pants - Navy", price: 3499, sku: "LEV-CH2", stock: 55 },
      { id: "lev_005", name: "Trucker Jacket", price: 6999, sku: "LEV-TJ1", stock: 30 },
      { id: "lev_006", name: "Batwing Logo T-Shirt", price: 1999, sku: "LEV-T1", stock: 200 },
    ],
  },
  Intel: {
    logo: "🟦",
    category: "Electronics",
    items: [
      { id: "int_001", name: "Core i9-13900K", price: 42999, sku: "INT-I9K", stock: 10 },
      { id: "int_002", name: "Core i7-13700K", price: 32999, sku: "INT-I7K", stock: 18 },
      { id: "int_003", name: "Core i5-13600K", price: 21999, sku: "INT-I5K", stock: 25 },
      { id: "int_004", name: "Core i3-12100F", price: 9999, sku: "INT-I3", stock: 35 },
      { id: "int_005", name: "Arc A770 16GB GPU", price: 29999, sku: "INT-A770", stock: 12 },
    ],
  },
  Nike: {
    logo: "⚫",
    category: "Fashion",
    items: [
      { id: "nik_001", name: "Air Max 270", price: 12999, sku: "NIK-AM270", stock: 45 },
      { id: "nik_002", name: "Air Force 1 '07", price: 8999, sku: "NIK-AF1", stock: 70 },
      { id: "nik_003", name: "Dri-FIT T-Shirt", price: 2499, sku: "NIK-DRY1", stock: 150 },
      { id: "nik_004", name: "Tech Fleece Joggers", price: 5999, sku: "NIK-TFJ", stock: 60 },
      { id: "nik_005", name: "Air Jordan 1 Low", price: 9499, sku: "NIK-AJ1L", stock: 20 },
    ],
  },
  Corsair: {
    logo: "🟡",
    category: "Electronics",
    items: [
      { id: "cor_001", name: "Vengeance 32GB DDR5", price: 10999, sku: "COR-V32", stock: 30 },
      { id: "cor_002", name: "Vengeance 16GB DDR5", price: 5999, sku: "COR-V16", stock: 50 },
      { id: "cor_003", name: "K70 RGB Mechanical KB", price: 12999, sku: "COR-K70", stock: 20 },
      { id: "cor_004", name: "HS80 Wireless Headset", price: 8999, sku: "COR-HS80", stock: 25 },
      { id: "cor_005", name: "SF750 PSU 750W", price: 11999, sku: "COR-SF750", stock: 15 },
    ],
  },
  FabIndia: {
    logo: "🟠",
    category: "Fashion",
    items: [
      { id: "fab_001", name: "Cotton Kurta - Blue", price: 1499, sku: "FAB-CK1", stock: 90 },
      { id: "fab_002", name: "Handloom Saree", price: 3999, sku: "FAB-HS1", stock: 40 },
      { id: "fab_003", name: "Organic Cotton Shirt", price: 1799, sku: "FAB-OCS", stock: 75 },
      { id: "fab_004", name: "Chikankari Kurti", price: 2299, sku: "FAB-CKT", stock: 50 },
    ],
  },
};

export const MOCK_SHOPS = [
  {
    id: 1,
    name: "TechZone Electronics",
    category: "Electronics",
    owner: "Rahul Sharma",
    address: "23 MG Road, Koregaon Park",
    distance: "0.3 km",
    rating: 4.8,
    reviews: 234,
    open: true,
    lat: 28.631,
    lng: 77.217,
    phone: "+91 98765 43210",
    inventory: ["sam_003", "sam_004", "int_003", "cor_002", "int_002"],
  },
  {
    id: 2,
    name: "Style Street",
    category: "Fashion",
    owner: "Priya Mehta",
    address: "45 FC Road, Shivajinagar",
    distance: "0.7 km",
    rating: 4.6,
    reviews: 189,
    open: true,
    lat: 28.632,
    lng: 77.218,
    phone: "+91 91234 56789",
    inventory: ["lev_001", "lev_003", "lev_004", "nik_003", "nik_004"],
  },
  {
    id: 3,
    name: "Gadget Galaxy",
    category: "Electronics",
    owner: "Amit Singh",
    address: "12 Law College Rd",
    distance: "1.1 km",
    rating: 4.5,
    reviews: 156,
    open: false,
    lat: 28.633,
    lng: 77.219,
    phone: "+91 88765 43210",
    inventory: ["sam_001", "sam_002", "int_001", "int_005", "cor_001"],
  },
  {
    id: 4,
    name: "Fabric Craft India",
    category: "Fashion",
    owner: "Sunita Joshi",
    address: "78 Laxmi Rd, Narayan Peth",
    distance: "1.4 km",
    rating: 4.9,
    reviews: 312,
    open: true,
    lat: 28.629,
    lng: 77.215,
    phone: "+91 99887 76655",
    inventory: ["fab_001", "fab_002", "fab_003", "fab_004"],
  },
  {
    id: 5,
    name: "PC Planet",
    category: "Electronics",
    owner: "Vikram Nair",
    address: "5 Station Rd, Camp",
    distance: "1.8 km",
    rating: 4.3,
    reviews: 98,
    open: true,
    lat: 28.628,
    lng: 77.214,
    phone: "+91 77665 54433",
    inventory: ["int_003", "int_004", "cor_002", "cor_003", "cor_005"],
  },
];

// Helper: get all items from company catalog as flat list
export function getAllItems() {
  const items = [];
  Object.entries(COMPANY_CATALOG).forEach(([company, data]) => {
    data.items.forEach(item => {
      items.push({ ...item, company, companyLogo: data.logo, category: data.category });
    });
  });
  return items;
}

// Helper: get item by id
export function getItemById(id) {
  const all = getAllItems();
  return all.find(i => i.id === id);
}

// Helper: get shop inventory with full item details
export function getShopInventory(shop) {
  return shop.inventory.map(id => getItemById(id)).filter(Boolean);
}

// Helper: find shops selling a specific item
export function findShopsForItem(itemId) {
  return MOCK_SHOPS.filter(shop => shop.inventory.includes(itemId));
}
