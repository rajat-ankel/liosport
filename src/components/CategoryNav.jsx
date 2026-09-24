import React from 'react';
import { categories } from '../data/siteData';

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  return (
    <div className="d-flex align-items-center nav nav-tabs" style={{ overflowX: 'auto', flexWrap: 'nowrap', WebkitOverflowScrolling: 'touch' }}>
      {categories.map((cat) => {
        const isActive = activeCategory === cat.key;
        return (
          <div className="nav-item" key={cat.key} style={{ flexShrink: 0 }}>
            <a
              role="button"
              data-rr-ui-event-key={cat.key}
              className={`nav-link ${isActive ? 'active' : ''}`}
              tabIndex="0"
              href={`#${cat.key}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory(cat.key);
              }}
            >
              {cat.icon && (
                <img
                  src={cat.icon}
                  alt={cat.name}
                  style={{
                    filter: isActive ? 'none' : 'grayscale(100%) opacity(0.7)',
                    transition: 'all 0.2s ease'
                  }}
                />
              )}
              {cat.name}
            </a>
          </div>
        );
      })}
    </div>
  );
}
