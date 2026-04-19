import { queryOptions, mutationOptions, QueryClient } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { getRooms, getReservations, getMyReservations, createReservation, cancelReservation } from '../api/remotes';

// Queries
export const roomsQuery = () => queryOptions({ queryKey: queryKeys.rooms(), queryFn: getRooms });

export const reservationsQuery = (date: string) =>
  queryOptions({ queryKey: queryKeys.reservationsByDate(date), queryFn: () => getReservations(date) });

export const myReservationsQuery = () =>
  queryOptions({ queryKey: queryKeys.myReservations(), queryFn: getMyReservations });

// Mutations
export const createReservationMutation = (queryClient: QueryClient) =>
  mutationOptions({
    mutationFn: createReservation,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reservationsByDate(variables.date) });
      queryClient.invalidateQueries({ queryKey: queryKeys.myReservations() });
    },
  });

export const cancelReservationMutation = (queryClient: QueryClient) =>
  mutationOptions({
    mutationFn: cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reservations() });
      queryClient.invalidateQueries({ queryKey: queryKeys.myReservations() });
    },
  });
