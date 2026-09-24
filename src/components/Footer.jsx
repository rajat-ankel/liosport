import React from 'react';
import { appDetails, paymentMethods, footerLinks, socialLinks } from '../data/siteData';
import ProvidersSection from './ProvidersSection';

const EIGHTEEN_PLUS_BADGE = "data:image/png;base64,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";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="inner-content">
        <ProvidersSection />

        <div className="footer-links">
          <ul>
            {footerLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.path} onClick={(e) => e.preventDefault()}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="availble-payment">
          <h4>Available Payment Methods</h4>
          <div className="payment-methods">
            {paymentMethods.map((pm, idx) => (
              <img key={idx} src={pm.image} alt={pm.name} />
            ))}
          </div>
        </div>

        <div className="social-networks">
          <h4>Social networks</h4>
          <ul>
            {socialLinks.map((soc, idx) => (
              <li key={idx}>
                <a
                  className="panel"
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={soc.icon} alt={soc.name} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-copyright">
          <img alt="logo" className="logo" src={appDetails.logoUrl} />
          <img alt="18 plus" src={EIGHTEEN_PLUS_BADGE} style={{ width: '48px', height: 'auto', display: 'inline-block', marginRight: '15px' }} />
          <p>
            Gaming is the fun and Excitable Entertainment. Gambling is an attractive option if you want to try your Luck. Most of Casino visitors enjoy this kind of entertainment without any problems, but there are a small number of people who lose a control over their gambling activity. Play Responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
