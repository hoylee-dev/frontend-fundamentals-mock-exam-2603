import { useRoomsSuspenseQuery } from 'pages/shared/useRoomsQuery';
import { TimelineRow } from './TimelineRow';

interface TimelineBodyProps {
  date: string;
}

export function TimelineBody({ date }: TimelineBodyProps) {
  const { data: rooms } = useRoomsSuspenseQuery();
  return (
    <>
      {rooms.map((room, index) => (
        <TimelineRow key={room.id} room={room} date={date} isFirst={index === 0} />
      ))}
    </>
  );
}
