import { css } from '@emotion/react';
import { Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { sectionPadding } from 'pages/styles';
import { useBookingFilterStore } from './useBookingFilterStore';

export function useValidation() {
  const { startTime, endTime, attendees } = useBookingFilterStore();

  const hasTimeInputs = startTime !== '' && endTime !== '';
  let validationError: string | null = null;
  if (hasTimeInputs) {
    if (endTime <= startTime) {
      validationError = '종료 시간은 시작 시간보다 늦어야 합니다.';
    } else if (attendees < 1) {
      validationError = '참석 인원은 1명 이상이어야 합니다.';
    }
  }
  const isFilterComplete = hasTimeInputs && !validationError;

  return { validationError, isFilterComplete };
}

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
