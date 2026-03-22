import { create } from 'zustand';
import { formatDate } from 'pages/shared/utils';
import { Equipment } from 'pages/shared/types';

interface BookingFilterStore {
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  equipment: Equipment[];
  preferredFloor: number | null;
  setDate: (date: string) => void;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  setAttendees: (count: number) => void;
  setEquipment: (equipment: Equipment[]) => void;
  setPreferredFloor: (floor: number | null) => void;
}

export const useBookingFilterStore = create<BookingFilterStore>(set => ({
  date: formatDate(new Date()),
  startTime: '',
  endTime: '',
  attendees: 1,
  equipment: [],
  preferredFloor: null,
  setDate: (date: string) => set({ date }),
  setStartTime: (startTime: string) => set({ startTime }),
  setEndTime: (endTime: string) => set({ endTime }),
  setAttendees: (attendees: number) => set({ attendees }),
  setEquipment: (equipment: Equipment[]) => set({ equipment }),
  setPreferredFloor: (preferredFloor: number | null) => set({ preferredFloor }),
}));
