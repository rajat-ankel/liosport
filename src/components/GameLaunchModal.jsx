import React from 'react';

export default function GameLaunchModal({ game, isOpen, onClose }) {
  if (!isOpen || !game) return null;

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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2200,
        padding: '20px'
      }}
    >
      <div
        className="game-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          backgroundColor: '#161616',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '720px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.9)',
          border: '1px solid #333',
          color: '#ffffff'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            backgroundColor: '#1f1f1f',
            borderBottom: '1px solid #292929'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#e5a922', fontWeight: 'bold', fontSize: '18px' }}>
              {game.name}
            </span>
            <span
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                backgroundColor: 'rgba(229,169,34,0.2)',
                color: '#e5a922',
                padding: '2px 8px',
                borderRadius: '4px'
              }}
            >
              {game.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#aaa',
              fontSize: '24px',
              cursor: 'pointer',
              lineHeight: 1
            }}
          >
            &times;
          </button>
        </div>

        {/* Game Stage / Visual */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={game.image || game.img || game.imgUrl}
            alt={game.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.4
            }}
            onError={(e) => {
              e.target.src = '/Favicon.webp';
            }}
          />

          <div
            style={{
              position: 'absolute',
              textAlign: 'center',
              zIndex: 2,
              padding: '20px'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#e5a922',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 0 20px rgba(229,169,34,0.6)'
              }}
            >
              <span style={{ fontSize: '26px', color: '#000', marginLeft: '4px' }}>▶</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px', color: '#fff' }}>
              {game.name}
            </h2>
            <p style={{ color: '#aaa', fontSize: '14px', margin: '0 0 20px' }}>
              Connected to live dealer streaming server
            </p>
            <button
              type="button"
              onClick={() => alert(`Starting live stream for ${game.name}...`)}
              style={{
                backgroundColor: '#e5a922',
                color: '#000',
                border: 'none',
                fontWeight: 'bold',
                padding: '12px 32px',
                borderRadius: '8px',
                fontSize: '15px',
                cursor: 'pointer'
              }}
            >
              PLAY NOW
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: '#1b1b1b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            color: '#888'
          }}
        >
          <span>Server Status: <strong style={{ color: '#28a745' }}>Online</strong></span>
          <span>100% Provably Fair & Certified RNG</span>
        </div>
      </div>
    </div>
  );
}
