import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { getMyReservations } from 'pages/shared/remotes';
import { myReservationKeys } from 'pages/shared/queryKeys';
import { Message } from '../index';
import { MyReservationHeader } from './MyReservationHeader';
import { MyReservationCard } from './MyReservationCard';

interface MyReservationListProps {
  setMessage: (message: Message | null) => void;
}

// MyReservationList가 setMessage를 받는다? message, setMessage 정도는 context api 쓰는게 낫나?
export function MyReservationList({ setMessage }: MyReservationListProps) {
  return (
    <div>
      <ErrorBoundary fallback={<MyReservationHeaderErrorFallback />}>
        <Suspense fallback={<MyReservationHeaderFallback />}>
          <MyReservationHeader />
        </Suspense>
      </ErrorBoundary>
      <Spacing size={16} />
      {/* todo: suspensive */}
      <ErrorBoundary fallback={<MyReservationErrorFallback />}>
        <Suspense fallback={<MyReservationContentFallback />}>
          <MyReservationContent setMessage={setMessage} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function MyReservationContent({ setMessage }: { setMessage: (message: Message | null) => void }) {
  const { data: myReservations } = useSuspenseQuery({
    queryKey: myReservationKeys.all,
    queryFn: getMyReservations,
  });

  if (myReservations.length === 0) {
    return (
      <div
        css={css`
          padding: 40px 0;
          text-align: center;
          background: ${colors.grey50};
          border-radius: 14px;
        `}
      >
        <Text typography="t6" color={colors.grey500}>
          예약 내역이 없습니다.
        </Text>
      </div>
    );
  }

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

function MyReservationHeaderFallback() {
  return (
    <Text typography="t5" fontWeight="bold" color={colors.grey900}>
      내 예약
    </Text>
  );
}

function MyReservationHeaderErrorFallback() {
  return (
    <Text typography="t5" fontWeight="bold" color={colors.grey900}>
      내 예약
    </Text>
  );
}

function MyReservationContentFallback() {
  return (
    <div
      css={css`
        padding: 40px 0;
        text-align: center;
        background: ${colors.grey50};
        border-radius: 14px;
      `}
    >
      <Text typography="t6" color={colors.grey400}>
        로딩 중...
      </Text>
    </div>
  );
}

function MyReservationErrorFallback() {
  return (
    <div
      css={css`
        padding: 40px 0;
        text-align: center;
        background: ${colors.grey50};
        border-radius: 14px;
      `}
    >
      <Text typography="t6" color={colors.grey400}>
        데이터를 불러오지 못했습니다.
      </Text>
    </div>
  );
}
