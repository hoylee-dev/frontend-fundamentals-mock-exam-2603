import { dateInputStyle } from 'pages/shared/styles';

interface DateSelectorProps {
  label: string;
  value: string;
  min: string;
  onChange: (value: string) => void;
}

export function DateSelector({ label, value, min, onChange }: DateSelectorProps) {
  return (
    <input
      type="date"
      value={value}
      min={min}
      onChange={e => onChange(e.target.value)}
      aria-label={label}
      css={dateInputStyle}
    />
  );
}
