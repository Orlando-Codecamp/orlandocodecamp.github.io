import { h } from 'https://esm.sh/preact@10.25.4';
import { useState, useRef, useEffect, useCallback, useMemo } from 'https://esm.sh/preact@10.25.4/hooks';
import { html, formatTime, createFocusTrapHandler, focusOnMount } from './helpers.js';

// ---------------------------------------------------------------------------
// TimeSlotNav — horizontal scrollable pill buttons for quick-jump
// ---------------------------------------------------------------------------

export function TimeSlotNav({ timeline }) {
  const [activeSlot, setActiveSlot] = useState(null);
  const navRef = useRef(null);

  // Observe which time slot is currently in view
  useEffect(() => {
    const headers = document.querySelectorAll('[data-timeslot-id]');
    if (!headers.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSlot(entry.target.dataset.timeslotId);
          }
        });
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    );

    headers.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [timeline]);

  function scrollTo(slotId) {
    const el = document.querySelector(`[data-timeslot-id="${CSS.escape(slotId)}"]`);
    if (el) {
      // Measure actual sticky elements instead of hardcoding offset
      const filterBar = document.querySelector('.filter-bar');
      const headerOffset = (filterBar?.getBoundingClientRect().bottom ?? 140) + 8;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  if (!timeline.length) return null;

  return html`
    <nav class="timeslot-nav" ref=${navRef} aria-label="Jump to time slot">
      <div class="timeslot-nav-scroll">
        ${timeline.map(item => html`
          <button
            key=${item.slotId}
            class="timeslot-pill ${item.type === 'bookend' ? 'pill-bookend' : ''} ${activeSlot === item.slotId ? 'active' : ''}"
            onClick=${() => scrollTo(item.slotId)}
            aria-label="Jump to ${item.label}"
          >
            ${item.label}
          </button>
        `)}
      </div>
    </nav>
  `;
}

// ---------------------------------------------------------------------------
// FilterBar — search, category dropdown, room dropdown
// ---------------------------------------------------------------------------

export function FilterBar({ filters, categories, rooms, onFilter, onClear, hasFilters, resultCount, totalCount, savedCount, onExport, onImport }) {
  const [expanded, setExpanded] = useState(false);

  // Build flat category items list for dropdown (memoized to avoid rebuild on every keystroke)
  const categoryItems = useMemo(() => {
    const items = [];
    (categories || []).forEach(cat => {
      (cat.items || []).forEach(item => {
        items.push({ id: item.id, name: item.name, group: cat.title });
      });
    });
    return items;
  }, [categories]);

  return html`
    <div class="filter-bar">
      <div class="filter-bar-top">
        <button
          class="filter-toggle btn btn-ghost"
          onClick=${() => setExpanded(!expanded)}
          aria-expanded=${expanded}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="8" y1="12" x2="20" y2="12"/>
            <line x1="12" y1="18" x2="20" y2="18"/>
          </svg>
          Filters
          ${hasFilters && html`<span class="filter-count">${resultCount}</span>`}
        </button>

        <div class="my-agenda-controls">
          <button
            class="btn my-agenda-toggle ${filters.myAgenda ? 'active' : ''}"
            onClick=${() => onFilter('myAgenda', !filters.myAgenda)}
            aria-pressed=${filters.myAgenda}
            aria-label="Show my agenda"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill=${filters.myAgenda ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            My Agenda
            ${savedCount > 0 && html`<span class="my-agenda-count">${savedCount}</span>`}
          </button>
          <button
            class="btn btn-ghost agenda-io-btn"
            onClick=${onImport}
            aria-label="Import agenda"
            title="Import agenda"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
          ${savedCount > 0 && html`
            <button
              class="btn btn-ghost agenda-io-btn"
              onClick=${onExport}
              aria-label="Export agenda"
              title="Export agenda"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </button>
          `}
        </div>
      </div>

      <div class="filter-controls ${expanded ? 'expanded' : ''}">
        <div class="filter-row">
          <div class="filter-field filter-search">
            <input
              type="text"
              placeholder="Search sessions or speakers..."
              value=${filters.search}
              onInput=${(e) => onFilter('search', e.target.value)}
              aria-label="Search sessions"
            />
            ${filters.search && html`
              <button class="filter-clear-input" onClick=${() => onFilter('search', '')} aria-label="Clear search">
                ×
              </button>
            `}
          </div>

          <div class="filter-field">
            <select
              value=${filters.category}
              onChange=${(e) => onFilter('category', e.target.value)}
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              ${categoryItems.map(item => html`
                <option key=${item.id} value=${item.id}>${item.name}</option>
              `)}
            </select>
          </div>

          <div class="filter-field">
            <select
              value=${filters.room}
              onChange=${(e) => onFilter('room', e.target.value)}
              aria-label="Filter by room"
            >
              <option value="">All Rooms</option>
              ${(rooms || []).map(r => html`
                <option key=${r.id} value=${r.id}>${r.name}</option>
              `)}
            </select>
          </div>

          ${hasFilters && html`
            <button class="btn btn-ghost filter-clear-all" onClick=${onClear}>
              Clear All
            </button>
          `}
        </div>

        ${hasFilters && html`
          <p class="filter-results">
            Showing ${resultCount} of ${totalCount} sessions
          </p>
        `}
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// BookendEvent — static event card (registration, lunch, keynote, etc.)
// ---------------------------------------------------------------------------

const bookendTypeIcons = {
  logistics: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  keynote: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  social: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
};

export function BookendEvent({ event }) {

  return html`
    <div class="bookend-event bookend-${event.type}">
      <div class="bookend-icon">${bookendTypeIcons[event.type] || bookendTypeIcons.logistics}</div>
      <div class="bookend-content">
        <div class="bookend-time">
          ${event.time}${event.end_time ? ` – ${event.end_time}` : ''}
        </div>
        <h3 class="bookend-title">${event.title}</h3>
        <p class="bookend-description">${event.description}</p>
        <div class="bookend-location">
          ${event.location_link
            ? html`<a href=${event.location_link} target="_blank" rel="noopener noreferrer">${event.location}</a>`
            : event.location
          }
        </div>
        ${event.cta_link && html`
          <a href=${event.cta_link} class="bookend-cta">${event.cta_label || 'Learn More'}</a>
        `}
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// SessionCard — individual session card in a time slot
// ---------------------------------------------------------------------------

export function SessionCard({ session, speakerMap, roomMap, categoryItemMap, onClick, agenda }) {
  const room = roomMap[session.roomId];
  const sessionSpeakers = (session.speakers || []).map(id => speakerMap[id]).filter(Boolean);
  const categoryTags = (session.categoryItems || []).map(id => categoryItemMap[id]).filter(Boolean);
  const isSaved = agenda?.savedSet.has(session.id);

  const handleBookmark = useCallback((e) => {
    e.stopPropagation();
    agenda?.toggleSession(session.id);
  }, [session.id, agenda]);

  return html`
    <div class="session-card-wrapper ${isSaved ? 'is-saved' : ''}">
      <button class="session-card" onClick=${() => onClick(session)} aria-label="View details for ${session.title}">
        <div class="session-card-header">
          <h4 class="session-card-title">${session.title}</h4>
        </div>

        ${sessionSpeakers.length > 0 && html`
          <div class="session-card-speakers">
            ${sessionSpeakers.map(speaker => html`
              <div class="session-card-speaker" key=${speaker.id}>
                ${speaker.profilePicture && html`
                  <img
                    class="session-card-speaker-img"
                    src=${speaker.profilePicture}
                    alt=${speaker.fullName}
                    loading="lazy"
                  />
                `}
                <span class="session-card-speaker-name">${speaker.fullName}</span>
              </div>
            `)}
          </div>
        `}

        ${categoryTags.length > 0 && html`
          <div class="session-card-tags">
            ${categoryTags.map(tag => html`
              <span class="session-tag" key=${tag.id}>${tag.name}</span>
            `)}
          </div>
        `}

        <div class="session-card-footer">
          <div class="session-card-meta">
            ${room && html`<span class="session-card-room">${room.name}</span>`}
          </div>
          ${agenda && html`
            <span
              class="session-bookmark ${isSaved ? 'is-saved' : ''}"
              onClick=${handleBookmark}
              aria-label=${isSaved ? 'Remove from agenda' : 'Add to agenda'}
              aria-pressed=${isSaved}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill=${isSaved ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </span>
          `}
        </div>
      </button>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// TimeSlotBlock — a time slot header + grid of session cards
// ---------------------------------------------------------------------------

export function TimeSlotBlock({ slot, slotId, speakerMap, roomMap, categoryItemMap, onSessionClick, agenda, hasConflict }) {
  return html`
    <div class="timeslot-block ${hasConflict ? 'has-conflict' : ''}">
      <div class="timeslot-header" data-timeslot-id=${slotId}>
        <div class="timeslot-time">
          ${slot.label}${slot.endLabel ? html` <span class="timeslot-separator">–</span> ${slot.endLabel}` : ''}
          ${hasConflict && html`
            <span class="timeslot-conflict-badge" title="Multiple saved sessions in this time slot">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Conflict
            </span>
          `}
        </div>
        <div class="timeslot-count">${slot.sessions.length} session${slot.sessions.length !== 1 ? 's' : ''}</div>
      </div>
      <div class="timeslot-sessions">
        ${slot.sessions.map(session => html`
          <${SessionCard}
            key=${session.id}
            session=${session}
            speakerMap=${speakerMap}
            roomMap=${roomMap}
            categoryItemMap=${categoryItemMap}
            onClick=${onSessionClick}
            agenda=${agenda}
          />
        `)}
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// AgendaTimeline — full day view with bookend events + session time slots
// ---------------------------------------------------------------------------

export function AgendaTimeline({ timeline, unscheduledSessions, speakerMap, roomMap, categoryItemMap, onSessionClick, hasFilters, agenda, isMyAgenda, conflictSlots }) {
  const hasScheduled = timeline.length > 0;
  const hasUnscheduled = unscheduledSessions && unscheduledSessions.length > 0;

  if (!hasScheduled && !hasUnscheduled && hasFilters) {
    if (isMyAgenda) {
      return html`
        <div class="agenda-empty agenda-empty-my-agenda">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
          <p>Your agenda is empty.</p>
          <p class="agenda-empty-hint">Bookmark sessions to build your personal agenda for the day.</p>
        </div>
      `;
    }
    return html`
      <div class="agenda-empty">
        <p>No sessions match your filters.</p>
      </div>
    `;
  }

  const unscheduledBlock = hasUnscheduled && html`
    <div class="timeslot-block">
      <div class="timeslot-header timeslot-header-unscheduled" data-timeslot-id="unscheduled">
        <div class="timeslot-time">Accepted Sessions</div>
        <div class="timeslot-count">${unscheduledSessions.length} session${unscheduledSessions.length !== 1 ? 's' : ''}</div>
      </div>
      <p class="unscheduled-note">These sessions have been accepted and will be assigned to time slots soon.</p>
      <div class="timeslot-sessions">
        ${unscheduledSessions.map(session => html`
          <${SessionCard}
            key=${session.id}
            session=${session}
            speakerMap=${speakerMap}
            roomMap=${roomMap}
            categoryItemMap=${categoryItemMap}
            onClick=${onSessionClick}
            agenda=${agenda}
          />
        `)}
      </div>
    </div>
  `;

  return html`
    <div class="agenda-timeline">
      ${!hasScheduled && unscheduledBlock}

      ${timeline.map((item) => {
        if (item.type === 'bookend') {
          return html`
            <div class="timeslot-block" key=${item.slotId}>
              <div class="timeslot-header" data-timeslot-id=${item.slotId}>
                <div class="timeslot-time">
                  ${item.label}${item.endLabel ? html` <span class="timeslot-separator">–</span> ${item.endLabel}` : ''}
                </div>
              </div>
              <${BookendEvent} event=${item.data} />
            </div>
          `;
        }
        return html`
          <${TimeSlotBlock}
            key=${item.slotId}
            slot=${item.data}
            slotId=${item.slotId}
            speakerMap=${speakerMap}
            roomMap=${roomMap}
            categoryItemMap=${categoryItemMap}
            onSessionClick=${onSessionClick}
            agenda=${agenda}
            hasConflict=${conflictSlots?.has(item.data.startsAt)}
          />
        `;
      })}

      ${hasScheduled && unscheduledBlock}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// ImportExportModal — modal for importing/exporting agenda JSON
// ---------------------------------------------------------------------------

export function ImportExportModal({ mode, agenda, onClose }) {
  const [result, setResult] = useState(null);
  const [exportCopied, setExportCopied] = useState(false);
  const modalRef = useRef(null);
  const textareaRef = useRef(null);

  const handleImport = useCallback(() => {
    const text = textareaRef.current?.value || '';
    if (!text.trim()) return;
    const res = agenda.importAgenda(text);
    setResult(res);
  }, [agenda]);

  const handleExportCopy = useCallback(() => {
    navigator.clipboard.writeText(agenda.exportAgenda()).then(() => {
      setExportCopied(true);
      setTimeout(() => setExportCopied(false), 2000);
    }).catch(() => {});
  }, [agenda]);

  const handleExportDownload = useCallback(() => {
    const json = agenda.exportAgenda();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codecamp-agenda.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [agenda]);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (textareaRef.current) {
        textareaRef.current.value = reader.result;
      }
      setResult(null);
    };
    reader.readAsText(file);
  }, []);

  const handleKeyDown = useMemo(() => createFocusTrapHandler(modalRef, onClose), [onClose]);

  useEffect(() => focusOnMount(modalRef, '.import-export-modal-close'), []);

  return html`
    <div class="session-modal-overlay" onClick=${onClose} onKeyDown=${handleKeyDown}>
      <div class="import-export-modal" ref=${modalRef} onClick=${(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label=${mode === 'export' ? 'Export Agenda' : 'Import Agenda'}>
        <button class="import-export-modal-close" onClick=${onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="import-export-modal-body">
          ${mode === 'export' ? html`
            <h2 class="import-export-modal-title">Export Agenda</h2>
            <p class="import-export-modal-description">Copy or download your agenda to transfer it to another device.</p>
            <textarea
              class="import-export-textarea"
              readOnly
              value=${agenda.exportAgenda()}
              onClick=${(e) => e.target.select()}
              aria-label="Agenda JSON"
            />
            <div class="import-export-actions">
              <button class="btn btn-primary" onClick=${handleExportCopy}>
                ${exportCopied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button class="btn btn-secondary" onClick=${handleExportDownload}>
                Download File
              </button>
            </div>
          ` : html`
            <h2 class="import-export-modal-title">Import Agenda</h2>
            <p class="import-export-modal-description">Paste agenda JSON below or upload a file to load your agenda.</p>
            <textarea
              class="import-export-textarea"
              ref=${textareaRef}
              placeholder="Paste your agenda JSON here..."
              onInput=${() => setResult(null)}
              aria-label="Agenda JSON input"
            />
            <div class="import-export-file-upload">
              <label class="btn btn-ghost import-export-file-label">
                Upload File
                <input type="file" accept=".json" onChange=${handleFileUpload} class="import-export-file-input" />
              </label>
            </div>
            ${result && html`
              <div class="import-export-result ${result.success ? 'success' : 'error'}">
                ${result.success
                  ? `Imported ${result.count} session${result.count !== 1 ? 's' : ''} to your agenda.`
                  : result.error
                }
              </div>
            `}
            <div class="import-export-actions">
              <button class="btn btn-primary" type="button" onClick=${handleImport}>
                Import Agenda
              </button>
              <button class="btn btn-ghost" onClick=${onClose}>
                ${result?.success ? 'Close' : 'Cancel'}
              </button>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// SpeakerLocation — displays speaker's city/location
// ---------------------------------------------------------------------------

function SpeakerLocation({ speaker, locationQuestionId }) {
  if (!locationQuestionId || !speaker.questionAnswers) return null;
  const locationAnswer = speaker.questionAnswers.find(qa => qa.questionId === locationQuestionId);
  if (!locationAnswer || !locationAnswer.answerValue) return null;

  return html`
    <div class="session-modal-speaker-location">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      ${locationAnswer.answerValue}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// SpeakerOtherSessions — links to other sessions by the same speaker
// ---------------------------------------------------------------------------

function SpeakerOtherSessions({ speaker, session, sessions, onSessionClick }) {
  const otherSessions = useMemo(() =>
    (sessions || []).filter(s =>
      !s.isServiceSession && s.id !== session.id && (s.speakers || []).includes(speaker.id)
    ),
    [sessions, session.id, speaker.id]
  );

  if (otherSessions.length === 0) return null;

  return html`
    <div class="session-modal-speaker-other-sessions">
      <span class="other-sessions-label">Also presenting:</span>
      ${otherSessions.map(s => html`
        <button
          key=${s.id}
          class="other-session-link"
          onClick=${() => onSessionClick(s)}
        >${s.title}</button>
      `)}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// SessionModal — expanded session detail overlay
// ---------------------------------------------------------------------------

export function SessionModal({ session, sessions, speakerMap, roomMap, categoryItemMap, locationQuestionId, onClose, onSessionClick, agenda }) {
  const room = roomMap[session.roomId];
  const sessionSpeakers = (session.speakers || []).map(id => speakerMap[id]).filter(Boolean);
  const categoryTags = (session.categoryItems || []).map(id => categoryItemMap[id]).filter(Boolean);
  const modalRef = useRef(null);
  const [shareCopied, setShareCopied] = useState(false);
  const isSaved = agenda?.savedSet.has(session.id);

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}${window.location.pathname}#session=${session.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }).catch(() => {});
  }, [session.id]);

  const handleKeyDown = useMemo(() => createFocusTrapHandler(modalRef), []);

  useEffect(() => focusOnMount(modalRef, '.session-modal-close'), []);

  return html`
    <div class="session-modal-overlay" onClick=${onClose} onKeyDown=${handleKeyDown}>
      <div class="session-modal" ref=${modalRef} onClick=${(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label=${session.title}>
        <div class="session-modal-toolbar">
          <div class="session-modal-toolbar-left">
            ${agenda && html`
              <button
                class="session-modal-bookmark ${isSaved ? 'is-saved' : ''}"
                onClick=${() => agenda.toggleSession(session.id)}
                aria-label=${isSaved ? 'Remove from agenda' : 'Add to agenda'}
                aria-pressed=${isSaved}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill=${isSaved ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                ${isSaved ? 'Saved' : 'Save'}
              </button>
            `}
            <button class="session-modal-share" onClick=${handleShare} aria-label=${shareCopied ? 'Link copied' : 'Share session link'}>
              ${shareCopied ? html`
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ` : html`
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              `}
              ${shareCopied ? 'Copied!' : ''}
            </button>
          </div>
          <button class="session-modal-close" onClick=${onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="session-modal-body">
          <h2 class="session-modal-title">${session.title}</h2>

          <div class="session-modal-meta">
            ${session.startsAt && html`
              <span class="session-modal-time">
                ${formatTime(session.startsAt)}${session.endsAt ? ` – ${formatTime(session.endsAt)}` : ''}
              </span>
            `}
            ${room && html`<span class="session-modal-room">${room.name}</span>`}
          </div>

          ${categoryTags.length > 0 && html`
            <div class="session-modal-tags">
              ${categoryTags.map(tag => html`
                <span class="session-tag" key=${tag.id}>${tag.name}</span>
              `)}
            </div>
          `}

          ${session.description && html`
            <div class="session-modal-description">${session.description}</div>
          `}

          ${sessionSpeakers.length > 0 && html`
            <div class="session-modal-speakers">
              <h3>Speaker${sessionSpeakers.length > 1 ? 's' : ''}</h3>
              ${sessionSpeakers.map(speaker => html`
                <div class="session-modal-speaker" key=${speaker.id}>
                  <div class="session-modal-speaker-header">
                    ${speaker.profilePicture && html`
                      <img
                        class="session-modal-speaker-img"
                        src=${speaker.profilePicture}
                        alt=${speaker.fullName}
                      />
                    `}
                    <div>
                      <div class="session-modal-speaker-name">${speaker.fullName}</div>
                      ${speaker.tagLine && html`
                        <div class="session-modal-speaker-tagline">${speaker.tagLine}</div>
                      `}
                      <${SpeakerLocation} speaker=${speaker} locationQuestionId=${locationQuestionId} />
                    </div>
                  </div>
                  ${speaker.bio && html`
                    <p class="session-modal-speaker-bio">${speaker.bio}</p>
                  `}
                  ${speaker.links && speaker.links.length > 0 && html`
                    <div class="session-modal-speaker-links">
                      ${speaker.links.map((link, i) => html`
                        <a key=${i} href=${link.url} target="_blank" rel="noopener noreferrer" class="speaker-link">
                          ${link.title || link.linkType || 'Link'}
                        </a>
                      `)}
                    </div>
                  `}
                  <${SpeakerOtherSessions} speaker=${speaker} session=${session} sessions=${sessions} onSessionClick=${onSessionClick} />
                </div>
              `)}
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}
