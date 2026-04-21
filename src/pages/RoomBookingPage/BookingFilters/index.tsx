import { Suspense } from 'react';
import { css } from '@emotion/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { formatDate } from 'pages/shared/utils';
import { TIME_SLOTS, EQUIPMENT_LABELS } from 'pages/shared/constants';
import { Equipment } from 'pages/shared/types';
import { roomsQuery } from 'pages/shared/queries/queries';
import { QueryErrorBoundary } from 'pages/shared/ui/QueryErrorBoundary';
import { ErrorFallback } from 'pages/shared/ui/ErrorFallback';
import { useRequirementParams, usePreferenceParams } from '../useFilterParams';
import { DateFilter } from './DateFilter';
import { TimeSelect } from './TimeSelect';
import { AttendeeInput } from './AttendeeInput';
import { FloorSelect } from './FloorSelect';
import { ToggleButtonGroup } from './ToggleButtonGroup';

export function BookingFilters() {
  const [requirementParam, setRequirementParams] = useRequirementParams();
  const [preferenceParam, setPreferenceParams] = usePreferenceParams();

  return (
    <div>
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 조건
      </Text>

      <Spacing size={16} />

      <DateFilter
        label="날짜"
        value={requirementParam.date}
        min={formatDate(new Date())}
        onChange={date => setRequirementParams({ date })}
      />

      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <TimeSelect
          label="시작 시간"
          value={requirementParam.startTime}
          options={TIME_SLOTS.slice(0, -1)}
          onChange={startTime => setRequirementParams({ startTime })}
        />
        <TimeSelect
          label="종료 시간"
          value={requirementParam.endTime}
          options={TIME_SLOTS.slice(1)}
          onChange={endTime => setRequirementParams({ endTime })}
        />
      </div>

      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <AttendeeInput
          label="참석 인원"
          value={requirementParam.attendees}
          min={1}
          onChange={attendees => setRequirementParams({ attendees })}
        />
        <QueryErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<FloorSelectFallback />}>
            <SuspenseQuery
              {...roomsQuery()}
              select={rooms => [...new Set(rooms.map(r => r.floor))].sort((a, b) => a - b)}
            >
              {({ data: floors }) => (
                <FloorSelect
                  label="선호 층"
                  value={preferenceParam.floor}
                  options={floors}
                  onChange={floor => setPreferenceParams({ floor })}
                />
              )}
            </SuspenseQuery>
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
        selected={preferenceParam.equipment}
        onChange={equipment => setPreferenceParams({ equipment })}
      />
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
