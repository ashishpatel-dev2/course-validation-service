// ─── Severity constants ───────────────────────────────────────────────────────
const Severity = {
  Critical: 'Critical',
  High: 'High',
  Medium: 'Medium',
  Low: 'Low',
  Warning: 'Warning'
};

const IssueType = {
  Empty: 'EMPTY',
  SameAsEnglish: 'SAME_AS_ENGLISH',
  FileMissing: 'FILE_MISSING',
  FileChanged: 'FILE_CHANGED'
};

// ─── Atom field maps ──────────────────────────────────────────────────────────
// title is intentionally excluded from all atoms per requirements.
// Only flat string fields that are translatable are listed here.
// Deep/array fields and File fields are handled in the type-specific
// deep validation blocks inside validateAtom.
const ATOM_FIELD_RULES = {
  // ── Content / Media ─────────────────────────────────────────────────────────

  atom_simple_text: [['body', Severity.High, 'Simple-text body is not translated']],

  atom_rich_text: [['body', Severity.High, 'Rich-text body is not translated']],

  // image_fields sub-fields (image_file handled in deep validation)
  atom_image: [
    ['image_fields.intro', Severity.High, 'Image intro is not translated'],
    [
      'image_fields.image_alt_text',
      Severity.High,
      'Image alt text is not translated (accessibility)'
    ],
    ['image_fields.image_caption', Severity.High, 'Image caption is not translated'],
    ['image_fields.outro', Severity.High, 'Image outro is not translated']
  ],

  // video_fields sub-fields (video_file, preview_image handled in deep validation)
  atom_video: [
    ['video_fields.intro', Severity.High, 'Video intro is not translated'],
    ['video_fields.video_caption_text', Severity.High, 'Video caption text is not translated'],
    ['video_fields.video_script', Severity.High, 'Video script is not translated'],
    ['video_fields.outro', Severity.High, 'Video outro is not translated']
  ],

  // audio_fields sub-fields (audio_file handled in deep validation)
  atom_audio: [
    ['audio_fields.intro', Severity.High, 'Audio intro is not translated'],
    ['audio_fields.audio_title', Severity.High, 'Audio title is not translated'],
    ['audio_fields.description', Severity.High, 'Audio description is not translated'],
    ['audio_fields.audio_transcript_text', Severity.High, 'Audio transcript is not translated'],
    ['audio_fields.outro', Severity.High, 'Audio outro is not translated']
  ],

  // embedded_media_fields sub-fields (embedded_code is code, not translatable)
  atom_embedded_media: [
    ['embedded_media_fields.intro', Severity.High, 'Embedded media intro is not translated'],
    ['embedded_media_fields.outro', Severity.High, 'Embedded media outro is not translated']
  ],

  // embedded_document_fields sub-fields (embedded_file handled in deep validation)
  atom_embedded_document: [
    ['embedded_document_fields.intro', Severity.High, 'Document intro is not translated'],
    [
      'embedded_document_fields.display_title',
      Severity.High,
      'Document display title is not translated'
    ],
    [
      'embedded_document_fields.download_link_label',
      Severity.High,
      'Download link label is not translated'
    ],
    ['embedded_document_fields.outro', Severity.High, 'Document outro is not translated']
  ],

  // ── Interactive / Layout ────────────────────────────────────────────────────

  // chat bubble body/speaker_name/avatar handled in deep validation
  atom_chat: [
    ['intro', Severity.High, 'Chat intro is not translated'],
    ['outro', Severity.High, 'Chat outro is not translated']
  ],

  // click_to_reveals items handled in deep validation
  atom_click_to_reveal: [
    ['intro', Severity.High, 'Click-to-reveal intro is not translated'],
    ['outro', Severity.High, 'Click-to-reveal outro is not translated']
  ],

  // accordions items handled in deep validation
  atom_accordion_group: [
    ['intro', Severity.High, 'Accordion group intro is not translated'],
    ['outro', Severity.High, 'Accordion group outro is not translated']
  ],

  // slides items handled in deep validation
  atom_slideshow: [
    ['intro', Severity.High, 'Slideshow intro is not translated'],
    ['outro', Severity.High, 'Slideshow outro is not translated']
  ],

  // tab_group items handled in deep validation
  atom_tabs: [
    ['intro', Severity.High, 'Tabs intro is not translated'],
    ['outro', Severity.High, 'Tabs outro is not translated']
  ],

  // columns items handled in deep validation
  atom_multi_column: [
    ['intro', Severity.High, 'Multi-column intro is not translated'],
    ['outro', Severity.High, 'Multi-column outro is not translated']
  ],

  // cards (FlipCardFields[]) handled in deep validation
  atom_flipcards: [
    ['intro', Severity.High, 'Flipcards intro is not translated'],
    ['outro', Severity.High, 'Flipcards outro is not translated']
  ],

  // cards[]: image_file, image_caption, body handled in deep validation
  atom_card_stack: [
    ['intro', Severity.High, 'Card stack intro is not translated'],
    ['outro', Severity.High, 'Card stack outro is not translated']
  ],

  // ── Question atoms ──────────────────────────────────────────────────────────
  // stem (AllSimpleFields) handled via validateStem()
  // answer_choices handled in deep validation

  atom_mc_question: [
    ['prompt', Severity.High, 'MC question prompt is not translated'],
    ['instruction', Severity.High, 'MC question instruction is not translated']
  ],

  atom_tf_question: [
    ['prompt', Severity.High, 'T/F question prompt is not translated'],
    ['instruction', Severity.High, 'T/F question instruction is not translated'],
    ['truthy_label', Severity.High, 'True label is not translated'],
    ['falsey_label', Severity.High, 'False label is not translated'],
    ['correct_feedback', Severity.High, 'Correct feedback is not translated'],
    ['incorrect_feedback', Severity.High, 'Incorrect feedback is not translated']
  ],

  atom_fill_in_the_blanks_question: [
    ['prompt', Severity.High, 'Fill-in-the-blanks prompt is not translated'],
    ['words_and_blanks', Severity.High, 'Fill-in-the-blanks sentence is not translated'],
    ['instruction', Severity.High, 'Fill-in-the-blanks instruction is not translated'],
    ['correct_feedback', Severity.High, 'Correct feedback is not translated'],
    ['incorrect_feedback', Severity.High, 'Incorrect feedback is not translated']
  ],

  atom_reorder_words: [
    ['prompt', Severity.High, 'Reorder-words prompt is not translated'],
    ['solution', Severity.High, 'Reorder-words solution is not translated'],
    ['instruction', Severity.High, 'Reorder-words instruction is not translated'],
    ['correct_feedback', Severity.High, 'Correct feedback is not translated'],
    ['incorrect_feedback', Severity.High, 'Incorrect feedback is not translated']
  ],

  atom_reorder_list: [
    ['prompt', Severity.High, 'Reorder-list prompt is not translated'],
    ['instruction', Severity.High, 'Reorder-list instruction is not translated'],
    ['correct_feedback', Severity.High, 'Correct feedback is not translated'],
    ['incorrect_feedback', Severity.High, 'Incorrect feedback is not translated']
  ]
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function isMissing(val) {
  return val === null || val === undefined || (typeof val === 'string' && val.trim() === '');
}

function isSameAsEng(engVal, locVal) {
  if (!engVal || !locVal) return false;
  return (
    typeof engVal === 'string' && typeof locVal === 'string' && engVal.trim() === locVal.trim()
  );
}

function toDisplayValue(value, max = 180) {
  if (value === null || value === undefined) return '';
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

// ─── File validation helper ───────────────────────────────────────────────────
// A File is a Contentstack asset object { uid, url, filename, ... }
// Rules:
//   - If English has a file, locale MUST also have a file (FileMissing)
//   - If both have files but the uid differs, flag as FileChanged (Warning)
//     because a locale may legitimately use a different translated asset,
//     but it is worth flagging for review.
//   - If uid is the same it is fine — same asset reused across locales is common.
function isFileObject(val) {
  return val !== null && typeof val === 'object' && typeof val.uid === 'string';
}

function makeIssue({
  jobId,
  courseId,
  locale,
  severity,
  path,
  field,
  description,
  issueType = null,
  englishValue = '',
  localizedValue = ''
}) {
  return {
    job_id: jobId,
    course_id: courseId,
    locale,
    severity_level: severity,
    object_path: path,
    field_name: field,
    issue_description: description,
    issueType,
    englishValue,
    localizedValue
  };
}

// ─── Core validator ───────────────────────────────────────────────────────────

export function validateCourseLocale({ engCourse, localeCourse, jobId, locale }) {
  if (!engCourse || typeof engCourse !== 'object') {
    throw new Error('validateCourseLocale: "engCourse" must be a valid object');
  }
  if (!localeCourse || typeof localeCourse !== 'object') {
    throw new Error('validateCourseLocale: "localeCourse" must be a valid object');
  }

  const issues = [];
  const courseId = engCourse.uid ?? engCourse._id ?? engCourse.id ?? 'unknown';

  // ─── push ───────────────────────────────────────────────────────────────────
  function push(severity, path, field, description, extra = {}) {
    issues.push(
      makeIssue({ jobId, courseId, locale, severity, path, field, description, ...extra })
    );
  }

  // ─── checkField ─────────────────────────────────────────────────────────────
  // Validates a translatable string field.
  // Guards both parent objects so a missing locale parent never crashes.
  function checkField(engObj, locObj, fieldPath, severity, description, objectPath) {
    if (!engObj) return;

    const engVal = getNestedValue(engObj, fieldPath);
    const locVal = locObj ? getNestedValue(locObj, fieldPath) : undefined;

    if (isMissing(engVal)) return;

    if (isMissing(locVal)) {
      push(severity, objectPath, fieldPath, `${description} — value is missing`, {
        issueType: IssueType.Empty,
        englishValue: toDisplayValue(engVal),
        localizedValue: toDisplayValue(locVal)
      });
    } else if (isSameAsEng(engVal, locVal)) {
      push(
        Severity.High,
        objectPath,
        fieldPath,
        `${description} — value appears unchanged from English`,
        {
          issueType: IssueType.SameAsEnglish,
          englishValue: toDisplayValue(engVal),
          localizedValue: toDisplayValue(locVal)
        }
      );
    }
  }

  // ─── checkFile ──────────────────────────────────────────────────────────────
  // Validates a Contentstack File asset field.
  // engFileVal / locFileVal are the already-resolved File objects (or null/undefined).
  //
  // Rules:
  //   1. If English has no file → nothing to check (file is optional)
  //   2. If English has a file but locale does not → High (FileMissing)
  //   3. If both have files but different uid → Warning (FileChanged)
  //      A locale CAN legitimately use a different translated asset,
  //      but we flag it so a human can review.
  //   4. Same uid → OK, no issue raised.
  function checkFile(engFileVal, locFileVal, fieldPath, objectPath, label) {
    // Rule 1: English has no file — nothing to validate
    if (!isFileObject(engFileVal)) return;

    // Rule 2: English has a file, locale is missing it entirely
    if (!isFileObject(locFileVal)) {
      push(Severity.High, objectPath, fieldPath, `${label} — locale file asset is missing`, {
        issueType: IssueType.FileMissing,
        englishValue: `${engFileVal.filename} (uid: ${engFileVal.uid})`,
        localizedValue: ''
      });
      return;
    }

    // Rule 3: Both have files but different uid — flag for review
    if (engFileVal.uid === locFileVal.uid) {
      push(
        Severity.Warning,
        objectPath,
        fieldPath,
        `${label} — locale uses a same  file as English (may be intentional if translated)`,
        {
          issueType: IssueType.SameAsEnglish,
          englishValue: `${engFileVal.filename} (uid: ${engFileVal.uid})`,
          localizedValue: `${locFileVal.filename} (uid: ${locFileVal.uid})`
        }
      );
    }

    // Rule 4: Same uid → no issue
  }

  // ─── checkCount ─────────────────────────────────────────────────────────────
  function checkCount(engArr, locArr, entityLabel, parentPath) {
    const engLen = engArr?.length ?? 0;
    const locLen = locArr?.length ?? 0;
    if (engLen !== locLen) {
      push(
        Severity.Critical,
        parentPath,
        'count',
        `${entityLabel} count mismatch — English has ${engLen}, locale has ${locLen}`
      );
      return false;
    }
    return true;
  }

  // ─── validateBasicContentFields ─────────────────────────────────────────────
  // Handles one BasicContentFields entry.
  // File fields inside ImageFields / VideoFields / AudioFields /
  // EmbeddedDocumentFields are validated here via checkFile.
  function validateBasicContentFields(engFields, locFields, path) {
    if (!engFields) return;
    if (!locFields) {
      push(
        Severity.Critical,
        path,
        'basic_content_fields',
        'Locale is missing basic_content_fields block'
      );
      return;
    }

    const checkTypes = ['rich_text', 'image', 'video', 'audio', 'document', 'embedded_media'];

    checkTypes.forEach((type) => {
      const engBlock = engFields[type];
      const locBlock = locFields[type];
      if (!engBlock) return;

      if (!locBlock) {
        push(Severity.High, path, type, `Locale is missing ${type} content block`);
        return;
      }

      if (type === 'rich_text') {
        checkField(
          engBlock,
          locBlock,
          'body',
          Severity.High,
          'Rich-text body not translated',
          `${path}.rich_text`
        );
      }

      if (type === 'image') {
        // String fields
        ['intro', 'image_alt_text', 'image_caption', 'outro'].forEach((f) =>
          checkField(
            engBlock,
            locBlock,
            f,
            Severity.High,
            `Image field "${f}" not translated`,
            `${path}.image`
          )
        );
        // File field: image_file
        checkFile(
          engBlock.image_file,
          locBlock.image_file,
          'image_file',
          `${path}.image`,
          'Image file'
        );
      }

      if (type === 'video') {
        // String fields
        ['intro', 'video_caption_text', 'video_script', 'outro'].forEach((f) =>
          checkField(
            engBlock,
            locBlock,
            f,
            Severity.High,
            `Video field "${f}" not translated`,
            `${path}.video`
          )
        );
        // File fields: video_file, preview_image
        checkFile(
          engBlock.video_file,
          locBlock.video_file,
          'video_file',
          `${path}.video`,
          'Video file'
        );
        checkFile(
          engBlock.preview_image,
          locBlock.preview_image,
          'preview_image',
          `${path}.video`,
          'Video preview image'
        );
      }

      if (type === 'audio') {
        // String fields
        ['intro', 'audio_title', 'description', 'audio_transcript_text', 'outro'].forEach((f) =>
          checkField(
            engBlock,
            locBlock,
            f,
            Severity.High,
            `Audio field "${f}" not translated`,
            `${path}.audio`
          )
        );
        // File field: audio_file
        checkFile(
          engBlock.audio_file,
          locBlock.audio_file,
          'audio_file',
          `${path}.audio`,
          'Audio file'
        );
      }

      if (type === 'document') {
        // String fields
        ['intro', 'display_title', 'download_link_label', 'outro'].forEach((f) =>
          checkField(
            engBlock,
            locBlock,
            f,
            Severity.High,
            `Document field "${f}" not translated`,
            `${path}.document`
          )
        );
        // File field: embedded_file
        checkFile(
          engBlock.embedded_file,
          locBlock.embedded_file,
          'embedded_file',
          `${path}.document`,
          'Embedded document file'
        );
      }

      if (type === 'embedded_media') {
        // embedded_code is intentionally skipped — it is code/HTML, not translatable prose
        ['intro', 'outro'].forEach((f) =>
          checkField(
            engBlock,
            locBlock,
            f,
            Severity.High,
            `Embedded media field "${f}" not translated`,
            `${path}.embedded_media`
          )
        );
      }
    });
  }

  // ─── validateAllSimpleFields ─────────────────────────────────────────────────
  function validateAllSimpleFields(engFields, locFields, path) {
    if (!engFields) return;
    if (!locFields) {
      push(Severity.Critical, path, 'all_simple_fields', 'Locale is missing content fields block');
      return;
    }

    const engItems = engFields.basic_content_fields ?? [];
    const locItems = locFields.basic_content_fields ?? [];

    if (!checkCount(engItems, locItems, 'basic_content_fields items', path)) return;

    engItems.forEach((engItem, i) => {
      validateBasicContentFields(engItem, locItems[i], `${path}.basic_content_fields[${i}]`);
    });
  }

  // ─── validateStem ────────────────────────────────────────────────────────────
  // stem is AllSimpleFields — shared by all question atom types
  function validateStem(engAtom, locAtom, path) {
    if (!engAtom?.stem) return;
    if (!locAtom?.stem) {
      push(Severity.Critical, `${path}.stem`, 'stem', 'Locale stem (AllSimpleFields) is missing');
      return;
    }
    validateAllSimpleFields(engAtom.stem, locAtom.stem, `${path}.stem`);
  }

  // ─── validateAtom ────────────────────────────────────────────────────────────
  function validateAtom(engAtom, locAtom, path) {
    if (!engAtom) return;

    const atomType = engAtom._content_type_uid ?? 'unknown';

    if (!locAtom) {
      push(Severity.Critical, path, 'atom', `Locale atom is missing (type: ${atomType})`);
      return;
    }

    const locAtomType = locAtom._content_type_uid ?? 'unknown';
    if (atomType !== locAtomType) {
      push(
        Severity.Critical,
        path,
        '_content_type_uid',
        `Atom type mismatch — eng: ${atomType}, locale: ${locAtomType}`
      );
      return;
    }

    // ── Flat string field rules ──────────────────────────────────────────────
    const rules = ATOM_FIELD_RULES[atomType] ?? [];
    rules.forEach(([fieldPath, severity, description]) => {
      checkField(engAtom, locAtom, fieldPath, severity, description, path);
    });

    // ── Type-specific deep validation ────────────────────────────────────────

    // ── atom_image ───────────────────────────────────────────────────────────
    // image_fields.image_file (File)
    if (atomType === 'atom_image') {
      checkFile(
        engAtom.image_fields?.image_file,
        locAtom.image_fields?.image_file,
        'image_fields.image_file',
        path,
        'Image file'
      );
    }

    // ── atom_video ───────────────────────────────────────────────────────────
    // video_fields.video_file (File), video_fields.preview_image (File)
    if (atomType === 'atom_video') {
      checkFile(
        engAtom.video_fields?.video_file,
        locAtom.video_fields?.video_file,
        'video_fields.video_file',
        path,
        'Video file'
      );
      checkFile(
        engAtom.video_fields?.preview_image,
        locAtom.video_fields?.preview_image,
        'video_fields.preview_image',
        path,
        'Video preview image'
      );
    }

    // ── atom_audio ───────────────────────────────────────────────────────────
    // audio_fields.audio_file (File)
    if (atomType === 'atom_audio') {
      checkFile(
        engAtom.audio_fields?.audio_file,
        locAtom.audio_fields?.audio_file,
        'audio_fields.audio_file',
        path,
        'Audio file'
      );
    }

    // ── atom_embedded_document ───────────────────────────────────────────────
    // embedded_document_fields.embedded_file (File)
    if (atomType === 'atom_embedded_document') {
      checkFile(
        engAtom.embedded_document_fields?.embedded_file,
        locAtom.embedded_document_fields?.embedded_file,
        'embedded_document_fields.embedded_file',
        path,
        'Embedded document file'
      );
    }

    // ── atom_click_to_reveal ─────────────────────────────────────────────────
    if (atomType === 'atom_click_to_reveal') {
      const engItems = engAtom.click_to_reveals ?? [];
      const locItems = locAtom.click_to_reveals ?? [];
      if (checkCount(engItems, locItems, 'click_to_reveal items', path)) {
        engItems.forEach((engItem, i) => {
          const locItem = locItems[i];
          const itemPath = `${path}.click_to_reveals[${i}]`;
          checkField(
            engItem?.content,
            locItem?.content,
            'initial_button_label',
            Severity.High,
            'Initial button label not translated',
            itemPath
          );
          checkField(
            engItem?.content,
            locItem?.content,
            'revealed_button_label',
            Severity.High,
            'Revealed button label not translated',
            itemPath
          );
          validateAllSimpleFields(
            engItem?.content?.initial_content,
            locItem?.content?.initial_content,
            `${itemPath}.initial_content`
          );
          validateAllSimpleFields(
            engItem?.content?.revealed_content,
            locItem?.content?.revealed_content,
            `${itemPath}.revealed_content`
          );
        });
      }
    }

    // ── atom_accordion_group ─────────────────────────────────────────────────
    if (atomType === 'atom_accordion_group') {
      const engAccordions = engAtom.accordions ?? [];
      const locAccordions = locAtom.accordions ?? [];
      if (checkCount(engAccordions, locAccordions, 'accordions', path)) {
        engAccordions.forEach((engAcc, i) => {
          const locAcc = locAccordions[i];
          const accPath = `${path}.accordions[${i}]`;
          checkField(
            engAcc?.accordion,
            locAcc?.accordion,
            'accordion_label',
            Severity.High,
            'Accordion label not translated',
            accPath
          );
          const engContent = engAcc?.accordion?.accordion_content ?? [];
          const locContent = locAcc?.accordion?.accordion_content ?? [];
          if (checkCount(engContent, locContent, 'accordion content blocks', accPath)) {
            engContent.forEach((ec, j) =>
              validateAllSimpleFields(ec, locContent[j], `${accPath}.accordion_content[${j}]`)
            );
          }
        });
      }
    }

    // ── atom_tabs ────────────────────────────────────────────────────────────
    if (atomType === 'atom_tabs') {
      const engTabs = engAtom.tab_group ?? [];
      const locTabs = locAtom.tab_group ?? [];
      if (checkCount(engTabs, locTabs, 'tabs', path)) {
        engTabs.forEach((engTab, i) => {
          const locTab = locTabs[i];
          const tabPath = `${path}.tab_group[${i}]`;
          checkField(
            engTab?.tab,
            locTab?.tab,
            'tab_label',
            Severity.High,
            'Tab label not translated',
            tabPath
          );
          const engContent = engTab?.tab?.tab_content ?? [];
          const locContent = locTab?.tab?.tab_content ?? [];
          if (checkCount(engContent, locContent, 'tab content blocks', tabPath)) {
            engContent.forEach((ec, j) =>
              validateAllSimpleFields(ec, locContent[j], `${tabPath}.tab_content[${j}]`)
            );
          }
        });
      }
    }

    // ── atom_slideshow ───────────────────────────────────────────────────────
    if (atomType === 'atom_slideshow') {
      const engSlides = engAtom.slides ?? [];
      const locSlides = locAtom.slides ?? [];
      if (checkCount(engSlides, locSlides, 'slides', path)) {
        engSlides.forEach((es, i) => {
          validateAllSimpleFields(
            es?.slide?.content,
            locSlides[i]?.slide?.content,
            `${path}.slides[${i}].content`
          );
        });
      }
    }

    // ── atom_multi_column ────────────────────────────────────────────────────
    if (atomType === 'atom_multi_column') {
      const engCols = engAtom.columns ?? [];
      const locCols = locAtom.columns ?? [];
      if (checkCount(engCols, locCols, 'columns', path)) {
        engCols.forEach((ec, i) =>
          validateAllSimpleFields(ec, locCols[i], `${path}.columns[${i}]`)
        );
      }
    }

    // ── atom_chat ────────────────────────────────────────────────────────────
    // chat[].bubble: body (string), speaker_name (string), avatar (File)
    if (atomType === 'atom_chat') {
      const engBubbles = engAtom.chat ?? [];
      const locBubbles = locAtom.chat ?? [];
      if (checkCount(engBubbles, locBubbles, 'chat bubbles', path)) {
        engBubbles.forEach((eb, i) => {
          const locBubble = locBubbles[i];
          const bubblePath = `${path}.chat[${i}]`;

          // String fields
          checkField(
            eb?.bubble,
            locBubble?.bubble,
            'body',
            Severity.High,
            'Chat bubble body not translated',
            bubblePath
          );
          checkField(
            eb?.bubble,
            locBubble?.bubble,
            'speaker_name',
            Severity.High,
            'Chat bubble speaker name not translated',
            bubblePath
          );

          // File field: avatar
          checkFile(
            eb?.bubble?.avatar,
            locBubble?.bubble?.avatar,
            'bubble.avatar',
            bubblePath,
            'Chat bubble avatar'
          );
        });
      }
    }

    // ── atom_card_stack ──────────────────────────────────────────────────────
    // cards[]: image_caption (string), body (string), image_file (File)
    if (atomType === 'atom_card_stack') {
      const engCards = engAtom.cards ?? [];
      const locCards = locAtom.cards ?? [];
      if (checkCount(engCards, locCards, 'cards', path)) {
        engCards.forEach((ec, i) => {
          const locCard = locCards[i];
          const cardPath = `${path}.cards[${i}]`;

          // String fields
          checkField(ec, locCard, 'body', Severity.High, 'Card body not translated', cardPath);
          checkField(
            ec,
            locCard,
            'image_caption',
            Severity.High,
            'Card image caption not translated',
            cardPath
          );

          // File field: image_file
          checkFile(ec?.image_file, locCard?.image_file, 'image_file', cardPath, 'Card image file');
        });
      }
    }

    // ── atom_flipcards ───────────────────────────────────────────────────────
    // cards[] is FlipCardFields[]
    // FlipCardFields:
    //   front_card[]: FrontCard { header.content (string), body.content (string), image.content (File) }
    //   back_card[]:  BackCard  { header.content (string), body.content (string), image.content (File) }
    if (atomType === 'atom_flipcards') {
      const engCards = engAtom.cards ?? [];
      const locCards = locAtom.cards ?? [];
      if (checkCount(engCards, locCards, 'flipcards', path)) {
        engCards.forEach((ec, i) => {
          const locCard = locCards[i];
          const cardPath = `${path}.cards[${i}]`;

          // front_card[] — FrontCard[]
          const engFront = ec?.front_card ?? [];
          const locFront = locCard?.front_card ?? [];
          if (checkCount(engFront, locFront, 'front_card items', cardPath)) {
            engFront.forEach((ef, fi) => {
              const locF = locFront[fi];
              const fp = `${cardPath}.front_card[${fi}]`;
              // String fields
              checkField(
                ef?.header,
                locF?.header,
                'content',
                Severity.High,
                'Flip card front header not translated',
                fp
              );
              checkField(
                ef?.body,
                locF?.body,
                'content',
                Severity.High,
                'Flip card front body not translated',
                fp
              );
              // File field: image.content (File)
              checkFile(
                ef?.image?.content,
                locF?.image?.content,
                'image.content',
                fp,
                'Flip card front image'
              );
            });
          }

          // back_card[] — BackCard[]
          const engBack = ec?.back_card ?? [];
          const locBack = locCard?.back_card ?? [];
          if (checkCount(engBack, locBack, 'back_card items', cardPath)) {
            engBack.forEach((eb, bi) => {
              const locB = locBack[bi];
              const bp = `${cardPath}.back_card[${bi}]`;
              // String fields
              checkField(
                eb?.header,
                locB?.header,
                'content',
                Severity.High,
                'Flip card back header not translated',
                bp
              );
              checkField(
                eb?.body,
                locB?.body,
                'content',
                Severity.High,
                'Flip card back body not translated',
                bp
              );
              // File field: image.content (File)
              checkFile(
                eb?.image?.content,
                locB?.image?.content,
                'image.content',
                bp,
                'Flip card back image'
              );
            });
          }
        });
      }
    }

    // ── atom_mc_question ─────────────────────────────────────────────────────
    // stem (AllSimpleFields) + answer_choices[]: body, feedback
    if (atomType === 'atom_mc_question') {
      validateStem(engAtom, locAtom, path);

      const engChoices = engAtom.answer_choices ?? [];
      const locChoices = locAtom.answer_choices ?? [];
      if (checkCount(engChoices, locChoices, 'answer choices', path)) {
        engChoices.forEach((ec, i) => {
          const choicePath = `${path}.answer_choices[${i}]`;
          checkField(
            ec,
            locChoices[i],
            'body',
            Severity.High,
            'Answer choice body not translated',
            choicePath
          );
          checkField(
            ec,
            locChoices[i],
            'feedback',
            Severity.High,
            'Answer choice feedback not translated',
            choicePath
          );
        });
      }
    }

    // ── atom_tf_question ─────────────────────────────────────────────────────
    // stem (AllSimpleFields) — flat fields already in ATOM_FIELD_RULES
    if (atomType === 'atom_tf_question') {
      validateStem(engAtom, locAtom, path);
    }

    // ── atom_fill_in_the_blanks_question ─────────────────────────────────────
    // stem (AllSimpleFields) + fill_words[]: text
    if (atomType === 'atom_fill_in_the_blanks_question') {
      validateStem(engAtom, locAtom, path);

      const engWords = engAtom.fill_words ?? [];
      const locWords = locAtom.fill_words ?? [];
      if (checkCount(engWords, locWords, 'fill words', path)) {
        engWords.forEach((ew, i) => {
          checkField(
            ew,
            locWords[i],
            'text',
            Severity.High,
            'Fill word not translated',
            `${path}.fill_words[${i}]`
          );
        });
      }
    }

    // ── atom_reorder_words ───────────────────────────────────────────────────
    // stem (AllSimpleFields) — flat fields already in ATOM_FIELD_RULES
    if (atomType === 'atom_reorder_words') {
      validateStem(engAtom, locAtom, path);
    }

    // ── atom_reorder_list ────────────────────────────────────────────────────
    // stem (AllSimpleFields) + reorder_choices[]: body + order preservation
    if (atomType === 'atom_reorder_list') {
      validateStem(engAtom, locAtom, path);

      const engChoices = engAtom.reorder_choices ?? [];
      const locChoices = locAtom.reorder_choices ?? [];
      if (checkCount(engChoices, locChoices, 'reorder choices', path)) {
        engChoices.forEach((ec, i) => {
          checkField(
            ec,
            locChoices[i],
            'body',
            Severity.High,
            'Reorder choice body not translated',
            `${path}.reorder_choices[${i}]`
          );
        });
      }

      // Order values must be preserved between eng and locale
      const engOrders = engChoices.map((c) => c.order);
      const locOrders = locChoices.map((c) => c.order);
      if (JSON.stringify(engOrders) !== JSON.stringify(locOrders)) {
        push(
          Severity.Critical,
          path,
          'reorder_choices.order',
          'Reorder choice ordering differs from English — locale order must be preserved'
        );
      }
    }
  }

  // ─── validatePage ────────────────────────────────────────────────────────────
  function validatePage(engPage, locPage, path) {
    if (!engPage) return;
    if (!locPage) {
      push(Severity.Critical, path, 'page', 'Locale page is missing');
      return;
    }

    checkField(
      engPage,
      locPage,
      'display_title',
      Severity.High,
      'Page title is not translated',
      path
    );

    const engAtoms = engPage.atoms ?? [];
    const locAtoms = locPage.atoms ?? [];

    if (!checkCount(engAtoms, locAtoms, 'atoms', path)) return;

    engAtoms.forEach((engAtom, i) => {
      // Atoms are referenced via atom_reference[0] per Contentstack response shape
      validateAtom(
        engAtom.atom_reference?.[0],
        locAtoms[i]?.atom_reference?.[0],
        `${path}.atoms[${i}]`
      );
    });
  }

  // ─── validateLesson ──────────────────────────────────────────────────────────
  function validateLesson(engLesson, locLesson, path) {
    if (!engLesson) return;
    if (!locLesson) {
      push(Severity.Critical, path, 'lesson', 'Locale lesson is missing');
      return;
    }

    checkField(
      engLesson,
      locLesson,
      'display_title',
      Severity.High,
      'Lesson title is not translated',
      path
    );

    const engPages = engLesson.pages ?? [];
    const locPages = locLesson.pages ?? [];

    if (!checkCount(engPages, locPages, 'pages', path)) return;

    engPages.forEach((engPage, i) => {
      validatePage(engPage, locPages[i], `${path}.pages[${i}]`);
    });
  }

  // ─── validateQuestion ────────────────────────────────────────────────────────
  // Quiz/Assessment questions are direct atom objects (not wrapped in atom_reference)
  function validateQuestion(engQ, locQ, path) {
    if (!engQ) return;
    if (!locQ) {
      push(Severity.Critical, path, 'question', 'Locale question is missing');
      return;
    }
    validateAtom(engQ, locQ, path);
  }

  // ─── validateQuiz ────────────────────────────────────────────────────────────
  function validateQuiz(engQuiz, locQuiz, path) {
    if (!engQuiz) return;
    if (!locQuiz) {
      push(Severity.Critical, path, 'quiz', 'Locale quiz is missing');
      return;
    }

    checkField(
      engQuiz,
      locQuiz,
      'display_title',
      Severity.High,
      'Quiz title is not translated',
      path
    );

    const engQs = engQuiz.questions ?? [];
    const locQs = locQuiz.questions ?? [];

    if (!checkCount(engQs, locQs, 'quiz questions', path)) return;

    engQs.forEach((eq, i) => {
      validateQuestion(eq, locQs[i], `${path}.questions[${i}]`);
    });
  }

  // ─── validateAssessment ──────────────────────────────────────────────────────
  function validateAssessment(engAssessment, locAssessment, path) {
    if (!engAssessment) return;
    if (!locAssessment) {
      push(Severity.Critical, path, 'assessment', 'Locale assessment is missing');
      return;
    }

    checkField(
      engAssessment,
      locAssessment,
      'display_title',
      Severity.High,
      'Assessment title is not translated',
      path
    );

    const engQs = engAssessment.questions ?? [];
    const locQs = locAssessment.questions ?? [];

    if (!checkCount(engQs, locQs, 'assessment questions', path)) return;

    engQs.forEach((eq, i) => {
      validateQuestion(eq, locQs[i], `${path}.questions[${i}]`);
    });
  }

  // ─── validateExam ────────────────────────────────────────────────────────────
  function validateExam(engExam, locExam, path) {
    if (!engExam) return;
    if (!locExam) {
      push(Severity.Critical, path, 'exam', 'Locale exam is missing');
      return;
    }

    checkField(
      engExam,
      locExam,
      'display_title',
      Severity.High,
      'Exam title is not translated',
      path
    );

    const engAssessments = engExam.assessments ?? [];
    const locAssessments = locExam.assessments ?? [];

    if (!checkCount(engAssessments, locAssessments, 'assessments', path)) return;

    engAssessments.forEach((ea, i) => {
      validateAssessment(ea, locAssessments[i], `${path}.assessments[${i}]`);
    });
  }

  // ─── validateTopic ───────────────────────────────────────────────────────────
  function validateTopic(engTopic, locTopic, path) {
    if (!engTopic) return;
    if (!locTopic) {
      push(Severity.Critical, path, 'topic', 'Locale topic is missing');
      return;
    }

    checkField(
      engTopic,
      locTopic,
      'display_title',
      Severity.High,
      'Topic title is not translated',
      path
    );

    const engCollections = engTopic.collection_types ?? [];
    const locCollections = locTopic.collection_types ?? [];

    if (!checkCount(engCollections, locCollections, 'collection_types', path)) return;

    engCollections.forEach((engColl, i) => {
      const locColl = locCollections[i];
      const collPath = `${path}.collection_types[${i}]`;

      if (engColl.lesson) {
        if (!locColl?.lesson) {
          push(
            Severity.Critical,
            `${collPath}.lesson`,
            'lesson',
            'Locale lesson is missing inside topic collection'
          );
        } else {
          validateLesson(engColl.lesson, locColl.lesson, `${collPath}.lesson`);
        }
      }

      if (engColl.quiz) {
        if (!locColl?.quiz) {
          push(
            Severity.Critical,
            `${collPath}.quiz`,
            'quiz',
            'Locale quiz is missing inside topic collection'
          );
        } else {
          validateQuiz(engColl.quiz, locColl.quiz, `${collPath}.quiz`);
        }
      }

      if (engColl.exam) {
        if (!locColl?.exam) {
          push(
            Severity.Critical,
            `${collPath}.exam`,
            'exam',
            'Locale exam is missing inside topic collection'
          );
        } else {
          validateExam(engColl.exam, locColl.exam, `${collPath}.exam`);
        }
      }
    });
  }

  // ─── validateChapter ─────────────────────────────────────────────────────────
  function validateChapter(engChapter, locChapter, path) {
    if (!engChapter) return;
    if (!locChapter) {
      push(Severity.Critical, path, 'chapter', 'Locale chapter is missing');
      return;
    }

    checkField(
      engChapter,
      locChapter,
      'display_title',
      Severity.High,
      'Chapter title is not translated',
      path
    );

    const engSubs = engChapter.sub_sections ?? [];
    const locSubs = locChapter.sub_sections ?? [];

    if (!checkCount(engSubs, locSubs, 'chapter sub_sections', path)) return;

    engSubs.forEach((engSub, i) => {
      const locSub = locSubs[i];
      const subPath = `${path}.sub_sections[${i}]`;

      if (engSub.topic) {
        if (!locSub?.topic) {
          push(
            Severity.Critical,
            `${subPath}.topic`,
            'topic',
            'Locale topic is missing inside chapter sub-section'
          );
        } else {
          validateTopic(engSub.topic, locSub.topic, `${subPath}.topic`);
        }
      }
    });
  }

  // ─── validateSection ─────────────────────────────────────────────────────────
  function validateSection(engSection, locSection, path) {
    if (!engSection) return;
    if (!locSection) {
      push(Severity.Critical, path, 'section', 'Locale section is missing');
      return;
    }

    if (engSection.chapter) {
      if (!locSection.chapter) {
        push(
          Severity.Critical,
          `${path}.chapter`,
          'chapter',
          'Locale chapter is missing inside section'
        );
      } else {
        validateChapter(engSection.chapter, locSection.chapter, `${path}.chapter`);
      }
    }

    if (engSection.topic) {
      if (!locSection.topic) {
        push(Severity.Critical, `${path}.topic`, 'topic', 'Locale topic is missing inside section');
      } else {
        validateTopic(engSection.topic, locSection.topic, `${path}.topic`);
      }
    }

    if (engSection.lesson) {
      if (!locSection.lesson) {
        push(
          Severity.Critical,
          `${path}.lesson`,
          'lesson',
          'Locale lesson is missing inside section'
        );
      } else {
        validateLesson(engSection.lesson, locSection.lesson, `${path}.lesson`);
      }
    }

    if (engSection.quiz) {
      if (!locSection.quiz) {
        push(Severity.Critical, `${path}.quiz`, 'quiz', 'Locale quiz is missing inside section');
      } else {
        validateQuiz(engSection.quiz, locSection.quiz, `${path}.quiz`);
      }
    }

    if (engSection.exam) {
      if (!locSection.exam) {
        push(Severity.Critical, `${path}.exam`, 'exam', 'Locale exam is missing inside section');
      } else {
        validateExam(engSection.exam, locSection.exam, `${path}.exam`);
      }
    }

    // exam_duplicate is structural only — no translatable content
  }

  // ─── Course root ─────────────────────────────────────────────────────────────
  checkField(
    engCourse,
    localeCourse,
    'display_title',
    Severity.High,
    'Course title is not translated',
    'course'
  );
  checkField(
    engCourse,
    localeCourse,
    'course_description',
    Severity.High,
    'Course description is not translated',
    'course'
  );

  const engSections = engCourse.sections ?? [];
  const locSections = localeCourse.sections ?? [];

  if (!checkCount(engSections, locSections, 'sections', 'course')) {
    return { issues };
  }

  engSections.forEach((engSection, i) => {
    validateSection(engSection, locSections[i], `course.sections[${i}]`);
  });

  return { issues };
}
