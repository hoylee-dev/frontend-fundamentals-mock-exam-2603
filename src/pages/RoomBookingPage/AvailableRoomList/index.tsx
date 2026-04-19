import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { Room, Reservation, Equipment } from 'pages/shared/types';
import { roomsQuery, reservationsQuery } from 'pages/shared/queries';
import {
  useDateParam,
  useStartTimeParam,
  useEndTimeParam,
  useAttendeesParam,
  useEquipmentParam,
  usePreferredFloorParam,
} from '../useFilterParams';
import { RoomCard } from './RoomCard';

export { ConfirmButton } from './ConfirmButton';

interface AvailableRoomListProps {
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export function AvailableRoomList({ selectedRoomId, onSelectRoom }: AvailableRoomListProps) {
  const [date] = useDateParam();
  const [startTime] = useStartTimeParam();
  const [endTime] = useEndTimeParam();
  const [attendees] = useAttendeesParam();
  const [equipment] = useEquipmentParam();
  const [preferredFloor] = usePreferredFloorParam();

  const { data: rooms } = useSuspenseQuery(roomsQuery());
  const { data: reservations } = useSuspenseQuery(reservationsQuery(date));

  const availableRooms = filterAndSortRooms(rooms, reservations, {
    date,
    startTime,
    endTime,
    attendees,
    equipment,
    preferredFloor,
  });

  return (
    <div>
      <div
        css={css`
          display: flex;
          align-items: baseline;
          gap: 6px;
        `}
      >
        <Text typography="t5" fontWeight="bold" color={colors.grey900}>
          예약 가능 회의실
        </Text>
        <Text typography="t7" fontWeight="medium" color={colors.grey500}>
          {availableRooms.length}개
        </Text>
      </div>

      <Spacing size={16} />

      {/* todo: switch case ? */}
      {availableRooms.length === 0 && (
        <div
          css={css`
            padding: 40px 0;
            text-align: center;
            background: ${colors.grey50};
            border-radius: 14px;
          `}
        >
          <Text typography="t6" color={colors.grey500}>
            조건에 맞는 회의실이 없습니다.
          </Text>
        </div>
      )}
      {availableRooms.length > 0 && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
          {availableRooms.map(room => (
            <RoomCard key={room.id} room={room} isSelected={selectedRoomId === room.id} onSelect={onSelectRoom} />
          ))}
        </div>
      )}
    </div>
  );
}

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
