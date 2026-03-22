import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReservation } from 'pages/remotes';
import axios from 'axios';
import { useBookingFilterStore } from '../useBookingFilterStore';
import { useBookingErrorStore } from '../useBookingErrorStore';
import { useSelectedRoomStore } from './useSelectedRoomStore';

export function useBookRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { date, startTime, endTime, attendees, equipment } = useBookingFilterStore();
  const { setErrorMessage } = useBookingErrorStore();
  const { selectedRoomId, setSelectedRoomId } = useSelectedRoomStore();

  const createMutation = useMutation(
    (data: { roomId: string; date: string; start: string; end: string; attendees: number; equipment: string[] }) =>
      createReservation(data),
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({ queryKey: ['reservations', variables.date] });
        queryClient.invalidateQueries({ queryKey: ['myReservations'] });
      },
    }
  );

  const handleBook = async () => {
    if (!selectedRoomId) {
      setErrorMessage('회의실을 선택해주세요.');
      return;
    }

    try {
      const result = await createMutation.mutateAsync({
        roomId: selectedRoomId,
        date,
        start: startTime,
        end: endTime,
        attendees,
        equipment,
      });

      if ('ok' in result && result.ok) {
        navigate('/', { state: { message: '예약이 완료되었습니다!' } });
        return;
      }

      const errResult = result as { message?: string };
      setErrorMessage(errResult.message ?? '예약에 실패했습니다.');
      setSelectedRoomId(null);
    } catch (err: unknown) {
      let serverMessage = '예약에 실패했습니다.';
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { message?: string } | undefined;
        serverMessage = data?.message ?? serverMessage;
      }
      setErrorMessage(serverMessage);
      setSelectedRoomId(null);
    }
  };

  return { handleBook, isLoading: createMutation.isPending };
}
