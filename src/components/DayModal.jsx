import React from 'react';

export default function DayModal({ dayData, onClose }) {
  if (!dayData) return null;

  return (
    <div className="modal">
      <img src={dayData.image} alt="Illustration" />
      <p>{dayData.text}</p>
      <audio controls src={dayData.audio}></audio>
      <button onClick={onClose}>Schließen</button>
    </div>
  );
}
