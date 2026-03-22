import { Spacing } from '_tosslib/components';
import { sectionPadding } from 'pages/styles';
import { MessageBanner } from 'pages/MessageBanner';
import { useBookingErrorStore } from './useBookingErrorStore';

export function BookingErrorMessage() {
  const errorMessage = useBookingErrorStore(state => state.errorMessage);

  if (!errorMessage) {
    return null;
  }

  return (
    <div css={sectionPadding}>
      <Spacing size={12} />
      <MessageBanner type="error" text={errorMessage} />
    </div>
  );
}
