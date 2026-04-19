import { Suspense } from 'react';
import { css } from '@emotion/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { Room } from 'pages/shared/types';
import { roomsQuery, reservationsQuery } from 'pages/shared/queries';
import { QueryErrorBoundary } from 'pages/shared/QueryErrorBoundary';
import { TimelineHeader } from './TimelineHeader';
import { ReservationBlock } from './ReservationBlock';

interface TimelineProps {
  date: string;
}

export function Timeline({ date }: TimelineProps) {
  return (
    <div
      css={css`
        background: ${colors.grey50};
        border-radius: 14px;
        padding: 16px;
      `}
    >
      <TimelineHeader />
      <QueryErrorBoundary fallback={<TimelineBodyErrorFallback />}>
        <Suspense fallback={<TimelineBodyFallback />}>
          <SuspenseQuery {...roomsQuery()}>
            {({ data: rooms }) => (
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 4px;
                `}
              >
                {rooms.map(room => (
                  <TimelineRow key={room.id} room={room} date={date} />
                ))}
              </div>
            )}
          </SuspenseQuery>
        </Suspense>
      </QueryErrorBoundary>
    </div>
  );
}

function TimelineRow({ room, date }: { room: Room; date: string }) {
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
        <SuspenseQuery
          {...reservationsQuery(date)}
          select={reservations => reservations.filter(r => r.roomId === room.id)}
        >
          {({ data: roomReservations }) =>
            roomReservations.map(res => <ReservationBlock key={res.id} reservation={res} roomName={room.name} />)
          }
        </SuspenseQuery>
      </div>
    </div>
  );
}

function TimelineBodyFallback() {
  return (
    <div
      css={css`
        height: 280px;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Text typography="t7" color={colors.grey400}>
        로딩 중...
      </Text>
    </div>
  );
}

function TimelineBodyErrorFallback() {
  return (
    <div
      css={css`
        height: 280px;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Text typography="t7" color={colors.grey400}>
        데이터를 불러오지 못했습니다.
      </Text>
    </div>
  );
}
