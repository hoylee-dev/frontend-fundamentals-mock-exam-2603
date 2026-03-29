import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservation } from 'pages/shared/remotes';
import { reservationKeys, myReservationKeys } from 'pages/shared/queryKeys';

export function useCancelReservation() {
  const queryClient = useQueryClient();

  const cancelMutation = useMutation((id: string) => cancelReservation(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.all });
      queryClient.invalidateQueries({ queryKey: myReservationKeys.all });
    },
  });

  const handleCancelReservation = async (id: string) => {
    if (!window.confirm('정말 취소하시겠습니까?')) {
      return;
    }
    await cancelMutation.mutateAsync(id);
  };

  return { handleCancelReservation };
}
