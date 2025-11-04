import React from 'react';
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage
import './Recipes.css';

const Recipes = () => {
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

  return (
    <div className="recipes-page">
      <div className="recipes-content-wrapper">
        <h1>{t('recipes_page.title')}</h1>
        <p>{t('recipes_page.placeholder_text')}</p>
      </div>
    </div>
  );
};

export default Recipes;
