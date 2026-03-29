import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useAvailableRooms } from './useAvailableRooms';
import { RoomCard } from './RoomCard';

export { ConfirmButton } from './ConfirmButton';

interface AvailableRoomListProps {
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export function AvailableRoomList({ selectedRoomId, onSelectRoom }: AvailableRoomListProps) {
  const { availableRooms } = useAvailableRooms();

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
