import React from 'react';
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage
import './Header.css';

const Header = () => {
  const { language, translations } = useLanguage(); // Get translations from context

  const getNestedTranslation = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const t = (key, options) => {
    const translatedText = getNestedTranslation(translations[language], key);

    if (translatedText === undefined || translatedText === null) {
      console.warn(`Translation for key '${key}' in language '${language}' is undefined or null.`);
      return key; // Fallback to key if translation is missing
    }

    // Handle component replacement for about_page.author_p1
    if (key === 'about_page.author_p1' && options?.components) {
      return translatedText.replace('<0>', options.components[0] || '').replace('</0>', options.components[1] || '');
    }
    return translatedText;
  };

  return (
    <header className="app-header">
      <img
        src={`${process.env.PUBLIC_URL}/images/tarek-and-tonja.png`}
        alt={t('header.alt_image')}
        className="header-image"
      />
      <div> {/* Wrap h1 and h2 in a div */}
        <h1>{t('header.title')}</h1>
        <h2>{t('header.subtitle')}</h2>
      </div>
    </header>
  );
};

export default Header;
