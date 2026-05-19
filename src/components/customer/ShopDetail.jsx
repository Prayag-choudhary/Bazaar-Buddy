import { useState } from "react";
import { getShopInventory } from "../../data/mockDatabase";

export default function ShopDetail({ shop, onBack, onAddToCart }) {
  const [tab, setTab] = useState("items");
  const [added, setAdded] = useState({});
  const inventory = getShopInventory(shop);

  const handleAdd = (item) => {
    onAddToCart(item, shop);
    setAdded(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [item.id]: false })), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Hero */}
      <div className="bg-gradient-to-br from-violet-700 via-indigo-700 to-violet-800 pt-12 px-4 pb-6 relative">
        <button onClick={onBack}
          className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white mb-4">
          ←
        </button>
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
            🏪
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">{shop.name}</h1>
            <p className="text-violet-200 text-sm">{shop.address}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">⭐ {shop.rating}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                shop.open ? "bg-green-400/30 text-green-200" : "bg-red-400/30 text-red-200"
              }`}>
                {shop.open ? "Open Now" : "Closed"}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          {["📞 Call", "🗺️ Directions", "📤 Share"].map(action => (
            <button key={action}
              className="flex-1 bg-white/15 text-white text-sm font-medium py-2 rounded-xl">
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Tab */}
      <div className="bg-white border-b border-gray-100 px-4 flex gap-1">
        {["items", "about", "reviews"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold capitalize border-b-2 transition-all ${
              tab === t ? "border-violet-600 text-violet-600" : "border-transparent text-gray-400"
            }`}>
            {t === "items" ? `Products (${inventory.length})` : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {tab === "items" && (
          <div className="space-y-3">
            {inventory.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-2xl flex-shrink-0">
                  {item.companyLogo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.company}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-violet-600 font-bold text-sm">₹{item.price.toLocaleString()}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.stock > 20 ? "bg-green-100 text-green-700" : item.stock > 5 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                    }`}>
                      {item.stock > 20 ? "In Stock" : item.stock > 5 ? `Only ${item.stock} left` : "Low Stock"}
                    </span>
                  </div>
                </div>
                <button onClick={() => handleAdd(item)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all flex-shrink-0 ${
                    added[item.id]
                      ? "bg-green-500 text-white"
                      : "bg-violet-600 text-white"
                  }`}>
                  {added[item.id] ? "✓" : "+"}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "about" && (
          <div className="space-y-4">
            {[
              { icon: "📍", label: "Address", value: shop.address },
              { icon: "📞", label: "Phone", value: shop.phone },
              { icon: "🕐", label: "Hours", value: "Mon–Sat: 10am – 9pm" },
              { icon: "👤", label: "Owner", value: shop.owner },
              { icon: "🏷️", label: "Category", value: shop.category },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
                <span className="text-xl">{icon}</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{label}</p>
                  <p className="text-gray-900 font-semibold text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "reviews" && (
          <div>
            <div className="bg-violet-50 rounded-2xl p-4 text-center mb-4">
              <div className="text-4xl font-bold text-violet-700">{shop.rating}</div>
              <div className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</div>
              <div className="text-gray-400 text-sm">{shop.reviews} reviews</div>
            </div>
            {["Great selection of items!", "Very helpful staff.", "Good prices and quick service.", "Found exactly what I needed."].map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 mb-2 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Customer {i + 1}</span>
                  <span className="ml-auto text-yellow-500 text-xs">⭐ 5.0</span>
                </div>
                <p className="text-gray-600 text-sm">{r}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
