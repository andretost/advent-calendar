import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage
import './NavBar.css';

const NavBar = ({ onLogout }) => {
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

  const handleLogout = () => {
    if (window.confirm(language === 'de' ? 'Möchten Sie sich wirklich abmelden?' : 'Are you sure you want to log out?')) {
      onLogout();
    }
  };

  return (
    <nav className="app-navbar">
      <ul>
        <li><NavLink to="/" end>{t('navbar.home')}</NavLink></li>
        <li><NavLink to="/intro">{t('navbar.intro')}</NavLink></li>
        <li><NavLink to="/calendar">{t('navbar.calendar')}</NavLink></li>
        <li><NavLink to="/recipes">{t('navbar.recipes')}</NavLink></li>
        <li><NavLink to="/about">{t('navbar.about')}</NavLink></li>
      </ul>
      <div className="language-switcher">
        <button onClick={() => setLanguage('de')} className={language === 'de' ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/images/de_flag.png`} alt="Deutsch" className="flag-icon" />
          <span>Deutsch</span>
        </button>
        <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/images/en_flag.png`} alt="English" className="flag-icon" />
          <span>English</span>
        </button>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        {language === 'de' ? 'Abmelden' : 'Logout'}
      </button>
      <div className="app-footer-copyright">
        &copy; Andre Tost 2025
      </div>
    </nav>
  );
};

export default NavBar;
