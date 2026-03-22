import { create } from 'zustand';
import { formatDate } from 'pages/utils';
import { Equipment } from 'pages/types';

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

const params = new URLSearchParams(window.location.search);

export const useBookingFilterStore = create<BookingFilterStore>(set => ({
  date: params.get('date') || formatDate(new Date()),
  startTime: params.get('startTime') || '',
  endTime: params.get('endTime') || '',
  attendees: Number(params.get('attendees')) || 1,
  equipment: params.get('equipment') ? params.get('equipment')!.split(',').filter(Boolean) as Equipment[] : [],
  preferredFloor: params.get('floor') ? Number(params.get('floor')) : null,
  setDate: (date: string) => set({ date }),
  setStartTime: (startTime: string) => set({ startTime }),
  setEndTime: (endTime: string) => set({ endTime }),
  setAttendees: (attendees: number) => set({ attendees }),
  setEquipment: (equipment: Equipment[]) => set({ equipment }),
  setPreferredFloor: (preferredFloor: number | null) => set({ preferredFloor }),
}));
