/** YYYY-MM-DD 형식의 날짜 문자열 */
type DateString = string;

export function formatDate(date: Date): DateString {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
