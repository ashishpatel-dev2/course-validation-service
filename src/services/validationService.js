import db from '../models/index.js';

export const createValidationJob = async ({ courseId, locale, basePath, localePath, version }) => {
  const job = await db.ValidationJob.create({
    course_id: courseId,
    locale,
    base_path: basePath,
    locale_path: localePath,
    version: version
  });

  return job;
};
