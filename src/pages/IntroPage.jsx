// src/pages/IntroPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroPage.css';

const IntroPage = () => {
  const navigate = useNavigate();

    const backgroundStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        minHeight: '100vh',   // ensures background covers full screen height
        width: '100%',        // ensures full width
    };

  return (
    <div className="intro-page" style={backgroundStyle}>
      <img
        src={`${process.env.PUBLIC_URL}/images/house-cartoon-1-wide.png`}
        alt="Adventshaus"
        className="intro-house-image"
      />

      <div className="intro-text-box">
        <p>
            Dies ist das Haus, in dem Tarek und seine Familie wohnen. Und außer ihnen natürlich noch viele andere. In Deutschland gibt es viele dieser Häuser, wo Menschen verschiedener Herkunft und aus unterschiedlichsten Kulturen unter einem Dach zusammenleben. Ich möchte mit diesem Buch ein Beispiel dafür geben, wie dies gelingen kann.
        </p>
        <p>
            Die Wochen vor Weihnachten sind für mich die schönste Zeit des Jahres. Adventskalender waren immer ein fester Teil davon.
        </p>
        <p>    
            Ich lade euch ein, diese Zeit mit mir und den Bewohnern aus dem Haus Nr. 24 zu teilen und zu erfahren, wie diese einander besser kennenlernen, sich auf Weihnachten vorbereiten und Traditionen miteinander teilen.
        </p>
        <audio controls>
          <source src={`${process.env.PUBLIC_URL}/audio/haus.mp3`} type="audio/mpeg" />
          Ihr Browser unterstützt kein Audio.
        </audio>
      </div>

      <button className="intro-button" onClick={() => navigate('/calendar')}>
        Zum Kalender
      </button>
    </div>
  );
};

export default IntroPage;