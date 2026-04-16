import { MessageBanner } from 'pages/shared/MessageBanner';
import { Message } from './index';

interface StatusMessageProps {
  message: Message | null;
}

export function StatusMessage({ message }: StatusMessageProps) {
  if (!message) {
    return null;
  }

  return <MessageBanner type={message.type} text={message.text} />;
}
