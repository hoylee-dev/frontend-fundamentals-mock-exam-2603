import '@testing-library/jest-dom/vitest';
import { server } from './src/_tosslib/server/node';
import { resetData } from './src/_tosslib/server/handlers';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { formatDate } from './src/pages/shared/utils';
import { useBookingFilterStore } from './src/pages/RoomBookingPage/useBookingFilterStore';
import { useBookingErrorStore } from './src/pages/RoomBookingPage/useBookingErrorStore';
import { useSelectedRoomStore } from './src/pages/RoomBookingPage/AvailableRoomList/useSelectedRoomStore';
import { useDateStore } from './src/pages/ReservationStatusPage/useDateStore';
import { useMessageStore } from './src/pages/ReservationStatusPage/useMessageStore';
import { useActiveReservation } from './src/pages/ReservationStatusPage/Timeline/TimelineBody/ReservationBlock/useActiveReservationStore';

// Canvas mock for lottie-web
HTMLCanvasElement.prototype.getContext = (() => {
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: (_x: number, _y: number, w: number, h: number) => ({
      data: new Array(w * h * 4),
    }),
    putImageData: () => {},
    createImageData: () => [],
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => ({ width: 0 }),
    transform: () => {},
    rect: () => {},
    clip: () => {},
  };
}) as any;

HTMLCanvasElement.prototype.toDataURL = () => '';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
});
afterEach(() => {
  server.resetHandlers();
  resetData();

  useDateStore.setState({ date: formatDate(new Date()) });
  useMessageStore.setState({ message: null });
  useActiveReservation.setState({ activeId: null });
  useBookingFilterStore.setState({
    date: formatDate(new Date()),
    startTime: '',
    endTime: '',
    attendees: 1,
    equipment: [],
    preferredFloor: null,
  });
  useBookingErrorStore.setState({ errorMessage: null });
  useSelectedRoomStore.setState({ selectedRoomId: null });
});
afterAll(() => {
  server.close();
});
