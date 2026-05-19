import { useState } from "react";
import PageHeader from "./PageHeader";
export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [accountType, setAccountType] = useState("customer");
  const [form, setForm] = useState({ name: "", email: "", password: "", shopName: "", category: "" });

  const shopCategories = ["Electronics", "Fashion", "Grocery", "Pharmacy", "Books", "Sports", "Home & Decor"];

  const handleSubmit = () => {
    if (!form.email || !form.password) return;
    const userData = {
      type: accountType,
      name: form.name || (accountType === "customer" ? "Alex Kumar" : "Shop Owner"),
      email: form.email,
      shopName: form.shopName || "My Shop",
      category: form.category || "Electronics",
      id: Date.now(),
    };
    onLogin(userData);
  };

  return (
    <>
    <PageHeader/>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-between p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            
            <div>
              
              <p className="text-xs text-indigo-300 font-medium tracking-widest uppercase">Digital Commerce</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Tab */}
          <div className="flex bg-white/5 rounded-2xl p-1 mb-6">
            {["login", "register"].map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
                  mode === m ? "bg-white text-slate-900 shadow" : "text-slate-400 hover:text-white"
                }`}>
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Account Type */}
          <div className="mb-6">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">I am a</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { type: "customer", icon: "🛒", label: "Customer", desc: "Browse & buy" },
                { type: "shopkeeper", icon: "🏪", label: "Shopkeeper", desc: "Sell & manage" },
              ].map(({ type, icon, label, desc }) => (
                <button key={type} onClick={() => setAccountType(type)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    accountType === type
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}>
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="text-white font-semibold text-sm">{label}</div>
                  <div className="text-slate-400 text-xs">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-3">
            {mode === "register" && (
              <input type="text" placeholder="Full name"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors" />
            )}
            {mode === "register" && accountType === "shopkeeper" && (
              <>
                <input type="text" placeholder="Shop name"
                  value={form.shopName} onChange={e => setForm({ ...form, shopName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors" />
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500">
                  <option value="">Select shop category</option>
                  {shopCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </>
            )}
            <input type="email" placeholder="Email address"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors" />
            <input type="password" placeholder="Password"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors" />
          </div>

          <button onClick={handleSubmit}
            className="w-full mt-5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5">
            {mode === "login" ? "Sign In" : `Create ${accountType === "customer" ? "Customer" : "Shop"} Account`}
          </button>

          <p className="text-center text-slate-500 text-xs mt-4">
            Demo: click sign in with any email to proceed
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
