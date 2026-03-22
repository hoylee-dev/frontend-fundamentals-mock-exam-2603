import { Suspense } from 'react';
import { Spacing } from '_tosslib/components';
import { MyReservationHeader } from './MyReservationHeader';
import { MyReservationContent } from './MyReservationContent';

export function MyReservationList() {
  return (
    <div>
      <Suspense fallback={null}>
        <MyReservationHeader />
      </Suspense>
      <Spacing size={16} />
      <Suspense fallback={null}>
        <MyReservationContent />
      </Suspense>
    </div>
  );
}
