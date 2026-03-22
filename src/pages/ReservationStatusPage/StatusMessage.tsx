import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageBanner } from 'pages/MessageBanner';
import { useMessageStore } from './useMessageStore';

export function StatusMessage() {
  useLocationMessage();
  const message = useMessageStore(state => state.message);

  if (!message) {
    return null;
  }

  return <MessageBanner type={message.type} text={message.text} />;
}

function useLocationMessage() {
  const location = useLocation();
  const locationState = location.state as { message?: string } | null;
  const setMessage = useMessageStore(state => state.setMessage);

  useEffect(() => {
    if (locationState?.message) {
      setMessage({ type: 'success', text: locationState.message });
      window.history.replaceState({}, '');
    }
  }, [locationState, setMessage]);
}
