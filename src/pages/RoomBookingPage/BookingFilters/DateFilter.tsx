import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { dateInputStyle } from 'pages/shared/styles';

interface DateFilterProps {
  label: string;
  value: string;
  min: string;
  onChange: (value: string) => void;
}

export function DateFilter({ label, value, min, onChange }: DateFilterProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 6px;
      `}
    >
      <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
        {label}
      </Text>
      <input
        type="date"
        value={value}
        min={min}
        onChange={e => onChange(e.target.value)}
        aria-label={label}
        css={dateInputStyle}
      />
    </div>
  );
}
