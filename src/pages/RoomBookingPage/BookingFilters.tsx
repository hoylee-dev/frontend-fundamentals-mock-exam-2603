import { css } from '@emotion/react';
import { Spacing, Text, Select } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { TIME_SLOTS } from 'pages/constants';
import { formatDate } from 'pages/utils';
import { dateInputStyle } from 'pages/styles';
import { useRoomsQuery } from 'pages/useRoomsQuery';
import { EquipmentToggle } from './EquipmentToggle';
import { Equipment } from 'pages/types';
import { useBookingFilterStore } from './useBookingFilterStore';
import { useBookingFilterSync } from './useBookingFilterSync';
import { useBookingErrorStore } from './useBookingErrorStore';

export function BookingFilters() {
  useBookingFilterSync();

  const {
    date, setDate,
    startTime, setStartTime,
    endTime, setEndTime,
    attendees, setAttendees,
    equipment, setEquipment,
    preferredFloor, setPreferredFloor,
  } = useBookingFilterStore();
  const setErrorMessage = useBookingErrorStore(state => state.setErrorMessage);
  const { data: rooms = [] } = useRoomsQuery();
  const floors = [...new Set(rooms.map(r => r.floor))].sort((a, b) => a - b);

  const resetError = () => setErrorMessage(null);

  return (
    <div>
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 조건
      </Text>
      <Spacing size={16} />

      {/* 날짜 */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 6px;
        `}
      >
        <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
          날짜
        </Text>
        <input
          type="date"
          value={date}
          min={formatDate(new Date())}
          onChange={e => { setDate(e.target.value); resetError(); }}
          aria-label="날짜"
          css={dateInputStyle}
        />
      </div>
      <Spacing size={14} />

      {/* 시간 */}
      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
          `}
        >
          <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
            시작 시간
          </Text>
          <Select value={startTime} onChange={e => { setStartTime(e.target.value); resetError(); }} aria-label="시작 시간">
            <option value="">선택</option>
            {TIME_SLOTS.slice(0, -1).map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
          `}
        >
          <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
            종료 시간
          </Text>
          <Select value={endTime} onChange={e => { setEndTime(e.target.value); resetError(); }} aria-label="종료 시간">
            <option value="">선택</option>
            {TIME_SLOTS.slice(1).map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <Spacing size={14} />

      {/* 참석 인원 + 선호 층 */}
      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
          `}
        >
          <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
            참석 인원
          </Text>
          <input
            type="number"
            min={1}
            value={attendees}
            onChange={e => { setAttendees(Math.max(1, Number(e.target.value))); resetError(); }}
            aria-label="참석 인원"
            css={dateInputStyle}
          />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
          `}
        >
          <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
            선호 층
          </Text>
          <Select
            value={preferredFloor ?? ''}
            onChange={e => { setPreferredFloor(e.target.value === '' ? null : Number(e.target.value)); resetError(); }}
            aria-label="선호 층"
          >
            <option value="">전체</option>
            {floors.map(f => (
              <option key={f} value={f}>
                {f}층
              </option>
            ))}
          </Select>
        </div>
      </div>
      <Spacing size={14} />

      {/* 장비 */}
      <EquipmentToggle
        selected={equipment}
        onChange={v => { setEquipment(v as Equipment[]); resetError(); }}
      />
    </div>
  );
}
