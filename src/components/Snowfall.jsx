import React from 'react';
import './Snowfall.css';

const Snowflake = () => (
  <div className="snowflake"></div>
);

const Snowfall = () => {
  const numSnowflakes = 50; // Adjust as needed
  const snowflakes = Array.from({ length: numSnowflakes }, (_, i) => (
    <Snowflake key={i} />
  ));

  return (
    <div className="snowfall-container">
      {snowflakes}
    </div>
  );
};

export default Snowfall;
