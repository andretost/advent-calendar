import React, { useState } from 'react';
import CalendarImage from '../components/CalendarImage';
import DayModal from '../components/DayModal';
import dayDataJson from '../data/days.json';
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage
import './CalendarPage.css'; // Import the CSS file

const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const { language, translations } = useLanguage(); // Get translations from context

  const getNestedTranslation = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const t = (key) => {
    const translatedText = getNestedTranslation(translations[language], key);

    if (translatedText === undefined || translatedText === null) {
      console.warn(`Translation for key '${key}' in language '${language}' is undefined or null.`);
      return key; // Fallback to key if translation is missing
    }
    return translatedText;
  };

  return (
    <div className="calendar-page-content">
      <div className="calendar-image-wrapper-in-page">
        <CalendarImage onSelectDay={setSelectedDay} />
      </div>
      <div className="calendar-info-box">
        <h3>{t('calendar_page.info_box_title')}</h3>
        <p>{t('calendar_page.info_box_p1')}</p>
        <p>{t('calendar_page.info_box_p2')}</p>
        <p>{t('calendar_page.info_box_p3')}</p>
      </div>
      <DayModal dayData={dayDataJson[selectedDay]} onClose={() => setSelectedDay(null)} language={language} />
    </div>
  );
};

export default CalendarPage;