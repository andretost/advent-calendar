import React, { useState } from 'react';
import CalendarImage from '../components/CalendarImage';
import DayModal from '../components/DayModal';
import dayDataJson from '../data/days.json';
import './CalendarPage.css'; // Import the CSS file

const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="calendar-page-content">
      <div className="calendar-image-wrapper-in-page">
        <CalendarImage onSelectDay={setSelectedDay} />
      </div>
      <div className="calendar-info-box">
        <h3>Wichtige Informationen</h3>
        <p>Dies ist ein Platzhaltertext für wichtige Informationen zum Adventskalender. Hier könnten Details zur Navigation, zu den Inhalten der Türchen oder zu besonderen Aktionen stehen.</p>
        <p>Bitte passen Sie diesen Text nach Belieben an.</p>
      </div>
      <DayModal dayData={dayDataJson[selectedDay]} onClose={() => setSelectedDay(null)} />
    </div>
  );
};

export default CalendarPage;