import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Top, Spacing, Border, Button } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { getRooms, getReservations } from 'pages/remotes';
import { formatDate } from 'pages/utils';
import { sectionPadding } from 'pages/styles';
import { Room, Reservation } from 'pages/types';
import { MessageBanner } from 'pages/MessageBanner';
import { DateSelector } from './DateSelector';
import { Timeline } from './Timeline';
import { MyReservationList } from './MyReservationList';

export function ReservationStatusPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState(formatDate(new Date()));

  const locationState = location.state as { message?: string } | null;
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    locationState?.message ? { type: 'success', text: locationState.message } : null
  );

  useEffect(() => {
    if (locationState?.message) {
      window.history.replaceState({}, '');
    }
  }, [locationState]);

  const { data: rooms = [] } = useQuery<Room[]>(['rooms'], getRooms);
  const { data: reservations = [] } = useQuery<Reservation[]>(['reservations', date], () => getReservations(date), {
    enabled: !!date,
  });

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
        <DateSelector value={date} onChange={setDate} />
      </div>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <div css={sectionPadding}>
        <Timeline rooms={rooms} reservations={reservations} />
      </div>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {message && (
        <div css={sectionPadding}>
          <MessageBanner type={message.type} text={message.text} />
          <Spacing size={12} />
        </div>
      )}

      <div css={sectionPadding}>
        <MyReservationList rooms={rooms} onMessage={setMessage} />
      </div>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <div css={sectionPadding}>
        <Button display="full" onClick={() => navigate('/booking')}>
          예약하기
        </Button>
      </div>
      <Spacing size={24} />
    </div>
  );
}
