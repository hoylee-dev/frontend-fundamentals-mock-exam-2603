import { css } from '@emotion/react';
import { Suspense, useState, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Top, Spacing, Border, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { Equipment } from 'pages/shared/types';
import { formatDate } from 'pages/shared/utils';
import { sectionPadding } from 'pages/shared/styles';
import { BackButton } from './BackButton';
import { BookingErrorMessage } from './BookingErrorMessage';
import { BookingFilters } from './BookingFilters';
import { ValidationError } from './ValidationError';
import { AvailableRoomList, ConfirmButton } from './AvailableRoomList';
import { useValidation } from './useValidation';
import { useBookRoom } from './AvailableRoomList/useBookRoom';

export interface BookingFilterState {
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  equipment: Equipment[];
  preferredFloor: number | null;
}

export function RoomBookingPage() {
  const [filters, setFilters] = useState<BookingFilterState>({
    date: formatDate(new Date()),
    startTime: '',
    endTime: '',
    attendees: 1,
    equipment: [],
    preferredFloor: null,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const updateFilter = useCallback(<K extends keyof BookingFilterState>(key: K, value: BookingFilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setErrorMessage(null);
  }, []);

  const { isFilterComplete, validationError } = useValidation(filters);
  const { handleBook, isLoading } = useBookRoom({ filters, selectedRoomId, setSelectedRoomId, setErrorMessage });

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
        <BackButton />
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
        <BookingErrorMessage errorMessage={errorMessage} />
      </div>

      <Spacing size={24} />

      <div css={sectionPadding}>
        <BookingFilters filters={filters} setFilters={setFilters} onFilterChange={updateFilter} />
      </div>

      <ValidationError validationError={validationError} />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {isFilterComplete && (
        <div css={sectionPadding}>
          <ErrorBoundary fallback={<AvailableRoomListErrorFallback />}>
            <Suspense fallback={<AvailableRoomListFallback />}>
              <AvailableRoomList
                filters={filters}
                selectedRoomId={selectedRoomId}
                onSelectRoom={setSelectedRoomId}
              />
            </Suspense>
          </ErrorBoundary>

          <Spacing size={16} />

          <ConfirmButton onBook={handleBook} isLoading={isLoading} />
        </div>
      )}

      <Spacing size={24} />
    </div>
  );
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
