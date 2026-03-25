import { h } from 'https://esm.sh/preact@10.25.4';
import { useState, useRef, useEffect, useCallback, useMemo } from 'https://esm.sh/preact@10.25.4/hooks';
import { html, formatTime, createFocusTrapHandler, focusOnMount } from './helpers.js';
import { generateICS } from './ics.js';

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

  // Auto-scroll the nav strip horizontally so the active pill is visible
  useEffect(() => {
    if (!activeSlot || !navRef.current) return;
    const strip = navRef.current.querySelector('.timeslot-nav-scroll');
    const pill = navRef.current.querySelector('.timeslot-pill.active');
    if (strip && pill) {
      const target = pill.offsetLeft - strip.offsetWidth / 2 + pill.offsetWidth / 2;
      const motion = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      strip.scrollTo({ left: target, behavior: motion });
    }
  }, [activeSlot]);

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

export function FilterBar({ filters, categories, speakers, rooms, onFilter, onClear, hasFilters, resultCount, totalCount, bookmarkCount, showAgendaBuilder, builderCount }) {
  const [expanded, setExpanded] = useState(false);

  // Build sorted speaker list for dropdown (memoized)
  const speakerList = useMemo(() =>
    [...(speakers || [])].sort((a, b) => a.fullName.localeCompare(b.fullName)),
    [speakers]
  );

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

        <button
          class="btn bookmarks-toggle ${filters.myBookmarks ? 'active' : ''}"
          onClick=${() => onFilter('myBookmarks', !filters.myBookmarks)}
          aria-pressed=${filters.myBookmarks}
          aria-label="Show my bookmarks"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill=${filters.myBookmarks ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
          Bookmarks
          ${bookmarkCount > 0 && html`<span class="bookmarks-count">${bookmarkCount}</span>`}
        </button>
        ${showAgendaBuilder && html`
          <button
            class="btn agenda-builder-toggle ${filters.agendaBuilder ? 'active' : ''}"
            onClick=${() => onFilter('agendaBuilder', !filters.agendaBuilder)}
            aria-pressed=${filters.agendaBuilder}
            aria-label="Build agenda"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Build Agenda
            ${builderCount > 0 && html`<span class="agenda-builder-count">${builderCount}</span>`}
          </button>
        `}
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

          <div class="filter-field">
            <select
              value=${filters.speaker}
              onChange=${(e) => onFilter('speaker', e.target.value)}
              aria-label="Filter by speaker"
            >
              <option value="">All Speakers</option>
              ${speakerList.map(s => html`
                <option key=${s.id} value=${s.id}>${s.fullName}</option>
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

export function SessionCard({ session, speakerMap, roomMap, categoryItemMap, onClick, bookmarks }) {
  const room = roomMap[session.roomId];
  const sessionSpeakers = (session.speakers || []).map(id => speakerMap[id]).filter(Boolean);
  const allTags = (session.categoryItems || []).map(id => categoryItemMap[id]).filter(Boolean);
  const categoryTags = allTags.filter(t => t.categoryTitle === 'Categories');
  const level = allTags.find(t => t.categoryTitle === 'Level');
  const isSaved = bookmarks?.bookmarkedSet.has(session.id);

  const handleBookmark = useCallback((e) => {
    e.stopPropagation();
    bookmarks?.toggleBookmark(session.id);
  }, [session.id, bookmarks]);

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
            ${level && html`<span class="session-card-level">${level.name}</span>`}
          </div>
          ${bookmarks && html`
            <span
              class="session-bookmark ${isSaved ? 'is-saved' : ''}"
              onClick=${handleBookmark}
              aria-label=${isSaved ? 'Remove bookmark' : 'Bookmark'}
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

export function TimeSlotBlock({ slot, slotId, speakerMap, roomMap, categoryItemMap, onSessionClick, bookmarks }) {
  return html`
    <div class="timeslot-block">
      <div class="timeslot-header" data-timeslot-id=${slotId}>
        <div class="timeslot-time">
          ${slot.label}${slot.endLabel ? html` <span class="timeslot-separator">–</span> ${slot.endLabel}` : ''}
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
            bookmarks=${bookmarks}
          />
        `)}
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// AgendaTimeline — full day view with bookend events + session time slots
// ---------------------------------------------------------------------------

export function AgendaTimeline({ timeline, unscheduledSessions, speakerMap, roomMap, categoryItemMap, onSessionClick, hasFilters, bookmarks, isMyBookmarks, onExport, onImport }) {
  const hasScheduled = timeline.length > 0;
  const hasUnscheduled = unscheduledSessions && unscheduledSessions.length > 0;

  const bookmarksViewHeader = isMyBookmarks && html`
    <div class="bookmarks-view-header">
      <button class="btn btn-ghost btn-sm" onClick=${onImport}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        Import
      </button>
      ${bookmarks.bookmarkedIds.length > 0 && html`
        <button class="btn btn-ghost btn-sm" onClick=${onExport}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export
        </button>
      `}
    </div>
  `;

  if (!hasScheduled && !hasUnscheduled && hasFilters) {
    if (isMyBookmarks) {
      return html`
        ${bookmarksViewHeader}
        <div class="agenda-empty agenda-empty-bookmarks">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
          <p>No bookmarked sessions yet.</p>
          <p class="agenda-empty-hint">Bookmark sessions you're interested in, then use the Agenda Builder to plan your day.</p>
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
            bookmarks=${bookmarks}
          />
        `)}
      </div>
    </div>
  `;

  return html`
    ${bookmarksViewHeader}
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
            bookmarks=${bookmarks}
          />
        `;
      })}

      ${hasScheduled && unscheduledBlock}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// AgendaBuilderSlot — single time slot in the agenda builder
// ---------------------------------------------------------------------------

function AgendaBuilderSlot({ slot, bookmarks, builder, speakerMap, roomMap, onSessionClick, filterToBookmarks }) {
  const selectedId = builder.selections[slot.startsAt];
  const selectedSession = selectedId ? slot.sessions.find(s => s.id === selectedId) : null;
  const [expanded, setExpanded] = useState(!selectedSession);

  // Auto-expand when selection is cleared externally (e.g. "Clear" button)
  useEffect(() => {
    if (!selectedSession) setExpanded(true);
  }, [selectedSession]);

  // Filter to bookmarked sessions when bookmarks filter is active, then sort bookmarked first
  const sortedSessions = useMemo(() => {
    let sessions = slot.sessions;
    if (filterToBookmarks) {
      sessions = sessions.filter(s => bookmarks.bookmarkedSet.has(s.id));
    }
    return [...sessions].sort((a, b) => {
      const aBookmarked = bookmarks.bookmarkedSet.has(a.id) ? 0 : 1;
      const bBookmarked = bookmarks.bookmarkedSet.has(b.id) ? 0 : 1;
      if (aBookmarked !== bBookmarked) return aBookmarked - bBookmarked;
      return 0;
    });
  }, [slot.sessions, bookmarks.bookmarkedSet, filterToBookmarks]);

  const handleSelect = useCallback((sessionId) => {
    builder.selectSession(slot.startsAt, sessionId);
    setExpanded(false);
  }, [builder, slot.startsAt]);

  const handleRemove = useCallback(() => {
    builder.deselectSlot(slot.startsAt);
    setExpanded(true);
  }, [builder, slot.startsAt]);

  const selectedSpeakers = selectedSession
    ? (selectedSession.speakers || []).map(id => speakerMap[id]?.fullName).filter(Boolean).join(', ')
    : '';
  const selectedRoom = selectedSession ? roomMap[selectedSession.roomId] : null;

  return html`
    <div class="agenda-builder-slot">
      <button
        class="agenda-builder-slot-header"
        onClick=${() => setExpanded(!expanded)}
        aria-expanded=${expanded}
      >
        <div class="agenda-builder-slot-time">
          ${slot.label}${slot.endLabel ? html` <span class="timeslot-separator">–</span> ${slot.endLabel}` : ''}
        </div>
        <div class="agenda-builder-slot-summary">
          ${selectedSession ? selectedSession.title : 'No session selected'}
        </div>
        <svg class="agenda-builder-slot-chevron ${expanded ? 'expanded' : ''}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      ${!expanded && selectedSession && html`
        <div class="agenda-builder-selected">
          <div class="agenda-builder-selected-info">
            <div class="agenda-builder-selected-title">${selectedSession.title}</div>
            ${selectedSpeakers && html`<div class="agenda-builder-selected-speakers">${selectedSpeakers}</div>`}
            ${selectedRoom && html`<div class="agenda-builder-selected-room">${selectedRoom.name}</div>`}
          </div>
          <div class="agenda-builder-selected-actions">
            <button class="btn btn-ghost btn-sm" onClick=${() => onSessionClick(selectedSession)}>Details</button>
            <button class="btn btn-ghost btn-sm" onClick=${() => setExpanded(true)}>Change</button>
            <button class="btn btn-ghost btn-sm" onClick=${handleRemove}>Remove</button>
          </div>
        </div>
      `}

      ${expanded && html`
        <div class="agenda-builder-picker">
          ${sortedSessions.map(session => {
            const isBookmarked = bookmarks.bookmarkedSet.has(session.id);
            const isSelected = session.id === selectedId;
            const speakers = (session.speakers || []).map(id => speakerMap[id]?.fullName).filter(Boolean).join(', ');
            const room = roomMap[session.roomId];

            return html`
              <div key=${session.id} class="agenda-builder-option ${isBookmarked ? 'is-bookmarked' : ''} ${isSelected ? 'is-selected' : ''}">
                <button
                  class="agenda-builder-option-select"
                  onClick=${() => handleSelect(session.id)}
                  aria-label="Select ${session.title}"
                >
                  <div class="agenda-builder-option-content">
                    <div class="agenda-builder-option-title">
                      ${isBookmarked && html`
                        <svg class="agenda-builder-bookmark-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                        </svg>
                      `}
                      ${session.title}
                    </div>
                    <div class="agenda-builder-option-meta">
                      ${speakers && html`<span>${speakers}</span>`}
                      ${room && html`<span class="agenda-builder-option-room">${room.name}</span>`}
                    </div>
                  </div>
                </button>
                <button
                  class="agenda-builder-option-details btn btn-ghost btn-sm"
                  onClick=${() => onSessionClick(session)}
                  aria-label="View details for ${session.title}"
                >
                  Info
                </button>
              </div>
            `;
          })}
        </div>
      `}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// AgendaBuilderPanel — full agenda builder view
// ---------------------------------------------------------------------------

export function AgendaBuilderPanel({ timeSlots, bookmarks, builder, speakerMap, roomMap, onSessionClick, filterToBookmarks }) {
  const totalSlots = timeSlots.length;
  const filledSlots = builder.selectedCount;

  const handleDownload = useCallback(() => {
    // Collect selected sessions
    const selectedSessions = [];
    for (const slot of timeSlots) {
      const selectedId = builder.selections[slot.startsAt];
      if (selectedId) {
        const session = slot.sessions.find(s => s.id === selectedId);
        if (session) selectedSessions.push(session);
      }
    }
    if (selectedSessions.length === 0) return;

    const icsContent = generateICS(selectedSessions, speakerMap, roomMap);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orlando-code-camp-agenda.ics';
    a.click();
    URL.revokeObjectURL(url);
  }, [timeSlots, builder.selections, speakerMap, roomMap]);

  if (timeSlots.length === 0) {
    return html`
      <div class="agenda-empty">
        <p>The schedule hasn't been published yet. Check back soon!</p>
      </div>
    `;
  }

  return html`
    <div class="agenda-builder">
      <div class="agenda-builder-header">
        <div>
          <h2 class="agenda-builder-title">Agenda Builder</h2>
          <p class="agenda-builder-subtitle">${filledSlots} of ${totalSlots} time slots filled</p>
        </div>
        <div class="agenda-builder-header-actions">
          <button
            class="btn btn-primary btn-sm"
            onClick=${handleDownload}
            disabled=${filledSlots === 0}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Calendar
          </button>
          ${filledSlots > 0 && html`
            <button class="btn btn-ghost btn-sm" onClick=${builder.clearBuilder}>
              Clear
            </button>
          `}
        </div>
      </div>

      ${timeSlots.map(slot => html`
        <${AgendaBuilderSlot}
          key=${slot.startsAt}
          slot=${slot}
          bookmarks=${bookmarks}
          builder=${builder}
          speakerMap=${speakerMap}
          roomMap=${roomMap}
          onSessionClick=${onSessionClick}
          filterToBookmarks=${filterToBookmarks}
        />
      `)}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// ImportExportModal — modal for importing/exporting bookmarks JSON
// ---------------------------------------------------------------------------

export function ImportExportModal({ mode, bookmarks, onClose }) {
  const [result, setResult] = useState(null);
  const [exportCopied, setExportCopied] = useState(false);
  const modalRef = useRef(null);
  const textareaRef = useRef(null);

  const handleImport = useCallback(() => {
    const text = textareaRef.current?.value || '';
    if (!text.trim()) return;
    const res = bookmarks.importBookmarks(text);
    setResult(res);
  }, [bookmarks]);

  const handleExportCopy = useCallback(() => {
    navigator.clipboard.writeText(bookmarks.exportBookmarks()).then(() => {
      setExportCopied(true);
      setTimeout(() => setExportCopied(false), 2000);
    }).catch(() => {});
  }, [bookmarks]);

  const handleExportDownload = useCallback(() => {
    const json = bookmarks.exportBookmarks();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codecamp-bookmarks.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [bookmarks]);

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
      <div class="import-export-modal" ref=${modalRef} onClick=${(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label=${mode === 'export' ? 'Export Bookmarks' : 'Import Bookmarks'}>
        <button class="import-export-modal-close" onClick=${onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="import-export-modal-body">
          ${mode === 'export' ? html`
            <h2 class="import-export-modal-title">Export Bookmarks</h2>
            <p class="import-export-modal-description">Copy or download your bookmarks to transfer them to another device.</p>
            <textarea
              class="import-export-textarea"
              readOnly
              value=${bookmarks.exportBookmarks()}
              onClick=${(e) => e.target.select()}
              aria-label="Bookmarks JSON"
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
            <h2 class="import-export-modal-title">Import Bookmarks</h2>
            <p class="import-export-modal-description">Paste bookmarks JSON below or upload a file to load your bookmarks.</p>
            <textarea
              class="import-export-textarea"
              ref=${textareaRef}
              placeholder="Paste your bookmarks JSON here..."
              onInput=${() => setResult(null)}
              aria-label="Bookmarks JSON input"
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
                  ? `Imported ${result.count} session${result.count !== 1 ? 's' : ''} to your bookmarks.`
                  : result.error
                }
              </div>
            `}
            <div class="import-export-actions">
              <button class="btn btn-primary" type="button" onClick=${handleImport}>
                Import Bookmarks
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

export function SessionModal({ session, sessions, speakerMap, roomMap, categoryItemMap, locationQuestionId, onClose, onSessionClick, bookmarks }) {
  const room = roomMap[session.roomId];
  const sessionSpeakers = (session.speakers || []).map(id => speakerMap[id]).filter(Boolean);
  const categoryTags = (session.categoryItems || []).map(id => categoryItemMap[id]).filter(Boolean);
  const modalRef = useRef(null);
  const [shareCopied, setShareCopied] = useState(false);
  const isSaved = bookmarks?.bookmarkedSet.has(session.id);

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
            ${bookmarks && html`
              <button
                class="session-modal-bookmark ${isSaved ? 'is-saved' : ''}"
                onClick=${() => bookmarks.toggleBookmark(session.id)}
                aria-label=${isSaved ? 'Remove bookmark' : 'Bookmark'}
                aria-pressed=${isSaved}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill=${isSaved ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                ${isSaved ? 'Bookmarked' : 'Bookmark'}
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
