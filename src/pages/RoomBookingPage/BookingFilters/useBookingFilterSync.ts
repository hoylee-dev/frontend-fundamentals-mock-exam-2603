import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBookingFilterStore } from '../useBookingFilterStore';

export function useBookingFilterSync() {
  const [, setSearchParams] = useSearchParams();
  const { date, startTime, endTime, attendees, equipment, preferredFloor } = useBookingFilterStore();

  useEffect(() => {
    const params: Record<string, string> = {};
    if (date) params.date = date;
    if (startTime) params.startTime = startTime;
    if (endTime) params.endTime = endTime;
    if (attendees > 1) params.attendees = String(attendees);
    if (equipment.length > 0) params.equipment = equipment.join(',');
    if (preferredFloor !== null) params.floor = String(preferredFloor);
    setSearchParams(params, { replace: true });
  }, [date, startTime, endTime, attendees, equipment, preferredFloor, setSearchParams]);
}
