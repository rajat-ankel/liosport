import React from 'react';
import { providers } from '../data/siteData';

export default function ProvidersSection() {
  return (
    <div className="our-game">
      <h3>Our Game Provider</h3>
      <div className="provider-img">
        {providers.map((p, idx) => (
          <img key={idx} src={p.image} alt={p.name} />
        ))}
      </div>
    </div>
  );
}
