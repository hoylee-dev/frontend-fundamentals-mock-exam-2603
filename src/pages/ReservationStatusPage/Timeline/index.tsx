import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { roomsQuery } from 'pages/shared/queries';
import { TimelineHeader } from './TimelineHeader';
import { TimelineRow } from './TimelineRow';

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
      <ErrorBoundary fallback={<TimelineBodyErrorFallback />}>
        <Suspense fallback={<TimelineBodyFallback />}>
          <TimelineBody date={date} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function TimelineBody({ date }: { date: string }) {
  const { data: rooms } = useSuspenseQuery(roomsQuery());

  return (
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
