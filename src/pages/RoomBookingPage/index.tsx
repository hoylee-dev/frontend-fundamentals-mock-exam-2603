import { css } from '@emotion/react';
import { Suspense, useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';
import { Top, Spacing, Border, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { sectionPadding } from 'pages/shared/styles';
import { createReservationMutation } from 'pages/shared/queries/queries';
import { QueryErrorBoundary } from 'pages/shared/ui/QueryErrorBoundary';
import { SuspenseFallback } from 'pages/shared/ui/SuspenseFallback';
import { ErrorFallback } from 'pages/shared/ui/ErrorFallback';
import { MessageBanner } from 'pages/shared/ui/MessageBanner';
import { BackButton } from './BackButton';
import { BookingFilters } from './BookingFilters';
import { InlineError } from './InlineError';
import { AvailableRoomList } from './AvailableRoomList';
import { ConfirmButton } from './ConfirmButton';
import { useRequirementParams, usePreferenceParams } from './useFilterParams';

export function RoomBookingPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useResetOnFilterChange<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [requirementParam] = useRequirementParams();
  const [preferenceParam] = usePreferenceParams();

  const queryClient = useQueryClient();
  const { mutate: createReservation, isPending: isLoading } = useMutation(createReservationMutation(queryClient));

  const hasTimeInputs = requirementParam.startTime !== '' && requirementParam.endTime !== '';
  const validationError = hasTimeInputs
    ? bookingFilterSchema.safeParse(requirementParam).error?.issues[0].message ?? null
    : null;
  const isFilterValid = hasTimeInputs && !validationError;

  const handleBook = () => {
    if (!selectedRoomId) {
      setErrorMessage('회의실을 선택해주세요.');
      return;
    }

    createReservation(
      {
        roomId: selectedRoomId,
        date: requirementParam.date,
        start: requirementParam.startTime,
        end: requirementParam.endTime,
        attendees: requirementParam.attendees,
        equipment: preferenceParam.equipment,
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
          <QueryErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<SuspenseFallback />}>
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

  const { search } = useLocation();
  const prevSearchRef = useRef(search);
  useEffect(() => {
    if (prevSearchRef.current !== search) {
      prevSearchRef.current = search;
      setValue(initialValue);
    }
  }, [search, initialValue]);

  return [value, setValue];
}

const bookingFilterSchema = z
  .object({
    startTime: z.string(),
    endTime: z.string(),
    attendees: z.number().min(1, '참석 인원은 1명 이상이어야 합니다.'),
  })
  .refine(({ startTime, endTime }) => endTime > startTime, {
    message: '종료 시간은 시작 시간보다 늦어야 합니다.',
  });
