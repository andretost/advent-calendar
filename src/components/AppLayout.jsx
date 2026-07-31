import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import PageBrand from './PageBrand';
import Snowfall from './Snowfall';
import './AppLayout.css';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const immersive = location.pathname === '/calendar';
  const isHome = location.pathname === '/';

  const backgroundStyle = immersive
    ? undefined
    : {
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
      };

  const layoutClass = [
    'app-layout',
    immersive ? 'app-layout--immersive' : 'app-layout--content',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={layoutClass} style={backgroundStyle}>
      {!immersive && <Snowfall />}
      {!immersive && <NavBar />}
      <main className="app-content">
        {!immersive && <PageBrand overlap={isHome} />}
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
