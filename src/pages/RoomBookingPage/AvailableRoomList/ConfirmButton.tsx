import { Button } from '_tosslib/components';
import { useBookRoom } from './useBookRoom';

export function ConfirmButton() {
  const { handleBook, isLoading } = useBookRoom();

  return (
    <Button display="full" onClick={handleBook} disabled={isLoading}>
      {isLoading ? '예약 중...' : '확정'}
    </Button>
  );
}
