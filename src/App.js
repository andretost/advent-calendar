import React, { useState, useEffect } from 'react';
import CalendarImage from './components/CalendarImage';
import DayModal from './components/DayModal';
import dayDataJson from './data/days.json';

function App() {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="app">
      <h1>Adventskalender</h1>
      <CalendarImage onSelectDay={setSelectedDay} />
      <DayModal dayData={dayDataJson[selectedDay]} onClose={() => setSelectedDay(null)} />
    </div>
  );
}

export default App;
