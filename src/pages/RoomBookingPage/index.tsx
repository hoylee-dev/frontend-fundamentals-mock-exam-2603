import { css } from '@emotion/react';
import { Top, Spacing, Border } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { sectionPadding } from 'pages/styles';
import { BackButton } from './BackButton';
import { BookingErrorMessage } from './BookingErrorMessage';
import { BookingFilters } from './BookingFilters';
import { ValidationError } from './ValidationError';
import { AvailableRoomList } from './AvailableRoomList';
import { useValidation } from './useValidation';

export function RoomBookingPage() {
  const { isFilterComplete } = useValidation();

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <div
        css={css`
          padding: 12px 24px 0;
        `}
      >
        <BackButton />
      </div>
      <Top.Top03
        css={css`
          padding-left: 24px;
          padding-right: 24px;
        `}
      >
        예약하기
      </Top.Top03>

      <div css={sectionPadding}>
        <Spacing size={12} />
        <BookingErrorMessage />
      </div>

      <Spacing size={24} />

      <div css={sectionPadding}>
        <BookingFilters />
      </div>

      <ValidationError />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {isFilterComplete && (
        <div css={sectionPadding}>
          <AvailableRoomList />
        </div>
      )}

      <Spacing size={24} />
    </div>
  );
}
