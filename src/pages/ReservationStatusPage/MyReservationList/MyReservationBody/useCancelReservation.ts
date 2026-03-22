import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservation } from 'pages/shared/remotes';
import { reservationKeys, myReservationKeys } from 'pages/shared/queryKeys';
import { useMessageStore } from '../../useMessageStore';

export function useCancelReservation() {
  const queryClient = useQueryClient();
  const setMessage = useMessageStore(state => state.setMessage);

  const cancelMutation = useMutation((id: string) => cancelReservation(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.all });
      queryClient.invalidateQueries({ queryKey: myReservationKeys.all });
    },
  });

  const handleCancel = async (id: string) => {
    if (!window.confirm('정말 취소하시겠습니까?')) {
      return;
    }
    try {
      await cancelMutation.mutateAsync(id);
      setMessage({ type: 'success', text: '예약이 취소되었습니다.' });
    } catch {
      setMessage({ type: 'error', text: '취소에 실패했습니다.' });
    }
  };

  return { handleCancel };
}
