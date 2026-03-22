import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Top, Spacing, Border } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { getRooms, getReservations } from 'pages/remotes';
import { Room, Reservation } from 'pages/types';
import { sectionPadding } from 'pages/styles';
import { MessageBanner } from 'pages/MessageBanner';
import { useBookingFilters } from './useBookingFilters';
import { BookingFilters } from './BookingFilters';
import { AvailableRoomList } from './AvailableRoomList';

export function RoomBookingPage() {
  const navigate = useNavigate();
  const filters = useBookingFilters();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: rooms = [] } = useQuery<Room[]>(['rooms'], getRooms);
  const { data: reservations = [] } = useQuery<Reservation[]>(
    ['reservations', filters.date],
    () => getReservations(filters.date),
    { enabled: !!filters.date }
  );

  const floors = [...new Set(rooms.map(r => r.floor))].sort((a, b) => a - b);

  const hasTimeInputs = filters.startTime !== '' && filters.endTime !== '';
  let validationError: string | null = null;
  if (hasTimeInputs) {
    if (filters.endTime <= filters.startTime) {
      validationError = '종료 시간은 시작 시간보다 늦어야 합니다.';
    } else if (filters.attendees < 1) {
      validationError = '참석 인원은 1명 이상이어야 합니다.';
    }
  }
  const isFilterComplete = hasTimeInputs && !validationError;

  const resetSelection = () => setErrorMessage(null);

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
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="뒤로가기"
          css={css`
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            font-size: 14px;
            color: ${colors.grey600};
            &:hover {
              color: ${colors.grey900};
            }
          `}
        >
          ← 예약 현황으로
        </button>
      </div>
      <Top.Top03
        css={css`
          padding-left: 24px;
          padding-right: 24px;
        `}
      >
        예약하기
      </Top.Top03>

      {errorMessage && (
        <div css={sectionPadding}>
          <Spacing size={12} />
          <MessageBanner type="error" text={errorMessage} />
        </div>
      )}

      <Spacing size={24} />

      <div css={sectionPadding}>
        <BookingFilters
          date={filters.date}
          startTime={filters.startTime}
          endTime={filters.endTime}
          attendees={filters.attendees}
          equipment={filters.equipment}
          preferredFloor={filters.preferredFloor}
          floors={floors}
          onDateChange={v => {
            filters.setDate(v);
            resetSelection();
          }}
          onStartTimeChange={v => {
            filters.setStartTime(v);
            resetSelection();
          }}
          onEndTimeChange={v => {
            filters.setEndTime(v);
            resetSelection();
          }}
          onAttendeesChange={v => {
            filters.setAttendees(v);
            resetSelection();
          }}
          onEquipmentChange={v => {
            filters.setEquipment(v);
            resetSelection();
          }}
          onFloorChange={v => {
            filters.setPreferredFloor(v);
            resetSelection();
          }}
        />
      </div>

      {validationError && (
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
      )}

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {isFilterComplete && (
        <div css={sectionPadding}>
          <AvailableRoomList
            rooms={rooms}
            reservations={reservations}
            date={filters.date}
            startTime={filters.startTime}
            endTime={filters.endTime}
            attendees={filters.attendees}
            equipment={filters.equipment}
            preferredFloor={filters.preferredFloor}
            onError={setErrorMessage}
          />
        </div>
      )}

      <Spacing size={24} />
    </div>
  );
}
