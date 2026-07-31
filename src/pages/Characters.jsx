import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import characters from '../data/characters.json';
import { readOpenedDays } from '../utils/openedDays';
import './Characters.css';

const Characters = () => {
  const { language, translations } = useLanguage();
  const [openedDays, setOpenedDays] = useState(readOpenedDays);

  useEffect(() => {
    const sync = () => setOpenedDays(readOpenedDays());
    window.addEventListener('storage', sync);
    window.addEventListener('focus', sync);
    sync();
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('focus', sync);
    };
  }, []);

  const getNestedTranslation = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const t = (key, options) => {
    let text = getNestedTranslation(translations[language], key);
    if (text === undefined || text === null) return key;
    if (options) {
      Object.entries(options).forEach(([name, value]) => {
        text = text.replace(`{{${name}}}`, value);
      });
    }
    return text;
  };

  const cards = useMemo(() => {
    return characters.map((character) => {
      const unlocked = openedDays.includes(character.unlockDay);
      return {
        ...character,
        unlocked,
        name: language === 'en' ? character.name_en : character.name_de,
        role: language === 'en' ? character.role_en : character.role_de,
        bio: language === 'en' ? character.bio_en : character.bio_de,
      };
    });
  }, [openedDays, language]);

  const unlockedCount = cards.filter((c) => c.unlocked).length;

  return (
    <div className="characters-page">
      <div className="characters-intro content-panel">
        <h2>{t('characters_page.title')}</h2>
        <p>{t('characters_page.intro')}</p>
        <p className="characters-progress">
          {t('characters_page.progress', { unlocked: unlockedCount, total: cards.length })}
        </p>
      </div>

      <div className="characters-grid">
        {cards.map((character) => (
          <article
            key={character.id}
            className={`character-card${character.unlocked ? ' is-unlocked' : ' is-locked'}`}
          >
            <div className="character-portrait">
              {character.unlocked ? (
                <img
                  src={`${process.env.PUBLIC_URL}/${character.image}`}
                  alt={character.name}
                />
              ) : (
                <div className="character-silhouette" aria-hidden="true">?</div>
              )}
            </div>
            <div className="character-body">
              {character.unlocked ? (
                <>
                  <h3>{character.name}</h3>
                  <p className="character-role">{character.role}</p>
                  <p>{character.bio}</p>
                  <Link
                    className="character-day-link"
                    to={`/calendar/${parseInt(character.unlockDay, 10)}`}
                  >
                    {t('characters_page.from_day', {
                      dayNumber: parseInt(character.unlockDay, 10),
                    })}
                  </Link>
                </>
              ) : (
                <>
                  <h3>{t('characters_page.locked_title')}</h3>
                  <p>{t('characters_page.locked_text', {
                    dayNumber: parseInt(character.unlockDay, 10),
                  })}</p>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Characters;
