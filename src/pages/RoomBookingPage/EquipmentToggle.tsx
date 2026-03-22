import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS, ALL_EQUIPMENT } from 'pages/constants';

interface EquipmentToggleProps {
  selected: string[];
  onChange: (equipment: string[]) => void;
}

export function EquipmentToggle({ selected, onChange }: EquipmentToggleProps) {
  const toggleEquipment = (eq: string) => {
    const isSelected = selected.includes(eq);
    onChange(isSelected ? selected.filter(e => e !== eq) : [...selected, eq]);
  };

  return (
    <div>
      <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
        필요 장비
      </Text>
      <Spacing size={8} />
      <div
        css={css`
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        `}
      >
        {ALL_EQUIPMENT.map(eq => {
          const isSelected = selected.includes(eq);
          return (
            <button
              key={eq}
              type="button"
              onClick={() => toggleEquipment(eq)}
              aria-label={EQUIPMENT_LABELS[eq]}
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
              {EQUIPMENT_LABELS[eq]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
