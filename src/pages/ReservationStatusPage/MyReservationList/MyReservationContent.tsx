import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyReservations } from 'pages/shared/remotes';
import { myReservationKeys } from 'pages/shared/queryKeys';
import { Message } from '../index';
import { MyReservationEmpty } from './MyReservationEmpty';
import { MyReservationBody } from './MyReservationBody';

interface MyReservationContentProps {
  setMessage: (message: Message | null) => void;
}

export function MyReservationContent({ setMessage }: MyReservationContentProps) {
  const { data: myReservations } = useSuspenseQuery({
    queryKey: myReservationKeys.all,
    queryFn: getMyReservations,
  });

  if (myReservations.length === 0) {
    return <MyReservationEmpty />;
  }

  return <MyReservationBody setMessage={setMessage} />;
}
