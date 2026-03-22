import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { getMyReservations } from 'pages/remotes';
import { MyReservationCard } from './MyReservationCard';

export function MyReservationBody() {
  const { data: myReservations = [] } = useQuery({ queryKey: ['myReservations'], queryFn: getMyReservations });

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      {myReservations.map(res => (
        <MyReservationCard key={res.id} reservation={res} />
      ))}
    </div>
  );
}
