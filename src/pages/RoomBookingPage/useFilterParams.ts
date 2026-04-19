import { useQueryState, parseAsInteger, parseAsString, parseAsArrayOf, parseAsStringLiteral } from 'nuqs';
import { Equipment } from 'pages/shared/types';
import { formatDate } from 'pages/shared/utils';

const equipmentValues = ['tv', 'whiteboard', 'video', 'speaker'] as const;

export function useDateParam() {
  return useQueryState('date', parseAsString.withDefault(formatDate(new Date())));
}

export function useStartTimeParam() {
  return useQueryState('startTime', parseAsString.withDefault(''));
}

export function useEndTimeParam() {
  return useQueryState('endTime', parseAsString.withDefault(''));
}

export function useAttendeesParam() {
  return useQueryState('attendees', parseAsInteger.withDefault(1));
}

export function useEquipmentParam() {
  return useQueryState(
    'equipment',
    parseAsArrayOf(parseAsStringLiteral(equipmentValues)).withDefault([] as Equipment[])
  );
}

export function usePreferredFloorParam() {
  return useQueryState('floor', parseAsInteger);
}
