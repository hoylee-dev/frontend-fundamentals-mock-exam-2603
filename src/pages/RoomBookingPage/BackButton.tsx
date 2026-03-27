import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { colors } from '_tosslib/constants/colors';

interface BackButtonProps {
  label: string;
  children: string;
}

export function BackButton({ label, children }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate('/')}
      aria-label={label}
      css={css`
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font-size: 14px;
        color: ${colors.grey600};
        &:hover {
          color: ${colors.grey900};
        }
      `}
    >
      {children}
    </button>
  );
}
