import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { appDetails, headerMenuItems } from '../data/siteData';

export default function Header({
  onOpenLogin,
  onOpenRegister,
  onOpenSearch,
  onToggleMobileMenu,
  isLoggedIn,
  user,
  onLogout,
  onOpenProfile,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenMyBets,
  onOpenStatement
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`header ${isLoggedIn ? 'aftrlgn' : 'beforeheader'}`}>
      <div className="logo">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <img alt="Logo" src={appDetails.logoUrl} />
        </a>
      </div>

      <div className="header-menu">
        <ul>
          {headerMenuItems.map((item, idx) => {
            const isActive = location.pathname === item.path ||
              (item.path === '/exchange' && location.pathname.startsWith('/sports')) ||
              (item.path === '/evolution' && location.pathname.includes('evolution')) ||
              (item.path === '/aero' && location.pathname.includes('aero'));

            return (
              <li key={idx}>
                <a
                  href={item.path}
                  className={isActive ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                >
                  <img src={item.icon} alt={item.name} />
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="headerRight ms-auto">
        <div className="search-box" onClick={onOpenSearch} style={{ cursor: 'pointer' }}>
          <div className="searchGames">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
            <p>Search...</p>
          </div>
        </div>

        {isLoggedIn ? (
          <>
            {/* Logged in balance info */}
            <div className="balance-info">
              <ul>
                <li className="d-none d-md-block">
                  Hello <span>{user?.username || 'User'}</span>
                </li>
                <li>
                  Balance: <span>₹{user?.balance || '10,000.00'}</span>
                </li>
                <li className="d-none d-md-block">
                  Cashable Chip: <span>₹{user?.balance || '10,000.00'}</span>
                </li>
                <li className="d-none d-md-block">
                  Non-Cash Chip: <span>₹0.00</span>
                </li>
                <li className="deposit">
                  <a
                    href="#deposit"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenDeposit();
                    }}
                  >
                    Deposit
                  </a>
                </li>
              </ul>
            </div>

            {/* User Dropdown */}
            <div className="menu-dropdown dropdown" ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                type="button"
                className="dropdown-toggle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <img
                  src="/static/media/profile-icon.af94f5d679cee064d99d.webp"
                  alt="my menu"
                  onError={(e) => {
                    e.target.src = '/Favicon.webp';
                  }}
                />
              </button>

              {dropdownOpen && (
                <div
                  className="dropdown-menu show"
                  style={{
                    display: 'block',
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    zIndex: 1000
                  }}
                >
                  <div className="balance d-md-none">
                    <ul>
                      <li>Hello <span>{user?.username}</span></li>
                      <li>Balance: <span>₹{user?.balance}</span></li>
                    </ul>
                  </div>
                  <a
                    className="dropdown-item"
                    href="#profile"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      onOpenProfile();
                    }}
                  >
                    Profile
                  </a>
                  <a
                    className="dropdown-item"
                    href="#deposit"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      onOpenDeposit();
                    }}
                  >
                    Deposit
                  </a>
                  <a
                    className="dropdown-item"
                    href="#withdraw"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      onOpenWithdraw();
                    }}
                  >
                    Withdraw
                  </a>
                  <a
                    className="dropdown-item"
                    href="#mybets"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      onOpenMyBets();
                    }}
                  >
                    My Bets
                  </a>
                  <a
                    className="dropdown-item"
                    href="#cashier"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      onOpenStatement();
                    }}
                  >
                    Account Statement
                  </a>
                  <div style={{ borderTop: '1px solid #333', margin: '4px 0' }}></div>
                  <a
                    className="dropdown-item"
                    href="#logout"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      onLogout();
                    }}
                    style={{ color: '#ea3a4e' }}
                  >
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="button-primary btn_signin btn btn-primary"
              onClick={onOpenLogin}
            >
              Login
            </button>
            <button
              type="button"
              className="button-primary btn_signup btn-secondary ms-2 btn btn-primary"
              onClick={onOpenRegister}
            >
              Register
            </button>
          </>
        )}

        <div className="leftbar_toggle ms-2 d-xl-none">
          <button type="button" className="btn btn-primary" onClick={onToggleMobileMenu}>
            <img src="/static/media/toggle-menu.cbcb727895126e7099e3.webp" alt="toggleIcon" />
          </button>
        </div>
      </div>
    </header>
  );
}
