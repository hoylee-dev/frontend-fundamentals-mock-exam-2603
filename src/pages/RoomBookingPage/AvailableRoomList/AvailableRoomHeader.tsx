import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

interface AvailableRoomHeaderProps {
  roomCount: number;
}

export function AvailableRoomHeader({ roomCount }: AvailableRoomHeaderProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: baseline;
        gap: 6px;
      `}
    >
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 가능 회의실
      </Text>
      <Text typography="t7" fontWeight="medium" color={colors.grey500}>
        {roomCount}개
      </Text>
    </div>
  );
}
