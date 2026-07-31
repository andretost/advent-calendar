import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import StoryAudioPlayer from '../components/StoryAudioPlayer';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { language, translations } = useLanguage();

  const getNestedTranslation = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const t = (key) => {
    const translatedText = getNestedTranslation(translations[language], key);

    if (translatedText === undefined || translatedText === null) {
      console.warn(`Translation for key '${key}' in language '${language}' is undefined or null.`);
      return key;
    }
    return translatedText;
  };

  const introAudioSrc = language === 'de' ? 'audio/intro-de.mp3' : 'audio/intro-en.mp3';

  return (
    <div className="home-stage">
      <div className="home-layout">
        <section className="home-panel">
          <p className="home-kicker">{t('home.kicker')}</p>
          <h2 className="home-title">{t('home.title')}</h2>

          <div className="home-copy">
            <p>{t('home.p1')}</p>
            <p>{t('home.p2')}</p>
            <p>{t('home.p3')}</p>
            <p className="home-fun">{t('home.p4')}</p>
          </div>

          <div className="home-actions">
            <p className="home-cta-text">{t('home.p5')}</p>
            <button type="button" onClick={() => navigate('/intro')} className="start-button">
              {t('home.button')}
            </button>

            <div className="home-audio">
              <p className="home-audio-label">{t('home.audio_text')}</p>
              <StoryAudioPlayer
                key={language}
                src={`${process.env.PUBLIC_URL}/${introAudioSrc}`}
                playLabel={t('modal.play')}
                pauseLabel={t('modal.pause')}
              />
            </div>
          </div>
        </section>

        <aside className="home-figure">
          <img
            src={`${process.env.PUBLIC_URL}/images/tarek.png`}
            alt={t('home.alt_image')}
            className="boy-image"
          />
        </aside>
      </div>
    </div>
  );
}

export default Home;
