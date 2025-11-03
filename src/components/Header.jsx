import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <img
        src={`${process.env.PUBLIC_URL}/images/tarek-and-tonja.png`}
        alt="Tarek and Tonja"
        className="header-image"
      />
      <div> {/* Wrap h1 and h2 in a div */}
        <h1>Tareks Erste Weihnachten</h1>
        <h2>Ein Adventskalender von Silke Tost</h2>
      </div>
    </header>
  );
};

export default Header;
