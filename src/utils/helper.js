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
  SameAsEnglish: 'SAME_AS_ENGLISH'
};

// ─── Atom field maps ──────────────────────────────────────────────────────────
const ATOM_FIELD_RULES = {
  atom_simple_text: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['body', Severity.High, 'Simple-text body is not translated']
  ],
  atom_rich_text: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['body', Severity.High, 'Rich-text body is not translated']
  ],
  atom_image: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['image_fields.intro', Severity.Medium, 'Image intro is not translated'],
    [
      'image_fields.image_alt_text',
      Severity.High,
      'Image alt text is not translated (accessibility)'
    ],
    ['image_fields.image_caption', Severity.Medium, 'Image caption is not translated'],
    ['image_fields.outro', Severity.Medium, 'Image outro is not translated']
  ],
  atom_video: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['video_fields.intro', Severity.Medium, 'Video intro is not translated'],
    ['video_fields.video_caption_text', Severity.High, 'Video caption text is not translated'],
    ['video_fields.video_script', Severity.Medium, 'Video script is not translated'],
    ['video_fields.outro', Severity.Medium, 'Video outro is not translated']
  ],
  atom_audio: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['audio_fields.intro', Severity.Medium, 'Audio intro is not translated'],
    ['audio_fields.audio_title', Severity.High, 'Audio title is not translated'],
    ['audio_fields.description', Severity.Medium, 'Audio description is not translated'],
    ['audio_fields.audio_transcript_text', Severity.High, 'Audio transcript is not translated'],
    ['audio_fields.outro', Severity.Medium, 'Audio outro is not translated']
  ],
  atom_embedded_media: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['embedded_media_fields.intro', Severity.Medium, 'Embedded media intro is not translated'],
    ['embedded_media_fields.outro', Severity.Medium, 'Embedded media outro is not translated']
  ],
  atom_embedded_document: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['embedded_document_fields.intro', Severity.Medium, 'Document intro is not translated'],
    [
      'embedded_document_fields.display_title',
      Severity.High,
      'Document display title is not translated'
    ],
    [
      'embedded_document_fields.download_link_label',
      Severity.Medium,
      'Download link label is not translated'
    ],
    ['embedded_document_fields.outro', Severity.Medium, 'Document outro is not translated']
  ],
  atom_chat: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['intro', Severity.Medium, 'Chat intro is not translated'],
    ['outro', Severity.Medium, 'Chat outro is not translated']
  ],
  atom_click_to_reveal: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['intro', Severity.Medium, 'Click-to-reveal intro is not translated'],
    ['outro', Severity.Medium, 'Click-to-reveal outro is not translated']
  ],
  atom_accordion_group: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['intro', Severity.Medium, 'Accordion group intro is not translated'],
    ['outro', Severity.Medium, 'Accordion group outro is not translated']
  ],
  atom_slideshow: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['intro', Severity.Medium, 'Slideshow intro is not translated'],
    ['outro', Severity.Medium, 'Slideshow outro is not translated']
  ],
  atom_tabs: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['intro', Severity.Medium, 'Tabs intro is not translated'],
    ['outro', Severity.Medium, 'Tabs outro is not translated']
  ],
  atom_multi_column: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['intro', Severity.Medium, 'Multi-column intro is not translated'],
    ['outro', Severity.Medium, 'Multi-column outro is not translated']
  ],
  atom_flipcards: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['intro', Severity.Medium, 'Flipcards intro is not translated'],
    ['outro', Severity.Medium, 'Flipcards outro is not translated']
  ],
  atom_flip_cards: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['intro', Severity.Medium, 'Flip-cards intro is not translated'],
    ['outro', Severity.Medium, 'Flip-cards outro is not translated']
  ],
  atom_card_stack: [
    ['title', Severity.High, 'Atom title is not translated'],
    ['intro', Severity.Medium, 'Card stack intro is not translated'],
    ['outro', Severity.Medium, 'Card stack outro is not translated']
  ],
  atom_mc_question: [
    ['title', Severity.High, 'Question atom title is not translated'],
    ['prompt', Severity.High, 'MC question prompt is not translated'],
    ['instruction', Severity.Medium, 'MC question instruction is not translated']
  ],
  atom_tf_question: [
    ['title', Severity.High, 'Question atom title is not translated'],
    ['prompt', Severity.High, 'T/F question prompt is not translated'],
    ['instruction', Severity.Medium, 'T/F question instruction is not translated'],
    ['truthy_label', Severity.Medium, 'True label is not translated'],
    ['falsey_label', Severity.Medium, 'False label is not translated'],
    ['correct_feedback', Severity.Medium, 'Correct feedback is not translated'],
    ['incorrect_feedback', Severity.Medium, 'Incorrect feedback is not translated']
  ],
  atom_fill_in_the_blanks_question: [
    ['title', Severity.High, 'Question atom title is not translated'],
    ['prompt', Severity.High, 'Fill-in-the-blanks prompt is not translated'],
    ['words_and_blanks', Severity.High, 'Fill-in-the-blanks sentence is not translated'],
    ['instruction', Severity.Medium, 'Fill-in-the-blanks instruction is not translated'],
    ['correct_feedback', Severity.Medium, 'Correct feedback is not translated'],
    ['incorrect_feedback', Severity.Medium, 'Incorrect feedback is not translated']
  ],
  atom_reorder_words: [
    ['title', Severity.High, 'Question atom title is not translated'],
    ['prompt', Severity.High, 'Reorder-words prompt is not translated'],
    ['solution', Severity.High, 'Reorder-words solution is not translated'],
    ['instruction', Severity.Medium, 'Reorder-words instruction is not translated'],
    ['correct_feedback', Severity.Medium, 'Correct feedback is not translated'],
    ['incorrect_feedback', Severity.Medium, 'Incorrect feedback is not translated']
  ],
  atom_reorder_list: [
    ['title', Severity.High, 'Question atom title is not translated'],
    ['prompt', Severity.High, 'Reorder-list prompt is not translated'],
    ['instruction', Severity.Medium, 'Reorder-list instruction is not translated'],
    ['correct_feedback', Severity.Medium, 'Correct feedback is not translated'],
    ['incorrect_feedback', Severity.Medium, 'Incorrect feedback is not translated']
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

function normalizeAtomType(atomType) {
  if (!atomType) return 'unknown';

  return atomType;
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

// ─── Summary builder ──────────────────────────────────────────────────────────

function buildSummary(issues, courseId, locale) {
  const counts = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
    Warning: 0
  };

  issues.forEach((issue) => {
    counts[issue.severity_level] = (counts[issue.severity_level] ?? 0) + 1;
  });

  const total = issues.length;

  const summary = {
    course_id: courseId,
    locale,
    total_issues: total,
    by_severity: counts,
    has_critical: counts.Critical > 0,
    passed: total === 0,
    structural_issues: issues.filter((i) => i.severity_level === 'Critical'),
    translation_issues: issues.filter((i) => ['High', 'Medium'].includes(i.severity_level)),
    minor_issues: issues.filter((i) => ['Low', 'Warning'].includes(i.severity_level))
  };

  return { results: issues, summary };
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
  function checkField(engObj, locObj, fieldPath, severity, description, objectPath) {
    if (!engObj) return;

    const engVal = getNestedValue(engObj, fieldPath);
    const locVal = getNestedValue(locObj, fieldPath);

    // if (isMissing(engVal)) return;

    if (isMissing(locVal)) {
      push(severity, objectPath, fieldPath, `${description} — value is missing`, {
        issueType: IssueType.Empty,
        englishValue: toDisplayValue(engVal),
        localizedValue: toDisplayValue(locVal)
      });
    } else if (isSameAsEng(engVal, locVal)) {
      push(
        Severity.Warning,
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
        ['intro', 'image_alt_text', 'image_caption', 'outro'].forEach((f) =>
          checkField(
            engBlock,
            locBlock,
            f,
            f === 'image_alt_text' ? Severity.High : Severity.Medium,
            `Image field "${f}" not translated`,
            `${path}.image`
          )
        );
      }
      if (type === 'video') {
        ['intro', 'video_caption_text', 'video_script', 'outro'].forEach((f) =>
          checkField(
            engBlock,
            locBlock,
            f,
            f === 'video_caption_text' ? Severity.High : Severity.Medium,
            `Video field "${f}" not translated`,
            `${path}.video`
          )
        );
      }
      if (type === 'audio') {
        ['intro', 'audio_title', 'description', 'audio_transcript_text', 'outro'].forEach((f) =>
          checkField(
            engBlock,
            locBlock,
            f,
            ['audio_title', 'audio_transcript_text'].includes(f) ? Severity.High : Severity.Medium,
            `Audio field "${f}" not translated`,
            `${path}.audio`
          )
        );
      }
      if (type === 'document') {
        ['intro', 'display_title', 'download_link_label', 'outro'].forEach((f) =>
          checkField(
            engBlock,
            locBlock,
            f,
            f === 'display_title' ? Severity.High : Severity.Medium,
            `Document field "${f}" not translated`,
            `${path}.document`
          )
        );
      }
      if (type === 'embedded_media') {
        ['intro', 'outro'].forEach((f) =>
          checkField(
            engBlock,
            locBlock,
            f,
            Severity.Medium,
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

  // ─── validateAtom ────────────────────────────────────────────────────────────
  function validateAtom(engAtom, locAtom, path) {
    if (!engAtom) return;

    const rawEngAtomType = engAtom._content_type_uid;
    const atomType = normalizeAtomType(rawEngAtomType);

    if (!locAtom) {
      push(Severity.Critical, path, 'atom', `Locale atom is missing (type: ${rawEngAtomType})`);
      return;
    }

    const rawLocAtomType = locAtom._content_type_uid;
    const locAtomType = normalizeAtomType(rawLocAtomType);
    if (atomType !== locAtomType) {
      push(
        Severity.Critical,
        path,
        '_content_type_uid',
        `Atom type mismatch — eng: ${rawEngAtomType}, locale: ${rawLocAtomType}`
      );
      return;
    }

    const rules = ATOM_FIELD_RULES[atomType] ?? [];
    rules.forEach(([fieldPath, severity, description]) => {
      checkField(engAtom, locAtom, fieldPath, severity, description, path);
    });

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

    if (atomType === 'atom_multi_column') {
      const engCols = engAtom.columns ?? [];
      const locCols = locAtom.columns ?? [];
      if (checkCount(engCols, locCols, 'columns', path)) {
        engCols.forEach((ec, i) =>
          validateAllSimpleFields(ec, locCols[i], `${path}.columns[${i}]`)
        );
      }
    }

    if (atomType === 'atom_chat') {
      const engBubbles = engAtom.chat ?? [];
      const locBubbles = locAtom.chat ?? [];
      if (checkCount(engBubbles, locBubbles, 'chat bubbles', path)) {
        engBubbles.forEach((eb, i) => {
          const bubblePath = `${path}.chat[${i}]`;
          checkField(
            eb?.bubble,
            locBubbles[i]?.bubble,
            'body',
            Severity.High,
            'Chat bubble body not translated',
            bubblePath
          );
          checkField(
            eb?.bubble,
            locBubbles[i]?.bubble,
            'speaker_name',
            Severity.Low,
            'Chat bubble speaker name not translated',
            bubblePath
          );
        });
      }
    }

    if (atomType === 'atom_card_stack') {
      const engCards = engAtom.cards ?? [];
      const locCards = locAtom.cards ?? [];
      if (checkCount(engCards, locCards, 'cards', path)) {
        engCards.forEach((ec, i) => {
          checkField(
            ec,
            locCards[i],
            'body',
            Severity.High,
            'Card body not translated',
            `${path}.cards[${i}]`
          );
          checkField(
            ec,
            locCards[i],
            'image_caption',
            Severity.Low,
            'Card image caption not translated',
            `${path}.cards[${i}]`
          );
        });
      }
    }

    if (atomType === 'atom_flipcards' || atomType === 'atom_flip_cards') {
      const engCards = engAtom.cards ?? [];
      const locCards = locAtom.cards ?? [];
      if (checkCount(engCards, locCards, 'flip cards', path)) {
        engCards.forEach((ec, i) => {
          checkField(
            ec,
            locCards[i],
            'front_body',
            Severity.High,
            'Flip card front body not translated',
            `${path}.cards[${i}]`
          );
          checkField(
            ec,
            locCards[i],
            'back_body',
            Severity.High,
            'Flip card back body not translated',
            `${path}.cards[${i}]`
          );
        });
      }
    }

    if (atomType === 'atom_mc_question') {
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
            Severity.Medium,
            'Answer choice feedback not translated',
            choicePath
          );
        });
      }
    }

    if (atomType === 'atom_reorder_list') {
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

    if (atomType === 'atom_fill_in_the_blanks_question') {
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
  }

  // ─── validatePage ────────────────────────────────────────────────────────────
  function validatePage(engPage, locPage, path) {
    if (!engPage) return;
    if (!locPage) {
      push(Severity.Critical, path, 'page', 'Locale page is missing');
      return;
    }

    checkField(engPage, locPage, 'title', Severity.High, 'Page title is not translated', path);

    const engAtoms = engPage.atoms ?? [];
    const locAtoms = locPage.atoms ?? [];

    if (!checkCount(engAtoms, locAtoms, 'atoms', path)) return;

    engAtoms.forEach((engAtom, i) => {
      validateAtom(
        engAtom.atom_reference?.[0],
        locAtoms[i].atom_reference?.[0],
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
      'title',
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

    checkField(engQuiz, locQuiz, 'title', Severity.High, 'Quiz title is not translated', path);

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
      'title',
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

    checkField(engExam, locExam, 'title', Severity.High, 'Exam title is not translated', path);

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

    checkField(engTopic, locTopic, 'title', Severity.High, 'Topic title is not translated', path);

    const engCollections = engTopic.collection_types ?? [];
    const locCollections = locTopic.collection_types ?? [];

    if (!checkCount(engCollections, locCollections, 'collection_types', path)) return;

    engCollections.forEach((engColl, i) => {
      const locColl = locCollections[i];
      const collPath = `${path}.collection_types[${i}]`;

      // KEY FIX: explicit missing-child check before descending, not just passing undefined
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
      'title',
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

      // KEY FIX: explicit missing-child check before descending
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

    // KEY FIX: explicit missing-child checks at every branch
    // Previously we passed locSection.chapter directly which could be undefined,
    // causing crashes deep inside the child validator before the null guard fired.
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
    Severity.Medium,
    'Course description is not translated',
    'course'
  );

  const engSections = engCourse.sections ?? [];
  const locSections = localeCourse.sections ?? [];

  if (!checkCount(engSections, locSections, 'sections', 'course')) {
    return buildSummary(issues, courseId, locale);
  }

  engSections.forEach((engSection, i) => {
    validateSection(engSection, locSections[i], `course.sections[${i}]`);
  });

  return buildSummary(issues, courseId, locale);
}
