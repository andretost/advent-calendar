import React, { useMemo } from 'react';
import { useSettings } from '../context/SettingsContext';
import './Snowfall.css';

const Snowfall = ({ count = 48, layer = 'back', className = '' }) => {
  const { reducedMotion } = useSettings();

  const snowflakes = useMemo(() => {
    if (reducedMotion) return [];
    return Array.from({ length: count }, (_, i) => {
      const size = layer === 'front' ? 3 + (i % 5) : 2 + (i % 6);
      const left = ((i * 37) % 100) + (i % 7) * 0.3;
      const duration = (layer === 'front' ? 10 : 8) + (i % 10) * 1.4;
      const delay = (i % 12) * 0.7;
      const drift = (i % 2 === 0 ? 1 : -1) * (2 + (i % 5));
      const opacity = layer === 'front' ? 0.55 + (i % 4) * 0.1 : 0.4 + (i % 5) * 0.1;

      return {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          opacity,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          '--drift': `${drift}vw`,
        },
      };
    });
  }, [count, layer, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      className={`snowfall-container snowfall-container--${layer}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      {snowflakes.map(({ id, style }) => (
        <div key={id} className="snowflake" style={style} />
      ))}
    </div>
  );
};

export default Snowfall;
