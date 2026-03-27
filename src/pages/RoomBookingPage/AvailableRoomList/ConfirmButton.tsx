import { Button } from '_tosslib/components';

interface ConfirmButtonProps {
  onBook: () => void;
  isLoading: boolean;
}

export function ConfirmButton({ onBook, isLoading }: ConfirmButtonProps) {
  return (
    <Button display="full" onClick={onBook} disabled={isLoading}>
      {isLoading ? '예약 중...' : '확정'}
    </Button>
  );
}
