import React from 'react';
import './Recipes.css';

const Recipes = () => {
  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
  };

  return (
    <div className="recipes-page" style={backgroundStyle}>
      <div className="recipes-content-wrapper">
        <h1>Rezepte</h1>
        <p>Hier entsteht die Rezepteseite...</p>
      </div>
    </div>
  );
};

export default Recipes;
