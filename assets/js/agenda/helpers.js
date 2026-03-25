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

/**
 * Extract hours and minutes from an ISO datetime string using the event-local
 * time (the time as written in the ISO string) rather than converting to the
 * browser's timezone. Returns { h, m } or null.
 */
function parseISOLocal(iso) {
  if (!iso) return null;
  const match = iso.match(/T(\d{2}):(\d{2})/);
  if (!match) return null;
  return { h: parseInt(match[1], 10), m: parseInt(match[2], 10) };
}

/** Extract event-local minutes since midnight from an ISO datetime string. Returns 0 if unparseable (safe — Sessionize always provides valid ISO). */
export function parseISOMinutes(iso) {
  const t = parseISOLocal(iso);
  return t ? t.h * 60 + t.m : 0;
}

/** Format an ISO datetime string to "h:mm AM/PM" in the event's local time. */
export function formatTime(iso) {
  const t = parseISOLocal(iso);
  if (!t) return null;
  const ampm = t.h >= 12 ? 'PM' : 'AM';
  const h = t.h % 12 || 12;
  return `${h}:${t.m.toString().padStart(2, '0')} ${ampm}`;
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

/** Group scheduled sessions into time slots sorted chronologically. */
export function groupByTimeSlot(sessions, roomMap) {
  const slotMap = {};
  sessions.forEach(s => {
    const key = s.startsAt;
    if (!slotMap[key]) slotMap[key] = [];
    slotMap[key].push(s);
  });
  const sorted = Object.keys(slotMap).sort((a, b) => new Date(a) - new Date(b));
  return sorted.map(key => ({
    startsAt: key,
    endsAt: slotMap[key][0]?.endsAt,
    label: formatTime(key),
    endLabel: formatTime(slotMap[key][0]?.endsAt) || '',
    sessions: slotMap[key].sort((a, b) => {
      const roomA = roomMap[a.roomId]?.sort ?? 999;
      const roomB = roomMap[b.roomId]?.sort ?? 999;
      return roomA - roomB;
    })
  }));
}

/** Selector for all focusable elements inside a container. */
const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Create a keydown handler that traps Tab focus within a modal and
 * optionally closes on Escape.
 */
export function createFocusTrapHandler(modalRef, onClose) {
  return (e) => {
    if (e.key === 'Escape' && onClose) { onClose(); return; }
    if (e.key !== 'Tab') return;
    const modal = modalRef.current;
    if (!modal) return;
    const focusable = modal.querySelectorAll(FOCUSABLE_SELECTOR);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
}

/** Auto-focus the first element matching `selector` inside `ref` on mount. */
export function focusOnMount(ref, selector) {
  const el = ref.current;
  if (el) {
    const target = el.querySelector(selector);
    if (target) target.focus();
  }
}
