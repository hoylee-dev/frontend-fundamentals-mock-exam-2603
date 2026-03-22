import { Spacing } from '_tosslib/components';
import { sectionPadding } from 'pages/shared/styles';
import { MessageBanner } from 'pages/shared/MessageBanner';
import { useBookingErrorStore } from './useBookingErrorStore';

export function BookingErrorMessage() {
  const errorMessage = useBookingErrorStore(state => state.errorMessage);

  if (!errorMessage) {
    return null;
  }

  return <MessageBanner type="error" text={errorMessage} />;
}
