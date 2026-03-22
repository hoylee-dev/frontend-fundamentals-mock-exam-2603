import { css } from '@emotion/react';
import { Button, ListRow } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'pages/constants';
import { Reservation } from 'pages/types';
import { useRoomsSuspenseQuery } from 'pages/useRoomsQuery';
import { useCancelReservation } from './useCancelReservation';

interface MyReservationCardProps {
  reservation: Reservation;
}

export function MyReservationCard({ reservation }: MyReservationCardProps) {
  const { handleCancel } = useCancelReservation();
  const { data: rooms } = useRoomsSuspenseQuery();
  const roomName = rooms.find(r => r.id === reservation.roomId)?.name ?? reservation.roomId;

  return (
    <div
      css={css`
        padding: 14px 16px;
        border-radius: 14px;
        background: ${colors.grey50};
        border: 1px solid ${colors.grey200};
      `}
    >
      <ListRow
        contents={
          <ListRow.Text2Rows
            top={roomName}
            topProps={{ typography: 't6', fontWeight: 'bold', color: colors.grey900 }}
            bottom={`${reservation.date} ${reservation.start}~${reservation.end} · ${reservation.attendees}명 · ${
              reservation.equipment.map(e => EQUIPMENT_LABELS[e]).join(', ') || '장비 없음'
            }`}
            bottomProps={{ typography: 't7', color: colors.grey600 }}
          />
        }
        right={
          <Button
            type="danger"
            style="weak"
            size="small"
            onClick={e => {
              e.stopPropagation();
              handleCancel(reservation.id);
            }}
          >
            취소
          </Button>
        }
      />
    </div>
  );
}
