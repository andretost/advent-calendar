import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import CalendarPage from './pages/CalendarPage';
import IntroPage from './pages/IntroPage';
import About from './pages/About';
import Recipes from './pages/Recipes'; // Import Recipes component

function App() {
  return (
    <Router basename="/advent-calendar">
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes" element={<Recipes />} /> {/* Add route for Recipes page */}
        </Routes>
      </AppLayout>
    </Router>
  );
}
export default App;