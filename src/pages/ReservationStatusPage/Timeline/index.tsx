import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { TimelineHeader } from './TimelineHeader';
import { TimelineBody } from './TimelineBody';

export function Timeline() {
  return (
    <div>
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 현황
      </Text>
      <Spacing size={16} />

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
            <TimelineBody />
          </Suspense>
        </ErrorBoundary>
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
