import { useState } from "react";
import NearbyShops from "../components/customer/NearbyShops";
import AIDetector from "../components/customer/AIDetector";
import ShopDetail from "../components/customer/ShopDetail";
import MapView from "../components/customer/MapView";

const TABS = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "map", icon: "🗺️", label: "Map" },
  { id: "ai", icon: "🤖", label: "AI Detect" },
  { id: "cart", icon: "🛒", label: "Cart" },
  { id: "profile", icon: "👤", label: "Profile" },
];

export default function CustomerApp({ user, onLogout }) {
  const [tab, setTab] = useState("home");
  const [selectedShop, setSelectedShop] = useState(null);
  const [cart, setCart] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [category, setCategory] = useState("All");

  const addToCart = (item, shop) => {
    setCart(prev => {
      const exists = prev.find(c => c.item.id === item.id);
      if (exists) return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { item, shop, qty: 1 }];
    });
  };

  if (selectedShop) {
    return <ShopDetail shop={selectedShop} onBack={() => setSelectedShop(null)} onAddToCart={addToCart} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-12 pb-4 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 font-medium">👋 Welcome back</p>
            <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center text-lg">
              🔔
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={onLogout} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
              {user.name[0]}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
            <span className="text-gray-400">🔍</span>
            <input placeholder="Search items or shops..." className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400" />
          </div>
          <button onClick={() => setFilterOpen(!filterOpen)}
            className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white">
            ⚙️
          </button>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {["All", "Electronics", "Fashion", "Grocery", "Pharmacy"].map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                category === c
                  ? "bg-violet-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pb-24">
        {tab === "home" && <NearbyShops onShopSelect={setSelectedShop} category={category} />}
        {tab === "map" && <MapView onShopSelect={setSelectedShop} />}
        {tab === "ai" && <AIDetector onFindShops={setSelectedShop} />}
        {tab === "cart" && <CartView cart={cart} setCart={setCart} />}
        {tab === "profile" && <ProfileView user={user} onLogout={onLogout} />}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-2 py-2 z-20">
        <div className="flex justify-around">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all relative ${
                tab === t.id ? "bg-violet-50" : ""
              }`}>
              <span className="text-lg">{t.icon}</span>
              <span className={`text-xs font-medium ${tab === t.id ? "text-violet-600" : "text-gray-400"}`}>
                {t.label}
              </span>
              {t.id === "cart" && cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CartView({ cart, setCart }) {
  const total = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0);
  if (!cart.length) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <div className="text-5xl">🛒</div>
      <p className="text-gray-500 font-medium">Your cart is empty</p>
      <p className="text-gray-400 text-sm">Use AI Detect or browse shops to add items</p>
    </div>
  );
  return (
    <div className="p-4">
      <h3 className="font-bold text-gray-900 text-lg mb-4">Your Cart</h3>
      <div className="space-y-3">
        {cart.map(({ item, shop, qty }, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-2xl">
              {shop.category === "Electronics" ? "💻" : "👗"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
              <p className="text-xs text-gray-400">{shop.name}</p>
              <p className="text-violet-600 font-bold text-sm">₹{item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setCart(prev => prev.map((c, idx) => idx === i ? { ...c, qty: Math.max(1, c.qty - 1) } : c))}
                className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-bold">−</button>
              <span className="text-sm font-bold text-gray-900 w-4 text-center">{qty}</span>
              <button onClick={() => setCart(prev => prev.map((c, idx) => idx === i ? { ...c, qty: c.qty + 1 } : c))}
                className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold">+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-violet-600 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-violet-200 text-xs">Total Amount</p>
          <p className="text-white font-bold text-xl">₹{total.toLocaleString()}</p>
        </div>
        <button className="bg-white text-violet-600 font-bold px-6 py-2 rounded-xl">Checkout →</button>
      </div>
    </div>
  );
}

function ProfileView({ user, onLogout }) {
  return (
    <div className="p-4">
      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 text-white mb-4">
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl mb-3">
          {user.name[0]}
        </div>
        <h3 className="font-bold text-xl">{user.name}</h3>
        <p className="text-violet-200 text-sm">{user.email}</p>
        <span className="inline-block mt-2 bg-white/20 text-xs px-3 py-1 rounded-full">Customer Account</span>
      </div>
      {["My Orders", "Saved Shops", "Notifications", "Help & Support", "Settings"].map(item => (
        <button key={item} className="w-full flex items-center justify-between p-4 bg-white rounded-2xl mb-2 shadow-sm border border-gray-100">
          <span className="font-medium text-gray-700">{item}</span>
          <span className="text-gray-400">›</span>
        </button>
      ))}
      <button onClick={onLogout} className="w-full p-4 bg-red-50 rounded-2xl text-red-500 font-semibold mt-2">
        Sign Out
      </button>
    </div>
  );
}
