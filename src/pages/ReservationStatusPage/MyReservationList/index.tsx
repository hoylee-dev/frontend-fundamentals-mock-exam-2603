import { Spacing } from '_tosslib/components';
import { MyReservationHeader } from './MyReservationHeader';
import { MyReservationContent } from './MyReservationContent';

export function MyReservationList() {
  return (
    <div>
      <MyReservationHeader />
      <Spacing size={16} />
      <MyReservationContent />
    </div>
  );
}
