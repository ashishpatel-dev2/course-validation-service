import db from '../models/index.js';

export const createValidationJob = async ({ courseId, locale }) => {
  const job = await db.ValidationJob.create({
    course_id: courseId,
    locale
  });

  return job.id;
};
