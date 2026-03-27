import { z } from 'zod';
import { useStartTimeParam, useEndTimeParam, useAttendeesParam } from './useFilterParams';

export function useValidation() {
  const [startTime] = useStartTimeParam();
  const [endTime] = useEndTimeParam();
  const [attendees] = useAttendeesParam();

  const hasTimeInputs = startTime !== '' && endTime !== '';
  let validationError: string | null = null;

  if (hasTimeInputs) {
    const result = bookingFilterSchema.safeParse({ startTime, endTime, attendees });
    if (!result.success) {
      validationError = result.error.issues[0].message;
    }
  }

  const isFilterValid = hasTimeInputs && !validationError;

  return { validationError, isFilterValid };
}

const bookingFilterSchema = z
  .object({
    startTime: z.string().min(1),
    endTime: z.string().min(1),
    attendees: z.number().min(1, '참석 인원은 1명 이상이어야 합니다.'),
  })
  .refine(({ startTime, endTime }) => endTime > startTime, {
    message: '종료 시간은 시작 시간보다 늦어야 합니다.',
  });
