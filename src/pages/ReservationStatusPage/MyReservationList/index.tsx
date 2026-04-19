import { Suspense } from 'react';
import { css } from '@emotion/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { myReservationsQuery } from 'pages/shared/queries';
import { QueryErrorBoundary } from 'pages/shared/QueryErrorBoundary';
import { Message } from '../index';
import { MyReservationCard } from './MyReservationCard';

interface MyReservationListProps {
  setMessage: (message: Message | null) => void;
}

export function MyReservationList({ setMessage }: MyReservationListProps) {
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
      <QueryErrorBoundary fallback={<MyReservationErrorFallback />}>
        <Suspense fallback={<MyReservationContentFallback />}>
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
                    <MyReservationCard key={res.id} reservation={res} setMessage={setMessage} />
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

function MyReservationContentFallback() {
  return (
    <div
      css={css`
        padding: 40px 0;
        text-align: center;
        background: ${colors.grey50};
        border-radius: 14px;
      `}
    >
      <Text typography="t6" color={colors.grey400}>
        로딩 중...
      </Text>
    </div>
  );
}

function MyReservationErrorFallback() {
  return (
    <div
      css={css`
        padding: 40px 0;
        text-align: center;
        background: ${colors.grey50};
        border-radius: 14px;
      `}
    >
      <Text typography="t6" color={colors.grey400}>
        데이터를 불러오지 못했습니다.
      </Text>
    </div>
  );
}
