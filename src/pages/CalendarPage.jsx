import React, { useState } from 'react';
import CalendarImage from '../components/CalendarImage';
import DayModal from '../components/DayModal';
import dayDataJson from '../data/days.json';

const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState(null);

    const backgroundStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        minHeight: '100vh',   // ensures background covers full screen height
        width: '100%',        // ensures full width
    };
    
  return (
    <div className="calendar-page" style={backgroundStyle}>
      <CalendarImage onSelectDay={setSelectedDay} />
      <DayModal dayData={dayDataJson[selectedDay]} onClose={() => setSelectedDay(null)} />
    </div>
  );
};

export default CalendarPage;