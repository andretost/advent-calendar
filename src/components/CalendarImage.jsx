import React, { useRef, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage
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

const CalendarImage = ({ onSelectDay }) => {
  const imageRef = useRef();
  const [imageBox, setImageBox] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [openedDays, setOpenedDays] = useState([]);
  const [showModalImage, setShowModalImage] = useState(true);
  const { language, translations } = useLanguage(); // Get translations from context

  const getNestedTranslation = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const t = (key, options) => {
    let text = getNestedTranslation(translations[language], key);

    if (text === undefined || text === null) {
      console.warn(`Translation for key '${key}' in language '${language}' is undefined or null.`);
      return key; // Fallback to key if translation is missing
    }

    if (options && options.dayNumber) {
      text = text.replace('{{dayNumber}}', options.dayNumber);
    }
    return text;
  }; // Simple translation function, supporting dayNumber replacement

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
      updateSize();
    } else if (image) {
      image.addEventListener('load', updateSize);
      return () => image.removeEventListener('load', updateSize);
    }
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        setImageBox(rect);
      }
    };
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const closeModal = () => {
    setSelectedDay(null);
    setShowModalImage(true);
  };

  const handleModalFlip = () => {
    setShowModalImage(!showModalImage);
  };

  const renderModalContent = () => {
    if (!selectedDay) return null;
    const content = days[selectedDay];
    if (!content) return <p>{t('calendar_page.no_content', { day: selectedDay })}</p>;

    const displayedText = language === 'en' && content.en_text ? content.en_text : content.text;
    const displayedLongText = language === 'en' && content.en_longText ? content.en_longText : content.longText;

    return (
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <button onClick={closeModal} style={{ float: 'right' }}>{t('modal.close')}</button>
        <h2>{t('calendar_page.day_date', { dayNumber: parseInt(selectedDay, 10) })}</h2>
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {showModalImage ? (
            <div style={{ position: 'relative' }}>
              <p
                style={{
                  fontFamily: '"Arial Black", Gadget, sans-serif',
                  fontSize: '1.5em',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '10px',
                  textAlign: 'center',
                }}
              >
                {displayedText}
              </p>
              <img
                src={`${process.env.PUBLIC_URL}/${content.image}`}
                alt={t('calendar_page.alt_day_image', { day: selectedDay })}
                style={{ maxWidth: '100%', maxHeight: 'calc(100% - 180px)', objectFit: 'contain', cursor: 'pointer' }}
                onClick={handleModalFlip}
              />
            </div>
          ) : (
            <p onClick={handleModalFlip} style={{ cursor: 'pointer' }}>
              {displayedLongText.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} style={{ marginBottom: '1em' }}>
                  {paragraph.split('\n').map((line, lIdx) => (
                    <React.Fragment key={lIdx}>
                      {line}
                      {lIdx < paragraph.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              ))}
            </p>
          )}
          <audio controls src={`${process.env.PUBLIC_URL}/${content.audio}`} style={{ marginTop: '10px' }} />
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div className="image-wrapper">
        <img
          src={`${process.env.PUBLIC_URL}/images/house.png`}
          alt={t('calendar_page.alt_calendar_image')}
          ref={imageRef}
          className="calendar-background"
        />
        {imageBox && (
          <div className="overlay-layer">
            {windows.map(({ day, x, y, w, h }) => {
              const scaleX = imageBox.width / originalWidth;
              const scaleY = imageBox.height / originalHeight;

              return (
                <div
                  key={day}
                  className="day-wrapper"
                  style={{
                    left: `${x * scaleX}px`,
                    top: `${y * scaleY}px`,
                    width: `${w * scaleX}px`,
                    height: `${h * scaleY}px`,
                    position: 'absolute',
                  }}                
                >
                  <button
                    className="day-region"
                    onClick={() => {
                      setOpenedDays(prev => [...new Set([...prev, day])]);
                      setSelectedDay(day);
                    }}                    
                  />
                  {openedDays.includes(day) && (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/star.png`}
                      alt={t('calendar_page.alt_star_overlay')}
                      className="star-overlay"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedDay}
        onRequestClose={closeModal}
        contentLabel={t('modal.day_content_label')}
        style={{
          content: {
            maxWidth: '800px',
            margin: 'auto',
            inset: 'auto',
            padding: '15px',
            borderRadius: '10px',
            width: '800px',
            height: '750px',
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

export default CalendarImage;
