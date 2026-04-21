import { useQueryStates, parseAsInteger, parseAsString, parseAsArrayOf, parseAsStringLiteral } from 'nuqs';
import { Equipment } from 'pages/shared/types';
import { formatDate } from 'pages/shared/utils';

const equipmentValues = ['tv', 'whiteboard', 'video', 'speaker'] as const;

export function useRequirementParams() {
  return useQueryStates({
    date: parseAsString.withDefault(formatDate(new Date())),
    startTime: parseAsString.withDefault(''),
    endTime: parseAsString.withDefault(''),
    attendees: parseAsInteger.withDefault(1),
  });
}

export function usePreferenceParams() {
  return useQueryStates({
    equipment: parseAsArrayOf(parseAsStringLiteral(equipmentValues)).withDefault([] as Equipment[]),
    floor: parseAsInteger,
  });
}
