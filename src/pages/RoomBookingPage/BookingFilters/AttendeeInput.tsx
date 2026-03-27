import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { dateInputStyle } from 'pages/shared/styles';

interface AttendeeInputProps {
  label: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
}

export function AttendeeInput({ label, value, min, onChange }: AttendeeInputProps) {
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
      <input
        type="number"
        min={min}
        value={value}
        onChange={e => onChange(Math.max(min, Number(e.target.value)))}
        aria-label={label}
        css={dateInputStyle}
      />
    </div>
  );
}
