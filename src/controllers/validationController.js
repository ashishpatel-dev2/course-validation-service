import { createValidationJob } from '../services/validationService.js';
import { AppError } from '../utils/error.js';
import { sendSuccess } from '../utils/response.js';

export const createValidationJobController = async (req, res) => {
  const { courseId, locale } = req.body || {};

  if (!courseId || !locale) {
    throw new AppError('Body fields courseId and locale are required', 400);
  }

  const jobId = await createValidationJob({ courseId, locale });

  return sendSuccess(res, {
    statusCode: 202,
    data: { jobId }
  });
};
