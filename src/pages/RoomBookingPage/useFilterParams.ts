import { useQueryState, parseAsInteger, parseAsString, parseAsArrayOf, parseAsStringLiteral } from 'nuqs';
import { Equipment } from 'pages/shared/types';
import { formatDate } from 'pages/shared/utils';

const equipmentValues = ['tv', 'whiteboard', 'video', 'speaker'] as const;

export function useRequirementParams() {
  const [date, setDate] = useQueryState('date', parseAsString.withDefault(formatDate(new Date())));
  const [startTime, setStartTime] = useQueryState('startTime', parseAsString.withDefault(''));
  const [endTime, setEndTime] = useQueryState('endTime', parseAsString.withDefault(''));
  const [attendees, setAttendees] = useQueryState('attendees', parseAsInteger.withDefault(1));

  return { date, setDate, startTime, setStartTime, endTime, setEndTime, attendees, setAttendees };
}

export function usePreferenceParams() {
  const [equipment, setEquipment] = useQueryState(
    'equipment',
    parseAsArrayOf(parseAsStringLiteral(equipmentValues)).withDefault([] as Equipment[])
  );
  const [preferredFloor, setPreferredFloor] = useQueryState('floor', parseAsInteger);

  return { equipment, setEquipment, preferredFloor, setPreferredFloor };
}
