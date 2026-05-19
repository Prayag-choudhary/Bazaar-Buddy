import { useState } from "react";
import { MOCK_SHOPS } from "../../data/mockDatabase";

export default function MapView({ onShopSelect }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? MOCK_SHOPS : filter === "Open" ? MOCK_SHOPS.filter(s => s.open) : MOCK_SHOPS.filter(s => s.category === filter);

  // Relative pin positions on the SVG map
  const PIN_POSITIONS = [
    { x: 260, y: 110 },
    { x: 240, y: 260 },
    { x: 110, y: 190 },
    { x: 290, y: 200 },
    { x: 190, y: 220 },
  ];

  return (
    <div className="p-4">
      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {["All", "Open", "Electronics", "Fashion"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === f ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600"
            }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-4">
        <svg viewBox="0 0 400 280" className="w-full" style={{ background: "#f0f4f8" }}>
          {/* Grid roads */}
          {[60, 120, 180, 240].map(y => (
            <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#d1d5db" strokeWidth="8" />
          ))}
          {[80, 160, 240, 320].map(x => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="280" stroke="#d1d5db" strokeWidth="8" />
          ))}
          {/* Blocks */}
          {[[0,0,80,60],[80,0,80,60],[160,0,80,60],[240,0,80,60],[320,0,80,60],
            [0,60,80,60],[0,120,80,60],[0,180,80,60],[0,240,80,40]].map(([x,y,w,h], i) => (
            <rect key={i} x={x+1} y={y+1} width={w-2} height={h-2} fill="#e8edf2" rx="2" />
          ))}
          {/* Location indicator (user) */}
          <circle cx="200" cy="140" r="10" fill="#000000" opacity="0.3" />
          <circle cx="200" cy="140" r="5" fill="#22015a" />
          <text x="200" y="165" textAnchor="middle" fontSize="10" fill="#7c3aed" fontWeight="600">You</text>

          {/* Shop pins */}
          {filtered.map((shop, i) => {
            const pos = PIN_POSITIONS[MOCK_SHOPS.indexOf(shop)] || PIN_POSITIONS[i % PIN_POSITIONS.length];
            const isSelected = selected?.id === shop.id;
            return (
              <g key={shop.id} onClick={() => setSelected(shop)} className="cursor-pointer"
                transform={`translate(${pos.x}, ${pos.y})`}>
                <circle r={isSelected ? 16 : 12}
                  fill={shop.open ? "#5000da" : "#000000"}
                  stroke="white" strokeWidth="2.5" />
                <text textAnchor="middle" dominantBaseline="central" fontSize="10">
                  {shop.category === "Electronics" ? "💻" : "👗"}
                </text>
                {isSelected && (
                  <text y="25" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="700"
                    style={{ filter: "drop-shadow(0 0 3px white)" }}>
                    {shop.name.split(" ").slice(0, 2).join(" ")}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="flex items-center gap-4 px-4 py-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <div className="w-3 h-3 rounded-full bg-violet-600"></div>Open
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>Closed
          </div>
          <div className="flex items-center gap-1.5 text-xs text-violet-600 ml-auto font-semibold">
            {filtered.length} shops shown
          </div>
        </div>
      </div>

      {/* Shop list */}
      <h3 className="font-bold text-gray-900 text-sm mb-3">Stores Near You</h3>
      <div className="space-y-2">
        {filtered.map(shop => (
          <button key={shop.id} onClick={() => onShopSelect(shop)}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
              selected?.id === shop.id
                ? "border-violet-400 bg-violet-50"
                : "bg-white border-gray-100"
            }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
              shop.open ? "bg-violet-50" : "bg-gray-100"
            }`}>
              {shop.category === "Electronics" ? "💻" : "👗"}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">{shop.name}</p>
              <p className="text-xs text-gray-400">{shop.distance} · ⭐ {shop.rating}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
              shop.open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"
            }`}>
              {shop.open ? "Open" : "Closed"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
