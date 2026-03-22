import { create } from 'zustand';

interface ActiveReservationStore {
  activeId: string | null;
  toggle: (id: string) => void;
}

export const useActiveReservation = create<ActiveReservationStore>(set => ({
  activeId: null,
  toggle: (id: string) => set(state => ({ activeId: state.activeId === id ? null : id })),
}));
