import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

interface ToggleOption<T extends string> {
  value: T;
  label: string;
}

interface ToggleButtonGroupProps<T extends string> {
  label: string;
  options: ToggleOption<T>[];
  selected: T[];
  onChange: (selected: T[]) => void;
}

export function ToggleButtonGroup<T extends string>({ label, options, selected, onChange }: ToggleButtonGroupProps<T>) {
  const toggle = (value: T) => {
    const isSelected = selected.includes(value);
    onChange(isSelected ? selected.filter(v => v !== value) : [...selected, value]);
  };

  return (
    <div>
      <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
        {label}
      </Text>
      <Spacing size={8} />
      <div
        css={css`
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        `}
      >
        {options.map(({ value, label: optionLabel }) => {
          const isSelected = selected.includes(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => toggle(value)}
              aria-label={optionLabel}
              aria-pressed={isSelected}
              css={css`
                padding: 8px 16px;
                border-radius: 20px;
                border: 1px solid ${isSelected ? colors.blue500 : colors.grey200};
                background: ${isSelected ? colors.blue50 : colors.grey50};
                color: ${isSelected ? colors.blue600 : colors.grey700};
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.15s;
                &:hover {
                  border-color: ${isSelected ? colors.blue500 : colors.grey400};
                }
              `}
            >
              {optionLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
