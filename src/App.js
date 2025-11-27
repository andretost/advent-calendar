import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import translations from './translations'; // Import translations here
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import CalendarPage from './pages/CalendarPage';
import IntroPage from './pages/IntroPage';
import About from './pages/About';
import Recipes from './pages/Recipes';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // If authenticated, show the main app
  return (
    <LanguageProvider translations={translations}> {/* Pass translations to the provider */}
      <Router basename="/advent-calendar">
        <AppLayout onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/intro" element={<IntroPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AppLayout>
      </Router>
    </LanguageProvider>
  );
}
export default App;