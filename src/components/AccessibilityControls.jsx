import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import './AccessibilityControls.css';

const AccessibilityControls = () => {
  const { language, translations } = useLanguage();
  const {
    fontScale,
    setFontScale,
    dyslexiaFont,
    setDyslexiaFont,
    reducedMotionPref,
    setReducedMotionPref,
  } = useSettings();

  const getNestedTranslation = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const t = (key) => {
    const translatedText = getNestedTranslation(translations[language], key);
    return translatedText == null ? key : translatedText;
  };

  return (
    <details className="a11y-controls">
      <summary className="a11y-controls-toggle">
        {t('settings.accessibility')}
      </summary>

      <div className="a11y-controls-panel">
        <label className="a11y-row">
          <span>{t('settings.text_size')}</span>
          <select
            value={String(fontScale)}
            onChange={(e) => setFontScale(Number(e.target.value))}
          >
            <option value="1">{t('settings.text_normal')}</option>
            <option value="1.15">{t('settings.text_large')}</option>
            <option value="1.3">{t('settings.text_xlarge')}</option>
          </select>
        </label>

        <label className="a11y-check">
          <input
            type="checkbox"
            checked={dyslexiaFont}
            onChange={(e) => setDyslexiaFont(e.target.checked)}
          />
          <span>{t('settings.dyslexia_font')}</span>
        </label>

        <label className="a11y-check">
          <input
            type="checkbox"
            checked={reducedMotionPref}
            onChange={(e) => setReducedMotionPref(e.target.checked)}
          />
          <span>{t('settings.reduced_motion')}</span>
        </label>
      </div>
    </details>
  );
};

export default AccessibilityControls;
