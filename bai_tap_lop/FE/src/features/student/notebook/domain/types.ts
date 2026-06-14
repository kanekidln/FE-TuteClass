export type ClassKey = "math" | "english" | "physics" | "literature";
export type SectionKey = "overview" | "schedule" | "assignments" | "resources" | "discussion";

export type ClassTabItem = {
  key: ClassKey;
  name: string;
  teacher: string;
  themeClass: string;
};

export type SectionMarkerItem = {
  key: SectionKey;
  label: string;
};

export type PageTransition = {
  fromIndex: number;
  toIndex: number;
  forward: boolean;
};

export type CalendarState = "" | "active" | "muted" | "sun" | "sun-muted";

export type MiniCalendarDate = {
  value: string;
  state: CalendarState;
};

export type ScheduleEvent = {
  left: string;
  top: number;
  className: string;
  subject: string;
  teacher: string;
  time: string;
};

export type UpcomingSession = {
  id: string;
  date: string;
  dateClass: string;
  subject: string;
  teacher: string;
  time: string;
};

export type TodayAgendaItem = {
  id: string;
  detail: string;
  subject: string;
  time: string;
};

export type ReminderItem = {
  id: string;
  text: string;
};

export type LessonAttachment = {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "doc";
};

export type LessonDiscussionItem = {
  id: string;
  author: string;
  likes: number;
  message: string;
  role: "student" | "teacher";
  time: string;
};

export type DiscussionMessageRole = "teacher" | "student" | "monitor";

export type DiscussionMessage = {
  id: string;
  author: string;
  likes: number;
  message: string;
  role: DiscussionMessageRole;
  time: string;
};

export type DiscussionPinnedItem = {
  id: string;
  text: string;
};

export type DiscussionSharedFile = {
  id: string;
  name: string;
  type: "pdf" | "doc" | "xls";
  meta: string;
};

export type ResourceFileType = "pdf" | "doc" | "video" | "link" | "image";

export type ResourceFilter = {
  id: "all" | ResourceFileType;
  label: string;
  type?: ResourceFileType;
};

export type ResourceItem = {
  id: string;
  action: "download" | "open" | "view";
  date: string;
  lesson: string;
  name: string;
  owner: string;
  topic: string;
  type: ResourceFileType;
};

export type ResourceNoteCard = {
  id: string;
  items?: string[];
  stats?: Array<{
    id: string;
    label: string;
    type: ResourceFileType | "total";
    value: string;
  }>;
  text?: string;
  title: string;
  tone: "purple" | "yellow" | "green";
};

export type AssignmentStatus = "not-started" | "in-progress" | "submitted" | "graded";

export type AssignmentType = "quiz" | "essay" | "mixed";

export type AssignmentQuestion = {
  id: string;
  options: Array<{
    id: string;
    label: string;
    text: string;
  }>;
  prompt: string;
};

export type AssignmentItem = {
  id: string;
  attemptsLabel: string;
  deadline: string;
  duration: string;
  icon: string;
  lesson: string;
  questionsCount: number;
  score?: string;
  status: AssignmentStatus;
  subject: string;
  title: string;
  topic: string;
  type: AssignmentType;
};

export type AssignmentNoteCard = {
  id: string;
  items?: string[];
  stats?: Array<{
    color: "green" | "blue" | "red";
    id: string;
    label: string;
    value: string;
  }>;
  text?: string;
  title: string;
  tone: "purple" | "yellow" | "green";
};

export type AssignmentPrompt = {
  body: string[];
  file?: {
    name: string;
    size: string;
    type: "pdf" | "doc";
  };
  source: "uploaded-file" | "typed";
  title: string;
};

export type AssignmentsSpreadData = {
  accent: string;
  assignmentPrompt: AssignmentPrompt;
  footerLeft: string;
  footerRight: string;
  heading: string;
  items: AssignmentItem[];
  notes: AssignmentNoteCard[];
  questions: AssignmentQuestion[];
  subtitle: string;
  submissionFiles: Array<{
    id: string;
    name: string;
    size: string;
    type: "pdf" | "doc";
  }>;
};

export type LessonDetailData = {
  agenda: string[];
  assignmentSummary: string;
  attachments: LessonAttachment[];
  dateLabel: string;
  discussion: LessonDiscussionItem[];
  lessonNotes: string[];
  location: string;
  teacher: string;
  time: string;
  title: string;
  topic: string;
};

export type ScheduleSpreadData = {
  heading: string;
  accent: string;
  subtitle: string;
  weekLabel: string;
  monthLabel: string;
  days: Array<[string, string]>;
  events: ScheduleEvent[];
  sessions: UpcomingSession[];
  todayAgenda: TodayAgendaItem[];
  reminders: ReminderItem[];
  footerLeft: string;
  footerRight: string;
  currentTimeTop: number;
  calendarMonthLabel: string;
  calendarDates: MiniCalendarDate[];
};

export type SpreadNoteCard = {
  title: string;
  items?: string[];
  text?: string;
  tone: "orange" | "indigo" | "blue" | "green";
};

export type InsightCard = {
  eyebrow: string;
  title: string;
  body: string;
  tone: "orange" | "blue" | "green" | "purple";
};

export type StandardSpreadData = {
  heading: string;
  accent: string;
  subtitle: string;
  panelTitle: string;
  panelSubtitle: string;
  cards: InsightCard[];
  checklist: string[];
  noteCards: SpreadNoteCard[];
  footerLeft: string;
  footerRight: string;
};

export type DiscussionSpreadData = {
  heading: string;
  accent: string;
  subtitle: string;
  classFeed: DiscussionMessage[];
  classTabLabel: string;
  footerLeft: string;
  footerRight: string;
  pinnedItems: DiscussionPinnedItem[];
  pinnedTitle: string;
  sharedFiles: DiscussionSharedFile[];
  teacherFeed: DiscussionMessage[];
  teacherTabLabel: string;
};

export type ResourcesSpreadData = {
  accent: string;
  filters: ResourceFilter[];
  footerLeft: string;
  footerRight: string;
  heading: string;
  items: ResourceItem[];
  notes: ResourceNoteCard[];
  subtitle: string;
};

export type NotebookPage =
  | {
      key: string;
      classKey: ClassKey;
      className: string;
      teacher: string;
      sectionKey: "schedule";
      navLabel: string;
      spreadType: "schedule";
      data: ScheduleSpreadData;
    }
  | {
      key: string;
      classKey: ClassKey;
      className: string;
      teacher: string;
      sectionKey: "discussion";
      navLabel: string;
      spreadType: "discussion";
      data: DiscussionSpreadData;
    }
  | {
      key: string;
      classKey: ClassKey;
      className: string;
      teacher: string;
      sectionKey: "assignments";
      navLabel: string;
      spreadType: "assignments";
      data: AssignmentsSpreadData;
    }
  | {
      key: string;
      classKey: ClassKey;
      className: string;
      teacher: string;
      sectionKey: "resources";
      navLabel: string;
      spreadType: "resources";
      data: ResourcesSpreadData;
    }
  | {
      key: string;
      classKey: ClassKey;
      className: string;
      teacher: string;
      sectionKey: Exclude<SectionKey, "schedule" | "discussion" | "resources" | "assignments">;
      navLabel: string;
      spreadType: "standard";
      data: StandardSpreadData;
    };

export type NotebookLocation = {
  classKey: ClassKey;
  sectionKey: SectionKey;
};

export type PendingNavigation = {
  index: number;
  animate: boolean;
};

export type ClassProfile = {
  className: string;
  discussionClassFeed: DiscussionMessage[];
  discussionPinnedItems: DiscussionPinnedItem[];
  discussionSharedFiles: DiscussionSharedFile[];
  discussionTeacherFeed: DiscussionMessage[];
  teacher: string;
  scheduleEvents: ScheduleEvent[];
  upcoming: UpcomingSession[];
  todayAgenda: TodayAgendaItem[];
  reminders: ReminderItem[];
};
