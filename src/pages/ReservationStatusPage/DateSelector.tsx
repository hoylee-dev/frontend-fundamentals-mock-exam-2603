import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { formatDate } from 'pages/utils';
import { dateInputStyle } from 'pages/styles';
import { useDateStore } from './useDateStore';

export function DateSelector() {
  const { date, setDate } = useDateStore();

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
        onChange={e => setDate(e.target.value)}
        aria-label="날짜"
        css={dateInputStyle}
      />
    </div>
  );
}
