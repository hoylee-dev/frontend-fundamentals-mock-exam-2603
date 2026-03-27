import { css } from '@emotion/react';
import { Text, Select } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useRoomsSuspenseQuery } from 'pages/shared/useRoomsQuery';

interface FloorSelectProps {
  preferredFloor: number | null;
  onPreferredFloorChange: (floor: number | null) => void;
}

export function FloorSelect({ preferredFloor, onPreferredFloorChange }: FloorSelectProps) {
  const { data: rooms } = useRoomsSuspenseQuery();
  const floors = [...new Set(rooms.map(r => r.floor))].sort((a, b) => a - b);

  return (
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
        onChange={e => onPreferredFloorChange(e.target.value === '' ? null : Number(e.target.value))}
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
  );
}
