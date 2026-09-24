import React from 'react';

export default function MyBetsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const mockBets = [
    { id: 'BET-89412', game: 'Lightning Roulette', time: 'Today 14:15', amount: 500, winLoss: '+1,250.00', status: 'WON' },
    { id: 'BET-89408', game: 'Aviator', time: 'Today 13:40', amount: 200, winLoss: '+480.00', status: 'WON' },
    { id: 'BET-89392', game: 'Crazy Time', time: 'Today 12:10', amount: 300, winLoss: '-300.00', status: 'LOST' },
    { id: 'BET-89350', game: 'Teen Patti', time: 'Yesterday 22:30', amount: 1000, winLoss: '+1,950.00', status: 'WON' },
    { id: 'BET-89211', game: 'Auto Roulette Live', time: 'Yesterday 19:05', amount: 400, winLoss: '-400.00', status: 'LOST' }
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
        className="mybets-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          backgroundColor: '#1b1b1b',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '650px',
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

        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#e5a922', marginBottom: '20px' }}>
          My Bets History
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333', color: '#888' }}>
                <th style={{ padding: '10px 8px' }}>Bet ID</th>
                <th style={{ padding: '10px 8px' }}>Game</th>
                <th style={{ padding: '10px 8px' }}>Time</th>
                <th style={{ padding: '10px 8px' }}>Stake</th>
                <th style={{ padding: '10px 8px' }}>Win/Loss</th>
                <th style={{ padding: '10px 8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBets.map((bet) => (
                <tr key={bet.id} style={{ borderBottom: '1px solid #242424' }}>
                  <td style={{ padding: '12px 8px', color: '#aaa' }}>{bet.id}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 500 }}>{bet.game}</td>
                  <td style={{ padding: '12px 8px', color: '#777' }}>{bet.time}</td>
                  <td style={{ padding: '12px 8px' }}>₹{bet.amount}</td>
                  <td style={{ padding: '12px 8px', color: bet.status === 'WON' ? '#28a745' : '#ea3a4e', fontWeight: 600 }}>
                    {bet.winLoss}
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        backgroundColor: bet.status === 'WON' ? 'rgba(40,167,69,0.2)' : 'rgba(234,58,78,0.2)',
                        color: bet.status === 'WON' ? '#28a745' : '#ea3a4e'
                      }}
                    >
                      {bet.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
