import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Edit3,
  Leaf,
  Paperclip,
  PenLine,
  Plus,
} from "lucide-react";
import CreateScheduleModal from "../CreateScheduleModal";
import EditScheduleModal from "../EditScheduleModal";
import { LessonDetailModal } from "../LessonDetailModal";
import {
  SCHEDULE_HOUR_HEIGHT,
  SCHEDULE_START_TIME,
  teacherLessons,
  teacherScheduleTimeLabels,
  teacherWeekDays,
  todayTeacherClasses,
} from "../../constants/teacherSchedule.constants";
import type { TeacherMonthDay, TeacherSchedulePageProps } from "../../types/teacherSchedule.types";
import "./TeacherSchedulePage.css";

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getLessonTop(startTime: string): number {
  return ((timeToMinutes(startTime) - timeToMinutes(SCHEDULE_START_TIME)) / 60) * SCHEDULE_HOUR_HEIGHT;
}

function getLessonHeight(startTime: string, endTime: string): number {
  return ((timeToMinutes(endTime) - timeToMinutes(startTime)) / 60) * SCHEDULE_HOUR_HEIGHT;
}

function getMonthLabel(date: Date): string {
  return `Tháng ${date.getMonth() + 1}/${date.getFullYear()}`;
}

function isSameDate(dateA: Date, dateB: Date): boolean {
  return dateA.getFullYear() === dateB.getFullYear()
    && dateA.getMonth() === dateB.getMonth()
    && dateA.getDate() === dateB.getDate();
}

function isSameMonth(dateA: Date, dateB: Date): boolean {
  return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth();
}

function getCalendarDays(currentMonth: Date): TeacherMonthDay[] {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const mondayBasedIndex = (firstDayOfMonth.getDay() + 6) % 7;
  const calendarStart = new Date(year, month, 1 - mondayBasedIndex);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = mondayBasedIndex + daysInMonth > 35 ? 42 : 35;
  const tones: TeacherMonthDay["lessonTone"][] = ["blue", "orange", "red", "green"];

  return Array.from({ length: totalCells }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);

    return {
      id: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date,
      dayNumber: date.getDate(),
      isCurrentMonth: isSameMonth(date, currentMonth),
      hasLesson: true,
      lessonTone: tones[index % tones.length],
    };
  });
}

function TeacherSchedulePage({ initialLessonModalOpen = false }: TeacherSchedulePageProps) {
  const [isLessonModalOpen, setIsLessonModalOpen] = useState<boolean>(initialLessonModalOpen);
  const [isCreateScheduleOpen, setIsCreateScheduleOpen] = useState<boolean>(false);
  const [isEditScheduleOpen, setIsEditScheduleOpen] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2024, 4, 1));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 4, 16));

  const monthDays = useMemo(() => getCalendarDays(currentMonth), [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth((date) => {
      const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      setSelectedDate(new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1));
      return previousMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((date) => {
      const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      setSelectedDate(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1));
      return nextMonth;
    });
  };

  const hasOpenModal = isLessonModalOpen || isCreateScheduleOpen || isEditScheduleOpen;

  return (
    <motion.main
      className={clsx("teaching-schedule-page", hasOpenModal && "modal-open")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32 }}
    >
      <Decorations />

      <header className="schedule-header">
        <motion.section className="schedule-title-note" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
          <span className="note-punch punch-1" />
          <span className="note-punch punch-2" />
          <span className="note-punch punch-3" />
          <span className="schedule-sticker title-pin" />
          <span className="schedule-sticker title-tape" />
          <Leaf className="schedule-sticker leaf-doodle" size={58} strokeWidth={1.7} />
          <p>Lớp Web Foundation K12</p>
          <h1>Lịch dạy</h1>
          <span>Quản lý lịch dạy theo tuần và theo tháng</span>
        </motion.section>

        <div className="schedule-header-actions">
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="schedule-primary-button"
            type="button"
            onClick={() => setIsCreateScheduleOpen(true)}
          >
            <Plus size={24} />
            Tạo lịch học
          </motion.button>
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="schedule-outline-button"
            type="button"
            onClick={() => setIsEditScheduleOpen(true)}
          >
            <Edit3 size={22} />
            Sửa lịch học
          </motion.button>
        </div>
      </header>

      <section className="schedule-layout">
        <motion.article className="schedule-card weekly-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <span className="schedule-sticker weekly-pin" />
          <span className="schedule-sticker weekly-tape" />
          <Paperclip className="schedule-sticker weekly-paperclip" size={54} strokeWidth={1.7} />

          <div className="schedule-card-title">
            <CalendarDays size={29} />
            <h2>Lịch dạy theo tuần – Tất cả các lớp</h2>
          </div>

          <div className="weekly-table-scroll">
            <div className="weekly-table">
              <div className="weekly-corner" />
              {teacherWeekDays.map((day) => (
                <div className="weekly-day-heading" key={day.id}>
                  <strong>{day.label}</strong>
                  <span>{day.date}</span>
                </div>
              ))}

              {teacherScheduleTimeLabels.map((time) => (
                <div className={clsx("weekly-time", `time-${time.replace(":", "")}`)} key={time}>
                  {time}
                </div>
              ))}

              <div className="weekly-grid-lines" aria-hidden="true" />
              <div className="current-time-line" aria-hidden="true">
                <span>07:50</span>
                <i />
              </div>
              <div className="lunch-break">
                <BookOpen size={21} />
                Nghỉ trưa 12:00 – 13:00
              </div>

              <div className="weekly-lessons-layer">
                {teacherWeekDays.map((day) => (
                  <div className="weekly-day-column" key={day.id}>
                    {teacherLessons
                      .filter((lesson) => lesson.day === day.id)
                      .map((lesson) => (
                        <motion.button
                          key={lesson.id}
                          type="button"
                          className={clsx("lesson-block", lesson.variant, lesson.clickable && "is-clickable")}
                          style={{
                            "--lesson-top": `${getLessonTop(lesson.startTime)}px`,
                            "--lesson-height": `${getLessonHeight(lesson.startTime, lesson.endTime)}px`,
                          } as CSSProperties}
                          onClick={lesson.className === "9A" ? () => setIsLessonModalOpen(true) : undefined}
                          whileHover={{ scale: lesson.clickable ? 1.025 : 1.015, y: -2 }}
                          whileTap={{ scale: lesson.clickable ? 0.98 : 1 }}
                        >
                          <strong>{lesson.className}</strong>
                          <span>{lesson.subject}</span>
                          <small>{lesson.startTime} – {lesson.endTime}</small>
                        </motion.button>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.article>

        <aside className="schedule-side">
          <motion.article className="schedule-card month-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
            <span className="schedule-sticker month-pin" />
            <span className="schedule-sticker month-tape" />
            <Paperclip className="schedule-sticker paperclip-green" size={58} strokeWidth={1.7} />

            <div className="schedule-card-title small">
              <CalendarDays size={25} />
              <h2>Lịch theo tháng</h2>
            </div>

            <div className="month-switcher">
              <button type="button" aria-label="Tháng trước" onClick={goToPreviousMonth}>
                <ChevronLeft size={23} />
              </button>
              <strong>{getMonthLabel(currentMonth)}</strong>
              <button type="button" aria-label="Tháng sau" onClick={goToNextMonth}>
                <ChevronRight size={23} />
              </button>
            </div>

            <div className="month-weekdays">
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="month-grid">
              {monthDays.map((day) => (
                <button
                  className={clsx("month-day", !day.isCurrentMonth && "outside", isSameDate(day.date, selectedDate) && "active")}
                  type="button"
                  key={day.id}
                  onClick={() => setSelectedDate(day.date)}
                >
                  <span>{day.dayNumber}</span>
                  {day.hasLesson && <i />}
                </button>
              ))}
            </div>
          </motion.article>

          <motion.article className="schedule-card today-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="schedule-sticker today-pin" />
            <span className="schedule-sticker today-tape" />

            <div className="schedule-card-title small">
              <Clock3 size={25} />
              <h2>Lớp có lịch hôm nay</h2>
            </div>

            <div className="today-list">
              {todayTeacherClasses.map((item) => (
                <div className={clsx("today-row", item.tone)} key={item.id}>
                  <div>
                    <strong>{item.className}</strong>
                    <span>{item.subject}</span>
                  </div>
                  <time>{item.time}</time>
                </div>
              ))}
            </div>
          </motion.article>
        </aside>
      </section>

      <LessonDetailModal isOpen={isLessonModalOpen} onClose={() => setIsLessonModalOpen(false)} />
      <CreateScheduleModal
        isOpen={isCreateScheduleOpen}
        onClose={() => setIsCreateScheduleOpen(false)}
        onCreate={() => console.log("Create teacher schedule")}
      />
      <EditScheduleModal
        isOpen={isEditScheduleOpen}
        onClose={() => setIsEditScheduleOpen(false)}
        onSave={() => {
          console.log("Save edited schedule");
          setIsEditScheduleOpen(false);
        }}
      />
    </motion.main>
  );
}

function Decorations() {
  return (
    <div className="schedule-decorations" aria-hidden="true">
      <span className="schedule-sticker binder-clip"><i /></span>
      <span className="schedule-sticker book-note">
        <Paperclip size={36} />
        <BookOpen size={52} />
      </span>
      <span className="schedule-sticker bottom-pen"><PenLine size={138} /></span>
      <span className="schedule-sticker notebook-corner">
        <i />
        <b />
      </span>
      <span className="schedule-sticker pastel-paper pastel-paper-blue" />
      <span className="schedule-sticker pastel-paper pastel-paper-yellow" />
    </div>
  );
}

export default TeacherSchedulePage;
