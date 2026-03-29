import { useState } from 'react';
import { css } from '@emotion/react';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'pages/shared/constants';
import { Reservation, Equipment } from 'pages/shared/types';
import { TOTAL_MINUTES, timeToMinutes } from './timelineUtils';

interface ReservationBlockProps {
  reservation: Reservation;
  roomName: string;
}

export function ReservationBlock({ reservation, roomName }: ReservationBlockProps) {
  const [isActive, setIsActive] = useState(false);

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
        onClick={() => setIsActive(prev => !prev)}
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

function ReservationTooltip({
  start,
  end,
  attendees,
  equipment,
}: {
  start: string;
  end: string;
  attendees: number;
  equipment: Equipment[];
}) {
  return (
    <div
      role="tooltip"
      css={css`
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 6px;
        background: ${colors.grey900};
        color: ${colors.white};
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        line-height: 1.6;
      `}
    >
      <div>
        {start} ~ {end}
      </div>
      <div>{attendees}명</div>
      {equipment.length > 0 && <div>{equipment.map(e => EQUIPMENT_LABELS[e]).join(', ')}</div>}
    </div>
  );
}
