import React, { useState, useEffect, useRef } from 'react';

export default function AeroView({ user, onDepositSuccess, onBack }) {
  // Game states: 'WAITING' (betting open, 5s countdown), 'FLYING' (plane flying, multiplier climbs), 'CRASHED' (crashed)
  const [gameState, setGameState] = useState('WAITING');
  const [multiplier, setMultiplier] = useState(1.0);
  const [countdown, setCountdown] = useState(5);
  const [history, setHistory] = useState([
    { mult: 1.84, id: 1 },
    { mult: 2.45, id: 2 },
    { mult: 1.12, id: 3 },
    { mult: 14.82, id: 4 },
    { mult: 3.10, id: 5 },
    { mult: 1.05, id: 6 },
    { mult: 5.67, id: 7 },
    { mult: 1.42, id: 8 }
  ]);

  // Bet 1 state
  const [bet1Amount, setBet1Amount] = useState(100);
  const [hasBet1, setHasBet1] = useState(false);
  const [cashedOut1, setCashedOut1] = useState(false);
  const [cashout1Amount, setCashout1Amount] = useState(0);

  // Bet 2 state
  const [bet2Amount, setBet2Amount] = useState(200);
  const [hasBet2, setHasBet2] = useState(false);
  const [cashedOut2, setCashedOut2] = useState(false);
  const [cashout2Amount, setCashout2Amount] = useState(0);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const flightStartTimeRef = useRef(0);
  const crashPointRef = useRef(2.5);

  // Run game loop
  useEffect(() => {
    let timer;
    if (gameState === 'WAITING') {
      let count = 5;
      setCountdown(count);
      setMultiplier(1.0);
      setCashedOut1(false);
      setCashedOut2(false);
      setCashout1Amount(0);
      setCashout2Amount(0);

      timer = setInterval(() => {
        count -= 1;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(timer);
          // Determine next crash point with realistic distribution
          const rand = Math.random();
          let target;
          if (rand < 0.1) target = 1.05 + Math.random() * 0.2; // 10% instant crash
          else if (rand < 0.6) target = 1.3 + Math.random() * 1.5; // 50% 1.3 - 2.8x
          else if (rand < 0.85) target = 2.8 + Math.random() * 4.0; // 25% 2.8 - 6.8x
          else target = 7.0 + Math.random() * 15.0; // 15% big flight

          crashPointRef.current = parseFloat(target.toFixed(2));
          flightStartTimeRef.current = performance.now();
          setGameState('FLYING');
        }
      }, 1000);
    } else if (gameState === 'FLYING') {
      const updateFlight = () => {
        const elapsed = (performance.now() - flightStartTimeRef.current) / 1000;
        // Exponential curve
        const currentM = Math.pow(1.08, elapsed * 5) * (1 + elapsed * 0.15);
        const formatted = parseFloat(currentM.toFixed(2));

        if (formatted >= crashPointRef.current) {
          // Crash!
          setMultiplier(crashPointRef.current);
          setGameState('CRASHED');
          setHistory((prev) => [{ mult: crashPointRef.current, id: Date.now() }, ...prev.slice(0, 15)]);

          setTimeout(() => {
            setGameState('WAITING');
            setHasBet1(false);
            setHasBet2(false);
          }, 3000);
        } else {
          setMultiplier(formatted);
          animFrameRef.current = requestAnimationFrame(updateFlight);
        }
      };

      animFrameRef.current = requestAnimationFrame(updateFlight);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState]);

  // Render Flight Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (gameState === 'FLYING' || gameState === 'CRASHED') {
      // Flight trajectory curve
      const progress = Math.min(1, (multiplier - 1) / (crashPointRef.current || 5));
      const endX = 40 + (width - 120) * Math.min(0.9, progress * 0.9 + 0.1);
      const endY = height - 40 - (height - 120) * Math.pow(progress, 0.8);

      // Trajectory gradient fill
      const grad = ctx.createLinearGradient(40, height - 40, endX, endY);
      grad.addColorStop(0, 'rgba(225, 45, 57, 0.05)');
      grad.addColorStop(1, 'rgba(225, 45, 57, 0.35)');

      ctx.beginPath();
      ctx.moveTo(40, height - 40);
      ctx.quadraticCurveTo(endX * 0.5, height - 40, endX, endY);
      ctx.lineTo(endX, height - 40);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Red flight stroke
      ctx.beginPath();
      ctx.moveTo(40, height - 40);
      ctx.quadraticCurveTo(endX * 0.5, height - 40, endX, endY);
      ctx.strokeStyle = '#e52d39';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw Jet Airplane
      if (gameState === 'FLYING') {
        ctx.save();
        ctx.translate(endX, endY);
        ctx.rotate(-Math.PI / 12);
        // Plane body
        ctx.fillStyle = '#ff3344';
        ctx.beginPath();
        ctx.ellipse(0, 0, 22, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        // Wings
        ctx.fillStyle = '#cc1122';
        ctx.beginPath();
        ctx.moveTo(-5, -3);
        ctx.lineTo(-12, -22);
        ctx.lineTo(4, -3);
        ctx.closePath();
        ctx.fill();
        // Thruster flame
        ctx.fillStyle = '#ffcc00';
        ctx.beginPath();
        ctx.moveTo(-20, -3);
        ctx.lineTo(-32 - Math.random() * 8, 0);
        ctx.lineTo(-20, 3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
  }, [gameState, multiplier]);

  // Cashout handlers
  const handleCashout1 = () => {
    if (gameState !== 'FLYING' || !hasBet1 || cashedOut1) return;
    const won = parseFloat((bet1Amount * multiplier).toFixed(2));
    setCashedOut1(true);
    setCashout1Amount(won);
    if (onDepositSuccess) onDepositSuccess(won);
  };

  const handleCashout2 = () => {
    if (gameState !== 'FLYING' || !hasBet2 || cashedOut2) return;
    const won = parseFloat((bet2Amount * multiplier).toFixed(2));
    setCashedOut2(true);
    setCashout2Amount(won);
    if (onDepositSuccess) onDepositSuccess(won);
  };

  return (
    <div className="aero-view-container" style={{ backgroundColor: '#0f1015', minHeight: '85vh', padding: '20px' }}>
      <div className="container-fluid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-3">
            <h3 style={{ margin: 0, color: '#e52d39', fontWeight: 900, letterSpacing: '1px' }}>
              <span style={{ color: '#fff' }}>AERO</span> CRASH
            </h3>
            <span style={{ backgroundColor: '#e52d39', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
              LIVE
            </span>
          </div>

          <button
            onClick={onBack}
            style={{
              background: '#1c1e24',
              border: '1px solid #333',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            ← Back to Lobby
          </button>
        </div>

        {/* History multipliers ribbon */}
        <div
          className="multipliers-history d-flex gap-2 overflow-auto mb-3"
          style={{ padding: '6px 0', borderBottom: '1px solid #1c1e24' }}
        >
          {history.map((h) => {
            const isHigh = h.mult >= 10;
            const isMid = h.mult >= 2;
            const bg = isHigh ? '#d4af37' : isMid ? '#913fe2' : '#34b4eb';
            return (
              <span
                key={h.id}
                style={{
                  backgroundColor: bg,
                  color: '#fff',
                  borderRadius: '16px',
                  padding: '3px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap'
                }}
              >
                {h.mult.toFixed(2)}x
              </span>
            );
          })}
        </div>

        {/* Main Radar Arena */}
        <div
          className="flight-arena position-relative"
          style={{
            backgroundColor: '#14161d',
            borderRadius: '16px',
            border: '1px solid #232733',
            height: '420px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <canvas
            ref={canvasRef}
            width={1200}
            height={420}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />

          {/* Central Overlay Indicator */}
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            {gameState === 'WAITING' && (
              <div>
                <div style={{ color: '#8e96a5', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                  NEXT ROUND IN
                </div>
                <div style={{ color: '#fff', fontSize: '64px', fontWeight: 900 }}>
                  {countdown}s
                </div>
                <div
                  style={{
                    width: '180px',
                    height: '6px',
                    background: '#232733',
                    borderRadius: '4px',
                    margin: '12px auto',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${(countdown / 5) * 100}%`,
                      backgroundColor: '#e52d39',
                      transition: 'width 1s linear'
                    }}
                  />
                </div>
              </div>
            )}

            {gameState === 'FLYING' && (
              <div>
                <div style={{ color: '#ffffff', fontSize: '76px', fontWeight: 900, textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                  {multiplier.toFixed(2)}x
                </div>
              </div>
            )}

            {gameState === 'CRASHED' && (
              <div>
                <div style={{ color: '#e52d39', fontSize: '24px', fontWeight: 800, letterSpacing: '2px', marginBottom: '8px' }}>
                  FLEW AWAY!
                </div>
                <div style={{ color: '#e52d39', fontSize: '72px', fontWeight: 900 }}>
                  {multiplier.toFixed(2)}x
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dual Bet Control Panels */}
        <div className="row mt-3 g-3">
          {/* Bet Panel 1 */}
          <div className="col-12 col-md-6">
            <div
              style={{
                backgroundColor: '#14161d',
                borderRadius: '16px',
                border: '1px solid #232733',
                padding: '20px'
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span style={{ color: '#8e96a5', fontSize: '13px', fontWeight: 600 }}>BET #1</span>
                <span style={{ color: '#d4af37', fontSize: '13px', fontWeight: 700 }}>
                  Balance: ₹{user?.balance || '10,000.00'}
                </span>
              </div>

              <div className="d-flex gap-3 align-items-stretch">
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#0c0d12',
                      borderRadius: '10px',
                      border: '1px solid #2b3040',
                      padding: '4px 10px',
                      marginBottom: '10px'
                    }}
                  >
                    <button
                      disabled={hasBet1 && gameState === 'FLYING'}
                      onClick={() => setBet1Amount(Math.max(10, bet1Amount - 50))}
                      style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', padding: '4px 8px' }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      disabled={hasBet1 && gameState === 'FLYING'}
                      value={bet1Amount}
                      onChange={(e) => setBet1Amount(Number(e.target.value))}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 700,
                        width: '100%',
                        outline: 'none'
                      }}
                    />
                    <button
                      disabled={hasBet1 && gameState === 'FLYING'}
                      onClick={() => setBet1Amount(bet1Amount + 50)}
                      style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', padding: '4px 8px' }}
                    >
                      +
                    </button>
                  </div>

                  <div className="d-flex gap-2">
                    {[100, 200, 500, 1000].map((amt) => (
                      <button
                        key={amt}
                        disabled={hasBet1 && gameState === 'FLYING'}
                        onClick={() => setBet1Amount(amt)}
                        style={{
                          flex: 1,
                          background: '#1d212c',
                          border: 'none',
                          color: '#8e96a5',
                          borderRadius: '6px',
                          fontSize: '12px',
                          padding: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        +{amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Big Action Button */}
                <div style={{ flex: 1 }}>
                  {!hasBet1 ? (
                    <button
                      onClick={() => setHasBet1(true)}
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '75px',
                        backgroundColor: '#28a745',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '18px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)'
                      }}
                    >
                      BET ₹{bet1Amount}
                    </button>
                  ) : gameState === 'FLYING' && !cashedOut1 ? (
                    <button
                      onClick={handleCashout1}
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '75px',
                        background: 'linear-gradient(135deg, #ff8800, #ff5500)',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '17px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        boxShadow: '0 0 25px rgba(255, 100, 0, 0.6)'
                      }}
                    >
                      CASHOUT
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>₹{(bet1Amount * multiplier).toFixed(2)}</div>
                    </button>
                  ) : cashedOut1 ? (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '75px',
                        backgroundColor: '#1b382b',
                        border: '1px solid #28a745',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#28a745',
                        fontWeight: 800
                      }}
                    >
                      WON ₹{cashout1Amount}
                    </div>
                  ) : (
                    <button
                      onClick={() => setHasBet1(false)}
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '75px',
                        backgroundColor: '#e52d39',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      CANCEL BET
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bet Panel 2 */}
          <div className="col-12 col-md-6">
            <div
              style={{
                backgroundColor: '#14161d',
                borderRadius: '16px',
                border: '1px solid #232733',
                padding: '20px'
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span style={{ color: '#8e96a5', fontSize: '13px', fontWeight: 600 }}>BET #2</span>
                <span style={{ color: '#d4af37', fontSize: '13px', fontWeight: 700 }}>
                  Balance: ₹{user?.balance || '10,000.00'}
                </span>
              </div>

              <div className="d-flex gap-3 align-items-stretch">
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#0c0d12',
                      borderRadius: '10px',
                      border: '1px solid #2b3040',
                      padding: '4px 10px',
                      marginBottom: '10px'
                    }}
                  >
                    <button
                      disabled={hasBet2 && gameState === 'FLYING'}
                      onClick={() => setBet2Amount(Math.max(10, bet2Amount - 50))}
                      style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', padding: '4px 8px' }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      disabled={hasBet2 && gameState === 'FLYING'}
                      value={bet2Amount}
                      onChange={(e) => setBet2Amount(Number(e.target.value))}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 700,
                        width: '100%',
                        outline: 'none'
                      }}
                    />
                    <button
                      disabled={hasBet2 && gameState === 'FLYING'}
                      onClick={() => setBet2Amount(bet2Amount + 50)}
                      style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', padding: '4px 8px' }}
                    >
                      +
                    </button>
                  </div>

                  <div className="d-flex gap-2">
                    {[100, 200, 500, 1000].map((amt) => (
                      <button
                        key={amt}
                        disabled={hasBet2 && gameState === 'FLYING'}
                        onClick={() => setBet2Amount(amt)}
                        style={{
                          flex: 1,
                          background: '#1d212c',
                          border: 'none',
                          color: '#8e96a5',
                          borderRadius: '6px',
                          fontSize: '12px',
                          padding: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        +{amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Big Action Button */}
                <div style={{ flex: 1 }}>
                  {!hasBet2 ? (
                    <button
                      onClick={() => setHasBet2(true)}
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '75px',
                        backgroundColor: '#28a745',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '18px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)'
                      }}
                    >
                      BET ₹{bet2Amount}
                    </button>
                  ) : gameState === 'FLYING' && !cashedOut2 ? (
                    <button
                      onClick={handleCashout2}
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '75px',
                        background: 'linear-gradient(135deg, #ff8800, #ff5500)',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '17px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        boxShadow: '0 0 25px rgba(255, 100, 0, 0.6)'
                      }}
                    >
                      CASHOUT
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>₹{(bet2Amount * multiplier).toFixed(2)}</div>
                    </button>
                  ) : cashedOut2 ? (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '75px',
                        backgroundColor: '#1b382b',
                        border: '1px solid #28a745',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#28a745',
                        fontWeight: 800
                      }}
                    >
                      WON ₹{cashout2Amount}
                    </div>
                  ) : (
                    <button
                      onClick={() => setHasBet2(false)}
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '75px',
                        backgroundColor: '#e52d39',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      CANCEL BET
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
