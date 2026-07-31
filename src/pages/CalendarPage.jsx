import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CalendarImage from '../components/CalendarImage';
import AmbientAudio from '../components/AmbientAudio';
import AccessibilityControls from '../components/AccessibilityControls';
import Snowfall from '../components/Snowfall';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { readOpenedDays, writeOpenedDays } from '../utils/openedDays';
import './CalendarPage.css';

const HELP_KEY = 'advent-calendar-help-dismissed';

const CalendarPage = () => {
  const { language, setLanguage, translations } = useLanguage();
  const {
    doorLockEnabled,
    setDoorLockEnabled,
    previewUnlock,
    doorsUnlocked,
  } = useSettings();
  const [openedDays, setOpenedDays] = useState(readOpenedDays);
  const [helpOpen, setHelpOpen] = useState(() => {
    try {
      return localStorage.getItem(HELP_KEY) !== '1';
    } catch {
      return true;
    }
  });
  const [ambientOn, setAmbientOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    writeOpenedDays(openedDays);
  }, [openedDays]);

  const dismissHelp = () => {
    setHelpOpen(false);
    try {
      localStorage.setItem(HELP_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  const progressLabel = t('calendar_page.progress', {
    opened: openedDays.length,
    total: 24,
  });

  return (
    <div className="calendar-stage">
      <Snowfall count={36} layer="back" />
      <div className="calendar-atmosphere" aria-hidden="true" />

      <header className="calendar-topbar">
        <div className="calendar-topbar-left">
          <Link to="/intro" className="calendar-tool-btn calendar-back">
            <span aria-hidden="true">←</span>
            <span className="calendar-tool-label">{t('calendar_page.back')}</span>
          </Link>
          <p className="calendar-progress">{progressLabel}</p>
          {!doorsUnlocked && (
            <span className="calendar-lock-badge">{t('calendar_page.lock_active_badge')}</span>
          )}
          {previewUnlock && (
            <span className="calendar-lock-badge is-preview">{t('calendar_page.preview_badge')}</span>
          )}
        </div>

        <div className="calendar-topbar-right">
          <AmbientAudio
            enabled={ambientOn}
            onToggle={setAmbientOn}
            labelOn={t('calendar_page.ambient_on')}
            labelOff={t('calendar_page.ambient_off')}
          />
          <button
            type="button"
            className={`calendar-tool-btn${helpOpen ? ' is-active' : ''}`}
            onClick={() => setHelpOpen((v) => !v)}
            aria-expanded={helpOpen}
          >
            <span className="calendar-tool-icon" aria-hidden="true">?</span>
            <span className="calendar-tool-label">{t('calendar_page.help')}</span>
          </button>
          <button
            type="button"
            className={`calendar-tool-btn${menuOpen ? ' is-active' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
          >
            <span className="calendar-tool-icon" aria-hidden="true">☰</span>
            <span className="calendar-tool-label">{t('calendar_page.menu')}</span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="calendar-menu" aria-label={t('calendar_page.menu')}>
          <Link to="/" onClick={() => setMenuOpen(false)}>{t('navbar.home')}</Link>
          <Link to="/intro" onClick={() => setMenuOpen(false)}>{t('navbar.intro')}</Link>
          <Link to="/characters" onClick={() => setMenuOpen(false)}>{t('navbar.characters')}</Link>
          <Link to="/recipes" onClick={() => setMenuOpen(false)}>{t('navbar.recipes')}</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>{t('navbar.about')}</Link>

          <div className="calendar-menu-setting">
            <div className="calendar-menu-setting-text">
              <strong>{t('calendar_page.lock_toggle_label')}</strong>
              <span>{t('calendar_page.lock_toggle_help')}</span>
            </div>
            <button
              type="button"
              className={`calendar-lock-switch${doorLockEnabled ? ' is-on' : ''}`}
              onClick={() => setDoorLockEnabled(!doorLockEnabled)}
              aria-pressed={doorLockEnabled}
            >
              {doorLockEnabled ? t('calendar_page.lock_on') : t('calendar_page.lock_off')}
            </button>
          </div>

          <div className="calendar-menu-a11y">
            <AccessibilityControls />
          </div>

          <div className="calendar-menu-langs">
            <button
              type="button"
              className={language === 'de' ? 'is-active' : ''}
              onClick={() => setLanguage('de')}
            >
              Deutsch
            </button>
            <button
              type="button"
              className={language === 'en' ? 'is-active' : ''}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
          </div>
        </nav>
      )}

      {helpOpen && (
        <aside className="calendar-help" role="dialog" aria-label={t('calendar_page.info_box_title')}>
          <div className="calendar-help-header">
            <h3>{t('calendar_page.info_box_title')}</h3>
            <button type="button" className="calendar-help-close" onClick={dismissHelp} aria-label={t('modal.close')}>
              ×
            </button>
          </div>
          <p>{t('calendar_page.info_box_p1')}</p>
          <p>{t('calendar_page.info_box_p2')}</p>
          <p>{t('calendar_page.info_box_p3')}</p>
          <p>{t('calendar_page.info_box_p4')}</p>
          <button type="button" className="calendar-help-done" onClick={dismissHelp}>
            {t('calendar_page.help_dismiss')}
          </button>
        </aside>
      )}

      <div className="calendar-house-area">
        <CalendarImage openedDays={openedDays} setOpenedDays={setOpenedDays} />
      </div>

      <Snowfall count={22} layer="front" />
    </div>
  );
};

export default CalendarPage;
