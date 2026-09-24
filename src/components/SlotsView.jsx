import React, { useState } from 'react';
import { slotsTabs, slotsGames } from '../data/slotsData';

export default function SlotsView({ onGameClick, onBack }) {
  const [activeTab, setActiveTab] = useState('netent');
  const [searchQuery, setSearchQuery] = useState('');

  const currentList = slotsGames[activeTab] || [];
  const filteredGames = currentList.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="slots-page-wrapper">
      <main className="main">
        <div className="container-fluid">
          <div className="casinoProvidersGames">
            {/* Top Bar with Tabs and Search */}
            <div
              className="slots-header-bar d-flex justify-content-between align-items-center flex-wrap"
              style={{
                padding: '20px 0 10px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '20px'
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <h3 style={{ margin: 0, color: '#e1b066', fontWeight: 800 }}>SLOTS LOBBY</h3>
                <span
                  style={{
                    backgroundColor: '#1f1f1f',
                    color: '#888',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '13px'
                  }}
                >
                  {filteredGames.length} Games
                </span>
              </div>

              {/* Search input */}
              <div className="slots-search-box" style={{ position: 'relative', minWidth: '260px' }}>
                <input
                  type="text"
                  placeholder="Search slot games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#181818',
                    border: '1px solid #333',
                    borderRadius: '25px',
                    padding: '8px 16px 8px 38px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#888',
                    width: '18px',
                    height: '18px'
                  }}
                >
                  <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
                </svg>
              </div>
            </div>

            {/* Provider Tabs */}
            <ul className="tabs" style={{ display: 'flex', gap: '10px', listStyle: 'none', padding: 0, margin: '0 0 25px 0', overflowX: 'auto' }}>
              {slotsTabs.map((tab, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setSearchQuery('');
                  }}
                  style={{ flexShrink: 0 }}
                >
                  <button
                    type="button"
                    className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                    style={{
                      background: activeTab === tab.key ? 'linear-gradient(90deg, #d4a757, #f7d688)' : '#1a1a1a',
                      color: activeTab === tab.key ? '#000' : '#bbb',
                      fontWeight: activeTab === tab.key ? 700 : 500,
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 22px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                      boxShadow: activeTab === tab.key ? '0 4px 15px rgba(212, 167, 87, 0.4)' : 'none'
                    }}
                  >
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Games Grid */}
            <ul
              className="games"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '16px',
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}
            >
              {filteredGames.map((game, idx) => (
                <li
                  key={idx}
                  style={{
                    backgroundColor: '#161616',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #252525',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = '#d4a757';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#252525';
                  }}
                  onClick={() =>
                    onGameClick({
                      name: game.name,
                      img: game.imgUrl,
                      provider: game.provider,
                      slug: game.redirectUrl.replace('/casino/', '')
                    })
                  }
                >
                  <a
                    className="play-button"
                    href={game.redirectUrl}
                    onClick={(e) => e.preventDefault()}
                    style={{ display: 'block', textDecoration: 'none', position: 'relative' }}
                  >
                    <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden' }}>
                      <img
                        src={game.imgUrl}
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
                        className="play-btn"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(0,0,0,0.4)',
                          opacity: 0,
                          transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                      >
                        <img
                          src="/images/play-btn.png"
                          alt="play"
                          style={{ width: '48px', height: '48px' }}
                          onError={(e) => {
                            e.target.src = '/Favicon.webp';
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="name"
                      style={{
                        padding: '10px 8px',
                        color: '#ffffff',
                        fontSize: '13px',
                        fontWeight: 600,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {game.name}
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            {filteredGames.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
                <p style={{ fontSize: '18px', margin: 0 }}>No slot games found matching &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
