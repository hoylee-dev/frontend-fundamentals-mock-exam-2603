import { useState } from 'react';
import { css } from '@emotion/react';
import { Top, Spacing, Border } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { sectionPadding } from 'pages/shared/styles';
import { formatDate } from 'pages/shared/utils';
import { DateSelector } from './DateSelector';
import { Timeline } from './Timeline';
import { StatusMessage } from './StatusMessage';
import { MyReservationList } from './MyReservationList';
import { BookingButton } from './BookingButton';

export type Message = { type: 'success' | 'error'; text: string };

export function ReservationStatusPage() {
  const [date, setDate] = useState(() => formatDate(new Date()));
  const [message, setMessage] = useState<Message | null>(null);

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
        <DateSelector date={date} onDateChange={setDate} />
      </div>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <div css={sectionPadding}>
        <Timeline date={date} />
      </div>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <div css={sectionPadding}>
        <StatusMessage message={message} setMessage={setMessage} />
        <Spacing size={12} />
      </div>

      <div css={sectionPadding}>
        <MyReservationList setMessage={setMessage} />
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
