import { css } from '@emotion/react';
import { colors } from '_tosslib/constants/colors';
import { Reservation } from 'pages/shared/types';
import { TOTAL_MINUTES, timeToMinutes } from '../../timelineUtils';
import { ReservationTooltip } from './ReservationTooltip';
import { useActiveReservation } from './useActiveReservationStore';

interface ReservationBlockProps {
  reservation: Reservation;
  roomName: string;
}

export function ReservationBlock({ reservation, roomName }: ReservationBlockProps) {
  const { activeId, toggle } = useActiveReservation();
  const isActive = activeId === reservation.id;

  const left = (timeToMinutes(reservation.start) / TOTAL_MINUTES) * 100;
  const width = ((timeToMinutes(reservation.end) - timeToMinutes(reservation.start)) / TOTAL_MINUTES) * 100;

  return (
    <div
      css={css`
        position: absolute;
        left: ${left}%;
        width: ${width}%;
        height: 100%;
      `}
    >
      <div
        role="button"
        aria-label={`${roomName} ${reservation.start}-${reservation.end} 예약 상세`}
        onClick={() => toggle(reservation.id)}
        css={css`
          width: 100%;
          height: 100%;
          background: ${colors.blue400};
          border-radius: 4px;
          opacity: ${isActive ? 1 : 0.75};
          cursor: pointer;
          transition: opacity 0.15s;
          &:hover {
            opacity: 1;
          }
        `}
      />
      {isActive && (
        <ReservationTooltip
          start={reservation.start}
          end={reservation.end}
          attendees={reservation.attendees}
          equipment={reservation.equipment}
        />
      )}
    </div>
  );
}
