import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <>
      {/* Top Nav Bar */}
      <div className="nav-top d-flex justify-content-between align-items-center px-3 py-2">
        <h3 className="m-0">Bazaar Buddy</h3>
        <div className="search-bar">
          <input type="text" className="form-control" placeholder="Search..." />
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="navbar fixed-bottom navbar-light bg-light border-top">
        <div className="container justify-content-around">

          <Link className={`nav-link text-center ${location.pathname === '/' ? 'text-primary' : ''}`} to="/">
            <i className="fa-solid fa-house fa-lg"></i>
            <div style={{ fontSize: '12px' }}>Home</div>
          </Link>

          <Link className={`nav-link text-center ${location.pathname === '/capture' ? 'text-primary' : ''}`} to="/capture">
            <i className="fa-solid fa-camera fa-lg"></i>
            <div style={{ fontSize: '12px' }}>Capture</div>
          </Link>

          <Link className={`nav-link text-center ${location.pathname === '/bookmarks' ? 'text-primary' : ''}`} to="/bookmarks">
            <i className="fa-solid fa-bookmark fa-lg"></i>
            <div style={{ fontSize: '12px' }}>Bookmarks</div>
          </Link>

          <Link className={`nav-link text-center ${location.pathname === '/profile' ? 'text-primary' : ''}`} to="/profile">
            <i className="fa-regular fa-user fa-lg"></i>
            <div style={{ fontSize: '12px' }}>Profile</div>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
