import { css } from '@emotion/react';
import { useAvailableRooms } from '../useAvailableRooms';
import { RoomCard } from './RoomCard';

export function RoomCardList() {
  const { availableRooms } = useAvailableRooms();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      {availableRooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
