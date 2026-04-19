import type { FallbackProps } from 'react-error-boundary';
import { css } from '@emotion/react';
import { Text, Button, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

export function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 20px;
      `}
    >
      <Text typography="t6" color={colors.grey700}>
        잠시 후 다시 시도해주세요
      </Text>
      <Spacing size={16} />
      <Button size="small" onClick={resetErrorBoundary}>
        다시 시도
      </Button>
    </div>
  );
}
