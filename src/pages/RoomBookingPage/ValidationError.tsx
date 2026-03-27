import { css } from '@emotion/react';
import { Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { sectionPadding } from 'pages/shared/styles';

interface ValidationErrorProps {
  validationError: string | null;
}

export function ValidationError({ validationError }: ValidationErrorProps) {
  if (!validationError) {
    return null;
  }

  return (
    <div css={sectionPadding}>
      <Spacing size={8} />
      <span
        css={css`
          color: ${colors.red500};
          font-size: 14px;
        `}
        role="alert"
      >
        {validationError}
      </span>
    </div>
  );
}
