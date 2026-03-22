import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { Room, Reservation } from 'pages/types';
import { getReservations } from 'pages/remotes';
import { useDateStore } from '../../useDateStore';
import { ReservationBlock } from './ReservationBlock';

interface TimelineRowProps {
  room: Room;
  isFirst: boolean;
}

export function TimelineRow({ room, isFirst }: TimelineRowProps) {
  const date = useDateStore(state => state.date);
  const { data: reservations = [] } = useQuery<Reservation[]>(['reservations', date], () => getReservations(date), {
    enabled: !!date,
  });
  const roomReservations = reservations.filter(r => r.roomId === room.id);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        height: 32px;
        ${!isFirst ? 'margin-top: 4px;' : ''}
      `}
    >
      <div
        css={css`
          width: 80px;
          flex-shrink: 0;
          padding-right: 8px;
        `}
      >
        <Text
          typography="t7"
          fontWeight="medium"
          color={colors.grey700}
          ellipsisAfterLines={1}
          css={css`
            font-size: 12px;
          `}
        >
          {room.name}
        </Text>
      </div>
      <div
        css={css`
          flex: 1;
          height: 24px;
          background: ${colors.white};
          border-radius: 6px;
          position: relative;
          overflow: visible;
        `}
      >
        {roomReservations.map(res => (
          <ReservationBlock key={res.id} reservation={res} roomName={room.name} />
        ))}
      </div>
    </div>
  );
}
