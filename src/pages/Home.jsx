import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage

function Home() {
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

  const introAudioSrc = language === 'de' ? 'audio/intro-de.mp3' : 'audio/intro-en.mp3';

  return (
    <div className="home-content-only">
      <div className="home-text">
        <p>{t('home.p1')}</p>
        <p>{t('home.p2')}</p>
        <p>{t('home.p3')}</p>
        <p>{t('home.p4')}</p>
        <p>{t('home.p5')}</p>

        <div>
          <button onClick={() => navigate('/intro')} className="start-button">
            {t('home.button')}
          </button>
        </div>

        <p>{t('home.audio_text')}</p>

        <div>
          <audio controls key={language} src={`${process.env.PUBLIC_URL}/${introAudioSrc}`}>
            {t('home.audio_source')}
          </audio>
        </div>

        <img
          src={`${process.env.PUBLIC_URL}/images/tarek.png`}
          alt={t('home.alt_image') || "Tarek"}
          className="boy-image"
        />
      </div> {/* Close home-text */}
    </div>
  );
}

export default Home;