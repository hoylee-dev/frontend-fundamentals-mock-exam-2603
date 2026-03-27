import { css } from '@emotion/react';
import { Dispatch, SetStateAction, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { BookingFilterState } from '../index';
import { useBookingFilterSync } from './useBookingFilterSync';
import { DateFilter } from './DateFilter';
import { StartTimeSelect } from './StartTimeSelect';
import { EndTimeSelect } from './EndTimeSelect';
import { AttendeeInput } from './AttendeeInput';
import { FloorSelect } from './FloorSelect';
import { EquipmentToggle } from './EquipmentToggle';

interface BookingFiltersProps {
  filters: BookingFilterState;
  setFilters: Dispatch<SetStateAction<BookingFilterState>>;
  onFilterChange: <K extends keyof BookingFilterState>(key: K, value: BookingFilterState[K]) => void;
}

export function BookingFilters({ filters, setFilters, onFilterChange }: BookingFiltersProps) {
  useBookingFilterSync(filters, setFilters);

  return (
    <div>
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 조건
      </Text>

      <Spacing size={16} />

      <DateFilter date={filters.date} onDateChange={v => onFilterChange('date', v)} />

      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <StartTimeSelect startTime={filters.startTime} onStartTimeChange={v => onFilterChange('startTime', v)} />
        <EndTimeSelect endTime={filters.endTime} onEndTimeChange={v => onFilterChange('endTime', v)} />
      </div>

      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <AttendeeInput attendees={filters.attendees} onAttendeesChange={v => onFilterChange('attendees', v)} />
        <ErrorBoundary fallback={<FloorSelectErrorFallback />}>
          <Suspense fallback={<FloorSelectFallback />}>
            <FloorSelect
              preferredFloor={filters.preferredFloor}
              onPreferredFloorChange={v => onFilterChange('preferredFloor', v)}
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      <Spacing size={14} />

      <EquipmentToggle equipment={filters.equipment} onEquipmentChange={v => onFilterChange('equipment', v)} />
    </div>
  );
}

function FloorSelectFallback() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: 1;
      `}
    />
  );
}

function FloorSelectErrorFallback() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: 1;
      `}
    >
      <Text typography="t7" color={colors.grey400}>
        층 정보를 불러오지 못했습니다.
      </Text>
    </div>
  );
}
