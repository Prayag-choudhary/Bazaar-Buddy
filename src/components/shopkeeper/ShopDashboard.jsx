import { getItemById } from "../../data/mockDatabase";

const MOCK_SALES = [
  { item: "sam_003", qty: 3, date: "Today", revenue: 14997 },
  { item: "cor_002", qty: 2, date: "Today", revenue: 11998 },
  { item: "int_003", qty: 1, date: "Yesterday", revenue: 21999 },
  { item: "sam_004", qty: 2, date: "Yesterday", revenue: 17998 },
];

export default function ShopDashboard({ user, inventory }) {
  const totalRevenue = MOCK_SALES.reduce((s, r) => s + r.revenue, 0);
  const todaySales = MOCK_SALES.filter(r => r.date === "Today");
  const todayRevenue = todaySales.reduce((s, r) => s + r.revenue, 0);

  return (
    <div className="p-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: "Today's Revenue", value: `₹${todayRevenue.toLocaleString()}`, icon: "💰", color: "from-amber-400 to-amber-500" },
          { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: "📈", color: "from-green-400 to-emerald-500" },
          { label: "Listed Products", value: inventory.length, icon: "📦", color: "from-violet-400 to-violet-500" },
          { label: "Customers Today", value: "12", icon: "👥", color: "from-blue-400 to-blue-500" },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-white`}>
            <div className="text-2xl mb-2">{icon}</div>
            <div className="font-bold text-2xl">{value}</div>
            <div className="text-white/80 text-xs mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* AI Insights Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-4 mb-5 border border-slate-600">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-white font-semibold text-sm">AI Stock Insight</p>
            <p className="text-slate-300 text-xs mt-0.5">
              DDR5 RAM demand is trending +34% this week. Consider restocking{" "}
              <span className="text-amber-400 font-semibold">Samsung 16GB DDR5</span> soon.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 className="font-bold text-gray-900 text-sm mb-3">Quick Actions</h3>
      <div className="grid grid-cols-4 gap-2 mb-5">
        {[
          { icon: "📦", label: "Add Item" },
          { icon: "🏷️", label: "Set Price" },
          { icon: "📣", label: "Promote" },
          { icon: "📊", label: "Analytics" },
        ].map(({ icon, label }) => (
          <button key={label} className="bg-white rounded-2xl p-3 flex flex-col items-center gap-1 border border-gray-100 shadow-sm hover:border-amber-300 transition-all">
            <span className="text-xl">{icon}</span>
            <span className="text-xs text-gray-600 font-medium text-center">{label}</span>
          </button>
        ))}
      </div>

      {/* Recent Sales */}
      <h3 className="font-bold text-gray-900 text-sm mb-3">Recent Sales</h3>
      <div className="space-y-2">
        {MOCK_SALES.map((sale, i) => {
          const item = getItemById(sale.item);
          if (!item) return null;
          return (
            <div key={i} className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl flex-shrink-0">
                {item.companyLogo}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                <p className="text-xs text-gray-400">Qty: {sale.qty} · {sale.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-green-600 text-sm">+₹{sale.revenue.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shop Status */}
      <div className="mt-5 bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900 text-sm">Shop Status</p>
          <p className="text-xs text-gray-400 mt-0.5">Visible to customers on the map</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500 text-xs font-semibold">Open</span>
          <div className="relative">
            <div className="w-12 h-6 bg-green-500 rounded-full"></div>
            <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
