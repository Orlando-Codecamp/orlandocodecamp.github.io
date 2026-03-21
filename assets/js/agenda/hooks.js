import { useState, useCallback, useMemo } from 'https://esm.sh/preact@10.25.4/hooks';

// ---------------------------------------------------------------------------
// useBookmarks — localStorage-backed bookmarked session IDs
// ---------------------------------------------------------------------------

const STORAGE_VERSION = 1;

function bookmarksKey(eventId) {
  return `codecamp-bookmarks-${eventId}`;
}

function oldAgendaKey(eventId) {
  return `codecamp-agenda-${eventId}`;
}

function buildBookmarksPayload(eventId, sessionIds) {
  return {
    version: STORAGE_VERSION,
    eventId,
    updatedAt: new Date().toISOString(),
    sessions: sessionIds
  };
}

function loadBookmarks(eventId) {
  try {
    const key = bookmarksKey(eventId);
    let raw = localStorage.getItem(key);

    // Migration: validate old data before migrating to new key
    if (!raw) {
      const oldKey = oldAgendaKey(eventId);
      const oldRaw = localStorage.getItem(oldKey);
      if (oldRaw) {
        try {
          const oldData = JSON.parse(oldRaw);
          if (oldData.version === STORAGE_VERSION && oldData.eventId === eventId && Array.isArray(oldData.sessions)) {
            localStorage.setItem(key, oldRaw);
            localStorage.removeItem(oldKey);
            raw = oldRaw;
          }
        } catch {
          // Leave old key as fallback if parsing fails
        }
      }
    }

    if (!raw) return [];
    const data = JSON.parse(raw);
    if (data.version !== STORAGE_VERSION || data.eventId !== eventId) return [];
    return data.sessions || [];
  } catch {
    return [];
  }
}

function saveBookmarks(eventId, sessionIds) {
  localStorage.setItem(bookmarksKey(eventId), JSON.stringify(buildBookmarksPayload(eventId, sessionIds)));
}

export function useBookmarks(eventId) {
  const [bookmarkedIds, setBookmarkedIds] = useState(() => loadBookmarks(eventId));

  const bookmarkedSet = useMemo(() => new Set(bookmarkedIds), [bookmarkedIds]);

  const toggleBookmark = useCallback((sessionId) => {
    setBookmarkedIds(prev => {
      const next = prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId];
      saveBookmarks(eventId, next);
      return next;
    });
  }, [eventId]);

  const clearBookmarks = useCallback(() => {
    setBookmarkedIds([]);
    saveBookmarks(eventId, []);
  }, [eventId]);

  const exportBookmarks = useCallback(() => {
    return JSON.stringify(buildBookmarksPayload(eventId, bookmarkedIds), null, 2);
  }, [eventId, bookmarkedIds]);

  const importBookmarks = useCallback((jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.version !== STORAGE_VERSION) return { success: false, error: 'Incompatible version.' };
      if (data.eventId !== eventId) return { success: false, error: 'This data is for a different event.' };
      if (!Array.isArray(data.sessions)) return { success: false, error: 'Invalid format.' };
      const ids = data.sessions.filter(id => typeof id === 'number' || typeof id === 'string');
      setBookmarkedIds(ids);
      saveBookmarks(eventId, ids);
      return { success: true, count: ids.length };
    } catch {
      return { success: false, error: 'Invalid JSON. Please check the format and try again.' };
    }
  }, [eventId]);

  return useMemo(() => ({
    bookmarkedIds,
    bookmarkedSet,
    toggleBookmark,
    clearBookmarks,
    exportBookmarks,
    importBookmarks
  }), [bookmarkedIds, bookmarkedSet, toggleBookmark, clearBookmarks, exportBookmarks, importBookmarks]);
}

// ---------------------------------------------------------------------------
// useAgendaBuilder — one session per time slot, stored in localStorage
// ---------------------------------------------------------------------------

const BUILDER_VERSION = 1;

function builderKey(eventId) {
  return `codecamp-agenda-builder-${eventId}`;
}

function loadBuilder(eventId) {
  try {
    const raw = localStorage.getItem(builderKey(eventId));
    if (!raw) return {};
    const data = JSON.parse(raw);
    if (data.version !== BUILDER_VERSION || data.eventId !== eventId) return {};
    return data.selections || {};
  } catch {
    return {};
  }
}

function saveBuilder(eventId, selections) {
  const payload = {
    version: BUILDER_VERSION,
    eventId,
    updatedAt: new Date().toISOString(),
    selections
  };
  localStorage.setItem(builderKey(eventId), JSON.stringify(payload));
}

export function useAgendaBuilder(eventId) {
  const [selections, setSelections] = useState(() => loadBuilder(eventId));

  const selectedSet = useMemo(() => new Set(Object.values(selections)), [selections]);

  const selectSession = useCallback((slotKey, sessionId) => {
    setSelections(prev => {
      const next = { ...prev, [slotKey]: sessionId };
      saveBuilder(eventId, next);
      return next;
    });
  }, [eventId]);

  const deselectSlot = useCallback((slotKey) => {
    setSelections(prev => {
      const next = { ...prev };
      delete next[slotKey];
      saveBuilder(eventId, next);
      return next;
    });
  }, [eventId]);

  const clearBuilder = useCallback(() => {
    setSelections({});
    saveBuilder(eventId, {});
  }, [eventId]);

  const selectedCount = useMemo(() => Object.keys(selections).length, [selections]);

  return useMemo(() => ({
    selections,
    selectedSet,
    selectSession,
    deselectSlot,
    clearBuilder,
    selectedCount
  }), [selections, selectedSet, selectSession, deselectSlot, clearBuilder, selectedCount]);
}
