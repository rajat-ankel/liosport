import React, { useState } from 'react';

const evolutionGames = [
  {
    name: 'Crazy Time',
    img: '/images/gameshows/crazy-time.jpg',
    category: 'Game Shows',
    dealer: 'Elena S.',
    players: '4,821',
    minBet: '₹50',
    maxBet: '₹500,000'
  },
  {
    name: 'Lightning Roulette',
    img: '/images/roulette/lightning-roulette.jpg',
    category: 'Roulette',
    dealer: 'Marcus V.',
    players: '3,140',
    minBet: '₹20',
    maxBet: '₹200,000'
  },
  {
    name: 'Super Sic Bo',
    img: '/images/dice/casino058.png',
    category: 'Dice',
    dealer: 'Anya K.',
    players: '1,280',
    minBet: '₹50',
    maxBet: '₹100,000'
  },
  {
    name: 'Auto-Roulette',
    img: '/images/roulette/auto-roulette.jpg',
    category: 'Roulette',
    dealer: 'Automated 24/7',
    players: '2,900',
    minBet: '₹10',
    maxBet: '₹250,000'
  },
  {
    name: 'Speed Baccarat A',
    img: '/images/baccarat/casino034.png',
    category: 'Baccarat',
    dealer: 'Sophia T.',
    players: '1,950',
    minBet: '₹100',
    maxBet: '₹1,000,000'
  },
  {
    name: 'Mega Ball 100x',
    img: '/images/dice/casino058.png',
    category: 'Game Shows',
    dealer: 'Liam R.',
    players: '2,110',
    minBet: '₹10',
    maxBet: '₹100,000'
  },
  {
    name: 'Dragon Tiger Live',
    img: '/images/baccarat/01.jpg',
    category: 'Baccarat',
    dealer: 'Chloe N.',
    players: '1,640',
    minBet: '₹50',
    maxBet: '₹500,000'
  },
  {
    name: 'Infinite Blackjack',
    img: '/images/blackjack/01.jpg',
    category: 'Blackjack',
    dealer: 'David H.',
    players: '5,420',
    minBet: '₹100',
    maxBet: '₹250,000'
  },
  {
    name: 'Monopoly Live',
    img: '/images/gameshows/monopoly-live.jpg',
    category: 'Game Shows',
    dealer: 'Sarah M.',
    players: '3,780',
    minBet: '₹50',
    maxBet: '₹500,000'
  },
  {
    name: 'Lightning Dice',
    img: '/images/dice/casino058.png',
    category: 'Dice',
    dealer: 'Alex J.',
    players: '1,430',
    minBet: '₹20',
    maxBet: '₹150,000'
  },
  {
    name: 'Double Ball Roulette',
    img: '/images/roulette/double-ball-roulette.jpg',
    category: 'Roulette',
    dealer: 'Viktor P.',
    players: '980',
    minBet: '₹25',
    maxBet: '₹150,000'
  },
  {
    name: 'Funky Time',
    img: '/images/gameshows/funky-time.jpg',
    category: 'Game Shows',
    dealer: 'Oliver K.',
    players: '2,350',
    minBet: '₹50',
    maxBet: '₹500,000'
  }
];

export default function EvolutionView({ onGameClick, onBack }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Roulette', 'Blackjack', 'Baccarat', 'Game Shows', 'Dice'];

  const filtered = filter === 'All'
    ? evolutionGames
    : evolutionGames.filter((g) => g.category === filter);

  return (
    <div className="evolution-view-container" style={{ backgroundColor: '#0d0d10', minHeight: '85vh', padding: '24px 0' }}>
      <div className="container-fluid" style={{ maxWidth: '1380px', margin: '0 auto' }}>
        {/* Banner Hero */}
        <div
          className="evolution-banner mb-4"
          style={{
            background: 'linear-gradient(90deg, #1b1626, #2d1836)',
            borderRadius: '16px',
            border: '1px solid #4a275a',
            padding: '28px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span
                style={{
                  background: '#ff2d55',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  letterSpacing: '1px'
                }}
              >
                OFFICIAL PARTNER
              </span>
              <span style={{ color: '#aaa', fontSize: '13px' }}>Live Dealer VIP Tables</span>
            </div>
            <h2 style={{ color: '#fff', fontWeight: 900, margin: '0 0 8px 0', fontSize: '32px' }}>
              EVOLUTION GAMING
            </h2>
            <p style={{ color: '#bbb', margin: 0, fontSize: '14px', maxWidth: '600px' }}>
              World-class live roulette, blackjack, baccarat, and game shows broadcasted directly from state-of-the-art European studios in crystal 4K Ultra HD.
            </p>
          </div>

          <button
            onClick={onBack}
            style={{
              background: '#15151a',
              border: '1px solid #444',
              color: '#e1b066',
              fontWeight: 700,
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            ← Back to Lobby
          </button>
        </div>

        {/* Filter Pills */}
        <div className="d-flex gap-2 overflow-auto mb-4 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: filter === cat ? 'linear-gradient(90deg, #d4a757, #f7d688)' : '#1a1a20',
                color: filter === cat ? '#000' : '#ccc',
                border: 'none',
                fontWeight: filter === cat ? 800 : 500,
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: filter === cat ? '0 4px 15px rgba(212, 167, 87, 0.4)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tables Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px'
          }}
        >
          {filtered.map((game, idx) => (
            <div
              key={idx}
              onClick={() =>
                onGameClick({
                  name: game.name,
                  img: game.img,
                  provider: 'Evolution Gaming',
                  slug: 'evolution-' + game.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
                })
              }
              style={{
                backgroundColor: '#16161c',
                borderRadius: '14px',
                border: '1px solid #2a2a35',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
                boxShadow: '0 6px 16px rgba(0,0,0,0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = '#d4a757';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#2a2a35';
              }}
            >
              {/* Image holder */}
              <div style={{ position: 'relative', width: '100%', paddingTop: '65%', overflow: 'hidden' }}>
                <img
                  src={game.img}
                  alt={game.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src = '/Favicon.webp';
                  }}
                />
                {/* Live Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(4px)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#28a745',
                      boxShadow: '0 0 6px #28a745'
                    }}
                  />
                  <span style={{ color: '#fff', fontSize: '11px', fontWeight: 800 }}>LIVE</span>
                </div>

                {/* Players badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    color: '#ddd',
                    fontSize: '11px',
                    fontWeight: 600
                  }}
                >
                  👤 {game.players}
                </div>
              </div>

              {/* Table Info */}
              <div style={{ padding: '14px' }}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h5 style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: '16px' }}>{game.name}</h5>
                  <span style={{ color: '#d4a757', fontSize: '12px', fontWeight: 600 }}>{game.category}</span>
                </div>
                <div style={{ color: '#888', fontSize: '12px', marginBottom: '8px' }}>
                  Dealer: <span style={{ color: '#bbb' }}>{game.dealer}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid #222',
                    fontSize: '12px',
                    color: '#aaa'
                  }}
                >
                  <span>Min: <strong style={{ color: '#fff' }}>{game.minBet}</strong></span>
                  <span>Max: <strong style={{ color: '#fff' }}>{game.maxBet}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
