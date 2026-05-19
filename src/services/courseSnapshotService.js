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
  const normalizedLocale = locale.toLowerCase();
  const availableLocales = await getAvailableLocales();
  const localeMatch = findLocale(availableLocales, normalizedLocale);

  if (!localeMatch) {
    throw new AppError(`Locale ${locale} is not available`, 400);
  }

  const [baseCourse, localizedCourse] = await Promise.all([
    fetchCourseByLocale({ courseId, locale: BASE_LOCALE }),
    fetchCourseByLocale({ courseId, locale: normalizedLocale })
  ]);

  const version = baseCourse?._version;

  const courseDir = path.join(process.cwd(), 'public', 'course');
  await mkdir(courseDir, { recursive: true });

  const basePath = path.join('public', 'course', `${courseId}-${BASE_LOCALE}-${version}.json`);
  const localePath = path.join(
    'public',
    'course',
    `${courseId}-${normalizedLocale}-${version}.json`
  );
  const absoluteBasePath = path.join(process.cwd(), basePath);
  const absoluteLocalePath = path.join(process.cwd(), localePath);
  const [baseExists, localeExists] = await Promise.all([
    fileExists(absoluteBasePath),
    fileExists(absoluteLocalePath)
  ]);

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
    await Promise.all(writes);
  }

  return {
    basePath,
    localePath,
    baseCourse,
    localizedCourse,
    locale: normalizedLocale,
    version
  };
};
