import { useState } from "react";
import { getItemById } from "../../data/mockDatabase";

const MOCK_ORDERS = [
  { id: "ORD-001", customer: "Rohan Kumar", items: [{ id: "sam_003", qty: 1 }, { id: "cor_002", qty: 2 }], status: "pending", time: "10:23 AM", total: 16997 },
  { id: "ORD-002", customer: "Priya Shah", items: [{ id: "int_003", qty: 1 }], status: "confirmed", time: "09:15 AM", total: 21999 },
  { id: "ORD-003", customer: "Amit Rao", items: [{ id: "sam_004", qty: 1 }], status: "ready", time: "Yesterday", total: 8999 },
  { id: "ORD-004", customer: "Sneha Patel", items: [{ id: "cor_002", qty: 1 }], status: "completed", time: "Yesterday", total: 5999 },
];

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700", action: "Accept Order" },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-700", action: "Mark Ready" },
  ready: { label: "Ready", color: "bg-violet-100 text-violet-700", action: "Complete" },
  completed: { label: "Completed", color: "bg-green-100 text-green-700", action: null },
};

export default function OrdersView() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [filter, setFilter] = useState("all");

  const STATUS_FLOW = { pending: "confirmed", confirmed: "ready", ready: "completed" };
  const advance = (id) => {
    setOrders(prev => prev.map(o => o.id === id && STATUS_FLOW[o.status]
      ? { ...o, status: STATUS_FLOW[o.status] }
      : o
    ));
  };

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="p-4">
      {/* Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {["all", "pending", "confirmed", "ready", "completed"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
              filter === f ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600"
            }`}>
            {f === "all" ? `All (${orders.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${orders.filter(o => o.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(order => {
          const cfg = STATUS_CONFIG[order.status];
          const orderItems = order.items.map(({ id, qty }) => ({ ...getItemById(id), qty })).filter(Boolean);
          return (
            <div key={order.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{order.id}</p>
                  <p className="text-xs text-gray-400">{order.customer} · {order.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${cfg.color}`}>
                  {cfg.label}
                </span>
              </div>
              <div className="space-y-1 mb-3">
                {orderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{item.companyLogo}</span>
                    <span className="flex-1 truncate">{item.name}</span>
                    <span className="font-semibold">×{item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="font-bold text-gray-900">₹{order.total.toLocaleString()}</span>
                {cfg.action && (
                  <button onClick={() => advance(order.id)}
                    className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                    {cfg.action}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
