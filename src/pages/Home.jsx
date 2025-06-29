import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
  };

  return (
    <div className="home-container" style={backgroundStyle}>
      <header className="home-header">
        <h1>Tareks Erste Weihnachten</h1>
        <h2>Ein Adventskalender von Silke Tost</h2>
      </header>

      <div className="home-content">
        <div className="home-text">
          <p>
            Willkommen! 
            Dieses Buch erzählt die Geschichte von Tarek, einem jungen Flüchtling aus Syrien, den es mit seiner Familie nach Osnabrück verschlagen hat. Während der Adventszeit lernt er die Menschen in seinem Haus kennen, und gewinnt einen Einblick in ihre vorweihnachtlichen Gebräuche - und die damit verbundenen Rezepte!
          </p>

          <p>
            Dabei ist es nicht wirklich ein Buch, sondern ein Adventskalender. Jeder Tag hat eine neue Geschichte, bis es schliesslich und endlich Weihnachten ist.
          </p>

          <p>
            Wir hoffen, dass die Geschichte euch ermuntert, selbst ein wenig zu backen und zu kochen und zu basteln. Aber nicht vergessen: nur eine Seite pro Tag!
          </p>

          <p>Viel Spass!!!</p>

          <p>Klicke unten, um den Adventskalender zu öffnen.</p>

          <div>
            <button onClick={() => navigate('/calendar')} className="start-button">
              Zum Kalender
            </button>
          </div>

          <p>Klicke hier, um das Audio zu hören.</p>

          <div>
            <audio controls src={`${process.env.PUBLIC_URL}/audio/intro.mp3`}>
              Your browser does not support the audio element.
            </audio>
          </div>

          <img
            src={`${process.env.PUBLIC_URL}/images/tarek.png`}
            alt="Tarek"
            className="boy-image"
          />
        </div> {/* Close home-text */}
      </div> {/* Close home-content */}
    </div> // <-- Close home-container
  );
}

export default Home;