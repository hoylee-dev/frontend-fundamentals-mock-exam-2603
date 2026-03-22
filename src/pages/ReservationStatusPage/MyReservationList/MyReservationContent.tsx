import { useQuery } from '@tanstack/react-query';
import { getMyReservations } from 'pages/remotes';
import { MyReservationEmpty } from './MyReservationEmpty';
import { MyReservationBody } from './MyReservationBody';

export function MyReservationContent() {
  const { data: myReservations = [] } = useQuery(['myReservations'], getMyReservations);

  if (myReservations.length === 0) {
    return <MyReservationEmpty />;
  }

  return <MyReservationBody />;
}
