import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CalendarPage from './pages/CalendarPage';
import IntroPage from './pages/IntroPage';
import About from './pages/About';

function App() {
  return (
    <Router basename="/advent-calendar">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
export default App;