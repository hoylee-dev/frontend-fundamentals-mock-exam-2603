import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getRooms } from './remotes';

export function useRoomsQuery() {
  return useQuery({ queryKey: ['rooms'], queryFn: getRooms });
}

export function useRoomsSuspenseQuery() {
  return useSuspenseQuery({ queryKey: ['rooms'], queryFn: getRooms });
}
