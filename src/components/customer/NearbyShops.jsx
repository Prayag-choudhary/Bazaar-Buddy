import { MOCK_SHOPS } from "../../data/mockDatabase";

const CATEGORY_ICONS = {
  Electronics: "💻",
  Fashion: "👗",
  Grocery: "🥦",
  Pharmacy: "💊",
  Books: "📚",
  Sports: "⚽",
  "Home & Decor": "🪴",
};

export default function NearbyShops({ onShopSelect, category }) {
  const filtered = category === "All" ? MOCK_SHOPS : MOCK_SHOPS.filter(s => s.category === category);

  return (
    <div className="p-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-5 mb-5 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-8xl opacity-20">🏪</div>
        <p className="text-violet-200 text-xs font-semibold uppercase tracking-wider mb-1">Explore Now</p>
        <h3 className="text-white font-bold text-xl mb-1">Looking for an in-store experience?</h3>
        <p className="text-violet-200 text-sm mb-4">Visit local stores near you for expert advice and exclusive deals</p>
        <button className="bg-white text-violet-600 font-bold text-sm px-5 py-2 rounded-xl">
          Explore Nearby Stores →
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Shops Nearby", value: MOCK_SHOPS.filter(s => s.open).length, icon: "🏪" },
          { label: "Avg Distance", value: "0.9 km", icon: "📍" },
          { label: "Open Now", value: MOCK_SHOPS.filter(s => s.open).length, icon: "✅" },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100">
            <div className="text-xl mb-1">{icon}</div>
            <div className="font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-400">{label}</div>
          </div>
        ))}
      </div>

      {/* Shops list */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-900 text-base">Stores Near You</h3>
        <button className="text-violet-600 text-sm font-semibold">See all</button>
      </div>

      <div className="space-y-3">
        {filtered.map(shop => (
          <button key={shop.id} onClick={() => onShopSelect(shop)}
            className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100 hover:border-violet-200 hover:shadow-md transition-all text-left">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
              shop.open ? "bg-violet-50" : "bg-gray-100"
            }`}>
              {CATEGORY_ICONS[shop.category] || "🏪"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-900 text-sm">{shop.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  shop.open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"
                }`}>
                  {shop.open ? "Open" : "Closed"}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{shop.address}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-xs text-amber-600 font-semibold">⭐ {shop.rating}</span>
                <span className="text-xs text-gray-400">({shop.reviews} reviews)</span>
                <span className="text-xs text-violet-600 font-semibold">📍 {shop.distance}</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 flex-shrink-0">
              ›
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
