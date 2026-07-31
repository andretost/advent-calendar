import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { SettingsProvider } from './context/SettingsContext';
import translations from './translations';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import CalendarPage from './pages/CalendarPage';
import IntroPage from './pages/IntroPage';
import About from './pages/About';
import Recipes from './pages/Recipes';
import Characters from './pages/Characters';

function App() {
  return (
    <LanguageProvider translations={translations}>
      <Router basename="/advent-calendar">
        <SettingsProvider>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/intro" element={<IntroPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/calendar/:dayNumber" element={<CalendarPage />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AppLayout>
        </SettingsProvider>
      </Router>
    </LanguageProvider>
  );
}

export default App;
