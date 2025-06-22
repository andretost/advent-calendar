import React, { useState, useEffect } from 'react';
import CalendarGrid from './components/CalendarGrid';
import DayModal from './components/DayModal';
import dayDataJson from './data/days.json';

function App() {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="app">
      <h1>Adventskalender</h1>
      <CalendarGrid onSelectDay={setSelectedDay} />
      <DayModal dayData={dayDataJson[selectedDay]} onClose={() => setSelectedDay(null)} />
    </div>
  );
}

export default App;
