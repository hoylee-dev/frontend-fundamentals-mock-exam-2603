import { Spacing } from '_tosslib/components';
import { useAvailableRooms } from './useAvailableRooms';
import { AvailableRoomHeader } from './AvailableRoomHeader';
import { EmptyRoomMessage } from './EmptyRoomMessage';
import { RoomCardList } from './RoomCardList';

export { ConfirmButton } from './ConfirmButton';

interface AvailableRoomListProps {
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export function AvailableRoomList({ selectedRoomId, onSelectRoom }: AvailableRoomListProps) {
  const { availableRooms } = useAvailableRooms();

  return (
    <div>
      <AvailableRoomHeader roomCount={availableRooms.length} />

      <Spacing size={16} />

      {availableRooms.length === 0 ? (
        <EmptyRoomMessage />
      ) : (
        <RoomCardList availableRooms={availableRooms} selectedRoomId={selectedRoomId} onSelectRoom={onSelectRoom} />
      )}
    </div>
  );
}
