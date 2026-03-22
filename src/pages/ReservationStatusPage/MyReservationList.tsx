import { css } from '@emotion/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Spacing, Text, Button, ListRow } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'pages/constants';
import { Room } from 'pages/types';
import { getMyReservations, cancelReservation } from 'pages/remotes';

interface MyReservationListProps {
  rooms: Room[];
  onMessage: (message: { type: 'success' | 'error'; text: string }) => void;
}

export function MyReservationList({ rooms, onMessage }: MyReservationListProps) {
  const queryClient = useQueryClient();
  const { data: myReservations = [] } = useQuery(['myReservations'], getMyReservations);

  const cancelMutation = useMutation((id: string) => cancelReservation(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['reservations']);
      queryClient.invalidateQueries(['myReservations']);
    },
  });

  const handleCancel = async (id: string) => {
    if (!window.confirm('정말 취소하시겠습니까?')) {
      return;
    }
    try {
      await cancelMutation.mutateAsync(id);
      onMessage({ type: 'success', text: '예약이 취소되었습니다.' });
    } catch {
      onMessage({ type: 'error', text: '취소에 실패했습니다.' });
    }
  };

  const getRoomName = (roomId: string) => rooms.find(r => r.id === roomId)?.name ?? roomId;

  return (
    <div>
      <div
        css={css`
          display: flex;
          align-items: baseline;
          gap: 6px;
        `}
      >
        <Text typography="t5" fontWeight="bold" color={colors.grey900}>
          내 예약
        </Text>
        {myReservations.length > 0 && (
          <Text typography="t7" fontWeight="medium" color={colors.grey500}>
            {myReservations.length}건
          </Text>
        )}
      </div>
      <Spacing size={16} />

      {myReservations.length === 0 ? (
        <div
          css={css`
            padding: 40px 0;
            text-align: center;
            background: ${colors.grey50};
            border-radius: 14px;
          `}
        >
          <Text typography="t6" color={colors.grey500}>
            예약 내역이 없습니다.
          </Text>
        </div>
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
          {myReservations.map(res => (
            <div
              key={res.id}
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
                    top={getRoomName(res.roomId)}
                    topProps={{ typography: 't6', fontWeight: 'bold', color: colors.grey900 }}
                    bottom={`${res.date} ${res.start}~${res.end} · ${res.attendees}명 · ${
                      res.equipment.map(e => EQUIPMENT_LABELS[e]).join(', ') || '장비 없음'
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
                      handleCancel(res.id);
                    }}
                  >
                    취소
                  </Button>
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
