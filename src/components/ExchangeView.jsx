import React, { useState } from 'react';

const cricketMatches = [
  {
    id: 'm1',
    tournament: 'ICC Champions Trophy 2026',
    team1: 'India',
    team2: 'Australia',
    status: 'IN-PLAY',
    score: 'IND 218/3 (17.4 ov) | AUS yet to bat',
    runner1: { name: 'India', back: '1.45', backSize: '2.5M', lay: '1.46', laySize: '1.8M' },
    runner2: { name: 'Australia', back: '3.15', backSize: '890k', lay: '3.20', laySize: '650k' }
  },
  {
    id: 'm2',
    tournament: 'Indian Premier League (IPL)',
    team1: 'Chennai Super Kings',
    team2: 'Mumbai Indians',
    status: 'IN-PLAY',
    score: 'CSK 175/6 (20 ov) | MI 88/2 (9.1 ov)',
    runner1: { name: 'CSK', back: '2.10', backSize: '1.4M', lay: '2.12', laySize: '1.1M' },
    runner2: { name: 'MI', back: '1.82', backSize: '3.2M', lay: '1.84', laySize: '2.0M' }
  },
  {
    id: 'm3',
    tournament: 'Big Bash League',
    team1: 'Perth Scorchers',
    team2: 'Sydney Sixers',
    status: 'STARTING IN 45 MIN',
    score: 'Match Starts 19:30 IST',
    runner1: { name: 'Scorchers', back: '1.92', backSize: '750k', lay: '1.94', laySize: '510k' },
    runner2: { name: 'Sixers', back: '1.98', backSize: '820k', lay: '2.00', laySize: '600k' }
  },
  {
    id: 'm4',
    tournament: 'International T20 Series',
    team1: 'England',
    team2: 'South Africa',
    status: 'STARTING TODAY',
    score: 'Match Starts 20:00 IST',
    runner1: { name: 'England', back: '1.68', backSize: '1.1M', lay: '1.70', laySize: '850k' },
    runner2: { name: 'South Africa', back: '2.34', backSize: '620k', lay: '2.38', laySize: '410k' }
  }
];

const agseMatches = [
  {
    id: 'ag1',
    tournament: 'AGSE Premier Exchange - IPL 2026',
    team1: 'Royal Challengers Bengaluru',
    team2: 'Kolkata Knight Riders',
    status: 'IN-PLAY',
    score: 'RCB 196/4 (18.1 ov) | KKR yet to bat',
    runner1: { name: 'RCB', back: '1.58', backSize: '4.2M', lay: '1.60', laySize: '3.1M' },
    runner2: { name: 'KKR', back: '2.70', backSize: '1.8M', lay: '2.74', laySize: '1.2M' }
  },
  {
    id: 'ag2',
    tournament: 'AGSE Champions League Football',
    team1: 'Real Madrid',
    team2: 'Manchester City',
    status: 'IN-PLAY',
    score: 'Real Madrid 2 - 1 Man City (68\')',
    runner1: { name: 'Real Madrid', back: '1.72', backSize: '5.5M', lay: '1.74', laySize: '3.8M' },
    runner2: { name: 'Man City', back: '4.80', backSize: '1.2M', lay: '4.90', laySize: '890k' }
  },
  {
    id: 'ag3',
    tournament: 'AGSE Grand Slam Tennis',
    team1: 'Carlos Alcaraz',
    team2: 'Jannik Sinner',
    status: 'IN-PLAY',
    score: 'Set 2: 4-3 (Alcaraz leads 1-0)',
    runner1: { name: 'Alcaraz', back: '1.52', backSize: '2.1M', lay: '1.54', laySize: '1.5M' },
    runner2: { name: 'Sinner', back: '2.84', backSize: '950k', lay: '2.90', laySize: '710k' }
  },
  {
    id: 'ag4',
    tournament: 'AGSE Asia Cup T20',
    team1: 'India',
    team2: 'Pakistan',
    status: 'TODAY 19:30',
    score: 'Match Starts in 2h 15m',
    runner1: { name: 'India', back: '1.38', backSize: '9.8M', lay: '1.40', laySize: '7.2M' },
    runner2: { name: 'Pakistan', back: '3.45', backSize: '3.4M', lay: '3.50', laySize: '2.1M' }
  }
];

export default function ExchangeView({ user, isAGSE = false, onDepositSuccess, onBack, onOpenLogin }) {
  const [selectedSport, setSelectedSport] = useState('Cricket');
  const [activeBet, setActiveBet] = useState(null);
  const [stake, setStake] = useState(500);
  const [betSuccessMsg, setBetSuccessMsg] = useState('');

  const sports = [
    { name: 'Cricket', icon: '🏏' },
    { name: 'Football', icon: '⚽' },
    { name: 'Tennis', icon: '🎾' },
    { name: 'Horse Racing', icon: '🏇' }
  ];

  const currentMatches = isAGSE ? agseMatches : cricketMatches;

  const handleOddsClick = (match, runnerName, type, odds) => {
    setActiveBet({
      matchTitle: `${match.team1} vs ${match.team2}`,
      runnerName,
      type,
      odds: parseFloat(odds),
      matchId: match.id
    });
    setBetSuccessMsg('');
  };

  const handlePlaceBet = () => {
    if (!activeBet) return;
    if (!user) {
      if (onOpenLogin) onOpenLogin();
      return;
    }

    const currentBal = parseFloat((user.balance || '0').replace(/,/g, '')) || 0;
    if (currentBal < stake) {
      alert('Insufficient balance. Please deposit chips to place bets.');
      return;
    }

    if (onDepositSuccess) {
      onDepositSuccess(-stake);
    }

    setBetSuccessMsg(`Bet Placed Successfully: ₹${stake} on ${activeBet.runnerName} @ ${activeBet.odds}!`);
    setTimeout(() => {
      setActiveBet(null);
      setBetSuccessMsg('');
    }, 3500);
  };

  return (
    <div className="exchange-view-container" style={{ backgroundColor: '#0e1014', minHeight: '85vh', padding: '20px 0' }}>
      <div className="container-fluid" style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Top Header / Sports Bar */}
        <div
          className="d-flex justify-content-between align-items-center mb-3 pb-3 flex-wrap gap-2"
          style={{ borderBottom: '1px solid #1f232d' }}
        >
          <div className="d-flex align-items-center gap-3">
            <span
              style={{
                backgroundColor: isAGSE ? '#ff4757' : '#e1b066',
                color: isAGSE ? '#fff' : '#000',
                padding: '4px 10px',
                borderRadius: '6px',
                fontWeight: 900,
                fontSize: '13px',
                letterSpacing: '0.5px'
              }}
            >
              {isAGSE ? 'AGSE NEW EXCHANGE' : 'BETTING EXCHANGE'}
            </span>

            <div className="d-flex gap-2">
              {sports.map((sp) => (
                <button
                  key={sp.name}
                  onClick={() => setSelectedSport(sp.name)}
                  style={{
                    background: selectedSport === sp.name ? 'linear-gradient(90deg, #d4a757, #f7d688)' : '#161922',
                    color: selectedSport === sp.name ? '#000' : '#ccc',
                    fontWeight: selectedSport === sp.name ? 800 : 600,
                    border: '1px solid #282d3c',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{sp.icon}</span>
                  <span>{sp.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onBack}
            style={{
              background: '#161922',
              border: '1px solid #333',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            ← Back to Casino
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="row g-3">
          {/* Matches List Column */}
          <div className={activeBet ? 'col-12 col-lg-8' : 'col-12'}>
            <div
              style={{
                backgroundColor: '#141720',
                borderRadius: '12px',
                border: '1px solid #242938',
                overflow: 'hidden'
              }}
            >
              {/* Header row */}
              <div
                className="d-flex align-items-center justify-content-between px-3 py-2"
                style={{ backgroundColor: '#10121a', borderBottom: '1px solid #242938' }}
              >
                <div style={{ color: '#e1b066', fontWeight: 800, fontSize: '15px' }}>
                  {isAGSE ? 'AGSE LIVE ODDS' : 'MATCH ODDS'} - {selectedSport.toUpperCase()}
                </div>
                <div className="d-flex gap-4 d-none d-md-flex" style={{ marginRight: '40px' }}>
                  <div style={{ width: '130px', textAlign: 'center', color: '#72bbef', fontWeight: 700, fontSize: '13px' }}>
                    1 (BACK / LAY)
                  </div>
                  <div style={{ width: '130px', textAlign: 'center', color: '#faa9ba', fontWeight: 700, fontSize: '13px' }}>
                    2 (BACK / LAY)
                  </div>
                </div>
              </div>

              {/* Match Items */}
              {currentMatches.map((m) => (
                <div
                  key={m.id}
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #1f232d',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '15px'
                  }}
                >
                  {/* Left: Match Info */}
                  <div style={{ flex: '1 1 300px' }}>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span
                        style={{
                          backgroundColor: m.status.includes('IN-PLAY') ? '#28a745' : '#495057',
                          color: '#fff',
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '3px'
                        }}
                      >
                        {m.status}
                      </span>
                      <span style={{ color: '#888', fontSize: '12px' }}>{m.tournament}</span>
                    </div>

                    <div style={{ color: '#fff', fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>
                      {m.team1} <span style={{ color: '#e1b066', fontSize: '13px' }}>vs</span> {m.team2}
                    </div>

                    <div style={{ color: '#a0aab8', fontSize: '13px' }}>{m.score}</div>
                  </div>

                  {/* Right: Odds Buttons */}
                  <div className="d-flex gap-3 align-items-center">
                    {/* Runner 1 Odds */}
                    <div className="d-flex gap-1">
                      <button
                        className="odds-btn back-btn"
                        onClick={() => handleOddsClick(m, m.runner1.name, 'BACK', m.runner1.back)}
                        style={{
                          backgroundColor: '#72bbef',
                          border: 'none',
                          borderRadius: '6px',
                          width: '62px',
                          height: '46px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000',
                          lineHeight: '1.1'
                        }}
                      >
                        <strong style={{ fontSize: '14px' }}>{m.runner1.back}</strong>
                        <span style={{ fontSize: '10px', opacity: 0.8 }}>{m.runner1.backSize}</span>
                      </button>

                      <button
                        className="odds-btn lay-btn"
                        onClick={() => handleOddsClick(m, m.runner1.name, 'LAY', m.runner1.lay)}
                        style={{
                          backgroundColor: '#faa9ba',
                          border: 'none',
                          borderRadius: '6px',
                          width: '62px',
                          height: '46px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000',
                          lineHeight: '1.1'
                        }}
                      >
                        <strong style={{ fontSize: '14px' }}>{m.runner1.lay}</strong>
                        <span style={{ fontSize: '10px', opacity: 0.8 }}>{m.runner1.laySize}</span>
                      </button>
                    </div>

                    {/* Runner 2 Odds */}
                    <div className="d-flex gap-1">
                      <button
                        className="odds-btn back-btn"
                        onClick={() => handleOddsClick(m, m.runner2.name, 'BACK', m.runner2.back)}
                        style={{
                          backgroundColor: '#72bbef',
                          border: 'none',
                          borderRadius: '6px',
                          width: '62px',
                          height: '46px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000',
                          lineHeight: '1.1'
                        }}
                      >
                        <strong style={{ fontSize: '14px' }}>{m.runner2.back}</strong>
                        <span style={{ fontSize: '10px', opacity: 0.8 }}>{m.runner2.backSize}</span>
                      </button>

                      <button
                        className="odds-btn lay-btn"
                        onClick={() => handleOddsClick(m, m.runner2.name, 'LAY', m.runner2.lay)}
                        style={{
                          backgroundColor: '#faa9ba',
                          border: 'none',
                          borderRadius: '6px',
                          width: '62px',
                          height: '46px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000',
                          lineHeight: '1.1'
                        }}
                      >
                        <strong style={{ fontSize: '14px' }}>{m.runner2.lay}</strong>
                        <span style={{ fontSize: '10px', opacity: 0.8 }}>{m.runner2.laySize}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Bet Slip Column */}
          {activeBet && (
            <div className="col-12 col-lg-4">
              <div
                style={{
                  backgroundColor: '#141720',
                  borderRadius: '12px',
                  border: '1px solid #242938',
                  padding: '20px',
                  position: 'sticky',
                  top: '90px'
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 style={{ margin: 0, color: '#fff', fontWeight: 700 }}>BET SLIP</h5>
                  <button
                    onClick={() => setActiveBet(null)}
                    style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '18px' }}
                  >
                    ✕
                  </button>
                </div>

                <div
                  style={{
                    backgroundColor: activeBet.type === 'BACK' ? 'rgba(114, 187, 239, 0.15)' : 'rgba(250, 169, 186, 0.15)',
                    border: `1px solid ${activeBet.type === 'BACK' ? '#72bbef' : '#faa9ba'}`,
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '16px'
                  }}
                >
                  <div className="d-flex justify-content-between mb-1">
                    <span
                      style={{
                        backgroundColor: activeBet.type === 'BACK' ? '#72bbef' : '#faa9ba',
                        color: '#000',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: '3px'
                      }}
                    >
                      {activeBet.type}
                    </span>
                    <strong style={{ color: '#fff', fontSize: '16px' }}>{activeBet.odds}</strong>
                  </div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>{activeBet.runnerName}</div>
                  <div style={{ color: '#888', fontSize: '12px' }}>{activeBet.matchTitle}</div>
                </div>

                {/* Stake Input */}
                <div className="mb-3">
                  <label style={{ color: '#aaa', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                    Stake Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={stake}
                    onChange={(e) => setStake(Number(e.target.value))}
                    style={{
                      width: '100%',
                      backgroundColor: '#0c0d12',
                      border: '1px solid #2b3040',
                      borderRadius: '8px',
                      color: '#fff',
                      padding: '10px 14px',
                      fontSize: '16px',
                      fontWeight: 700,
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Quick Stake Chips */}
                <div className="d-flex gap-2 mb-3">
                  {[100, 500, 1000, 5000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setStake(amt)}
                      style={{
                        flex: 1,
                        backgroundColor: '#1d212c',
                        border: '1px solid #2b3040',
                        color: '#fff',
                        borderRadius: '6px',
                        padding: '6px 0',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      +{amt}
                    </button>
                  ))}
                </div>

                {/* Profit calculation */}
                <div
                  className="d-flex justify-content-between p-2 mb-3"
                  style={{ backgroundColor: '#0d0f14', borderRadius: '6px', fontSize: '14px' }}
                >
                  <span style={{ color: '#888' }}>Potential Profit:</span>
                  <strong style={{ color: '#28a745' }}>₹{(stake * (activeBet.odds - 1)).toFixed(2)}</strong>
                </div>

                {/* Place Bet Button */}
                <button
                  className="btn-place-bet"
                  onClick={handlePlaceBet}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#e1b066',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(225, 176, 102, 0.4)'
                  }}
                >
                  PLACE BET
                </button>

                {betSuccessMsg && (
                  <div
                    style={{
                      marginTop: '12px',
                      padding: '10px',
                      backgroundColor: '#1e382b',
                      color: '#28a745',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      textAlign: 'center'
                    }}
                  >
                    {betSuccessMsg}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
