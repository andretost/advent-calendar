import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="app-navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/intro">Intro</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/about">Über dieses Projekt...</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
