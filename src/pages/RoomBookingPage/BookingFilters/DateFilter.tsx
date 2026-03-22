import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { formatDate } from 'pages/utils';
import { dateInputStyle } from 'pages/styles';
import { useBookingFilterStore } from '../useBookingFilterStore';
import { useBookingErrorStore } from '../useBookingErrorStore';

export function DateFilter() {
  const { date, setDate } = useBookingFilterStore();
  const { setErrorMessage } = useBookingErrorStore();

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
        onChange={e => {
          setDate(e.target.value);
          setErrorMessage(null);
        }}
        aria-label="날짜"
        css={dateInputStyle}
      />
    </div>
  );
}
