import { z } from 'zod';
import { useRequirementParams } from './useFilterParams';

export function useValidation() {
  const [requirementParam] = useRequirementParams();

  const hasTimeInputs = requirementParam.startTime !== '' && requirementParam.endTime !== '';
  let validationError: string | null = null;

  if (hasTimeInputs) {
    const result = bookingFilterSchema.safeParse(requirementParam);
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
