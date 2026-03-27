import { css } from '@emotion/react';
import { Room } from 'pages/shared/types';
import { RoomCard } from './RoomCard';

interface RoomCardListProps {
  availableRooms: Room[];
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export function RoomCardList({ availableRooms, selectedRoomId, onSelectRoom }: RoomCardListProps) {
  return (
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
  );
}
