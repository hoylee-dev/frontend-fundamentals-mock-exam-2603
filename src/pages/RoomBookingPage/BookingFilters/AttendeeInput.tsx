import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { dateInputStyle } from 'pages/shared/styles';

interface AttendeeInputProps {
  attendees: number;
  onAttendeesChange: (count: number) => void;
}

export function AttendeeInput({ attendees, onAttendeesChange }: AttendeeInputProps) {
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
        참석 인원
      </Text>
      <input
        type="number"
        min={1}
        value={attendees}
        onChange={e => onAttendeesChange(Math.max(1, Number(e.target.value)))}
        aria-label="참석 인원"
        css={dateInputStyle}
      />
    </div>
  );
}
