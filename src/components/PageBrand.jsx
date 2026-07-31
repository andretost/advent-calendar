import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './PageBrand.css';

const PageBrand = ({ overlap = false }) => {
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

  return (
    <header className={`page-brand${overlap ? ' page-brand--overlap' : ''}`}>
      <img
        src={`${process.env.PUBLIC_URL}/images/tarek-and-tonja.png`}
        alt={t('header.alt_image')}
        className="page-brand-image"
      />
      <div className="page-brand-text">
        <h1>{t('header.title')}</h1>
        <p>{t('header.subtitle')}</p>
      </div>
    </header>
  );
};

export default PageBrand;
