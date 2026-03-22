import { create } from 'zustand';

interface SelectedRoomStore {
  selectedRoomId: string | null;
  setSelectedRoomId: (id: string | null) => void;
}

export const useSelectedRoomStore = create<SelectedRoomStore>(set => ({
  selectedRoomId: null,
  setSelectedRoomId: (selectedRoomId: string | null) => set({ selectedRoomId }),
}));
