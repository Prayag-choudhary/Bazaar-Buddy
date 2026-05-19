import { useState } from "react";
import InventoryManager from "../components/shopkeeper/InventoryManager";
import ShopDashboard from "../components/shopkeeper/ShopDashboard";
import OrdersView from "../components/shopkeeper/OrdersView";
import PageHeader from "./PageHeader";
const TABS = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "inventory", icon: "📦", label: "Inventory" },
  { id: "orders", icon: "🧾", label: "Orders" },
  { id: "profile", icon: "⚙️", label: "Settings" },
];

export default function ShopkeeperApp({ user, onLogout }) {
  const [tab, setTab] = useState("dashboard");
  const [shopInventory, setShopInventory] = useState(["sam_003", "sam_004", "int_003", "cor_002"]);

  return (
    <>
    <PageHeader/>
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 pt-12 pb-4 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium">DashBoard</p>
            <h2 className="text-white font-bold text-lg">{user.shopName || "My Shop"}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-slate-400 text-xs">{user.category}</p>
              <p className="text-white text-sm font-semibold">{user.name}</p>
            </div>
            <button onClick={onLogout} className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
              {user.name[0]}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-24">
        {tab === "dashboard" && <ShopDashboard user={user} inventory={shopInventory} />}
        {tab === "inventory" && <InventoryManager inventory={shopInventory} setInventory={setShopInventory} userCategory={user.category} />}
        {tab === "orders" && <OrdersView />}
        {tab === "profile" && <ShopSettings user={user} onLogout={onLogout} />}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-slate-900 border-t border-slate-700 px-2 py-2 z-20">
        <div className="flex justify-around">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                tab === t.id ? "bg-amber-500/20" : ""
              }`}>
              <span className="text-lg">{t.icon}</span>
              <span className={`text-xs font-medium ${tab === t.id ? "text-amber-400" : "text-slate-400"}`}>
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

function ShopSettings({ user, onLogout }) {
  return (
    <div className="p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white mb-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-3xl mb-3">🏪</div>
        <h3 className="font-bold text-xl">{user.shopName}</h3>
        <p className="text-slate-300 text-sm">{user.email}</p>
        <span className="inline-block mt-2 bg-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full font-medium">
          {user.category} · Verified Seller
        </span>
      </div>
      {["Shop Profile", "Business Hours", "Payment Settings", "Notifications", "Analytics", "Support"].map(item => (
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
