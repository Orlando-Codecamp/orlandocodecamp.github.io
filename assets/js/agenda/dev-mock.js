// ---------------------------------------------------------------------------
// DEV ONLY — mock schedule data for testing when Sessionize has no time slots
// Activate with ?mock=schedule in the URL. Remove before merging to main.
// ---------------------------------------------------------------------------

const MOCK_TIMES = [
  ['2026-04-11T09:00:00-04:00', '2026-04-11T10:00:00-04:00'],
  ['2026-04-11T10:15:00-04:00', '2026-04-11T11:15:00-04:00'],
  ['2026-04-11T11:30:00-04:00', '2026-04-11T12:30:00-04:00'],
];

export function shouldMock() {
  return new URLSearchParams(window.location.search).get('mock') === 'schedule';
}

export function applyMockSchedule(sessions, rooms) {
  let i = 0;
  sessions.forEach(s => {
    if (!s.isServiceSession) {
      const slot = MOCK_TIMES[i % MOCK_TIMES.length];
      s.startsAt = slot[0];
      s.endsAt = slot[1];
      s.roomId = rooms[i % rooms.length]?.id;
      i++;
    }
  });
}
