import React from 'react';
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage
import './About.css';

const About = () => {
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

  // Split the translated author paragraph to insert the bold name
  const authorP1Text = t('about_page.author_p1');
  const parts = authorP1Text.split(/<0>(.*?)<\/0>/);

  return (
    <div className="about-page">
      <div className="about-content-wrapper">
        <section className="author-section">
          <img
            src={`${process.env.PUBLIC_URL}/images/silketost.jpg`}
            alt={t('about_page.alt_author_image') || "Author"}
            className="author-photo"
          />
          <div className="author-bio">
            <h3>{t('about_page.author_title')}</h3>
            <p>
              {parts.map((part, index) => {
                if (index % 2 === 1) {
                  return <span key={index} style={{ fontWeight: 'bold' }}>{part}</span>;
                } else {
                  return part;
                }
              })}
            </p>
          </div>
        </section>

        <section className="contributors-section">
          <h3>{t('about_page.contributors_title')}</h3>
          <p>{t('about_page.contributors_p1')}</p>
          <p>{t('about_page.contributors_p2')}</p>
        </section>
      </div>
    </div>
  );
};

export default About;
