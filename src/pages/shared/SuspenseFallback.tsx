import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

export function SuspenseFallback() {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
      `}
    >
      <Text typography="t7" color={colors.grey400}>
        로딩 중...
      </Text>
    </div>
  );
}
