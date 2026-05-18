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

  try {
    const course = await contentStackAPI
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

    if (withEditTags) {
      addEditableTags(course, content_type_uid, true, lng);
    }

    return { course };
  } catch (error) {
    console.log(error);
  }
};
