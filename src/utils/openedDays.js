const OPENED_KEY = 'advent-calendar-opened-days';

export const readOpenedDays = () => {
  try {
    const raw = localStorage.getItem(OPENED_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((d) => /^\d{2}$/.test(d)) : [];
  } catch {
    return [];
  }
};

export const writeOpenedDays = (days) => {
  try {
    localStorage.setItem(OPENED_KEY, JSON.stringify(days));
  } catch {
    /* ignore */
  }
};
