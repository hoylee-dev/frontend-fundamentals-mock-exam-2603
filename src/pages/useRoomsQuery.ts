import { useQuery } from '@tanstack/react-query';
import { Room } from 'pages/types';
import { getRooms } from 'pages/remotes';

export function useRoomsQuery() {
  return useQuery<Room[]>(['rooms'], getRooms);
}
