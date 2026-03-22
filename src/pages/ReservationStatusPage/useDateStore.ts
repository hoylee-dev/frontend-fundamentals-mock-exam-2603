import { create } from 'zustand';
import { formatDate } from 'pages/utils';

interface DateStore {
  date: string;
  setDate: (date: string) => void;
}

export const useDateStore = create<DateStore>(set => ({
  date: formatDate(new Date()),
  setDate: (date: string) => set({ date }),
}));
