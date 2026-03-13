import htm from 'https://esm.sh/htm@3.1.1';
import { h } from 'https://esm.sh/preact@10.25.4';

export const html = htm.bind(h);

/** Parse "8:30 AM" into minutes since midnight (for sorting). */
export function parseTimeString(str) {
  const match = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let [, h, m, period] = match;
  h = parseInt(h, 10);
  m = parseInt(m, 10);
  if (period.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (period.toUpperCase() === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

/** Format an ISO datetime string to "h:mm AM/PM". Returns null if invalid. */
export function formatTime(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, '0')} ${ampm}`;
}

/** Fisher-Yates shuffle (returns new array). */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
