import { createValidationJob } from '../services/validationService.js';
import { AppError } from '../utils/error.js';
import { sendSuccess } from '../utils/response.js';
import { prepareCourseSnapshots } from '../services/courseSnapshotService.js';

export const createValidationJobController = async (req, res) => {
  const { courseId, locale } = req.body || {};

  if (!courseId || !locale) {
    throw new AppError(
      'Body fields courseId and locale are required. Send JSON body with Content-Type application/json.',
      400
    );
  }

  const {
    basePath,
    localePath,
    locale: normalizedLocale,
    version
  } = await prepareCourseSnapshots({
    courseId,
    locale
  });

  const job = await createValidationJob({
    courseId,
    locale: normalizedLocale,
    basePath,
    localePath,
    version
  });

  return sendSuccess(res, {
    statusCode: 202,
    data: job
  });
};
