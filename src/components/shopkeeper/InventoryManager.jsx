import { useState } from "react";
import { COMPANY_CATALOG, getAllItems, getItemById } from "../../data/mockDatabase";

// ============================================================
// INVENTORY MANAGER
// Shopkeeper browses company catalogs → selects items they sell
// In production: save to MongoDB shops.inventory[] via API
// ============================================================

export default function InventoryManager({ inventory, setInventory, userCategory }) {
  const [view, setView] = useState("my"); // my | browse
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [search, setSearch] = useState("");
  const [confirmItem, setConfirmItem] = useState(null);

  const myItems = inventory.map(id => getItemById(id)).filter(Boolean);
  const allItems = getAllItems();
  const filteredAll = allItems.filter(item =>
    (search ? item.name.toLowerCase().includes(search.toLowerCase()) || item.company.toLowerCase().includes(search.toLowerCase()) : true) &&
    (!selectedCompany || item.company === selectedCompany)
  );

  const toggle = (id) => {
    setInventory(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div>
      {/* Sub-tabs */}
      <div className="bg-white border-b border-gray-100 px-4 flex gap-1 sticky top-[88px] z-10">
        {[
          { id: "my", label: `My Inventory (${inventory.length})` },
          { id: "browse", label: "Browse Catalogs" },
        ].map(t => (
          <button key={t.id} onClick={() => setView(t.id)}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all ${
              view === t.id ? "border-amber-500 text-amber-600" : "border-transparent text-gray-400"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {view === "my" && (
          <>
            {myItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">📦</div>
                <h3 className="font-bold text-gray-700 mb-1">No items in inventory</h3>
                <p className="text-gray-400 text-sm mb-4">Browse company catalogs to add items you sell</p>
                <button onClick={() => setView("browse")}
                  className="bg-amber-500 text-white font-bold px-5 py-2 rounded-xl text-sm">
                  Browse Catalogs →
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">Your Listed Products</h3>
                  <button onClick={() => setView("browse")} className="text-amber-600 text-sm font-semibold">+ Add More</button>
                </div>
                <div className="space-y-2">
                  {myItems.map(item => (
                    <div key={item.id} className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-gray-100 shadow-sm">
                      <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-2xl flex-shrink-0">
                        {item.companyLogo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.company} · {item.sku}</p>
                        <p className="text-amber-600 font-bold text-sm">₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`text-xs px-2 py-0.5 rounded-full mb-1 ${
                          item.stock > 20 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          Stock: {item.stock}
                        </div>
                        <button onClick={() => toggle(item.id)}
                          className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-lg">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {view === "browse" && (
          <>
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5 mb-4">
              <span className="text-gray-400">🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search items or brands..."
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400" />
            </div>

            {/* Company filter */}
            {!search && (
              <>
                <h3 className="font-bold text-gray-900 text-sm mb-3">Company Catalogs</h3>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <button onClick={() => setSelectedCompany(null)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      !selectedCompany ? "border-amber-400 bg-amber-50" : "border-gray-100 bg-white"
                    }`}>
                    <div className="text-xl mb-1">🌐</div>
                    <p className="font-semibold text-sm text-gray-900">All Companies</p>
                    <p className="text-xs text-gray-400">{getAllItems().length} items</p>
                  </button>
                  {Object.entries(COMPANY_CATALOG).map(([company, data]) => (
                    <button key={company} onClick={() => setSelectedCompany(company)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedCompany === company ? "border-amber-400 bg-amber-50" : "border-gray-100 bg-white"
                      }`}>
                      <div className="text-xl mb-1">{data.logo}</div>
                      <p className="font-semibold text-sm text-gray-900">{company.replace("_", "'")}</p>
                      <p className="text-xs text-gray-400">{data.items.length} items · {data.category}</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Items */}
            <h3 className="font-bold text-gray-900 text-sm mb-3">
              {selectedCompany ? `${selectedCompany.replace("_", "'")} Catalog` : "All Items"}
              <span className="text-gray-400 font-normal ml-1">({filteredAll.length})</span>
            </h3>
            <div className="space-y-2">
              {filteredAll.map(item => {
                const inInventory = inventory.includes(item.id);
                return (
                  <div key={item.id} className={`bg-white rounded-2xl p-3 flex items-center gap-3 border shadow-sm transition-all ${
                    inInventory ? "border-amber-300 bg-amber-50/50" : "border-gray-100"
                  }`}>
                    <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-2xl flex-shrink-0">
                      {item.companyLogo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.company} · {item.sku}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-amber-600 font-bold text-xs">₹{item.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-400">Stock avail: {item.stock}</span>
                      </div>
                    </div>
                    <button onClick={() => toggle(item.id)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all flex-shrink-0 ${
                        inInventory
                          ? "bg-amber-500 text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-amber-100"
                      }`}>
                      {inInventory ? "✓" : "+"}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
