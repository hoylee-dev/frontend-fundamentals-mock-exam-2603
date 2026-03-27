import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Equipment } from 'pages/shared/types';
import { BookingFilterState } from '../index';

export function useBookingFilterSync(
  filters: BookingFilterState,
  setFilters: Dispatch<SetStateAction<BookingFilterState>>
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialized = useRef(false);

  if (!initialized.current) {
    initialized.current = true;
    const updates: Partial<BookingFilterState> = {};
    const date = searchParams.get('date');
    const startTime = searchParams.get('startTime');
    const endTime = searchParams.get('endTime');
    const attendees = searchParams.get('attendees');
    const equipment = searchParams.get('equipment');
    const floor = searchParams.get('floor');

    if (date) updates.date = date;
    if (startTime) updates.startTime = startTime;
    if (endTime) updates.endTime = endTime;
    if (attendees) updates.attendees = Number(attendees);
    if (equipment) updates.equipment = equipment.split(',').filter(Boolean) as Equipment[];
    if (floor) updates.preferredFloor = Number(floor);

    if (Object.keys(updates).length > 0) {
      setFilters(prev => ({ ...prev, ...updates }));
    }
  }

  const { date, startTime, endTime, attendees, equipment, preferredFloor } = filters;

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
