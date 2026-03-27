import { MessageBanner } from 'pages/shared/MessageBanner';

interface BookingErrorMessageProps {
  errorMessage: string | null;
}

export function BookingErrorMessage({ errorMessage }: BookingErrorMessageProps) {
  if (!errorMessage) {
    return null;
  }

  return <MessageBanner type="error" text={errorMessage} />;
}
