import { useNavigate } from 'react-router-dom';
import { Button } from '_tosslib/components';

export function BookingButton() {
  const navigate = useNavigate();

  return (
    <Button display="full" onClick={() => navigate('/booking')}>
      예약하기
    </Button>
  );
}
