import { addEditableTags } from '@contentstack/utils';
import { getContentStackSDKClient } from './client.js';

/**
 * Get Course
 */
export const getCourse = async ({ entryQuery, lng = 'en-us', withEditTags = true }) => {
  const { content_type_uid, entry_uid } = entryQuery;

  const contentStackAPI = getContentStackSDKClient();
  contentStackAPI.livePreviewQuery(entryQuery);

  if (!content_type_uid || !entry_uid) return { course: null };

  let course;
  try {
    course = await contentStackAPI
      .contentType(content_type_uid)
      .entry(entry_uid)
      .locale(lng.toLocaleLowerCase())
      .includeContentType()
      .includeEmbeddedItems()
      .addParams({
        include_all: 'true',
        include_all_depth: '4',
        include_reference_details: 'true',
        include_applied_variants: 'true'
      })
      .fetch();
  } catch (error) {
    console.log(error, 'error at');
    // Contentstack throws when the entry doesn't exist in the requested locale
    if (isNotFoundError(error)) {
      console.log(isNotFoundError(error), 'isNotFoundError(error)');
      return { course: null, notFound: true };
    }
    throw error;
  }

  // Contentstack may resolve to null/undefined instead of throwing
  if (!course) {
    return { course: null, notFound: true };
  }

  if (withEditTags) {
    addEditableTags(course, content_type_uid, true, lng);
  }

  return { course };
};

/**
 * Contentstack SDK surfaces missing-locale / missing-entry errors in a few ways
 * depending on SDK version and stack config — normalise all of them here.
 */
const isNotFoundError = (error) => {
  if (!error) return false;

  // HTTP 404 from the delivery API
  if (error.status === 422 || error.statusCode === 404) return true;

  // Some SDK versions embed the status inside error_code or http_code
  if (error.error_code === 141 || error.http_code === 404) return true;

  // Message-based fallback for SDK versions that don't expose a status field
  const msg = (error.message || '').toLowerCase();
  return msg.includes("The requested object doesn't exist.") || msg.includes('does not exist');
};
