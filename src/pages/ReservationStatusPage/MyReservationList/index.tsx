import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { MyReservationHeader } from './MyReservationHeader';
import { MyReservationContent } from './MyReservationContent';

import { Message } from '../index';

interface MyReservationListProps {
  setMessage: (message: Message | null) => void;
}

export function MyReservationList({ setMessage }: MyReservationListProps) {
  return (
    <div>
      <ErrorBoundary fallback={<MyReservationHeaderErrorFallback />}>
        <Suspense fallback={<MyReservationHeaderFallback />}>
          <MyReservationHeader />
        </Suspense>
      </ErrorBoundary>
      <Spacing size={16} />
      <ErrorBoundary fallback={<MyReservationErrorFallback />}>
        <Suspense fallback={<MyReservationContentFallback />}>
          <MyReservationContent setMessage={setMessage} />
        </Suspense>
      </ErrorBoundary>
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
