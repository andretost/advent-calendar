// src/pages/IntroPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage
import './IntroPage.css';

const IntroPage = () => {
  const navigate = useNavigate();
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

  /* Removed backgroundStyle as it's now handled by AppLayout */

  return (
    <div className="intro-page">
      <img
        src={`${process.env.PUBLIC_URL}/images/house-cartoon-1-wide.png`}
        alt={t('intro_page.alt_image') || "Adventshaus"}
        className="intro-house-image"
      />

      <div className="intro-text-box">
        <p>{t('intro_page.p1')}</p>
        <p>{t('intro_page.p2')}</p>
        <p>{t('intro_page.p3')}</p>
        <audio controls>
          <source src={`${process.env.PUBLIC_URL}/audio/haus.mp3`} type="audio/mpeg" />
          {t('intro_page.audio_source')}
        </audio>
      </div>

      <button className="intro-button" onClick={() => navigate('/calendar')}>
        {t('intro_page.button')}
      </button>
    </div>
  );
};

export default IntroPage;