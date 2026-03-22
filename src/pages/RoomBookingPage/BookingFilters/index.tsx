import { css } from '@emotion/react';
import { Suspense } from 'react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useBookingFilterSync } from './useBookingFilterSync';
import { DateFilter } from './DateFilter';
import { StartTimeSelect } from './StartTimeSelect';
import { EndTimeSelect } from './EndTimeSelect';
import { AttendeeInput } from './AttendeeInput';
import { FloorSelect } from './FloorSelect';
import { EquipmentToggle } from './EquipmentToggle';

export function BookingFilters() {
  useBookingFilterSync();

  return (
    <div>
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 조건
      </Text>

      <Spacing size={16} />

      <DateFilter />

      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <StartTimeSelect />
        <EndTimeSelect />
      </div>

      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <AttendeeInput />
        <Suspense fallback={<FloorSelectFallback />}>
          <FloorSelect />
        </Suspense>
      </div>

      <Spacing size={14} />

      <EquipmentToggle />
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
