import { useSuspenseQuery } from '@tanstack/react-query';
import { Room, Reservation, Equipment } from 'pages/shared/types';
import { getReservations } from 'pages/shared/remotes';
import { reservationKeys } from 'pages/shared/queryKeys';
import { useRoomsSuspenseQuery } from 'pages/shared/useRoomsQuery';
import { BookingFilterState } from '../index';

function filterAndSortRooms(
  rooms: Room[],
  reservations: Reservation[],
  {
    date,
    startTime,
    endTime,
    attendees,
    equipment,
    preferredFloor,
  }: {
    date: string;
    startTime: string;
    endTime: string;
    attendees: number;
    equipment: Equipment[];
    preferredFloor: number | null;
  }
): Room[] {
  return rooms
    .filter(room => {
      const meetsCapacity = room.capacity >= attendees;
      const hasRequiredEquipment = equipment.every(eq => room.equipment.includes(eq));
      const isOnPreferredFloor = preferredFloor === null || room.floor === preferredFloor;
      const hasNoTimeConflict = !reservations.some(
        r => r.roomId === room.id && r.date === date && r.start < endTime && r.end > startTime
      );
      return meetsCapacity && hasRequiredEquipment && isOnPreferredFloor && hasNoTimeConflict;
    })
    .sort((a, b) => {
      if (a.floor !== b.floor) {
        return a.floor - b.floor;
      }
      return a.name.localeCompare(b.name);
    });
}

export function useAvailableRooms(filters: BookingFilterState) {
  const { date, startTime, endTime, attendees, equipment, preferredFloor } = filters;
  const { data: rooms } = useRoomsSuspenseQuery();
  const { data: reservations } = useSuspenseQuery({
    queryKey: reservationKeys.byDate(date),
    queryFn: () => getReservations(date),
  });

  const availableRooms = filterAndSortRooms(rooms, reservations, {
    date,
    startTime,
    endTime,
    attendees,
    equipment,
    preferredFloor,
  });

  return { availableRooms };
}
