import { css } from '@emotion/react';
import { Text, Select } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { TIME_SLOTS } from 'pages/shared/constants';
import { useStartTimeParam } from '../useFilterParams';

export function StartTimeSelect() {
  const [startTime, setStartTime] = useStartTimeParam();

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
        시작 시간
      </Text>
      <Select value={startTime} onChange={e => setStartTime(e.target.value)} aria-label="시작 시간">
        <option value="">선택</option>
        {TIME_SLOTS.slice(0, -1).map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Select>
    </div>
  );
}
