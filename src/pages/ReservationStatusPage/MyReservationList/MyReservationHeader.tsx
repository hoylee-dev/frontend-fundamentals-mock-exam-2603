import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { getMyReservations } from 'pages/shared/remotes';

export function MyReservationHeader() {
  const { data: myReservations } = useSuspenseQuery({ queryKey: ['myReservations'], queryFn: getMyReservations });

  return (
    <div
      css={css`
        display: flex;
        align-items: baseline;
        gap: 6px;
      `}
    >
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        내 예약
      </Text>
      {myReservations.length > 0 && (
        <Text typography="t7" fontWeight="medium" color={colors.grey500}>
          {myReservations.length}건
        </Text>
      )}
    </div>
  );
}
