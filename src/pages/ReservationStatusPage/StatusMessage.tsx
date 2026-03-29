import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageBanner } from 'pages/shared/MessageBanner';
import { Message } from './index';

interface StatusMessageProps {
  message: Message | null;
  setMessage: (message: Message | null) => void;
}

export function StatusMessage({ message, setMessage }: StatusMessageProps) {
  useLocationMessage(setMessage);

  if (!message) {
    return null;
  }

  return <MessageBanner type={message.type} text={message.text} />;
}

function useLocationMessage(setMessage: (message: Message | null) => void) {
  const location = useLocation();
  const locationState = location.state as { message?: string } | null;

  useEffect(() => {
    if (locationState?.message) {
      setMessage({ type: 'success', text: locationState.message });
      window.history.replaceState({}, '');
    }
  }, [locationState, setMessage]);
}
