import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getRooms } from 'pages/remotes';

export function useRoomsQuery() {
  return useQuery({ queryKey: ['rooms'], queryFn: getRooms });
}

export function useRoomsSuspenseQuery() {
  return useSuspenseQuery({ queryKey: ['rooms'], queryFn: getRooms });
}
