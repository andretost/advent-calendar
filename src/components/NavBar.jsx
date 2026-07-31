import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import AccessibilityControls from './AccessibilityControls';
import './NavBar.css';

const NavBar = () => {
  const { language, setLanguage, translations } = useLanguage();

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

  return (
    <nav className="app-navbar">
      <ul>
        <li><NavLink to="/" end>{t('navbar.home')}</NavLink></li>
        <li><NavLink to="/intro">{t('navbar.intro')}</NavLink></li>
        <li><NavLink to="/calendar">{t('navbar.calendar')}</NavLink></li>
        <li><NavLink to="/characters">{t('navbar.characters')}</NavLink></li>
        <li><NavLink to="/recipes">{t('navbar.recipes')}</NavLink></li>
        <li><NavLink to="/about">{t('navbar.about')}</NavLink></li>
      </ul>
      <div className="language-switcher">
        <button type="button" onClick={() => setLanguage('de')} className={language === 'de' ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/images/de_flag.png`} alt="Deutsch" className="flag-icon" />
          <span>Deutsch</span>
        </button>
        <button type="button" onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/images/en_flag.png`} alt="English" className="flag-icon" />
          <span>English</span>
        </button>
      </div>
      <AccessibilityControls />
      <div className="app-footer-copyright">
        &copy; Andre Tost 2026
      </div>
    </nav>
  );
};

export default NavBar;
