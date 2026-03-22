import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Top, Spacing, Border, Button } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { sectionPadding } from 'pages/styles';
import { MessageBanner } from 'pages/MessageBanner';
import { DateSelector } from './DateSelector';
import { Timeline } from './Timeline';
import { MyReservationList } from './MyReservationList';
import { useMessageStore } from './useMessageStore';

export function ReservationStatusPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { message?: string } | null;
  const { message, setMessage } = useMessageStore();

  useEffect(() => {
    if (locationState?.message) {
      setMessage({ type: 'success', text: locationState.message });
      window.history.replaceState({}, '');
    }
  }, [locationState, setMessage]);

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

      {message && (
        <div css={sectionPadding}>
          <MessageBanner type={message.type} text={message.text} />
          <Spacing size={12} />
        </div>
      )}

      <div css={sectionPadding}>
        <MyReservationList />
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
