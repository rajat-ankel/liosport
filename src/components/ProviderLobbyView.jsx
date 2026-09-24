import React, { useState } from 'react';

const providerCatalogs = {
  xpg: {
    title: 'XPG LIVE DEALER',
    badge: 'LIVE VIP LOBBY',
    bannerGrad: 'linear-gradient(90deg, #1f142b, #33154a)',
    borderColor: '#5b2b80',
    games: [
      { name: 'XPG European Roulette', img: '/images/roulette/01.jpg', category: 'Roulette', dealer: 'Katarina', minBet: '₹50', maxBet: '₹200,000' },
      { name: 'XPG Live Blackjack VIP', img: '/images/blackjack/01.jpg', category: 'Blackjack', dealer: 'Nikola', minBet: '₹100', maxBet: '₹500,000' },
      { name: 'XPG Baccarat Super 6', img: '/images/baccarat/01.jpg', category: 'Baccarat', dealer: 'Mila', minBet: '₹50', maxBet: '₹300,000' },
      { name: 'XPG Dragon Tiger Live', img: '/images/baccarat/home/CricketWar.webp', category: 'Dragon Tiger', dealer: 'Anastasia', minBet: '₹20', maxBet: '₹150,000' },
      { name: 'XPG Wheel of Fortune', img: '/images/gameshows/crazy-time.jpg', category: 'Game Shows', dealer: 'Bojan', minBet: '₹10', maxBet: '₹100,000' },
      { name: 'XPG Andar Bahar Live', img: '/images/andarbahar/01.jpg', category: 'Andar Bahar', dealer: 'Pooja', minBet: '₹50', maxBet: '₹250,000' },
      { name: 'XPG Teen Patti 20-20', img: '/images/poker/Poker01.png', category: 'Teen Patti', dealer: 'Simran', minBet: '₹50', maxBet: '₹250,000' },
      { name: 'XPG Texas Hold\'em Bonus', img: '/images/poker/poker-1-day.webp', category: 'Poker', dealer: 'Dragan', minBet: '₹100', maxBet: '₹200,000' }
    ]
  },
  qtech: {
    title: 'QTECH GAMES LOBBY',
    badge: 'PREMIUM SLOTS & TABLES',
    bannerGrad: 'linear-gradient(90deg, #14242d, #163e48)',
    borderColor: '#1d6070',
    games: [
      { name: 'Big Bad Wolf Megaways', img: '/images/slots/redtiger/777Strike.webp', category: 'Quickspin', dealer: 'Slot', minBet: '₹10', maxBet: '₹10,000' },
      { name: 'Sakura Fortune II', img: '/images/vimplay/Sakura.jpg', category: 'Quickspin', dealer: 'Slot', minBet: '₹20', maxBet: '₹15,000' },
      { name: 'Valley of the Gods', img: '/images/slots/redtiger/AncientsBlessing.webp', category: 'Yggdrasil', dealer: 'Slot', minBet: '₹10', maxBet: '₹10,000' },
      { name: 'Golden Fishtank 2', img: '/images/vimplay/Aquakeno.jpg', category: 'Yggdrasil', dealer: 'Slot', minBet: '₹10', maxBet: '₹10,000' },
      { name: 'Hot Safari', img: '/images/slots/redtiger/DragonsFire.webp', category: 'Pragmatic', dealer: 'Slot', minBet: '₹25', maxBet: '₹20,000' },
      { name: 'Sticky Bandits Wild', img: '/images/slots/redtiger/TheGreatestTrainRobbery.webp', category: 'Quickspin', dealer: 'Slot', minBet: '₹15', maxBet: '₹12,000' },
      { name: 'Eastern Emeralds', img: '/images/slots/redtiger/FortuneHouse.webp', category: 'Quickspin', dealer: 'Slot', minBet: '₹20', maxBet: '₹15,000' },
      { name: 'Nolimit City Fire in Hole', img: '/images/vimplay/DiamondMine.jpg', category: 'Nolimit City', dealer: 'Slot', minBet: '₹20', maxBet: '₹20,000' }
    ]
  },
  supernowa: {
    title: 'SUPERNOWA CASINO',
    badge: 'INDIAN CLASSICS & LIVE CARDS',
    bannerGrad: 'linear-gradient(90deg, #2b1814, #44241b)',
    borderColor: '#7a3e2c',
    games: [
      { name: 'Supernowa Teen Patti', img: '/images/slots/mac88/20-20-teenpatti.webp', category: 'Teen Patti', dealer: 'Ananya', minBet: '₹50', maxBet: '₹200,000' },
      { name: 'Supernowa Andar Bahar', img: '/images/slots/mac88/andar-bahar.webp', category: 'Andar Bahar', dealer: 'Rhea', minBet: '₹50', maxBet: '₹300,000' },
      { name: '32 Cards Live Supernowa', img: '/images/slots/mac88/32-cards.webp', category: 'Card Games', dealer: 'Kavita', minBet: '₹50', maxBet: '₹150,000' },
      { name: 'Bollywood Casino Live', img: '/images/slots/mac88/bollywood-casino-b.webp', category: 'Bollywood', dealer: 'Deepika', minBet: '₹100', maxBet: '₹500,000' },
      { name: 'Worli Matka Supernowa', img: '/images/slots/mac88/worli-matka.webp', category: 'Matka', dealer: 'Aman', minBet: '₹10', maxBet: '₹50,000' },
      { name: 'Lucky 7 Supernowa', img: '/images/slots/mac88/lucky7.webp', category: 'Lucky 7', dealer: 'Priyanka', minBet: '₹50', maxBet: '₹200,000' },
      { name: 'Muflis Teen Patti Live', img: '/images/slots/mac88/muflis-teenpatti.webp', category: 'Teen Patti', dealer: 'Neha', minBet: '₹50', maxBet: '₹200,000' },
      { name: 'Dragon Tiger Supernowa', img: '/images/slots/mac88/dragon-tiger.webp', category: 'Dragon Tiger', dealer: 'Meera', minBet: '₹50', maxBet: '₹250,000' }
    ]
  }
};

export default function ProviderLobbyView({ providerKey, onGameClick, onBack }) {
  const [search, setSearch] = useState('');
  const info = providerCatalogs[providerKey] || providerCatalogs.xpg;

  const filtered = info.games.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="provider-lobby-container" style={{ backgroundColor: '#0d0d11', minHeight: '85vh', padding: '24px 0' }}>
      <div className="container-fluid" style={{ maxWidth: '1380px', margin: '0 auto' }}>
        {/* Banner Hero */}
        <div
          className="mb-4"
          style={{
            background: info.bannerGrad,
            borderRadius: '16px',
            border: `1px solid ${info.borderColor}`,
            padding: '28px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span
                style={{
                  backgroundColor: '#e1b066',
                  color: '#000',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}
              >
                {info.badge}
              </span>
              <span style={{ color: '#ccc', fontSize: '13px' }}>Instant Launch Lobby</span>
            </div>
            <h2 style={{ color: '#fff', fontWeight: 900, margin: '0 0 8px 0', fontSize: '32px' }}>
              {info.title}
            </h2>
            <p style={{ color: '#aaa', margin: 0, fontSize: '14px', maxWidth: '600px' }}>
              Experience authentic high-definition live games with certified fair odds and live interactive gameplay.
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

        {/* Search Bar */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div style={{ color: '#aaa', fontSize: '14px' }}>
            Showing <strong>{filtered.length}</strong> games
          </div>

          <div style={{ minWidth: '260px' }}>
            <input
              type="text"
              placeholder={`Search ${info.title}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#16161c',
                border: '1px solid #2a2a35',
                borderRadius: '25px',
                padding: '8px 18px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Games Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
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
                  provider: info.title,
                  slug: providerKey + '-' + game.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
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
              </div>

              <div style={{ padding: '14px' }}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h5 style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: '15px' }}>{game.name}</h5>
                </div>
                <div style={{ color: '#888', fontSize: '12px', marginBottom: '8px' }}>
                  {game.category} • <span style={{ color: '#bbb' }}>{game.dealer}</span>
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
