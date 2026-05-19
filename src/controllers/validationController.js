import { createValidationJob } from '../services/validationService.js';
import { AppError } from '../utils/error.js';
import { sendSuccess } from '../utils/response.js';
import { prepareCourseSnapshots } from '../services/courseSnapshotService.js';
import { validateCourseLocale } from '../utils/helper.js';

export const createValidationJobController = async (req, res) => {
  try {
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
      version,
      baseCourse,
      localizedCourse
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

    const validation = validateCourseLocale({
      engCourse: baseCourse,
      localeCourse: localizedCourse,
      jobId: job.id,
      locale: normalizedLocale
    });

    return sendSuccess(res, {
      statusCode: 202,
      data: {
        job,
        validation
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Failed to create validation job: ${error.message}`, 500);
  }
};
