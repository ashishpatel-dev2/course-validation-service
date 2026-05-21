import { prepareCourseSnapshots } from '../services/courseSnapshotService.js';
import { AppError } from '../utils/error.js';
import { sendSuccess } from '../utils/response.js';
//  'en-us',
//   'fr-fr',
//   'de-de',
//   'zh-cn',
//   'it-it',
//   'ja-jp',
//   'ko-kr',
//   'pt-br',
//   'es-419',
//   'sw-ke',
//   'tr-tr',
//   'zu',
export const createValidationReportController = async (req, res) => {
  try {
    const { courseId } = req.body || {};
    if (!courseId) {
      throw new AppError('Body field courseId is required.', 400);
    }

    const { version, coursesByLocale, snapshotPaths } = await prepareCourseSnapshots({
      courseId
    });

    return sendSuccess(res, {
      statusCode: 202,
      data: {
        courseId,
        version,
        locales: Object.keys(coursesByLocale),
        snapshotPaths
      }
    });
  } catch (error) {
    console.log(error, 'error');
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to create validation job: ${error.message}`, 500);
  }
};
