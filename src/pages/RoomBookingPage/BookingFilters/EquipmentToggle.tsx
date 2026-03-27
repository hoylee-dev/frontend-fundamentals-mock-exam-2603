import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'pages/shared/constants';
import { Equipment } from 'pages/shared/types';
import { useEquipmentParam } from '../useFilterParams';

const ALL_EQUIPMENT = Object.keys(EQUIPMENT_LABELS) as Equipment[];

export function EquipmentToggle() {
  const [equipment, setEquipment] = useEquipmentParam();

  const toggleEquipment = (eq: Equipment) => {
    const isSelected = equipment.includes(eq);
    setEquipment(isSelected ? equipment.filter(e => e !== eq) : [...equipment, eq]);
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
          const isSelected = equipment.includes(eq);
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
