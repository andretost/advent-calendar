import React, { useRef, useEffect, useState } from 'react';
import Modal from 'react-modal';
import './CalendarImage.css';

const originalWidth = 2280;
const originalHeight = 1754;

const windows = [
  { day: "01", x: 870, y: 880, w: 150, h: 150 },
  { day: "02", x: 1165, y: 880, w: 150, h: 150 },
  { day: "03", x: 1505, y: 1280, w: 150, h: 150 },
  { day: "04", x: 1460, y: 200, w: 150, h: 150 },
  { day: "05", x: 875, y: 490, w: 150, h: 150 },
  { day: "06", x: 175, y: 1280, w: 150, h: 150 },
  { day: "07", x: 1520, y: 880, w: 150, h: 150 },
  { day: "08", x: 255, y: 490, w: 150, h: 150 },
  { day: "09", x: 575, y: 1280, w: 150, h: 150 },
  { day: "10", x: 875, y: 200, w: 150, h: 150 },
  { day: "11", x: 1165, y: 490, w: 150, h: 150 },
  { day: "12", x: 1860, y: 880, w: 150, h: 150 },
  { day: "13", x: 1165, y: 1280, w: 150, h: 150 },
  { day: "14", x: 580, y: 200, w: 150, h: 150 },
  { day: "15", x: 1765, y: 200, w: 150, h: 150 },
  { day: "16", x: 280, y: 200, w: 150, h: 150 },
  { day: "17", x: 1165, y: 200, w: 150, h: 150 },
  { day: "18", x: 575, y: 880, w: 150, h: 150 },
  { day: "19", x: 1490, y: 490, w: 150, h: 150 },
  { day: "20", x: 215, y: 880, w: 150, h: 150 },
  { day: "21", x: 1810, y: 490, w: 150, h: 150 },
  { day: "22", x: 590, y: 490, w: 150, h: 150 },
  { day: "23", x: 1875, y: 1280, w: 150, h: 150 },
  { day: "24", x: 855, y: 1260, w: 175, h: 175 },
];

const CalendarImage = ({ onSelectDay }) => {
  const imageRef = useRef();
  const [imageBox, setImageBox] = useState(null);

    useEffect(() => {
    const updateSize = () => {
        if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        console.log('imageBox:', rect);    
        setImageBox(imageRef.current.getBoundingClientRect());
        }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
    }, []);

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
                    onClick={() => onSelectDay(day)}
                    >
                    </button>
                );
                })}
            </div>
            )}
        </div>
        </div>
    );
}

export default CalendarImage;