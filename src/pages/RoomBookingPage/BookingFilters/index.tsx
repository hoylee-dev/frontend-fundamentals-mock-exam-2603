import { Suspense } from 'react';
import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { formatDate } from 'pages/shared/utils';
import { TIME_SLOTS, EQUIPMENT_LABELS } from 'pages/shared/constants';
import { Equipment } from 'pages/shared/types';
import { roomsQuery } from 'pages/shared/queries';
import { QueryErrorBoundary } from 'pages/shared/QueryErrorBoundary';
import {
  useDateParam,
  useStartTimeParam,
  useEndTimeParam,
  useAttendeesParam,
  useEquipmentParam,
  usePreferredFloorParam,
} from '../useFilterParams';
import { DateFilter } from './DateFilter';
import { TimeSelect } from './TimeSelect';
import { AttendeeInput } from './AttendeeInput';
import { FloorSelect } from './FloorSelect';
import { ToggleButtonGroup } from './ToggleButtonGroup';

export function BookingFilters() {
  const [date, setDate] = useDateParam();
  const [startTime, setStartTime] = useStartTimeParam();
  const [endTime, setEndTime] = useEndTimeParam();
  const [attendees, setAttendees] = useAttendeesParam();
  const [equipment, setEquipment] = useEquipmentParam();

  return (
    <div>
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 조건
      </Text>

      <Spacing size={16} />

      <DateFilter label="날짜" value={date} min={formatDate(new Date())} onChange={setDate} />

      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <TimeSelect label="시작 시간" value={startTime} options={TIME_SLOTS.slice(0, -1)} onChange={setStartTime} />
        <TimeSelect label="종료 시간" value={endTime} options={TIME_SLOTS.slice(1)} onChange={setEndTime} />
      </div>

      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <AttendeeInput label="참석 인원" value={attendees} min={1} onChange={setAttendees} />
        <QueryErrorBoundary fallback={<FloorSelectErrorFallback />}>
          <Suspense fallback={<FloorSelectFallback />}>
            <FloorSelectWithData />
          </Suspense>
        </QueryErrorBoundary>
      </div>

      <Spacing size={14} />

      <ToggleButtonGroup
        label="필요 장비"
        options={(Object.keys(EQUIPMENT_LABELS) as Equipment[]).map(key => ({
          value: key,
          label: EQUIPMENT_LABELS[key],
        }))}
        selected={equipment}
        onChange={setEquipment}
      />
    </div>
  );
}

function FloorSelectWithData() {
  const { data: rooms } = useSuspenseQuery(roomsQuery());
  const floors = [...new Set(rooms.map(r => r.floor))].sort((a, b) => a - b);
  const [preferredFloor, setPreferredFloor] = usePreferredFloorParam();

  return <FloorSelect label="선호 층" value={preferredFloor} options={floors} onChange={setPreferredFloor} />;
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
