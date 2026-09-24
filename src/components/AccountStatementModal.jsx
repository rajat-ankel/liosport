import React from 'react';

export default function AccountStatementModal({ isOpen, onClose, balance }) {
  if (!isOpen) return null;

  const mockStatements = [
    { id: 'TXN-9021', date: '2026-09-24 14:15', desc: 'Lightning Roulette Win', type: 'CREDIT', amount: '+1,250.00', balance: balance },
    { id: 'TXN-9018', date: '2026-09-24 13:40', desc: 'Aviator Win', type: 'CREDIT', amount: '+480.00', balance: '23,750.00' },
    { id: 'TXN-9011', date: '2026-09-24 12:10', desc: 'Crazy Time Bet', type: 'DEBIT', amount: '-300.00', balance: '23,270.00' },
    { id: 'TXN-8995', date: '2026-09-24 10:00', desc: 'Instant UPI Deposit (PhonePe)', type: 'DEPOSIT', amount: '+5,000.00', balance: '23,570.00' },
    { id: 'TXN-8950', date: '2026-09-23 18:30', desc: 'Withdrawal to HDFC Bank', type: 'WITHDRAW', amount: '-2,000.00', balance: '18,570.00' }
  ];

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2050,
        padding: '20px'
      }}
    >
      <div
        className="statement-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          backgroundColor: '#1b1b1b',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '700px',
          padding: '28px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.85)',
          border: '1px solid #333',
          color: '#ffffff'
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-12px',
            right: '-12px',
            backgroundColor: '#ea3a4e',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            lineHeight: 1,
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}
        >
          &times;
        </button>

        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#e5a922', marginBottom: '8px' }}>
          Account Statement & Passbook
        </h3>
        <div style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>
          Current Ledger Balance: <strong style={{ color: '#e5a922' }}>₹{balance}</strong>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333', color: '#888' }}>
                <th style={{ padding: '10px 8px' }}>Txn ID</th>
                <th style={{ padding: '10px 8px' }}>Date & Time</th>
                <th style={{ padding: '10px 8px' }}>Description</th>
                <th style={{ padding: '10px 8px' }}>Amount</th>
                <th style={{ padding: '10px 8px' }}>Ledger Balance</th>
              </tr>
            </thead>
            <tbody>
              {mockStatements.map((txn) => {
                const isPositive = txn.amount.startsWith('+');
                return (
                  <tr key={txn.id} style={{ borderBottom: '1px solid #242424' }}>
                    <td style={{ padding: '12px 8px', color: '#aaa' }}>{txn.id}</td>
                    <td style={{ padding: '12px 8px', color: '#777' }}>{txn.date}</td>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>{txn.desc}</td>
                    <td style={{ padding: '12px 8px', color: isPositive ? '#28a745' : '#ea3a4e', fontWeight: 600 }}>
                      ₹{txn.amount}
                    </td>
                    <td style={{ padding: '12px 8px', color: '#fff' }}>₹{txn.balance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
