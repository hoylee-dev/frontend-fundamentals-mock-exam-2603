import { useRoomsSuspenseQuery } from 'pages/shared/useRoomsQuery';
import { TimelineRow } from './TimelineRow';

export function TimelineBody() {
  const { data: rooms } = useRoomsSuspenseQuery();
  return (
    <>
      {rooms.map((room, index) => (
        <TimelineRow key={room.id} room={room} isFirst={index === 0} />
      ))}
    </>
  );
}
