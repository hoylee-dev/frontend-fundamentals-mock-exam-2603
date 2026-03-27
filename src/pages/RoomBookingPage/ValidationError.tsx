import { css } from '@emotion/react';
import { Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { sectionPadding } from 'pages/shared/styles';
import { useValidation } from './useValidation';

export function ValidationError() {
  const { validationError } = useValidation();

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
