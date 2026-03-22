import { Suspense } from 'react';
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
        <Suspense
          fallback={
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
          }
        >
          <TimelineBody />
        </Suspense>
      </div>
    </div>
  );
}
