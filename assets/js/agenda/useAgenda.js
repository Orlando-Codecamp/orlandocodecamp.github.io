import { useState, useCallback, useMemo } from 'https://esm.sh/preact@10.25.4/hooks';

// ---------------------------------------------------------------------------
// useAgenda — localStorage-backed agenda (bookmarked session IDs)
// ---------------------------------------------------------------------------

const STORAGE_VERSION = 1;

function storageKey(eventId) {
  return `codecamp-agenda-${eventId}`;
}

function buildAgendaPayload(eventId, sessionIds) {
  return {
    version: STORAGE_VERSION,
    eventId,
    updatedAt: new Date().toISOString(),
    sessions: sessionIds
  };
}

function loadAgenda(eventId) {
  try {
    const raw = localStorage.getItem(storageKey(eventId));
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (data.version !== STORAGE_VERSION || data.eventId !== eventId) return [];
    return data.sessions || [];
  } catch {
    return [];
  }
}

function saveAgenda(eventId, sessionIds) {
  localStorage.setItem(storageKey(eventId), JSON.stringify(buildAgendaPayload(eventId, sessionIds)));
}

export function useAgenda(eventId) {
  const [savedSessionIds, setSavedSessionIds] = useState(() => loadAgenda(eventId));

  const savedSet = useMemo(() => new Set(savedSessionIds), [savedSessionIds]);

  const toggleSession = useCallback((sessionId) => {
    setSavedSessionIds(prev => {
      const next = prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId];
      saveAgenda(eventId, next);
      return next;
    });
  }, [eventId]);

  const clearAgenda = useCallback(() => {
    setSavedSessionIds([]);
    saveAgenda(eventId, []);
  }, [eventId]);

  const exportAgenda = useCallback(() => {
    return JSON.stringify(buildAgendaPayload(eventId, savedSessionIds), null, 2);
  }, [eventId, savedSessionIds]);

  const importAgenda = useCallback((jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.version !== STORAGE_VERSION) return { success: false, error: 'Incompatible agenda version.' };
      if (data.eventId !== eventId) return { success: false, error: 'This agenda is for a different event.' };
      if (!Array.isArray(data.sessions)) return { success: false, error: 'Invalid agenda format.' };
      const ids = data.sessions.filter(id => typeof id === 'number' || typeof id === 'string');
      setSavedSessionIds(ids);
      saveAgenda(eventId, ids);
      return { success: true, count: ids.length };
    } catch {
      return { success: false, error: 'Invalid JSON. Please check the format and try again.' };
    }
  }, [eventId]);

  return useMemo(() => ({
    savedSessionIds,
    savedSet,
    toggleSession,
    clearAgenda,
    exportAgenda,
    importAgenda
  }), [savedSessionIds, savedSet, toggleSession, clearAgenda, exportAgenda, importAgenda]);
}
