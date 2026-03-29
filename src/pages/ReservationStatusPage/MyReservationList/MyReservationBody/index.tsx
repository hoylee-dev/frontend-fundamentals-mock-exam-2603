import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyReservations } from 'pages/shared/remotes';
import { myReservationKeys } from 'pages/shared/queryKeys';
import { Message } from '../../index';
import { MyReservationCard } from './MyReservationCard';

interface MyReservationBodyProps {
  setMessage: (message: Message | null) => void;
}

export function MyReservationBody({ setMessage }: MyReservationBodyProps) {
  const { data: myReservations } = useSuspenseQuery({
    queryKey: myReservationKeys.all,
    queryFn: getMyReservations,
  });

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      {myReservations.map(res => (
        <MyReservationCard key={res.id} reservation={res} setMessage={setMessage} />
      ))}
    </div>
  );
}
