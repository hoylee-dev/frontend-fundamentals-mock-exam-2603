import { css } from '@emotion/react';
import { useState } from 'react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { Room, Reservation } from 'pages/types';
import { ReservationTooltip } from './ReservationTooltip';

const TIMELINE_START = 9;
const TIMELINE_END = 20;
const TOTAL_MINUTES = (TIMELINE_END - TIMELINE_START) * 60;

const HOUR_LABELS = Array.from(
  { length: TIMELINE_END - TIMELINE_START + 1 },
  (_, i) => `${String(TIMELINE_START + i).padStart(2, '0')}:00`
);

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return (h - TIMELINE_START) * 60 + m;
}

interface TimelineProps {
  rooms: Room[];
  reservations: Reservation[];
}

export function Timeline({ rooms, reservations }: TimelineProps) {
  const [activeReservationId, setActiveReservationId] = useState<string | null>(null);

  return (
    <div>
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 현황
      </Text>
      <Spacing size={16} />

      <div
        css={css`
          background: ${colors.grey50};
          border-radius: 14px;
          padding: 16px;
        `}
      >
        {/* 시간 헤더 */}
        <div
          css={css`
            display: flex;
            align-items: flex-end;
            margin-bottom: 8px;
          `}
        >
          <div
            css={css`
              width: 80px;
              flex-shrink: 0;
              padding-right: 8px;
            `}
          />
          <div
            css={css`
              flex: 1;
              position: relative;
              height: 18px;
            `}
          >
            {HOUR_LABELS.map(t => {
              const left = (timeToMinutes(t) / TOTAL_MINUTES) * 100;
              return (
                <Text
                  key={t}
                  typography="t7"
                  fontWeight="regular"
                  color={colors.grey400}
                  css={css`
                    position: absolute;
                    left: ${left}%;
                    transform: translateX(-50%);
                    font-size: 10px;
                    letter-spacing: -0.3px;
                  `}
                >
                  {t.slice(0, 2)}
                </Text>
              );
            })}
          </div>
        </div>

        {/* 회의실별 타임라인 */}
        {rooms.map((room, index) => {
          const roomReservations = reservations.filter(r => r.roomId === room.id);
          return (
            <div
              key={room.id}
              css={css`
                display: flex;
                align-items: center;
                height: 32px;
                ${index > 0 ? 'margin-top: 4px;' : ''}
              `}
            >
              <div
                css={css`
                  width: 80px;
                  flex-shrink: 0;
                  padding-right: 8px;
                `}
              >
                <Text
                  typography="t7"
                  fontWeight="medium"
                  color={colors.grey700}
                  ellipsisAfterLines={1}
                  css={css`
                    font-size: 12px;
                  `}
                >
                  {room.name}
                </Text>
              </div>
              <div
                css={css`
                  flex: 1;
                  height: 24px;
                  background: ${colors.white};
                  border-radius: 6px;
                  position: relative;
                  overflow: visible;
                `}
              >
                {roomReservations.map(res => {
                  const left = (timeToMinutes(res.start) / TOTAL_MINUTES) * 100;
                  const width = ((timeToMinutes(res.end) - timeToMinutes(res.start)) / TOTAL_MINUTES) * 100;
                  const isActive = activeReservationId === res.id;
                  return (
                    <div
                      key={res.id}
                      css={css`
                        position: absolute;
                        left: ${left}%;
                        width: ${width}%;
                        height: 100%;
                      `}
                    >
                      <div
                        role="button"
                        aria-label={`${room.name} ${res.start}-${res.end} 예약 상세`}
                        onClick={() => setActiveReservationId(isActive ? null : res.id)}
                        css={css`
                          width: 100%;
                          height: 100%;
                          background: ${colors.blue400};
                          border-radius: 4px;
                          opacity: ${isActive ? 1 : 0.75};
                          cursor: pointer;
                          transition: opacity 0.15s;
                          &:hover {
                            opacity: 1;
                          }
                        `}
                      />
                      {isActive && (
                        <ReservationTooltip
                          start={res.start}
                          end={res.end}
                          attendees={res.attendees}
                          equipment={res.equipment}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
