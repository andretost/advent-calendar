import React from 'react';

export default function CalendarGrid({ onSelectDay }) {
  const days = Array.from({ length: 24 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  return (
    <div className="calendar-grid">
      {days.map(day => (
        <button key={day} className="door" onClick={() => onSelectDay(day)}>
          {day}
        </button>
      ))}
    </div>
  );
}
