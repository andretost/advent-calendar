import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import Snowfall from './Snowfall'; // Assuming snowfall is part of the layout
import './AppLayout.css';

const AppLayout = ({ children }) => {
  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
  };

  return (
    <div className="app-layout" style={backgroundStyle}>
      <Snowfall />
      <Header />
      <NavBar />
      <main className="app-content">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
