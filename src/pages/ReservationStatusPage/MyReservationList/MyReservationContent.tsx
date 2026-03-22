import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyReservations } from 'pages/shared/remotes';
import { myReservationKeys } from 'pages/shared/queryKeys';
import { MyReservationEmpty } from './MyReservationEmpty';
import { MyReservationBody } from './MyReservationBody';

export function MyReservationContent() {
  const { data: myReservations } = useSuspenseQuery({
    queryKey: myReservationKeys.all,
    queryFn: getMyReservations,
  });

  if (myReservations.length === 0) {
    return <MyReservationEmpty />;
  }

  return <MyReservationBody />;
}
