import { create } from 'zustand';

interface BookingErrorStore {
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}

export const useBookingErrorStore = create<BookingErrorStore>(set => ({
  errorMessage: null,
  setErrorMessage: (errorMessage: string | null) => set({ errorMessage }),
}));
