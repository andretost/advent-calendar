import React, { useRef, useEffect, useState } from 'react';
import Modal from 'react-modal';
import days from '../data/days.json';
import './CalendarImage.css';

Modal.setAppElement('#root');

const originalWidth = 2280;
const originalHeight = 1754;

const windows = [
  { day: "01", x: 890, y: 880, w: 150, h: 150 },
  { day: "02", x: 1185, y: 880, w: 150, h: 150 },
  { day: "03", x: 1545, y: 1280, w: 150, h: 150 },
  { day: "04", x: 1485, y: 200, w: 150, h: 150 },
  { day: "05", x: 890, y: 490, w: 150, h: 150 },
  { day: "06", x: 175, y: 1280, w: 150, h: 150 },
  { day: "07", x: 1555, y: 880, w: 150, h: 150 },
  { day: "08", x: 255, y: 490, w: 150, h: 150 },
  { day: "09", x: 590, y: 1280, w: 150, h: 150 },
  { day: "10", x: 895, y: 200, w: 150, h: 150 },
  { day: "11", x: 1185, y: 490, w: 150, h: 150 },
  { day: "12", x: 1905, y: 880, w: 150, h: 150 },
  { day: "13", x: 1190, y: 1280, w: 150, h: 150 },
  { day: "14", x: 595, y: 200, w: 150, h: 150 },
  { day: "15", x: 1810, y: 200, w: 150, h: 150 },
  { day: "16", x: 290, y: 200, w: 150, h: 150 },
  { day: "17", x: 1185, y: 200, w: 150, h: 150 },
  { day: "18", x: 585, y: 880, w: 150, h: 150 },
  { day: "19", x: 1540, y: 490, w: 150, h: 150 },
  { day: "20", x: 225, y: 880, w: 150, h: 150 },
  { day: "21", x: 1870, y: 490, w: 150, h: 150 },
  { day: "22", x: 600, y: 490, w: 150, h: 150 },
  { day: "23", x: 1920, y: 1280, w: 150, h: 150 },
  { day: "24", x: 880, y: 1260, w: 175, h: 175 },
];

const CalendarImage = () => {
  const imageRef = useRef();
  const [imageBox, setImageBox] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  // 1. Handle image load (first run)
  useEffect(() => {
    const image = imageRef.current;

    const updateSize = () => {
      if (image) {
        const rect = image.getBoundingClientRect();
        console.log('imageBox:', rect);
        setImageBox(rect);
      }
    };

    if (image && image.complete) {
      // If image already loaded (e.g., from cache)
      updateSize();
    } else if (image) {
      // If image still loading
      image.addEventListener('load', updateSize);
      return () => image.removeEventListener('load', updateSize);
    }
  }, []); // Runs only once on mount

  // 2. Handle browser window resizing
  useEffect(() => {
    const updateSize = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        setImageBox(rect);
      }
    };

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []); // Also only once, with cleanup

  const closeModal = () => setSelectedDay(null);

  const renderModalContent = () => {
    if (!selectedDay) return null;
    const content = days[selectedDay];
    if (!content) return <p>No content found for day {selectedDay}.</p>;

    return (
      <div>
        <button onClick={closeModal} style={{ float: 'right' }}>✕</button>
        <h2>{getGermanDate(selectedDay)}</h2>
        <p>{content.text}</p>
        <img src={`${process.env.PUBLIC_URL}/${content.image}`} alt={`Day ${selectedDay}`} style={{ maxWidth: '100%' }} />
        <audio controls src={`${process.env.PUBLIC_URL}/${content.audio}`} />
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div className="image-wrapper">
        <img
          src={`${process.env.PUBLIC_URL}/images/house.png`}
          alt="Advent calendar"
          ref={imageRef}
          className="calendar-background"
        />
        {imageBox && (
          <div className="overlay-layer">
            {windows.map(({ day, x, y, w, h }) => {
              const scaleX = imageBox.width / originalWidth;
              const scaleY = imageBox.height / originalHeight;

              return (
                <button
                  key={day}
                  className="day-region"
                  style={{
                    left: `${x * scaleX}px`,
                    top: `${y * scaleY}px`,
                    width: `${w * scaleX}px`,
                    height: `${h * scaleY}px`,
                  }}
                  onClick={() => setSelectedDay(day)}
                />
              );
            })}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedDay}
        onRequestClose={closeModal}
        contentLabel="Day Content"
        style={{
          content: {
            maxWidth: '800px',
            margin: 'auto',
            inset: 'auto',
            padding: '30px',
            borderRadius: '10px',
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 10,
          },
        }}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

const getGermanDate = (dayString) => {
  const dayNumber = parseInt(dayString, 10); // "01" -> 1
  return `${dayNumber}. Dezember`;
};

export default CalendarImage;
