import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { Equipment } from 'pages/shared/types';
import { formatDate } from 'pages/shared/utils';

export function useDateParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get('date') || formatDate(new Date());

  const setDate = useCallback(
    (value: string) => {
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev);
          if (value && value !== formatDate(new Date())) {
            next.set('date', value);
          } else {
            next.delete('date');
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return [date, setDate] as const;
}

export function useStartTimeParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const startTime = searchParams.get('startTime') || '';

  const setStartTime = useCallback(
    (value: string) => {
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev);
          if (value) {
            next.set('startTime', value);
          } else {
            next.delete('startTime');
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return [startTime, setStartTime] as const;
}

export function useEndTimeParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const endTime = searchParams.get('endTime') || '';

  const setEndTime = useCallback(
    (value: string) => {
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev);
          if (value) {
            next.set('endTime', value);
          } else {
            next.delete('endTime');
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return [endTime, setEndTime] as const;
}

export function useAttendeesParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get('attendees');
  const attendees = raw ? Number(raw) : 1;

  const setAttendees = useCallback(
    (value: number) => {
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev);
          if (value > 1) {
            next.set('attendees', String(value));
          } else {
            next.delete('attendees');
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return [attendees, setAttendees] as const;
}

export function useEquipmentParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get('equipment');
  const equipment: Equipment[] = raw ? (raw.split(',').filter(Boolean) as Equipment[]) : [];

  const setEquipment = useCallback(
    (value: Equipment[]) => {
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev);
          if (value.length > 0) {
            next.set('equipment', value.join(','));
          } else {
            next.delete('equipment');
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return [equipment, setEquipment] as const;
}

export function usePreferredFloorParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get('floor');
  const preferredFloor = raw ? Number(raw) : null;

  const setPreferredFloor = useCallback(
    (value: number | null) => {
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev);
          if (value !== null) {
            next.set('floor', String(value));
          } else {
            next.delete('floor');
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return [preferredFloor, setPreferredFloor] as const;
}
