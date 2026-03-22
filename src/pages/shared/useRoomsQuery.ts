import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getRooms } from './remotes';
import { roomKeys } from './queryKeys';

export function useRoomsQuery() {
  return useQuery({ queryKey: roomKeys.all, queryFn: getRooms });
}

export function useRoomsSuspenseQuery() {
  return useSuspenseQuery({ queryKey: roomKeys.all, queryFn: getRooms });
}
