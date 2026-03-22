import { Suspense } from 'react';
import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { MyReservationHeader } from './MyReservationHeader';
import { MyReservationContent } from './MyReservationContent';

export function MyReservationList() {
  return (
    <div>
      <Suspense
        fallback={
          <Text typography="t5" fontWeight="bold" color={colors.grey900}>
            내 예약
          </Text>
        }
      >
        <MyReservationHeader />
      </Suspense>
      <Spacing size={16} />
      <Suspense
        fallback={
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
        }
      >
        <MyReservationContent />
      </Suspense>
    </div>
  );
}
