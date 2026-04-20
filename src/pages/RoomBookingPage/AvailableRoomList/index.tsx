import { css } from '@emotion/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { roomsQuery, reservationsQuery } from 'pages/shared/queries/queries';
import { useRequirementParams, usePreferenceParams } from '../useFilterParams';
import { RoomCard } from './RoomCard';

export { ConfirmButton } from './ConfirmButton';

interface AvailableRoomListProps {
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export function AvailableRoomList({ selectedRoomId, onSelectRoom }: AvailableRoomListProps) {
  const { date, startTime, endTime, attendees } = useRequirementParams();
  const { equipment, preferredFloor } = usePreferenceParams();

  const [{ data: rooms }, { data: reservations }] = useSuspenseQueries({
    queries: [roomsQuery(), reservationsQuery(date)],
  });

  const availableRooms = rooms
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

  return (
    <div>
      <Text typography="t7" fontWeight="medium" color={colors.grey500}>
        {availableRooms.length}개
      </Text>

      <Spacing size={16} />

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
