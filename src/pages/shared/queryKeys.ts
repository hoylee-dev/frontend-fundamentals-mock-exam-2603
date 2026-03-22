export const roomKeys = {
  all: ['rooms'] as const,
};

export const reservationKeys = {
  all: ['reservations'] as const,
  byDate: (date: string) => [...reservationKeys.all, date] as const,
};

export const myReservationKeys = {
  all: ['myReservations'] as const,
};
