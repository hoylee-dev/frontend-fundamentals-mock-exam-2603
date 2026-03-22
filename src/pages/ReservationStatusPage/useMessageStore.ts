import { create } from 'zustand';

interface Message {
  type: 'success' | 'error';
  text: string;
}

interface MessageStore {
  message: Message | null;
  setMessage: (message: Message | null) => void;
}

export const useMessageStore = create<MessageStore>(set => ({
  message: null,
  setMessage: (message: Message | null) => set({ message }),
}));
