import { h, render } from 'https://esm.sh/preact@10.25.4';
import { useState, useEffect, useCallback, useMemo, useRef } from 'https://esm.sh/preact@10.25.4/hooks';
import { html, parseTimeString, formatTime, shuffle } from './helpers.js';
import { useAgenda } from './useAgenda.js';
import {
  AgendaTimeline,
  FilterBar,
  TimeSlotNav,
  SessionModal,
  ImportExportModal
} from './components.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Read URL query params into filter state. */
function filtersFromURL() {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get('q') || '',
    category: params.get('cat') || '',
    room: params.get('room') || '',
    myAgenda: params.get('view') === 'my-agenda'
  };
}

/** Read session ID from URL hash (e.g. #session=12345). */
function sessionIdFromURL() {
  const match = window.location.hash.match(/^#session=(.+)$/);
  return match ? match[1] : null;
}

/** Sync filter state to URL query params (replaceState, no reload). */
function filtersToURL(filters) {
  const params = new URLSearchParams();
  if (filters.search) params.set('q', filters.search);
  if (filters.category) params.set('cat', filters.category);
  if (filters.room) params.set('room', filters.room);
  if (filters.myAgenda) params.set('view', 'my-agenda');
  const qs = params.toString();
  const hash = window.location.hash;
  const url = `${window.location.pathname}${qs ? '?' + qs : ''}${hash}`;
  window.history.replaceState(null, '', url);
}

// ---------------------------------------------------------------------------
// Main App
// ---------------------------------------------------------------------------

function AgendaApp() {
  // Data from Sessionize
  const [sessions, setSessions] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);

  // Shuffled order for unscheduled sessions (computed once on data load)
  const shuffledOrderRef = useRef(null);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(filtersFromURL);
  const [modalSession, setModalSession] = useState(null);
  const [importExportMode, setImportExportMode] = useState(null); // 'import' | 'export' | null

  // Track session ID from URL to open once data loads
  const pendingSessionIdRef = useRef(sessionIdFromURL());

  // Read config from the DOM once (not on every render)
  const { apiId, sessionThreshold, locationQuestionId, bookendEvents } = useMemo(() => {
    const root = document.getElementById('agenda-app');
    const apiId = root.dataset.apiId;
    const sessionThreshold = parseInt(root.dataset.sessionThreshold, 10) || 50;
    const locationQuestionId = root.dataset.locationQuestionId ? parseInt(root.dataset.locationQuestionId, 10) : null;
    let bookendEvents = [];
    try {
      const el = document.getElementById('bookend-events-data');
      bookendEvents = JSON.parse(el?.textContent || '[]');
    } catch { /* use empty array */ }
    return { apiId, sessionThreshold, locationQuestionId, bookendEvents };
  }, []);

  // Agenda (bookmarked sessions in localStorage)
  const agenda = useAgenda(apiId);

  // Fetch Sessionize data
  useEffect(() => {
    const url = `https://sessionize.com/api/v2/${apiId}/view/All`;
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        const loadedSessions = data.sessions || [];
        setSessions(loadedSessions);
        setSpeakers(data.speakers || []);
        setRooms(data.rooms || []);
        setCategories(data.categories || []);

        // Build a shuffled ID to index map for unscheduled sessions (once)
        const unscheduledIds = shuffle(
          loadedSessions.filter(s => !s.isServiceSession && !s.startsAt).map(s => s.id)
        );
        const orderMap = new Map();
        unscheduledIds.forEach((id, i) => orderMap.set(id, i));
        shuffledOrderRef.current = orderMap;

        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load sessions:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiId]);

  // Open modal from URL session param after data loads
  useEffect(() => {
    const pendingId = pendingSessionIdRef.current;
    if (pendingId && sessions.length > 0) {
      const found = sessions.find(s => String(s.id) === String(pendingId));
      if (found) setModalSession(found);
      pendingSessionIdRef.current = null;
    }
  }, [sessions]);

  // Wrap setModalSession to sync session ID to URL hash
  const openSessionModal = useCallback((session) => {
    setModalSession(session);
    if (session) {
      const qs = window.location.search;
      const url = `${window.location.pathname}${qs}#session=${session.id}`;
      window.history.replaceState(null, '', url);
    }
  }, []);

  const closeSessionModal = useCallback(() => {
    setModalSession(null);
    const qs = window.location.search;
    const url = `${window.location.pathname}${qs}`;
    window.history.replaceState(null, '', url);
  }, []);

  // Debounced URL sync (300ms) to avoid replaceState churn on every keystroke
  const urlSyncTimerRef = useRef(null);
  useEffect(() => {
    clearTimeout(urlSyncTimerRef.current);
    urlSyncTimerRef.current = setTimeout(() => filtersToURL(filters), 300);
    return () => clearTimeout(urlSyncTimerRef.current);
  }, [filters]);

  // Build lookup maps
  const speakerMap = useMemo(() => {
    const map = {};
    speakers.forEach(s => { map[s.id] = s; });
    return map;
  }, [speakers]);

  const roomMap = useMemo(() => {
    const map = {};
    rooms.forEach(r => { map[r.id] = r; });
    return map;
  }, [rooms]);

  const categoryItemMap = useMemo(() => {
    const map = {};
    categories.forEach(cat => {
      (cat.items || []).forEach(item => {
        map[item.id] = { ...item, categoryTitle: cat.title };
      });
    });
    return map;
  }, [categories]);

  // Group sessions by time slot & apply filters
  const { timeSlots, unscheduledSessions, filteredSessions } = useMemo(() => {
    let filtered = sessions.filter(s => !s.isServiceSession);

    // Apply "My Agenda" filter
    if (filters.myAgenda) {
      filtered = filtered.filter(s => agenda.savedSet.has(s.id));
    }

    // Apply search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(s => {
        const title = (s.title || '').toLowerCase();
        const desc = (s.description || '').toLowerCase();
        const speakerNames = (s.speakers || [])
          .map(id => (speakerMap[id]?.fullName || '').toLowerCase())
          .join(' ');
        return title.includes(q) || desc.includes(q) || speakerNames.includes(q);
      });
    }

    // Apply category filter
    if (filters.category) {
      const catId = parseInt(filters.category, 10);
      filtered = filtered.filter(s =>
        (s.categoryItems || []).includes(catId)
      );
    }

    // Apply room filter
    if (filters.room) {
      const roomId = parseInt(filters.room, 10);
      filtered = filtered.filter(s => s.roomId === roomId);
    }

    // Separate scheduled vs unscheduled
    const scheduled = filtered.filter(s => s.startsAt);
    const unscheduled = filtered.filter(s => !s.startsAt);

    // Sort unscheduled by the pre-shuffled order (stable across filter changes)
    const orderMap = shuffledOrderRef.current;
    const unscheduledSessions = orderMap
      ? [...unscheduled].sort((a, b) => (orderMap.get(a.id) ?? 999) - (orderMap.get(b.id) ?? 999))
      : unscheduled;

    // Group scheduled sessions by startsAt
    const slotMap = {};
    scheduled.forEach(s => {
      const key = s.startsAt;
      if (!slotMap[key]) slotMap[key] = [];
      slotMap[key].push(s);
    });

    // Sort slots chronologically, sessions by room sort order
    const sorted = Object.keys(slotMap).sort((a, b) => new Date(a) - new Date(b));
    const timeSlots = sorted.map(key => ({
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

    return { timeSlots, unscheduledSessions, filteredSessions: filtered };
  }, [sessions, filters, speakerMap, roomMap, agenda.savedSet]);

  // Detect time-slot conflicts: slots where 2+ saved sessions overlap
  const conflictSlots = useMemo(() => {
    const slotCounts = {};
    sessions.filter(s => !s.isServiceSession && s.startsAt && agenda.savedSet.has(s.id))
      .forEach(s => {
        slotCounts[s.startsAt] = (slotCounts[s.startsAt] || 0) + 1;
      });
    return new Set(Object.keys(slotCounts).filter(k => slotCounts[k] > 1));
  }, [sessions, agenda.savedSet]);

  // Total scheduled sessions (unfiltered) for threshold check
  const totalScheduledCount = useMemo(() =>
    sessions.filter(s => !s.isServiceSession && s.startsAt).length,
    [sessions]
  );

  // Unify bookend events and session time slots into one timeline
  const timeline = useMemo(() => {
    const items = [];

    // Only show the full timeline once we hit critical mass of scheduled sessions
    // (uses unfiltered count so filtering doesn't collapse the timeline)
    if (totalScheduledCount < sessionThreshold) return items;

    // Convert bookend events to unified timeline items
    bookendEvents.forEach((evt, i) => {
      const slotId = `bookend-${i}`;
      items.push({
        type: 'bookend',
        sortMinutes: parseTimeString(evt.time),
        slotId,
        label: evt.time,
        endLabel: evt.end_time || '',
        data: evt
      });
    });

    // Convert session time slots to unified timeline items
    timeSlots.forEach(slot => {
      const d = new Date(slot.startsAt);
      const mins = d.getHours() * 60 + d.getMinutes();
      items.push({
        type: 'timeslot',
        sortMinutes: mins,
        slotId: slot.startsAt,
        label: slot.label,
        endLabel: slot.endLabel,
        data: slot
      });
    });

    // Sort by time, bookend events first at same time
    items.sort((a, b) => {
      if (a.sortMinutes !== b.sortMinutes) return a.sortMinutes - b.sortMinutes;
      return a.type === 'bookend' ? -1 : 1;
    });

    return items;
  }, [bookendEvents, timeSlots]);

  // Filter handlers
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'myAgenda') {
      requestAnimationFrame(() => {
        document.querySelector('.agenda-container')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ search: '', category: '', room: '', myAgenda: false });
  }, []);

  const hasFilters = !!(filters.search || filters.category || filters.room || filters.myAgenda);

  // Close modal on Escape
  useEffect(() => {
    if (!modalSession) return;
    const handler = (e) => { if (e.key === 'Escape') closeSessionModal(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [modalSession]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (modalSession || importExportMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalSession, importExportMode]);

  // Measure timeslot nav height and set CSS variable for filter bar offset
  useEffect(() => {
    const nav = document.querySelector('.timeslot-nav');
    if (!nav) return;
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty(
        '--timeslot-nav-height',
        `${entry.borderBoxSize?.[0]?.blockSize ?? entry.target.offsetHeight}px`
      );
    });
    observer.observe(nav);
    return () => observer.disconnect();
  }, [timeline]);

  // ----- Render -----

  if (loading) {
    return html`
      <div class="agenda-loading">
        <div class="agenda-loading-spinner"></div>
        <p>Loading sessions...</p>
      </div>
    `;
  }

  if (error) {
    return html`
      <div class="agenda-error">
        <p>Unable to load session data. Please try again in a moment.</p>
        <p class="agenda-error-detail">${error}</p>
        <button class="btn btn-secondary" onClick=${() => window.location.reload()}>
          Try Again
        </button>
      </div>
    `;
  }

  return html`
    <div class="agenda-container container">
      <${TimeSlotNav} timeline=${timeline} />
      <${FilterBar}
        filters=${filters}
        categories=${categories}
        rooms=${rooms}
        onFilter=${updateFilter}
        onClear=${clearFilters}
        hasFilters=${hasFilters}
        resultCount=${filteredSessions.length}
        totalCount=${sessions.filter(s => !s.isServiceSession).length}
        savedCount=${agenda.savedCount}
        onExport=${() => setImportExportMode('export')}
        onImport=${() => setImportExportMode('import')}
      />
      <${AgendaTimeline}
        timeline=${timeline}
        unscheduledSessions=${unscheduledSessions}
        speakerMap=${speakerMap}
        roomMap=${roomMap}
        categoryItemMap=${categoryItemMap}
        onSessionClick=${openSessionModal}
        hasFilters=${hasFilters}
        agenda=${agenda}
        isMyAgenda=${filters.myAgenda}
        conflictSlots=${conflictSlots}
      />
    </div>
    ${importExportMode && html`
      <${ImportExportModal}
        mode=${importExportMode}
        agenda=${agenda}
        onClose=${() => setImportExportMode(null)}
      />
    `}
    ${modalSession && html`
      <${SessionModal}
        session=${modalSession}
        sessions=${sessions}
        speakerMap=${speakerMap}
        roomMap=${roomMap}
        categoryItemMap=${categoryItemMap}
        locationQuestionId=${locationQuestionId}
        onClose=${closeSessionModal}
        onSessionClick=${openSessionModal}
        agenda=${agenda}
      />
    `}
  `;
}

// ---------------------------------------------------------------------------
// Mount
// ---------------------------------------------------------------------------

const root = document.getElementById('agenda-app');
if (root) {
  render(html`<${AgendaApp} />`, root);
}
