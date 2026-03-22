import { useQuery } from '@tanstack/react-query';
import { Room, Reservation, Equipment } from 'pages/types';
import { getReservations } from 'pages/remotes';
import { useRoomsQuery } from 'pages/useRoomsQuery';
import { useBookingFilterStore } from '../useBookingFilterStore';

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

export function useAvailableRooms() {
  const { date, startTime, endTime, attendees, equipment, preferredFloor } = useBookingFilterStore();
  const { data: rooms = [] } = useRoomsQuery();
  const { data: reservations = [] } = useQuery({
    queryKey: ['reservations', date],
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
