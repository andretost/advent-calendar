import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage
import './NavBar.css';

const NavBar = () => {
  const { language, setLanguage, translations } = useLanguage(); // Get translations from context

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
    <nav className="app-navbar">
      <ul>
        <li><Link to="/">{t('navbar.home')}</Link></li>
        <li><Link to="/intro">{t('navbar.intro')}</Link></li>
        <li><Link to="/calendar">{t('navbar.calendar')}</Link></li>
        <li><Link to="/recipes">{t('navbar.recipes')}</Link></li>
        <li><Link to="/about">{t('navbar.about')}</Link></li>
      </ul>
      <div className="language-switcher">
        <button onClick={() => setLanguage('de')} className={language === 'de' ? 'active' : ''}>DE</button>
        <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
      </div>
    </nav>
  );
};

export default NavBar;
