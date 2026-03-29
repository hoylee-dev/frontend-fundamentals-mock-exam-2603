import { Button } from '_tosslib/components';

interface ConfirmButtonProps {
  label: string;
  loadingLabel: string;
  onClick: () => void;
  isLoading: boolean;
}

export function ConfirmButton({ label, loadingLabel, onClick, isLoading }: ConfirmButtonProps) {
  return (
    <Button display="full" onClick={onClick} disabled={isLoading}>
      {isLoading ? loadingLabel : label}
    </Button>
  );
}
