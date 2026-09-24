import React from 'react';

export default function ProfileDrawer({
  isOpen,
  onClose,
  user,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenMyBets,
  onOpenStatement,
  onLogout
}) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="offcanvas-backdrop fade show"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1040
        }}
      />
      <div
        className="offcanvas offcanvas-end show"
        tabIndex="-1"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '320px',
          backgroundColor: '#1b1b1b',
          color: '#fff',
          zIndex: 1050,
          boxShadow: '-5px 0 25px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div
          className="offcanvas-header"
          style={{
            padding: '20px',
            borderBottom: '1px solid #282828',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="profile-img"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#262626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e5a922'
              }}
            >
              <img
                src="/static/media/profile-icon.af94f5d679cee064d99d.webp"
                alt="profile"
                style={{ width: '24px', height: '24px' }}
                onError={(e) => { e.target.src = '/Favicon.webp'; }}
              />
            </div>
            <div className="user-info">
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>
                {user?.username || 'Trader'}
              </span>
              <span style={{ fontSize: '12px', color: '#999' }}>
                {user?.phone ? `+91 ${user.phone}` : 'Verified Account'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              lineHeight: 1
            }}
          >
            &times;
          </button>
        </div>

        {/* Balance Card */}
        <div style={{ padding: '20px', backgroundColor: '#141414', borderBottom: '1px solid #282828' }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Main Wallet</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e5a922', marginBottom: '14px' }}>
            ₹{user?.balance || '10,000.00'}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDeposit();
              }}
              style={{
                flex: 1,
                padding: '8px 12px',
                backgroundColor: '#e5a922',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              + Deposit
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenWithdraw();
              }}
              style={{
                flex: 1,
                padding: '8px 12px',
                backgroundColor: '#262626',
                color: '#fff',
                border: '1px solid #444',
                borderRadius: '6px',
                fontWeight: 500,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* Menu Links */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
          {[
            { label: 'My Bets & History', onClick: () => { onClose(); onOpenMyBets(); } },
            { label: 'Account Statement', onClick: () => { onClose(); onOpenStatement(); } },
            { label: 'Deposit Funds', onClick: () => { onClose(); onOpenDeposit(); } },
            { label: 'Withdrawal Request', onClick: () => { onClose(); onOpenWithdraw(); } },
            { label: 'KYC Verification', onClick: () => alert('KYC Status: Verified ✔') },
            { label: 'Bank & UPI Details', onClick: () => alert('Bank Details: Active') }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={item.onClick}
              style={{
                padding: '14px 20px',
                borderBottom: '1px solid #222',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#ddd'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#222'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span>{item.label}</span>
              <span style={{ color: '#666', fontSize: '18px' }}>›</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div style={{ padding: '20px', borderTop: '1px solid #282828' }}>
          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#2a1a1c',
              color: '#ea3a4e',
              border: '1px solid #ea3a4e',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
