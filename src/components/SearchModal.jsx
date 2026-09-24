import React, { useState, useMemo } from 'react';
import { gamesByCategory } from '../data/siteData';

export default function SearchModal({ isOpen, onClose, onSelectGame }) {
  const [searchTerm, setSearchTerm] = useState('');

  const allGames = useMemo(() => {
    const list = [];
    Object.values(gamesByCategory).forEach((games) => {
      games.forEach((g) => {
        if (!list.some((existing) => existing.name === g.name)) {
          list.push(g);
        }
      });
    });
    return list;
  }, []);

  const filteredGames = useMemo(() => {
    if (!searchTerm.trim()) return allGames.slice(0, 16);
    const term = searchTerm.toLowerCase();
    return allGames.filter((g) => g.name.toLowerCase().includes(term));
  }, [searchTerm, allGames]);

  if (!isOpen) return null;

  return (
    <div
      className="search-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '60px',
        zIndex: 2100
      }}
    >
      <div
        className="search-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#1b1b1b',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '620px',
          padding: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.9)',
          border: '1px solid #333',
          color: '#ffffff',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 500, color: '#ccc' }}>
            Search Games
          </h4>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#888',
              fontSize: '22px',
              cursor: 'pointer',
              padding: '0 5px'
            }}
          >
            &times;
          </button>
        </div>

        {/* Input */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            autoFocus
            placeholder="Search your favourite games here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: '#121212',
              border: '1px solid #444',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Results */}
        <div
          style={{
            overflowY: 'auto',
            flex: 1,
            paddingRight: '5px'
          }}
        >
          {filteredGames.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666', padding: '30px 0' }}>
              No games found matching "{searchTerm}"
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '12px'
              }}
            >
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  onClick={() => {
                    onSelectGame(game);
                    onClose();
                  }}
                  style={{
                    backgroundColor: '#111',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                    border: '1px solid #222'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    style={{
                      width: '100%',
                      aspectRatio: '16/10',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.src = '/Favicon.webp';
                    }}
                  />
                  <div
                    style={{
                      padding: '6px 8px',
                      fontSize: '11px',
                      color: '#ddd',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textAlign: 'center'
                    }}
                  >
                    {game.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
