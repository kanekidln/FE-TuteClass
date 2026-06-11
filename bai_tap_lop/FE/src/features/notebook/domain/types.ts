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

export type ScheduleSpreadData = {
  heading: string;
  accent: string;
  subtitle: string;
  weekLabel: string;
  monthLabel: string;
  days: Array<[string, string]>;
  events: ScheduleEvent[];
  sessions: UpcomingSession[];
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
      sectionKey: Exclude<SectionKey, "schedule">;
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
  teacher: string;
  scheduleEvents: ScheduleEvent[];
  upcoming: UpcomingSession[];
};
