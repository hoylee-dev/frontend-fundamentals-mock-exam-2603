export const queryKeys = {
  rooms: () => ['rooms'] as const,
  reservations: () => ['reservations'] as const,
  reservationsByDate: (date: string) => ['reservations', date] as const,
  myReservations: () => ['myReservations'] as const,
};
