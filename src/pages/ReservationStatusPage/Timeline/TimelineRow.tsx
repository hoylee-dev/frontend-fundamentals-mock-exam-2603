import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { Room } from 'pages/shared/types';
import { reservationsQuery } from 'pages/shared/queries';
import { ReservationBlock } from './ReservationBlock';

interface TimelineRowProps {
  room: Room;
  date: string;
}

export function TimelineRow({ room, date }: TimelineRowProps) {
  const { data: roomReservations } = useSuspenseQuery({
    ...reservationsQuery(date),
    select: reservations => reservations.filter(r => r.roomId === room.id),
  });

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        height: 32px;
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
