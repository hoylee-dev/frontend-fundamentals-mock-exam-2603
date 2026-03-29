import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { formatDate } from 'pages/shared/utils';
import { dateInputStyle } from 'pages/shared/styles';

interface DateSelectorProps {
  date: string;
  onDateChange: (date: string) => void;
}

export function DateSelector({ date, onDateChange }: DateSelectorProps) {
  return (
    <div>
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        날짜 선택
      </Text>
      <Spacing size={16} />
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
