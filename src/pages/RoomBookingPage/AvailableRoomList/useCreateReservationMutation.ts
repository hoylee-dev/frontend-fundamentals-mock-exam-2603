import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReservation } from 'pages/shared/remotes';
import { reservationKeys, myReservationKeys } from 'pages/shared/queryKeys';
import { Equipment } from 'pages/shared/types';

interface CreateReservationInput {
  roomId: string;
  date: string;
  start: string;
  end: string;
  attendees: number;
  equipment: Equipment[];
}

export function useCreateReservationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReservationInput) => createReservation(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.byDate(variables.date) });
      queryClient.invalidateQueries({ queryKey: myReservationKeys.all });
    },
  });
}
