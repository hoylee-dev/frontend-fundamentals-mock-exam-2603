export const TIMELINE_START = 9;
export const TIMELINE_END = 20;
export const TOTAL_MINUTES = (TIMELINE_END - TIMELINE_START) * 60;

export const HOUR_LABELS = Array.from(
  { length: TIMELINE_END - TIMELINE_START + 1 },
  (_, i) => `${String(TIMELINE_START + i).padStart(2, '0')}:00`
);

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return (h - TIMELINE_START) * 60 + m;
}
