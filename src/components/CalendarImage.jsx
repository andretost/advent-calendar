import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { canOpenDay, useSettings } from '../context/SettingsContext';
import StoryAudioPlayer from './StoryAudioPlayer';
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

const getTodayKey = () => {
  const now = new Date();
  if (now.getMonth() !== 11) return null;
  const day = now.getDate();
  if (day < 1 || day > 24) return null;
  return String(day).padStart(2, '0');
};

const normalizeDayParam = (value) => {
  if (!value) return null;
  const num = parseInt(value, 10);
  if (!num || num < 1 || num > 24) return null;
  return String(num).padStart(2, '0');
};

const splitParagraphs = (text) =>
  (text || '')
    .replace(/\r\n/g, '\n')
    .trim()
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

const playDoorChime = () => {
  try {
    const audio = new Audio(`${process.env.PUBLIC_URL}/chime.mp3`);
    audio.volume = 0.75;
    audio.play().catch(() => {});
  } catch {
    /* ignore autoplay / missing audio errors */
  }
};

const CalendarImage = ({ openedDays, setOpenedDays }) => {
  const imageRef = useRef();
  const wrapperRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { dayNumber } = useParams();
  const { language, translations } = useLanguage();
  const { doorsUnlocked, reducedMotion } = useSettings();

  const calendarHref = useCallback(
    (path) => `${path}${location.search}`,
    [location.search]
  );

  const [imageBox, setImageBox] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [openingDay, setOpeningDay] = useState(null);
  const [lockedHint, setLockedHint] = useState(null);
  const [showModalImage, setShowModalImage] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const todayKey = getTodayKey();

  const getNestedTranslation = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const t = (key, options) => {
    let text = getNestedTranslation(translations[language], key);
    if (text === undefined || text === null) {
      console.warn(`Translation for key '${key}' in language '${language}' is undefined or null.`);
      return key;
    }
    if (options) {
      Object.entries(options).forEach(([name, value]) => {
        text = text.replace(`{{${name}}}`, value);
      });
    }
    return text;
  };

  const updateSize = useCallback(() => {
    const image = imageRef.current;
    if (!image) return;
    setImageBox({
      width: image.offsetWidth,
      height: image.offsetHeight,
    });
  }, []);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return undefined;
    if (image.complete) updateSize();
    image.addEventListener('load', updateSize);
    return () => image.removeEventListener('load', updateSize);
  }, [updateSize]);

  useEffect(() => {
    window.addEventListener('resize', updateSize);
    const observer = wrapperRef.current && 'ResizeObserver' in window
      ? new ResizeObserver(updateSize)
      : null;
    if (observer && wrapperRef.current) observer.observe(wrapperRef.current);
    return () => {
      window.removeEventListener('resize', updateSize);
      if (observer) observer.disconnect();
    };
  }, [updateSize]);

  const openDay = useCallback((day, { fromRoute = false } = {}) => {
    if (!canOpenDay(day, doorsUnlocked)) {
      setLockedHint(day);
      window.setTimeout(() => setLockedHint(null), 2200);
      if (fromRoute) navigate(calendarHref('/calendar'), { replace: true });
      return;
    }

    const isFirstOpen = !openedDays.includes(day);
    if (isFirstOpen) playDoorChime();

    setOpenedDays((prev) => (prev.includes(day) ? prev : [...prev, day]));
    setShowModalImage(true);

    const reveal = () => {
      setOpeningDay(null);
      setSelectedDay(day);
      if (!fromRoute) {
        navigate(calendarHref(`/calendar/${parseInt(day, 10)}`));
      }
    };

    if (reducedMotion || fromRoute) {
      reveal();
      return;
    }

    setOpeningDay(day);
    window.setTimeout(reveal, 480);
  }, [calendarHref, doorsUnlocked, navigate, openedDays, reducedMotion, setOpenedDays]);

  useEffect(() => {
    const day = normalizeDayParam(dayNumber);
    if (!day) {
      if (selectedDay && !dayNumber) {
        /* closed via route */
      }
      return;
    }
    if (selectedDay === day) return;
    openDay(day, { fromRoute: true });
  }, [dayNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeModal = () => {
    setSelectedDay(null);
    setShowModalImage(true);
    setIsFlipping(false);
    navigate(calendarHref('/calendar'));
  };

  const handleModalFlip = () => {
    if (isFlipping) return;
    if (reducedMotion) {
      setShowModalImage((prev) => !prev);
      return;
    }
    setIsFlipping(true);
    window.setTimeout(() => {
      setShowModalImage((prev) => !prev);
      setIsFlipping(false);
    }, 220);
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedContent = selectedDay ? days[selectedDay] : null;

  const renderModalContent = () => {
    if (!selectedDay || !selectedContent) return null;

    const displayedText = language === 'en' && selectedContent.en_text
      ? selectedContent.en_text
      : selectedContent.text;
    const longText = language === 'en' && selectedContent.en_longText
      ? selectedContent.en_longText
      : selectedContent.longText;
    const storyParagraphs = splitParagraphs(longText);
    const dayAudioSrc = language === 'de' ? selectedContent.audio : selectedContent.en_audio;

    return (
      <div className="day-modal-inner">
        <div className="day-modal-frame" aria-hidden="true" />
        <div className="day-modal-header">
          <h2>{t('calendar_page.day_date', { dayNumber: parseInt(selectedDay, 10) })}</h2>
          <div className="day-modal-header-actions">
            <button type="button" className="day-modal-print" onClick={handlePrint}>
              {t('modal.print')}
            </button>
            <button type="button" className="day-modal-close" onClick={closeModal} aria-label={t('modal.close')}>
              ×
            </button>
          </div>
        </div>

        <div className={`day-modal-body${isFlipping ? ' is-flipping' : ''}${showModalImage ? ' show-image' : ' show-story'}`}>
          {showModalImage ? (
            <div className="day-modal-front">
              <p className="day-modal-teaser">{displayedText}</p>
              <button type="button" className="day-modal-image-button" onClick={handleModalFlip}>
                <img
                  src={`${process.env.PUBLIC_URL}/${selectedContent.image}`}
                  alt={t('calendar_page.alt_day_image', { day: selectedDay })}
                  className="day-modal-image"
                />
              </button>
              <p className="day-modal-hint">{t('modal.flip_to_story')}</p>
            </div>
          ) : (
            <div className="day-modal-story">
              {storyParagraphs.map((paragraph, pIdx) => (
                <p key={pIdx} onClick={handleModalFlip}>
                  {paragraph}
                </p>
              ))}
              <button type="button" className="day-modal-hint-btn" onClick={handleModalFlip}>
                {t('modal.flip_to_image')}
              </button>
            </div>
          )}
        </div>

        <div className="day-modal-audio no-print">
          <StoryAudioPlayer
            key={`${selectedDay}-${language}`}
            src={`${process.env.PUBLIC_URL}/${dayAudioSrc}`}
            playLabel={t('modal.play')}
            pauseLabel={t('modal.pause')}
          />
        </div>

        <div className="day-print-only" aria-hidden="true">
          <h1>{t('calendar_page.day_date', { dayNumber: parseInt(selectedDay, 10) })}</h1>
          <p className="day-print-teaser">{displayedText}</p>
          <img
            src={`${process.env.PUBLIC_URL}/${selectedContent.image}`}
            alt=""
            className="day-print-image"
          />
          {storyParagraphs.map((paragraph, pIdx) => (
            <p key={pIdx}>{paragraph}</p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container" ref={wrapperRef}>
      <div className="image-wrapper">
        <img
          src={`${process.env.PUBLIC_URL}/images/house.png`}
          alt={t('calendar_page.alt_calendar_image')}
          ref={imageRef}
          className="calendar-background"
        />
        <div className="house-light-wash" aria-hidden="true" />
        {imageBox && (
          <div
            className="overlay-layer"
            style={{ width: imageBox.width, height: imageBox.height }}
          >
            {windows.map(({ day, x, y, w, h }) => {
              const scaleX = imageBox.width / originalWidth;
              const scaleY = imageBox.height / originalHeight;
              const isOpened = openedDays.includes(day);
              const isToday = todayKey === day;
              const isOpening = openingDay === day;
              const isLocked = !canOpenDay(day, doorsUnlocked);

              return (
                <div
                  key={day}
                  className={[
                    'day-wrapper',
                    isOpened ? 'is-opened' : '',
                    isToday ? 'is-today' : '',
                    isOpening ? 'is-opening' : '',
                    isLocked ? 'is-locked' : '',
                  ].filter(Boolean).join(' ')}
                  style={{
                    left: `${x * scaleX}px`,
                    top: `${y * scaleY}px`,
                    width: `${w * scaleX}px`,
                    height: `${h * scaleY}px`,
                  }}
                >
                  <span className="day-glow" aria-hidden="true" />
                  <button
                    type="button"
                    className="day-region"
                    aria-label={t('calendar_page.day_date', { dayNumber: parseInt(day, 10) })}
                    aria-disabled={isLocked}
                    onClick={() => openDay(day)}
                  >
                    <span className="day-number">{parseInt(day, 10)}</span>
                  </button>
                  {isOpened && (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/star.png`}
                      alt=""
                      aria-hidden="true"
                      className="star-overlay"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {lockedHint && (
        <div className="calendar-locked-toast" role="status">
          {t('calendar_page.locked_toast', { dayNumber: parseInt(lockedHint, 10) })}
        </div>
      )}

      <Modal
        isOpen={!!selectedDay}
        onRequestClose={closeModal}
        contentLabel={t('modal.day_content_label')}
        className="day-modal"
        overlayClassName="day-modal-overlay"
        closeTimeoutMS={reducedMotion ? 0 : 220}
        style={{
          overlay: { backgroundColor: 'transparent' },
          content: {
            inset: 'auto',
            border: 'none',
            background: '#fff8ef',
            overflow: 'hidden',
            padding: 0,
            borderRadius: '18px',
            position: 'relative',
          },
        }}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default CalendarImage;
