import { access, mkdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getAvailableLocales } from '../contentstack/getAvailableLocales.js';
import { getCourse } from '../contentstack/getCourse.js';
import { AppError } from '../utils/error.js';

const COURSE_CONTENT_TYPE_UID = 'course';
const BASE_LOCALE = 'en-us';

export const fetchCourseByLocale = async ({ courseId, locale }) => {
  const { course, notFound } = await getCourse({
    entryQuery: {
      content_type_uid: COURSE_CONTENT_TYPE_UID,
      entry_uid: courseId
    },
    lng: locale
  });

  if (notFound) return null;

  if (!course) return null;
  if (!course) return null;

  // Contentstack silently falls back to base locale when the requested
  // locale has no entry — detect this and treat it as not found
  const returnedLocale = course.locale?.toLowerCase();
  if (returnedLocale && returnedLocale !== locale.toLowerCase()) {
    return null;
  }

  return course;
};

const stringifySnapshot = (course) => {
  let serialized;
  try {
    serialized = JSON.stringify(course, null, 2);
    return {
      serialized: serialized,
      success: true
    };
  } catch (error) {
    console.log(error);
    return {
      serialized: serialized,
      success: false
    };
  }
};

const fileExists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const writeSnapshotIfMissing = async ({ absolutePath, course }) => {
  const exists = await fileExists(absolutePath);
  if (exists) return;

  const { serialized, success } = stringifySnapshot(course);
  if (success) {
    await writeFile(`${absolutePath}.tmp`, serialized, 'utf-8');
    await rename(`${absolutePath}.tmp`, absolutePath);
  }
};

export const prepareCourseSnapshots = async ({ courseId }) => {
  try {
    // 1. Fetch all available locales
    let availableLocales;
    try {
      availableLocales = await getAvailableLocales();
    } catch (error) {
      throw new AppError(`Failed to fetch available locales: ${error.message}`, 502);
    }

    if (!availableLocales?.length) {
      throw new AppError('No locales available', 500);
    }

    const localeCodes = availableLocales.map((l) => l.code.toLowerCase());

    // Ensure base locale is always included
    if (!localeCodes.includes(BASE_LOCALE)) {
      localeCodes.unshift(BASE_LOCALE);
    }

    // 2. Fetch all locale versions in parallel
    let coursesByLocale;
    let validCoursesLocale;
    try {
      const results = await Promise.all(
        localeCodes.map(async (locale) => {
          const course = await fetchCourseByLocale({ courseId, locale });
          return { locale, course: course };
        })
      );
      const validCourses = results.filter((r) => r.course !== null);
      validCoursesLocale = results
        ?.filter((item) => item?.course !== null)
        ?.map((item) => item?.locale);

      // Filter out locales where the course doesn't exist, but keep track of them
      coursesByLocale = Object.fromEntries(
        validCourses.map(({ locale, course }) => [locale, course])
      );
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(`Failed to fetch course snapshots for ${courseId}: ${error.message}`, 502);
    }

    const baseCourse = coursesByLocale[BASE_LOCALE];
    const version = baseCourse?._version;
    if (!version) {
      throw new AppError(
        `Missing course version for course ${courseId} in locale ${BASE_LOCALE}`,
        500
      );
    }

    // 3. Prepare output directory
    const courseDir = path.join(process.cwd(), 'public', 'course');
    try {
      await mkdir(courseDir, { recursive: true });
    } catch (error) {
      throw new AppError(`Failed to prepare course snapshot directory: ${error.message}`, 500);
    }

    // 4. Write all snapshots to disk (skip if already exists)
    const snapshotPaths = {};
    try {
      await Promise.all(
        validCoursesLocale.map(async (locale) => {
          const relativePath = path.join(
            'public',
            'course',
            `${courseId}-${locale}-${coursesByLocale[locale]?._version}.json`
          );
          const absolutePath = path.join(process.cwd(), relativePath);

          await writeSnapshotIfMissing({
            absolutePath,
            course: coursesByLocale[locale]
          });

          snapshotPaths[locale] = relativePath;
        })
      );
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) throw error;
      throw new AppError(`Failed to write course snapshot files: ${error.message}`, 500);
    }

    return {
      version,
      baseCourse,
      coursesByLocale,
      snapshotPaths // { 'en-us': 'public/course/xyz-en-us-3.json', 'fr-fr': '...', ... }
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to prepare course snapshots: ${error.message}`, 500);
  }
};
