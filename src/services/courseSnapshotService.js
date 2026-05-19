import { access, mkdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getAvailableLocales } from '../contentstack/getAvailableLocales.js';
import { getCourse } from '../contentstack/getCourse.js';
import { AppError } from '../utils/error.js';

const COURSE_CONTENT_TYPE_UID = 'course';
const BASE_LOCALE = 'en-us';

const findLocale = (availableLocales, locale) =>
  availableLocales.find((item) => item.code.toLowerCase() === locale.toLowerCase());

const fetchCourseByLocale = async ({ courseId, locale }) => {
  const { course } = await getCourse({
    entryQuery: {
      content_type_uid: COURSE_CONTENT_TYPE_UID,
      entry_uid: courseId
    },
    lng: locale
  });

  if (!course) {
    throw new AppError(`Course not found for locale ${locale}`, 404);
  }

  return course;
};

const stringifySnapshot = (course, locale) => {
  let serialized;

  try {
    serialized = JSON.stringify(course, null, 2);
  } catch (error) {
    throw new AppError(
      `Failed to serialize course snapshot for locale ${locale}: ${error.message}`,
      500
    );
  }

  if (!serialized || serialized.trim().length === 0) {
    throw new AppError(`Snapshot payload is empty for locale ${locale}`, 500);
  }

  return serialized;
};

const fileExists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const prepareCourseSnapshots = async ({ courseId, locale }) => {
  try {
    const normalizedLocale = locale.toLowerCase();

    let availableLocales;
    try {
      availableLocales = await getAvailableLocales();
    } catch (error) {
      throw new AppError(`Failed to fetch available locales: ${error.message}`, 502);
    }

    const localeMatch = findLocale(availableLocales, normalizedLocale);
    if (!localeMatch) {
      throw new AppError(`Locale ${locale} is not available`, 400);
    }

    let baseCourse;
    let localizedCourse;
    try {
      [baseCourse, localizedCourse] = await Promise.all([
        fetchCourseByLocale({ courseId, locale: BASE_LOCALE }),
        fetchCourseByLocale({ courseId, locale: normalizedLocale })
      ]);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        `Failed to fetch course snapshots for ${courseId} (${BASE_LOCALE}, ${normalizedLocale}): ${error.message}`,
        502
      );
    }

    const version = baseCourse?._version;
    if (!version) {
      throw new AppError(
        `Missing course version for course ${courseId} in locale ${BASE_LOCALE}`,
        500
      );
    }

    const courseDir = path.join(process.cwd(), 'public', 'course');
    try {
      await mkdir(courseDir, { recursive: true });
    } catch (error) {
      throw new AppError(`Failed to prepare course snapshot directory: ${error.message}`, 500);
    }

    const basePath = path.join('public', 'course', `${courseId}-${BASE_LOCALE}-${version}.json`);
    const localePath = path.join(
      'public',
      'course',
      `${courseId}-${normalizedLocale}-${version}.json`
    );
    const absoluteBasePath = path.join(process.cwd(), basePath);
    const absoluteLocalePath = path.join(process.cwd(), localePath);

    let baseExists;
    let localeExists;
    try {
      [baseExists, localeExists] = await Promise.all([
        fileExists(absoluteBasePath),
        fileExists(absoluteLocalePath)
      ]);
    } catch (error) {
      throw new AppError(`Failed to check snapshot file existence: ${error.message}`, 500);
    }

    const writes = [];

    if (!baseExists) {
      const baseSerialized = stringifySnapshot(baseCourse, BASE_LOCALE);
      writes.push(
        writeFile(`${absoluteBasePath}.tmp`, baseSerialized, 'utf-8').then(() =>
          rename(`${absoluteBasePath}.tmp`, absoluteBasePath)
        )
      );
    }

    if (!localeExists) {
      const localizedSerialized = stringifySnapshot(localizedCourse, normalizedLocale);
      writes.push(
        writeFile(`${absoluteLocalePath}.tmp`, localizedSerialized, 'utf-8').then(() =>
          rename(`${absoluteLocalePath}.tmp`, absoluteLocalePath)
        )
      );
    }

    if (writes.length > 0) {
      try {
        await Promise.all(writes);
      } catch (error) {
        throw new AppError(`Failed to write course snapshot files: ${error.message}`, 500);
      }
    }

    return {
      basePath,
      localePath,
      baseCourse,
      localizedCourse,
      locale: normalizedLocale,
      version
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Failed to prepare course snapshots: ${error.message}`, 500);
  }
};
