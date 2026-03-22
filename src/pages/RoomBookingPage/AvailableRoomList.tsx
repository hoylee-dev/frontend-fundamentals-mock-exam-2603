import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Spacing, Text, Button, ListRow } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'pages/constants';
import { Room, Reservation } from 'pages/types';
import { createReservation } from 'pages/remotes';
import axios from 'axios';

interface AvailableRoomListProps {
  rooms: Room[];
  reservations: Reservation[];
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  equipment: string[];
  preferredFloor: number | null;
  onError: (message: string) => void;
}

function filterAndSortRooms(
  rooms: Room[],
  reservations: Reservation[],
  {
    date,
    startTime,
    endTime,
    attendees,
    equipment,
    preferredFloor,
  }: {
    date: string;
    startTime: string;
    endTime: string;
    attendees: number;
    equipment: string[];
    preferredFloor: number | null;
  }
): Room[] {
  return rooms
    .filter(room => {
      const meetsCapacity = room.capacity >= attendees;
      const hasRequiredEquipment = equipment.every(eq => room.equipment.includes(eq));
      const isOnPreferredFloor = preferredFloor === null || room.floor === preferredFloor;
      const hasNoTimeConflict = !reservations.some(
        r => r.roomId === room.id && r.date === date && r.start < endTime && r.end > startTime
      );
      return meetsCapacity && hasRequiredEquipment && isOnPreferredFloor && hasNoTimeConflict;
    })
    .sort((a, b) => {
      if (a.floor !== b.floor) {
        return a.floor - b.floor;
      }
      return a.name.localeCompare(b.name);
    });
}

export function AvailableRoomList({
  rooms,
  reservations,
  date,
  startTime,
  endTime,
  attendees,
  equipment,
  preferredFloor,
  onError,
}: AvailableRoomListProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const createMutation = useMutation(
    (data: { roomId: string; date: string; start: string; end: string; attendees: number; equipment: string[] }) =>
      createReservation(data),
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries(['reservations', variables.date]);
        queryClient.invalidateQueries(['myReservations']);
      },
    }
  );

  const availableRooms = filterAndSortRooms(rooms, reservations, {
    date,
    startTime,
    endTime,
    attendees,
    equipment,
    preferredFloor,
  });

  const handleBook = async () => {
    if (!selectedRoomId) {
      onError('회의실을 선택해주세요.');
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
      onError(errResult.message ?? '예약에 실패했습니다.');
      setSelectedRoomId(null);
    } catch (err: unknown) {
      let serverMessage = '예약에 실패했습니다.';
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { message?: string } | undefined;
        serverMessage = data?.message ?? serverMessage;
      }
      onError(serverMessage);
      setSelectedRoomId(null);
    }
  };

  return (
    <div>
      <div
        css={css`
          display: flex;
          align-items: baseline;
          gap: 6px;
        `}
      >
        <Text typography="t5" fontWeight="bold" color={colors.grey900}>
          예약 가능 회의실
        </Text>
        <Text typography="t7" fontWeight="medium" color={colors.grey500}>
          {availableRooms.length}개
        </Text>
      </div>
      <Spacing size={16} />

      {availableRooms.length === 0 ? (
        <div
          css={css`
            padding: 40px 0;
            text-align: center;
            background: ${colors.grey50};
            border-radius: 14px;
          `}
        >
          <Text typography="t6" color={colors.grey500}>
            조건에 맞는 회의실이 없습니다.
          </Text>
        </div>
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
          {availableRooms.map(room => {
            const isSelected = selectedRoomId === room.id;
            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
                role="button"
                aria-pressed={isSelected}
                aria-label={room.name}
                css={css`
                  cursor: pointer;
                  padding: 14px 16px;
                  border-radius: 14px;
                  border: 2px solid ${isSelected ? colors.blue500 : colors.grey200};
                  background: ${isSelected ? colors.blue50 : colors.white};
                  transition: all 0.15s;
                  &:hover {
                    border-color: ${isSelected ? colors.blue500 : colors.grey300};
                  }
                `}
              >
                <ListRow
                  contents={
                    <ListRow.Text2Rows
                      top={room.name}
                      topProps={{ typography: 't6', fontWeight: 'bold', color: colors.grey900 }}
                      bottom={`${room.floor}층 · ${room.capacity}명 · ${room.equipment
                        .map(e => EQUIPMENT_LABELS[e])
                        .join(', ')}`}
                      bottomProps={{ typography: 't7', color: colors.grey600 }}
                    />
                  }
                  right={
                    isSelected ? (
                      <Text typography="t7" fontWeight="bold" color={colors.blue500}>
                        선택됨
                      </Text>
                    ) : undefined
                  }
                />
              </div>
            );
          })}
        </div>
      )}

      <Spacing size={16} />
      <Button display="full" onClick={handleBook} disabled={createMutation.isLoading}>
        {createMutation.isLoading ? '예약 중...' : '확정'}
      </Button>
    </div>
  );
}
