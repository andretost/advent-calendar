import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import translations from './translations'; // Import translations here
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import CalendarPage from './pages/CalendarPage';
import IntroPage from './pages/IntroPage';
import About from './pages/About';
import Recipes from './pages/Recipes';

function App() {
  return (
    <LanguageProvider translations={translations}> {/* Pass translations to the provider */}
      <Router basename="/advent-calendar">
        <AppLayout>
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