export interface TeacherSchedulePageProps {
  initialLessonModalOpen?: boolean;
}

export interface TeacherWeekDay {
  id: number;
  label: string;
  shortLabel?: string;
  date?: string;
}

export interface TeacherLessonItem {
  id: string;
  className: "9A" | "8B" | "7C" | "6A";
  subject: string;
  day: number;
  startTime: string;
  endTime: string;
  variant: "primary" | "soft";
  clickable: boolean;
}

export interface TeacherMonthDay {
  id: string;
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  hasLesson: boolean;
  lessonTone?: "blue" | "orange" | "red" | "green";
}

export interface TodayClassItem {
  id: string;
  className: string;
  subject: string;
  time: string;
  tone: "orange" | "purple" | "green";
}

export type SelectedWeekDay = "T4" | "T6" | "CN" | "T2" | "T3" | "T5" | "T7";

export interface CreateScheduleFormState {
  subject: string;
  className: string;
  startDate: string;
  endDate: string;
  learningMode: string;
  platform: string;
  repeat: string;
  selectedDays: SelectedWeekDay[];
  startTime: string;
  endTime: string;
  note: string;
}

export interface WeeklySlotItem {
  id: string;
  day: SelectedWeekDay;
  dayLabel: string;
  startTime: string;
  endTime: string;
  title: string;
  type: "existing" | "selected" | "conflict";
}

export interface ScheduleConflict {
  id: string;
  className: string;
  dayLabel: string;
  time: string;
  message: string;
  description: string;
}

export interface EditScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export interface EditableLessonItem {
  id: string;
  dayId: string;
  dayLabel: string;
  dateLabel: string;
  subject: string;
  className: string;
  startTime: string;
  endTime: string;
  learningType: "online" | "google-meet";
  platform: string;
  isSelected?: boolean;
}

export interface EditScheduleFormState {
  date: string;
  startTime: string;
  endTime: string;
  weekDay: string;
  learningType: string;
  platform: string;
  repeatType: string;
  reason: string;
  notifyStudents: boolean;
}
