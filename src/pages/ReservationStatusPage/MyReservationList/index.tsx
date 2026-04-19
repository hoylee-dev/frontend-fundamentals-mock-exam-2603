import { Suspense } from 'react';
import { css } from '@emotion/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SuspenseQuery } from '@suspensive/react-query';
import { Spacing, Text, Button, ListRow } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'pages/shared/constants';
import { myReservationsQuery, roomsQuery, cancelReservationMutation } from 'pages/shared/queries';
import { Reservation } from 'pages/shared/types';
import { QueryErrorBoundary } from 'pages/shared/QueryErrorBoundary';
import { SuspenseFallback } from 'pages/shared/SuspenseFallback';
import { ErrorFallback } from 'pages/shared/ErrorFallback';
import { Message } from '../index';

interface MyReservationListProps {
  setMessage: (message: Message | null) => void;
}

export function MyReservationList({ setMessage }: MyReservationListProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: cancelReservation } = useMutation(cancelReservationMutation(queryClient));

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
        <QueryErrorBoundary fallback={null}>
          <Suspense>
            <SuspenseQuery {...myReservationsQuery()}>
              {({ data: myReservations }) =>
                myReservations.length > 0 ? (
                  <Text typography="t7" fontWeight="medium" color={colors.grey500}>
                    {myReservations.length}건
                  </Text>
                ) : null
              }
            </SuspenseQuery>
          </Suspense>
        </QueryErrorBoundary>
      </div>
      <Spacing size={16} />
      <QueryErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SuspenseFallback />}>
          <SuspenseQuery {...myReservationsQuery()}>
            {({ data: myReservations }) => {
              if (myReservations.length === 0) {
                return (
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
                );
              }

              return (
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                  `}
                >
                  {myReservations.map(res => (
                    <ReservationCard
                      key={res.id}
                      reservation={res}
                      onCancel={async () => {
                        await cancelReservation(res.id);
                        setMessage({ type: 'success', text: '예약이 취소되었습니다.' });
                      }}
                      onCancelError={() => setMessage({ type: 'error', text: '취소에 실패했습니다.' })}
                    />
                  ))}
                </div>
              );
            }}
          </SuspenseQuery>
        </Suspense>
      </QueryErrorBoundary>
    </div>
  );
}

function ReservationCard({
  reservation,
  onCancel,
  onCancelError,
}: {
  reservation: Reservation;
  onCancel: () => Promise<void>;
  onCancelError: () => void;
}) {
  return (
    <SuspenseQuery
      {...roomsQuery()}
      select={rooms => rooms.find(r => r.id === reservation.roomId)?.name ?? reservation.roomId}
    >
      {({ data: roomName }) => (
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
                    await onCancel();
                  } catch {
                    onCancelError();
                  }
                }}
              >
                취소
              </Button>
            }
          />
        </div>
      )}
    </SuspenseQuery>
  );
}
