import { css } from '@emotion/react';
import { Top, Spacing, Border } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { sectionPadding } from 'pages/shared/styles';
import { DateSelector } from './DateSelector';
import { Timeline } from './Timeline';
import { StatusMessage } from './StatusMessage';
import { MyReservationList } from './MyReservationList';
import { BookingButton } from './BookingButton';

export function ReservationStatusPage() {
  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <Top.Top03
        css={css`
          padding-left: 24px;
          padding-right: 24px;
        `}
      >
        회의실 예약
      </Top.Top03>

      <Spacing size={24} />

      <div css={sectionPadding}>
        <DateSelector />
      </div>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <div css={sectionPadding}>
        <Timeline />
      </div>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <div css={sectionPadding}>
        <StatusMessage />
        <Spacing size={12} />
      </div>

      <div css={sectionPadding}>
        <MyReservationList />
      </div>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <div css={sectionPadding}>
        <BookingButton />
      </div>
      <Spacing size={24} />
    </div>
  );
}
