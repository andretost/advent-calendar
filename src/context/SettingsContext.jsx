import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SettingsContext = createContext(null);

/**
 * Advent date lock master switch.
 * Set to `true` when you want doors limited to today-and-earlier (and the
 * menu / ?preview=1 unlock behavior). Leave `false` while testers explore.
 */
export const ADVENT_DATE_LOCK = false;

const STORAGE = {
  doorLock: 'advent-calendar-door-lock',
  fontScale: 'advent-calendar-font-scale',
  dyslexia: 'advent-calendar-dyslexia',
  reducedMotion: 'advent-calendar-reduced-motion',
  previewSession: 'advent-calendar-preview-session',
};

const readBool = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return raw === '1';
  } catch {
    return fallback;
  }
};

const readScale = () => {
  try {
    const raw = localStorage.getItem(STORAGE.fontScale);
    const value = Number(raw);
    return [1, 1.15, 1.3].includes(value) ? value : 1;
  } catch {
    return 1;
  }
};

export const SettingsProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const previewFromUrl = searchParams.get('preview') === '1';
  const [previewSession, setPreviewSession] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE.previewSession) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!previewFromUrl) return;
    setPreviewSession(true);
    try {
      sessionStorage.setItem(STORAGE.previewSession, '1');
    } catch { /* ignore */ }
  }, [previewFromUrl]);

  const previewUnlock = previewFromUrl || previewSession;

  const [doorLockEnabled, setDoorLockEnabledState] = useState(() =>
    readBool(STORAGE.doorLock, true)
  );
  const [fontScale, setFontScaleState] = useState(readScale);
  const [dyslexiaFont, setDyslexiaFontState] = useState(() =>
    readBool(STORAGE.dyslexia, false)
  );
  const [reducedMotionPref, setReducedMotionPrefState] = useState(() =>
    readBool(STORAGE.reducedMotion, false)
  );
  const [systemReducedMotion, setSystemReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setSystemReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const setDoorLockEnabled = (value) => {
    setDoorLockEnabledState(value);
    try {
      localStorage.setItem(STORAGE.doorLock, value ? '1' : '0');
    } catch { /* ignore */ }
  };

  const setFontScale = (value) => {
    setFontScaleState(value);
    try {
      localStorage.setItem(STORAGE.fontScale, String(value));
    } catch { /* ignore */ }
  };

  const setDyslexiaFont = (value) => {
    setDyslexiaFontState(value);
    try {
      localStorage.setItem(STORAGE.dyslexia, value ? '1' : '0');
    } catch { /* ignore */ }
  };

  const setReducedMotionPref = (value) => {
    setReducedMotionPrefState(value);
    try {
      localStorage.setItem(STORAGE.reducedMotion, value ? '1' : '0');
    } catch { /* ignore */ }
  };

  const reducedMotion = reducedMotionPref || systemReducedMotion;
  const doorsUnlocked = !ADVENT_DATE_LOCK || previewUnlock || !doorLockEnabled;

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(fontScale));
    document.documentElement.classList.toggle('dyslexia-font', dyslexiaFont);
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
  }, [fontScale, dyslexiaFont, reducedMotion]);

  const value = useMemo(
    () => ({
      doorLockEnabled,
      setDoorLockEnabled,
      doorsUnlocked,
      previewUnlock,
      fontScale,
      setFontScale,
      dyslexiaFont,
      setDyslexiaFont,
      reducedMotion,
      reducedMotionPref,
      setReducedMotionPref,
    }),
    [
      doorLockEnabled,
      doorsUnlocked,
      previewUnlock,
      fontScale,
      dyslexiaFont,
      reducedMotion,
      reducedMotionPref,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return ctx;
};

/** Advent door availability when lock is active. */
export const canOpenDay = (dayKey, doorsUnlocked) => {
  if (doorsUnlocked) return true;
  const dayNum = parseInt(dayKey, 10);
  if (!dayNum || dayNum < 1 || dayNum > 24) return false;

  const now = new Date();
  const month = now.getMonth(); // 0-based; 11 = December
  const date = now.getDate();

  // Active Advent: Dec 1–24 — only today and earlier
  if (month === 11 && date >= 1 && date <= 24) {
    return dayNum <= date;
  }
  // After Dec 24 in December — season complete, allow all
  if (month === 11 && date > 24) {
    return true;
  }
  // Outside Advent season with lock on — not yet / wait for December
  return false;
};
