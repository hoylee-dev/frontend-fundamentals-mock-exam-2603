import { css } from '@emotion/react';
import { Text, Select } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

interface FloorSelectProps {
  label: string;
  value: number | null;
  options: number[];
  onChange: (floor: number | null) => void;
}

export function FloorSelect({ label, value, options, onChange }: FloorSelectProps) {
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
        {label}
      </Text>
      <Select
        value={value ?? ''}
        onChange={e => onChange(e.target.value === '' ? null : Number(e.target.value))}
        aria-label={label}
      >
        <option value="">전체</option>
        {options.map(f => (
          <option key={f} value={f}>
            {f}층
          </option>
        ))}
      </Select>
    </div>
  );
}
