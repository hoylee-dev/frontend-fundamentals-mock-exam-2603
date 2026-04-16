import { css } from '@emotion/react';
import { Button, ListRow } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'pages/shared/constants';
import { Reservation } from 'pages/shared/types';
import { useRoomsSuspenseQuery } from 'pages/shared/useRoomsQuery';
import { Message } from '../index';
import { useCancelReservation } from './useCancelReservation';

interface MyReservationCardProps {
  reservation: Reservation;
  setMessage: (message: Message | null) => void;
}

export function MyReservationCard({ reservation, setMessage }: MyReservationCardProps) {
  const { handleCancelReservation } = useCancelReservation();
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
            onClick={async e => {
              e.stopPropagation();
              try {
                if (!window.confirm('정말 취소하시겠습니까?')) {
                  return;
                }
                await handleCancelReservation(reservation.id);
                setMessage({ type: 'success', text: '예약이 취소되었습니다.' });
              } catch {
                setMessage({ type: 'error', text: '취소에 실패했습니다.' });
              }
            }}
          >
            취소
          </Button>
        }
      />
    </div>
  );
}
