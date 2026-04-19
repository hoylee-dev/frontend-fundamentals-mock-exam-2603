import { css } from '@emotion/react';
import { Suspense, useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Top, Spacing, Border, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { sectionPadding } from 'pages/shared/styles';
import { createReservationMutation } from 'pages/shared/queries';
import { QueryErrorBoundary } from 'pages/shared/QueryErrorBoundary';
import { MessageBanner } from 'pages/shared/MessageBanner';
import { BackButton } from './BackButton';
import { BookingFilters } from './BookingFilters';
import { InlineError } from './InlineError';
import { AvailableRoomList, ConfirmButton } from './AvailableRoomList';
import { useValidation } from './useValidation';
import {
  useDateParam,
  useStartTimeParam,
  useEndTimeParam,
  useAttendeesParam,
  useEquipmentParam,
} from './useFilterParams';

export function RoomBookingPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useResetOnFilterChange<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [date] = useDateParam();
  const [startTime] = useStartTimeParam();
  const [endTime] = useEndTimeParam();
  const [attendees] = useAttendeesParam();
  const [equipment] = useEquipmentParam();

  const queryClient = useQueryClient();
  const { validationError, isFilterValid } = useValidation();
  const { mutate: createReservation, isPending: isLoading } = useMutation(createReservationMutation(queryClient));

  const handleBook = () => {
    if (!selectedRoomId) {
      setErrorMessage('회의실을 선택해주세요.');
      return;
    }

    createReservation(
      {
        roomId: selectedRoomId,
        date,
        start: startTime,
        end: endTime,
        attendees,
        equipment,
      },
      {
        onSuccess: result => {
          if ('ok' in result && result.ok) {
            navigate('/', { state: { message: '예약이 완료되었습니다!' } });
            return;
          }

          setErrorMessage(result.message ?? '예약에 실패했습니다.');
          setSelectedRoomId(null);
        },
        onError: (err: unknown) => {
          let message = '예약에 실패했습니다.';
          if (axios.isAxiosError(err)) {
            const data = err.response?.data as { message?: string } | undefined;
            message = data?.message ?? message;
          }

          setErrorMessage(message);
          setSelectedRoomId(null);
        },
      }
    );
  };

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
        <BackButton label="뒤로가기">← 예약 현황으로</BackButton>
      </div>
      <Top.Top03
        css={css`
          padding-left: 24px;
          padding-right: 24px;
        `}
      >
        예약하기
      </Top.Top03>

      <div css={sectionPadding}>
        <Spacing size={12} />
        {errorMessage && <MessageBanner type="error" text={errorMessage} />}
      </div>

      <Spacing size={24} />

      <div css={sectionPadding}>
        <BookingFilters />
      </div>

      <div css={sectionPadding}>
        <Spacing size={8} />
        {validationError && <InlineError message={validationError} />}
      </div>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {isFilterValid && (
        <div css={sectionPadding}>
          <Text typography="t5" fontWeight="bold" color={colors.grey900}>
            예약 가능 회의실
          </Text>
          <QueryErrorBoundary fallback={<AvailableRoomListErrorFallback />}>
            <Suspense fallback={<AvailableRoomListFallback />}>
              <AvailableRoomList selectedRoomId={selectedRoomId} onSelectRoom={setSelectedRoomId} />
            </Suspense>
          </QueryErrorBoundary>

          <Spacing size={16} />

          <ConfirmButton label="확정" loadingLabel="예약 중..." onClick={handleBook} isLoading={isLoading} />
        </div>
      )}

      <Spacing size={24} />
    </div>
  );
}

function useResetOnFilterChange<T>(initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);

  const [searchParams] = useSearchParams();
  const prevParamsRef = useRef(searchParams.toString());
  useEffect(() => {
    const current = searchParams.toString();
    if (prevParamsRef.current !== current) {
      prevParamsRef.current = current;
      setValue(initialValue);
    }
  }, [searchParams, initialValue]);

  return [value, setValue];
}

function AvailableRoomListFallback() {
  return (
    <div
      css={css`
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Text typography="t7" color={colors.grey400}>
        로딩 중...
      </Text>
    </div>
  );
}

function AvailableRoomListErrorFallback() {
  return (
    <div
      css={css`
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Text typography="t7" color={colors.grey400}>
        회의실 목록을 불러오지 못했습니다.
      </Text>
    </div>
  );
}
