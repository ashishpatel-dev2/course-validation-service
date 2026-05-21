import db from '../models/index.js';
import { prepareCourseSnapshots } from '../services/courseSnapshotService.js';
import { AppError } from '../utils/error.js';
import { sendSuccess } from '../utils/response.js';

export const createValidationReportController = async (req, res) => {
  try {
    const { courseId } = req.body || {};
    if (!courseId) {
      throw new AppError('Body field courseId is required.', 400);
    }

    const { version, coursesByLocale, snapshotPaths } = await prepareCourseSnapshots({
      courseId
    });

    const BASE_LOCALE = 'en-us';
    const basePath = snapshotPaths[BASE_LOCALE] ?? null;

    const validationReportRows = Object.keys(coursesByLocale).map((locale) => ({
      course_id: courseId,
      locale,
      base_path: basePath,
      locale_path: locale === BASE_LOCALE ? null : (snapshotPaths[locale] ?? null),
      version: coursesByLocale[locale]?._version
    }));

    const reports = await db.ValidationReport.bulkCreate(validationReportRows, {
      returning: true
    });

    return sendSuccess(res, {
      statusCode: 202,
      data: {
        courseId,
        version,
        locales: Object.keys(coursesByLocale),
        snapshotPaths,
        reports
      }
    });
  } catch (error) {
    console.log(error, 'error');
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to create validation job: ${error.message}`, 500);
  }
};
