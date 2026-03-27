import { Spacing } from '_tosslib/components';
import { BookingFilterState } from '../index';
import { useAvailableRooms } from './useAvailableRooms';
import { AvailableRoomHeader } from './AvailableRoomHeader';
import { EmptyRoomMessage } from './EmptyRoomMessage';
import { RoomCardList } from './RoomCardList';

export { ConfirmButton } from './ConfirmButton';

interface AvailableRoomListProps {
  filters: BookingFilterState;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export function AvailableRoomList({ filters, selectedRoomId, onSelectRoom }: AvailableRoomListProps) {
  const { availableRooms } = useAvailableRooms(filters);

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
