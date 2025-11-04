import React from 'react';
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage
// Removed: import './DayModal.css';

export default function DayModal({ dayData, onClose }) {
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

  if (!dayData) return null;

  const displayedText = language === 'en' && dayData.en_text ? dayData.en_text : dayData.text;
  const audioSrc = language === 'en' && dayData.en_audio ? dayData.en_audio : dayData.audio;

  return (
    <div className="modal">
      <img src={`${process.env.PUBLIC_URL}/${dayData.image}`} alt="Illustration" />
      <p>{displayedText}</p>
      <audio controls src={audioSrc}></audio>
      <button onClick={onClose}>{t('modal.close')}</button>
    </div>
  );
}
