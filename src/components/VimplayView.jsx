import React from 'react';
import { vimplayGames } from '../data/vimplayData';

export default function VimplayView({ onGameClick, onBack }) {
  return (
    <div className="vimplay-page-wrapper">
      <main className="main">
        <div className="container-fluid">
          <div className="slots-section spribe-page">
            <div className="games-section">
              <div className="heading mt-4 d-flex justify-content-between align-items-center">
                <h4 style={{ color: '#ffffff', fontWeight: 700, margin: 0 }}>Vimplay Games</h4>
                <div
                  className="back-link"
                  onClick={onBack}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#e1b066',
                    fontWeight: 600,
                    fontSize: '15px'
                  }}
                >
                  <span>Back</span>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <g id="Group_1225" data-name="Group 1225" transform="translate(-331.329 -63.5)">
                      <path
                        id="Path_1595"
                        data-name="Path 1595"
                        d="M12,0A12,12,0,1,1,0,12,12.193,12.193,0,0,1,2.026,5.325,11.857,11.857,0,0,1,12,0Z"
                        transform="translate(331.329 63.5)"
                        fill="#e1b066"
                      />
                      <path
                        id="Path_2841"
                        data-name="Path 2841"
                        d="M3016.428,71l-5.714,4.857,5.714,4.857"
                        transform="translate(-2671)"
                        fill="none"
                        stroke="#000"
                        strokeWidth="1.5"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              <ul className="mt-4" style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {vimplayGames.map((game, idx) => (
                  <li key={idx} className="game-section" style={{ width: 'calc(16.666% - 13px)', minWidth: '160px', marginBottom: '20px' }}>
                    <a
                      href={game.redirectUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        onGameClick({
                          name: game.name,
                          img: game.imgUrl,
                          provider: 'Vimplay',
                          slug: game.redirectUrl.replace('/casino/', '')
                        });
                      }}
                      style={{
                        display: 'block',
                        position: 'relative',
                        textDecoration: 'none',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#121212'
                      }}
                    >
                      <div className="img-holder" style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
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
                          className="casino_overlay"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0, 0, 0, 0.4)',
                            opacity: 0,
                            transition: 'opacity 0.25s ease'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                        >
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAfbgAAH24BpQk2zQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARiSURBVHic3ZtNbFRVFMd/59y2sUULqZ8oKoILQ2JQwBCDYtz5NQujJi4MQReGuMGV6I4lWxKMwcSouHMBCV0YbYxfMUaCiaiABiEisSpCBWOtFNtx0XtNHaYz576572Pml7zNdObd+/+1c3rfu+fBwgyDviToV4JOCvqrIO+BexLob/G5nmCFoEcFrS9wHAP3aNmTzIt+wR1oEX7eIR8Ad5Q94cS4zbbw/x0ziu4Brit75kkQ5N1IAeE4D/oicFnZGTpC0JNNwn0r6DdGESfAPV52jswI+ndjKEVfARTc04KO20S4j4G1ZeeJRtDpJgJenveWIdDtgv5lEDGr6NvATWXlicYgILBM0T2CzhpETCq6A7i86DzRRAgI3CW4T4314RS4TYAUlSeaDALmPoZ7QtAfjPXhALChiDzRZBQQGALdJugfEfVheY5x4ulQQOAGRXcLOhNRH67II080iQQE1gnuE2N9+Ancs4CmzBNNYgEeVxP0hLE+HATuTRImC/kIAGDQ14fzNhEyCtySYNw4chQQWOrrwz8GERcU3QkMJxy/NQUICKwR3EfG+jDu64PLYR7/p0ABHlcT9LhRxBfAxvzmQhkCABgA3SrouYj6sCKXmZQkIHClojsj68PipDMoWUBglSDvGL8WZ0C3kqo+VESAx9UEPWYUcQT6Huh4yGoJAKDf14ffjfVhDFiVebQKCgiM+Ppw0SBi2teHJdGjVFhA4HZBxoxfi9Pgnok6excI8LiaoN8ZvxZ7gUHTabtHADBXH54XdMIoof2VZpcJCIwoukPQC60kgHus7Zm6VECgzfpBxho/UO7Nh/QcqVN/sI48Aoxf+mNZ3fhKrwkIDABDTV6fbnyh1wQsF2S/UN9L0zVA/VDjK70iYMA3cxwGqS30pjq6q+2ZurAIbhTDxq2ib5jO1kUCrlX0LTFszSn6GnN1oT1dIEBBnzNeHJ0G91TU2Ssu4E7BfWYIPuu7Vq6KHqGiAhZH3Cn6Erg780jVE+Bqgp4yBP8TdBvQ19FwFRJwq71fSUaBG5OMWgEBg74D5ZJWnSbH90lug82nXAHuYbHtIU6BbiePjrSSBFzv220sf+7vA7flNpOCBfT5G56Whopx316TLwUKuEfQrw3BLxa6QVqAgHB319A94g4C6xKO3Z4cBQi4TYL+ZvitT/jdnuKvVnMSsNrYSheWsFenyJKJxAIW+ZuVls2MQ1ShdS6dAFcT9EdD8En/P912uZo3CQSstO/syihwc15ZMtGBgAHfBDVlCH8c3EO5h8lCNgF990vrZ4zCETYtFxUSJguRApbal7DuQzrZti4Ko4CwhLX0/P1c+Q7x+RgErDU+VTaj6G5S9/DkjTTZYPSPzIwo+qrYlrCfA2vKzpIJQX9pEuqkoGcNv/UJ0C1084ZLRHd34xL2TeCasuefAH0hMvxh4L6yZ52SYbE9GjfpH5TsyQep1wt6ZuHwso+qLWFzYJmiu3wBnBL0qKKv02MPS/8LH+ysoRNMnx8AAAAASUVORK5CYII="
                            alt="playBtn"
                            style={{ width: '48px', height: '48px' }}
                          />
                        </div>
                      </div>
                      <p
                        style={{
                          margin: '8px 0 0 0',
                          padding: '0 4px',
                          color: '#ffffff',
                          fontSize: '13px',
                          fontWeight: 500,
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {game.name}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
