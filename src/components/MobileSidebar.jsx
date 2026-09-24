import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MobileSidebar({ isOpen, onClose, onSelectCategory }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const links = [
    { label: "All Live Games", path: "/", cat: "roulette" },
    { label: "Exchange", path: "/exchange" },
    { label: "Aero", path: "/aero" },
    { label: "Evolution", path: "/evolution" },
    { label: "Slots", path: "/slots" },
    { label: "XPG", path: "/xpg" },
    { label: "Qtech", path: "/qtech" },
    { label: "Supernowa", path: "/supernowa" },
    { label: "Vimplay", path: "/vimplay" }
  ];

  return (
    <>
      <div 
        className="mobile-sidebar-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 1040
        }}
      />
      <div 
        className="leftbarSec d-xl-none show-mobile"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '280px',
          background: '#141414',
          zIndex: 1050,
          overflowY: 'auto',
          boxShadow: '2px 0 10px rgba(0,0,0,0.5)',
          paddingTop: '20px'
        }}
      >
        <div className="d-flex justify-content-between align-items-center px-3 mb-3 border-bottom pb-2">
          <span style={{ color: '#e5a922', fontWeight: 'bold', fontSize: '18px' }}>Menu</span>
          <button 
            type="button" 
            onClick={onClose}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: '#fff', 
              fontSize: '24px', 
              cursor: 'pointer' 
            }}
          >
            &times;
          </button>
        </div>
        <ul>
          {links.map((link, idx) => (
            <li key={idx}>
              <a 
                href={link.path} 
                onClick={(e) => {
                  e.preventDefault();
                  if (link.cat) {
                    onSelectCategory(link.cat);
                  }
                  navigate(link.path);
                  onClose();
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
