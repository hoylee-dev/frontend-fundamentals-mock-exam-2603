import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { formatDate } from 'pages/utils';
import { dateInputStyle } from 'pages/styles';

interface DateSelectorProps {
  value: string;
  onChange: (date: string) => void;
}

export function DateSelector({ value, onChange }: DateSelectorProps) {
  return (
    <div>
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        날짜 선택
      </Text>
      <Spacing size={16} />
      <input
        type="date"
        value={value}
        min={formatDate(new Date())}
        onChange={e => onChange(e.target.value)}
        aria-label="날짜"
        css={dateInputStyle}
      />
    </div>
  );
}
