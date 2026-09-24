import React from 'react';
import { gamesByCategory } from '../data/siteData';

const PLAY_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAB5SURBVDiNvdO9CQJREEXhj000sQWxDovZ0DpswTY0tgpr0GDBDjQw8ZnshILcBw6c9DA/d2DADSdsBLVAm3nhgFUqKO7Yzd1FguKCbY+g4Y0j1qmgeGKPZSooJow9guLMj1v+Uu3vIzyES+w6YxykOMrRMw24Ct/5Az64cON598t5AAAAAElFTkSuQmCC";

export default function GameGrid({ activeCategory, onGameClick }) {
  const games = gamesByCategory[activeCategory] || [];

  return (
    <div className="tab-content">
      <div role="tabpanel" className="fade tab-pane active show">
        {games.length === 0 ? (
          <div style={{ color: '#fff', textAlign: 'center', padding: '60px 0', fontSize: '18px' }}>
            No games found in this category.
          </div>
        ) : (
          <ul className="games-list">
            {games.map((game) => (
              <li key={game.id}>
                <a
                  href={`/casino/${game.category}/${encodeURIComponent(game.name)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onGameClick(game);
                  }}
                  title={game.name}
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/Favicon.webp';
                    }}
                  />
                  <div className="overlay">
                    <span>
                      <img src={PLAY_ICON} alt="play" />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
