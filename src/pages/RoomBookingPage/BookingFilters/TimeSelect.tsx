import { css } from '@emotion/react';
import { Text, Select } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

interface TimeSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function TimeSelect({ label, value, options, onChange }: TimeSelectProps) {
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
      <Select value={value} onChange={e => onChange(e.target.value)} aria-label={label}>
        <option value="">선택</option>
        {options.map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Select>
    </div>
  );
}
