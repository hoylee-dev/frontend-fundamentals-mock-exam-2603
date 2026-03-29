import { css } from '@emotion/react';
import { colors } from '_tosslib/constants/colors';

interface InlineErrorProps {
  message: string | null;
}

export function InlineError({ message }: InlineErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <span
      css={css`
        color: ${colors.red500};
        font-size: 14px;
      `}
      role="alert"
    >
      {message}
    </span>
  );
}
