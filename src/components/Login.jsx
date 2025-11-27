import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Hardcoded credentials - change these to whatever you want
    const VALID_USERNAME = 'tarek';
    const VALID_PASSWORD = 'weihnachten2025';
    
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setError('');
      onLogin();
    } else {
      setError('Ungültiger Benutzername oder Passwort');
      setPassword('');
    }
  };

  return (
    <div className="login-page" style={backgroundStyle}>
      <div className="login-container">
        <div className="login-header">
          <h1>Tarek's erste Weihnachten</h1>
          <p>Bitte melden Sie sich an</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Benutzername</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Benutzername eingeben"
              autoComplete="username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Passwort</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort eingeben"
              autoComplete="current-password"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            Anmelden
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

