import { h } from 'https://esm.sh/preact@10.25.4';
import { useState, useRef, useEffect, useCallback } from 'https://esm.sh/preact@10.25.4/hooks';
import { html, formatTime } from './helpers.js';

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

export function FilterBar({ filters, categories, rooms, onFilter, onClear, hasFilters, resultCount, totalCount }) {
  const [expanded, setExpanded] = useState(false);

  // Build flat category items list for dropdown
  const categoryItems = [];
  (categories || []).forEach(cat => {
    (cat.items || []).forEach(item => {
      categoryItems.push({ id: item.id, name: item.name, group: cat.title });
    });
  });

  return html`
    <div class="filter-bar">
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

export function BookendEvent({ event }) {
  const typeIcons = {
    logistics: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    keynote: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    social: html`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  };

  return html`
    <div class="bookend-event bookend-${event.type}">
      <div class="bookend-icon">${typeIcons[event.type] || typeIcons.logistics}</div>
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

export function SessionCard({ session, speakerMap, roomMap, categoryItemMap, onClick }) {
  const room = roomMap[session.roomId];
  const sessionSpeakers = (session.speakers || []).map(id => speakerMap[id]).filter(Boolean);
  const categoryTags = (session.categoryItems || []).map(id => categoryItemMap[id]).filter(Boolean);

  return html`
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

      <div class="session-card-meta">
        ${room && html`<span class="session-card-room">${room.name}</span>`}
      </div>

      ${categoryTags.length > 0 && html`
        <div class="session-card-tags">
          ${categoryTags.map(tag => html`
            <span class="session-tag" key=${tag.id}>${tag.name}</span>
          `)}
        </div>
      `}
    </button>
  `;
}

// ---------------------------------------------------------------------------
// TimeSlotBlock — a time slot header + grid of session cards
// ---------------------------------------------------------------------------

export function TimeSlotBlock({ slot, slotId, speakerMap, roomMap, categoryItemMap, onSessionClick }) {
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
          />
        `)}
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// AgendaTimeline — full day view with bookend events + session time slots
// ---------------------------------------------------------------------------

export function AgendaTimeline({ timeline, unscheduledSessions, speakerMap, roomMap, categoryItemMap, onSessionClick, hasFilters }) {
  const hasScheduled = timeline.length > 0;
  const hasUnscheduled = unscheduledSessions && unscheduledSessions.length > 0;

  if (!hasScheduled && !hasUnscheduled && hasFilters) {
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
          />
        `;
      })}

      ${hasScheduled && unscheduledBlock}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// SessionModal — expanded session detail overlay
// ---------------------------------------------------------------------------

export function SessionModal({ session, speakerMap, roomMap, categoryItemMap, onClose }) {
  const room = roomMap[session.roomId];
  const sessionSpeakers = (session.speakers || []).map(id => speakerMap[id]).filter(Boolean);
  const categoryTags = (session.categoryItems || []).map(id => categoryItemMap[id]).filter(Boolean);
  const modalRef = useRef(null);

  // Focus trap: keep Tab cycling within the modal
  const handleKeyDown = useCallback((e) => {
    if (e.key !== 'Tab') return;
    const modal = modalRef.current;
    if (!modal) return;
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
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
  }, []);

  // Auto-focus the close button when modal opens
  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      const closeBtn = modal.querySelector('.session-modal-close');
      if (closeBtn) closeBtn.focus();
    }
  }, []);

  return html`
    <div class="session-modal-overlay" onClick=${onClose} onKeyDown=${handleKeyDown}>
      <div class="session-modal" ref=${modalRef} onClick=${(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label=${session.title}>
        <button class="session-modal-close" onClick=${onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

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
                </div>
              `)}
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}
