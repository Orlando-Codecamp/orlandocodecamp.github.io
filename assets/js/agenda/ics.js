// ---------------------------------------------------------------------------
// ICS Calendar File Generation
// ---------------------------------------------------------------------------

const easternFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hour12: false,
});

function formatICSDateTime(iso) {
  const d = new Date(iso);
  const parts = {};
  for (const { type, value } of easternFormatter.formatToParts(d)) {
    if (type !== 'literal') parts[type] = value;
  }
  return `${parts.year}${parts.month}${parts.day}T${parts.hour}${parts.minute}${parts.second}`;
}

function formatUTCTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
}

function escapeICSText(text) {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n|\r/g, '\\n');
}

function foldLine(line) {
  const lines = [];
  let remaining = line;
  // First line: up to 75 octets; continuation lines: up to 74 (space prefix)
  while (remaining.length > 75) {
    lines.push(remaining.slice(0, 75));
    remaining = ' ' + remaining.slice(75);
  }
  lines.push(remaining);
  return lines.join('\r\n');
}

export function generateICS(selectedSessions, speakerMap, roomMap) {
  const lines = [];

  lines.push('BEGIN:VCALENDAR');
  lines.push('VERSION:2.0');
  lines.push('PRODID:-//Orlando Code Camp//Sessions//EN');
  lines.push('CALSCALE:GREGORIAN');
  lines.push('METHOD:PUBLISH');
  lines.push('X-WR-TIMEZONE:America/New_York');

  // VTIMEZONE for America/New_York (hardcoded EDT for April 2026)
  lines.push('BEGIN:VTIMEZONE');
  lines.push('TZID:America/New_York');
  lines.push('BEGIN:DAYLIGHT');
  lines.push('TZOFFSETFROM:-0500');
  lines.push('TZOFFSETTO:-0400');
  lines.push('TZNAME:EDT');
  lines.push('DTSTART:19700308T020000');
  lines.push('RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU');
  lines.push('END:DAYLIGHT');
  lines.push('BEGIN:STANDARD');
  lines.push('TZOFFSETFROM:-0400');
  lines.push('TZOFFSETTO:-0500');
  lines.push('TZNAME:EST');
  lines.push('DTSTART:19701101T020000');
  lines.push('RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU');
  lines.push('END:STANDARD');
  lines.push('END:VTIMEZONE');

  const dtstamp = formatUTCTimestamp();

  for (const session of selectedSessions) {
    if (!session.startsAt) continue;

    const speakers = (session.speakers || [])
      .map(id => speakerMap[id]?.fullName)
      .filter(Boolean);
    const room = roomMap[session.roomId];
    const description = [
      speakers.length > 0 ? `Speakers: ${speakers.join(', ')}` : '',
      session.description || ''
    ].filter(Boolean).join('\n\n');

    lines.push('BEGIN:VEVENT');
    lines.push(`DTSTAMP:${dtstamp}`);
    lines.push(`UID:session-${session.id}@orlandocodecamp.com`);
    lines.push(`DTSTART;TZID=America/New_York:${formatICSDateTime(session.startsAt)}`);
    if (session.endsAt) {
      lines.push(`DTEND;TZID=America/New_York:${formatICSDateTime(session.endsAt)}`);
    }
    lines.push(`SUMMARY:${escapeICSText(session.title)}`);
    if (room) {
      lines.push(`LOCATION:${escapeICSText(room.name)}`);
    }
    if (description) {
      lines.push(`DESCRIPTION:${escapeICSText(description)}`);
    }
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');

  return lines.map(foldLine).join('\r\n') + '\r\n';
}
