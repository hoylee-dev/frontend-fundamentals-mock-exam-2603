import { useRoomsQuery } from 'pages/useRoomsQuery';
import { TimelineRow } from './TimelineRow';

export function TimelineBody() {
  const { data: rooms = [] } = useRoomsQuery();
  return (
    <>
      {rooms.map((room, index) => (
        <TimelineRow key={room.id} room={room} isFirst={index === 0} />
      ))}
    </>
  );
}
