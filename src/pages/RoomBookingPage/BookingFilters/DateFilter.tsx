import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { formatDate } from 'pages/shared/utils';
import { dateInputStyle } from 'pages/shared/styles';

interface DateFilterProps {
  date: string;
  onDateChange: (date: string) => void;
}

export function DateFilter({ date, onDateChange }: DateFilterProps) {
  return (
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
        onChange={e => onDateChange(e.target.value)}
        aria-label="날짜"
        css={dateInputStyle}
      />
    </div>
  );
}
