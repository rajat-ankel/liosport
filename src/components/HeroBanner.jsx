import React, { useState, useEffect } from 'react';
import { heroBanners } from '../data/siteData';

export default function HeroBanner({ onBannerClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="top_banner_sec">
      <div className="mainBanner">
        <div>
          <div className="slick-slider slick-initialized" dir="ltr" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="slick-list" style={{ position: 'relative', display: 'block', overflow: 'hidden', margin: 0, padding: 0 }}>
              <div
                className="slick-track"
                style={{
                  opacity: 1,
                  display: 'flex',
                  position: 'relative'
                }}
              >
                {heroBanners.map((banner, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={banner.id}
                      data-index={index}
                      className={`slick-slide ${isActive ? 'slick-active slick-current' : ''}`}
                      tabIndex="-1"
                      aria-hidden={!isActive}
                      style={{
                        outline: 'none',
                        width: '100%',
                        flexShrink: 0,
                        position: index === 0 ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 800ms ease-in-out, visibility 800ms ease-in-out',
                        visibility: isActive ? 'visible' : 'hidden',
                        cursor: 'pointer'
                      }}
                      onClick={() => onBannerClick && onBannerClick(banner)}
                    >
                      <div>
                        <div className="position-relative" tabIndex="-1" style={{ width: '100%', display: 'inline-block' }}>
                          <img
                            src={banner.image}
                            alt={banner.title}
                            style={{
                              width: '100%',
                              height: 'auto',
                              display: 'block',
                              borderRadius: '0px'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <ul className="slick-dots" style={{ display: 'block', position: 'absolute', bottom: '15px', width: '100%', textAlign: 'center', listStyle: 'none', padding: 0, margin: 0, zIndex: 10 }}>
              {heroBanners.map((_, idx) => (
                <li
                  key={idx}
                  className={idx === currentSlide ? 'slick-active' : ''}
                  style={{ display: 'inline-block', margin: '0 4px' }}
                >
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: 0,
                      lineHeight: 0,
                      display: 'block',
                      width: '20px',
                      height: '20px',
                      padding: '5px'
                    }}
                  >
                    {idx + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
