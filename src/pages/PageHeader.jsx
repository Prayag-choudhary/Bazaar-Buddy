// // Header.jsx
// import React from "react";
// import logo from '../assets/logo.png';
// import {
//   Search,
//   User,
//   Heart,
//   ShoppingBag,
//   ChevronDown,
// } from "lucide-react";

// const PageHeader = () => {
//   const navItems = [
//     "WOMEN",
//     "MEN",
//     "KIDS",
//     "HOME",
//     "BEAUTY",
//     "BRANDS",
//   ];

//   return (
//     <header className="w-full bg-white shadow-sm border-b border-gray-200">
//       {/* Top Header */}
//       <div className="max-w-7xl mx-auto px-4 lg:px-8">
//         <div className="flex  justify-between h-2">
//           {/* Logo */}
//           <div className="w-1 h-1 flex items-center justify-center">
//                 <img
//                   src={logo}
//                   alt="Bazaar Buddy Logo"
//                   className="w-1 h-1 object-contain"
//                 />
//             </div> 

//           {/* Search Bar */}
//           <div className="hidden md:flex items-center flex-1 max-w-md mx-10">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="w-full border border-gray-300 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//               />
//               <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition">
//                 <Search size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Right Menu */}
//           <div className="flex items-center space-x-6 text-xs font-medium uppercase text-gray-700">
//             {/* Account */}
//             <div className="flex items-center space-x-1 cursor-pointer hover:text-orange-500 transition">
//               <User size={18} />
//               <span>Account</span>
//               <ChevronDown size={14} />
//             </div>

//             {/* Wishlist */}
//             <div className="flex items-center space-x-1 cursor-pointer hover:text-orange-500 transition">
//               <Heart size={18} />
//               <span>Wishlist</span>
//             </div>

//             {/* Cart */}
//             <div className="relative flex items-center space-x-1 cursor-pointer hover:text-orange-500 transition">
//               <ShoppingBag size={18} />
//               <span>Cart</span>
//               <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
//                 0
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="border-t border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 lg:px-8">
//           <ul className="flex items-center justify-center space-x-10 h-12 text-sm font-semibold tracking-wide text-gray-800">
//             {navItems.map((item) => (
//               <li
//                 key={item}
//                 className="cursor-pointer hover:text-orange-500 transition duration-200"
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default PageHeader;
import React, { useState, useEffect } from "react";
import { Search, User, Heart, ShoppingBag, ChevronDown, MapPin, Menu, X, Bell } from "lucide-react";

const PageHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeNav, setActiveNav] = useState("WOMEN");

  const navItems = ["WOMEN", "MEN", "KIDS", "HOME", "BEAUTY", "BRANDS", "SALE"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .header-root {
          font-family: 'DM Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: all 0.3s ease;
        }

        .header-root.scrolled {
          box-shadow: 0 4px 30px rgba(0,0,0,0.08);
        }

        /* Announcement bar */
        .announce-bar {
          background: linear-gradient(90deg, #1a0a00 0%, #2d1200 40%, #1a0a00 100%);
          color: #f5c87a;
          font-size: 11.5px;
          letter-spacing: 0.12em;
          text-align: center;
          padding: 7px 16px;
          font-weight: 500;
          position: relative;
          overflow: hidden;
        }
        .announce-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 60px,
            rgba(245,200,122,0.04) 60px,
            rgba(245,200,122,0.04) 61px
          );
        }
        .announce-dot {
          display: inline-block;
          width: 5px; height: 5px;
          background: #f5a623;
          border-radius: 50%;
          margin: 0 10px;
          vertical-align: middle;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* Main header band */
        .main-band {
          background: #fff;
          border-bottom: 1px solid #f0ece4;
          padding: 0 32px;
        }
        .main-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 72px;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        /* Wordmark logo */
        .wordmark {
          display: flex;
          flex-direction: column;
          line-height: 1;
          text-decoration: none;
          flex-shrink: 0;
        }
        .wordmark-top {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #1a0a00;
          letter-spacing: -0.02em;
        }
        .wordmark-top span {
          color: #e8750a;
        }
        .wordmark-sub {
          font-size: 8.5px;
          letter-spacing: 0.22em;
          color: #b07d50;
          font-weight: 500;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* Location pill */
        .location-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #fdf6ed;
          border: 1px solid #f0e0c4;
          border-radius: 999px;
          padding: 6px 12px 6px 8px;
          font-size: 12px;
          color: #7a4f2a;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .location-pill:hover {
          background: #fceedd;
          border-color: #e8750a;
          color: #e8750a;
        }

        /* Search */
        .search-wrap {
          flex: 1;
          max-width: 480px;
          position: relative;
        }
        .search-input {
          width: 100%;
          height: 42px;
          background: #f7f3ee;
          border: 1.5px solid transparent;
          border-radius: 12px;
          padding: 0 44px 0 16px;
          font-size: 13.5px;
          color: #1a0a00;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
          outline: none;
        }
        .search-input::placeholder { color: #b09880; }
        .search-input:focus {
          background: #fff;
          border-color: #e8750a;
          box-shadow: 0 0 0 3px rgba(232,117,10,0.1);
        }
        .search-btn {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 28px; height: 28px;
          background: #e8750a;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: background 0.2s;
        }
        .search-btn:hover { background: #c96208; }

        /* Right icons */
        .right-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: auto;
        }
        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 8px 10px;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 10px;
          transition: background 0.15s;
          position: relative;
          color: #3d2000;
        }
        .action-btn:hover { background: #fdf3e7; }
        .action-btn svg { stroke-width: 1.6; }
        .action-label {
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #7a4f2a;
        }
        .cart-badge {
          position: absolute;
          top: 4px; right: 4px;
          background: #e8750a;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          border-radius: 999px;
          min-width: 16px; height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          border: 2px solid #fff;
        }
        .wishlist-count {
          position: absolute;
          top: 4px; right: 4px;
          background: #dc2626;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          border-radius: 999px;
          min-width: 16px; height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          border: 2px solid #fff;
        }
        .divider-v {
          width: 1px; height: 28px;
          background: #ede8e0;
          margin: 0 4px;
        }
        .sign-in-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          background: #1a0a00;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .sign-in-btn:hover { background: #e8750a; }

        /* Nav bar */
        .nav-bar {
          background: #fff;
          border-bottom: 1.5px solid #f0ece4;
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 44px;
        }
        .nav-list {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nav-item {
          position: relative;
        }
        .nav-link {
          display: block;
          padding: 0 14px;
          height: 44px;
          line-height: 44px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #3d2000;
          cursor: pointer;
          transition: color 0.15s;
          white-space: nowrap;
          border: none;
          background: none;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-link:hover { color: #e8750a; }
        .nav-link.active { color: #e8750a; }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0; left: 14px; right: 14px;
          height: 2.5px;
          background: #e8750a;
          border-radius: 2px 2px 0 0;
        }
        .nav-link.sale { color: #dc2626 !important; }
        .nav-link.sale:hover { color: #b91c1c !important; }

        /* Promo tag */
        .promo-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #7a4f2a;
          font-weight: 500;
        }
        .promo-chip {
          background: #fef3c7;
          color: #92400e;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
          border: 1px solid #fde68a;
          letter-spacing: 0.05em;
        }

        /* Mobile menu */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(26,10,0,0.5);
          z-index: 200;
          backdrop-filter: blur(4px);
          animation: fade-in 0.2s ease;
        }
        .mobile-drawer {
          position: fixed;
          top: 0; left: 0;
          width: 300px; height: 100%;
          background: #fff;
          z-index: 201;
          padding: 24px;
          overflow-y: auto;
          animation: slide-in 0.25s ease;
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }

        .mobile-logo {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #1a0a00;
          margin-bottom: 28px;
        }
        .mobile-logo span { color: #e8750a; }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 0;
          border-bottom: 1px solid #f5f0ea;
          font-size: 14px;
          font-weight: 600;
          color: #3d2000;
          cursor: pointer;
          letter-spacing: 0.05em;
        }
        .mobile-nav-item:hover { color: #e8750a; }
        .close-btn {
          position: absolute;
          top: 20px; right: 20px;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #f5f0ea;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3d2000;
        }

        @media (max-width: 768px) {
          .main-band { padding: 0 16px; }
          .search-wrap { display: none; }
          .location-pill { display: none; }
          .action-label { display: none; }
          .sign-in-btn span { display: none; }
          .nav-bar { display: none; }
          .wordmark-top { font-size: 20px; }
        }
      `}</style>

      <header className={`header-root ${scrolled ? "scrolled" : ""}`}>
        {/* Announcement bar */}
        <div className="announce-bar">
          <span className="announce-dot"></span>
          Free delivery on orders above ₹599
          <span className="announce-dot"></span>
          Shop local. Support your neighbourhood businesses.
          <span className="announce-dot"></span>
          Use code <strong>LOCAL20</strong> for 20% off your first order
          <span className="announce-dot"></span>
        </div>

        {/* Main header */}
        <div className="main-band">
          <div className="main-inner">
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg border border-gray-200"
              onClick={() => setMobileOpen(true)}
              style={{ display: "none" }}
            >
              <Menu size={20} color="#3d2000" />
            </button>

            {/* Logo wordmark */}
            <a href="/" className="wordmark">
              <div className="wordmark-top">Bazaar<span>Buddy</span></div>
              <div className="wordmark-sub">Local · Digital · Market</div>
            </a>

            {/* Location */}
            <div className="location-pill">
              <MapPin size={13} color="#e8750a" strokeWidth={2.2} />
              <span>Bhopal, MP</span>
              <ChevronDown size={12} color="#b07d50" />
            </div>

            {/* Search */}
            <div className="search-wrap">
              <input
                className="search-input"
                type="text"
                placeholder="Search for products, brands, or stores…"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <button className="search-btn">
                <Search size={13} strokeWidth={2.5} />
              </button>
            </div>

            {/* Right actions */}
            <div className="right-actions">
              <button className="action-btn">
                <Bell size={19} />
                <span className="action-label">Alerts</span>
              </button>

              <div className="divider-v" />

              <button className="action-btn">
                <Heart size={19} />
                <span className="action-label">Wishlist</span>
                <span className="wishlist-count">3</span>
              </button>

              <button className="action-btn" style={{ position: "relative" }}>
                <ShoppingBag size={19} />
                <span className="action-label">Cart</span>
                <span className="cart-badge">0</span>
              </button>

              <div className="divider-v" />

              <button className="sign-in-btn">
                <User size={15} />
                <span>Sign In</span>
                <ChevronDown size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Nav bar */}
        <nav className="nav-bar">
          <div className="nav-inner">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item} className="nav-item">
                  <button
                    className={`nav-link ${activeNav === item ? "active" : ""} ${item === "SALE" ? "sale" : ""}`}
                    onClick={() => setActiveNav(item)}
                  >
                    {item}
                    {item === "SALE" && (
                      <span style={{
                        marginLeft: 4,
                        background: "#fee2e2",
                        color: "#dc2626",
                        fontSize: 9,
                        fontWeight: 800,
                        padding: "1px 5px",
                        borderRadius: 4,
                        letterSpacing: "0.05em",
                        verticalAlign: "middle",
                      }}>HOT</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Promo badge */}
            <div className="promo-tag">
              <span>Today's Deal:</span>
              <span className="promo-chip">UP TO 70% OFF</span>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
          <div className="mobile-drawer" style={{ position: "relative" }}>
            <button className="close-btn" onClick={() => setMobileOpen(false)}>
              <X size={16} />
            </button>
            <div className="mobile-logo">Bazaar<span>Buddy</span></div>
            {navItems.map(item => (
              <div key={item} className="mobile-nav-item">
                {item}
                <ChevronDown size={14} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default PageHeader;