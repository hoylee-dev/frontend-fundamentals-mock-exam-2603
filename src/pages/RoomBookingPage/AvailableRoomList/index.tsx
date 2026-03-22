import { Spacing } from '_tosslib/components';
import { useAvailableRooms } from './useAvailableRooms';
import { AvailableRoomHeader } from './AvailableRoomHeader';
import { EmptyRoomMessage } from './EmptyRoomMessage';
import { RoomCardList } from './RoomCardList';
import { ConfirmButton } from './ConfirmButton';

export function AvailableRoomList() {
  const { availableRooms } = useAvailableRooms();

  return (
    <div>
      <AvailableRoomHeader />

      <Spacing size={16} />

      {availableRooms.length === 0 ? <EmptyRoomMessage /> : <RoomCardList />}

      <Spacing size={16} />

      <ConfirmButton />
    </div>
  );
}
