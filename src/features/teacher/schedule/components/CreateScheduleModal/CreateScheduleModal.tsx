import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Folder,
  Heart,
  Image,
  Link,
  MessageCircle,
  Monitor,
  Paperclip,
  PenLine,
  Plus,
  RefreshCcw,
  Star,
  Users,
  X,
} from "lucide-react";
import {
  classOptions,
  createScheduleTimeLabels,
  createScheduleWeekDays,
  defaultScheduleConflict,
  existingWeeklySlots,
  initialCreateScheduleForm,
  subjectOptions,
} from "../../constants/teacherSchedule.constants";
import type { CreateScheduleFormState, SelectedWeekDay, TeacherMonthDay, WeeklySlotItem } from "../../types/teacherSchedule.types";
import "./CreateScheduleModal.css";

export interface CreateScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: () => void;
}

const selectedDayLabels: Record<SelectedWeekDay, string> = {
  T2: "Thứ 2",
  T3: "Thứ 3",
  T4: "Thứ 4",
  T5: "Thứ 5",
  T6: "Thứ 6",
  T7: "Thứ 7",
  CN: "Chủ nhật",
};

const WEEK_START_TIME = "17:00";
const WEEK_HOUR_HEIGHT = 60;

interface WeekPlusSlot {
  id: string;
  day: SelectedWeekDay;
  startTime: string;
}

const weekPlusSlots: WeekPlusSlot[] = createScheduleWeekDays.flatMap((day) => [
  { id: `${day.key}-plus-1800`, day: day.key, startTime: "18:00" },
  { id: `${day.key}-plus-1900`, day: day.key, startTime: "19:00" },
  { id: `${day.key}-plus-2030`, day: day.key, startTime: "20:30" },
]);

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getSlotTop(startTime: string): number {
  return ((timeToMinutes(startTime) - timeToMinutes(WEEK_START_TIME)) / 60) * WEEK_HOUR_HEIGHT;
}

function getSlotHeight(startTime: string, endTime: string): number {
  return ((timeToMinutes(endTime) - timeToMinutes(startTime)) / 60) * WEEK_HOUR_HEIGHT;
}

function isSlotInTimeline(slot: WeeklySlotItem): boolean {
  return timeToMinutes(slot.startTime) >= timeToMinutes(WEEK_START_TIME);
}

function slotsOverlap(startA: string, endA: string, startB: string, endB: string): boolean {
  return timeToMinutes(startA) < timeToMinutes(endB) && timeToMinutes(endA) > timeToMinutes(startB);
}

function isSameDate(dateA: Date, dateB: Date): boolean {
  return dateA.getFullYear() === dateB.getFullYear()
    && dateA.getMonth() === dateB.getMonth()
    && dateA.getDate() === dateB.getDate();
}

function isSameMonth(dateA: Date, dateB: Date): boolean {
  return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth();
}

function getCreateCalendarDays(currentMonth: Date): TeacherMonthDay[] {
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const mondayIndex = (firstDayOfMonth.getDay() + 6) % 7;
  const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1 - mondayIndex);
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const total = mondayIndex + daysInMonth > 35 ? 42 : 35;
  const tones: TeacherMonthDay["lessonTone"][] = ["green", "blue", "orange", "blue"];

  return Array.from({ length: total }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
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

function CreateScheduleModal({ isOpen, onClose, onCreate }: CreateScheduleModalProps) {
  const [form, setForm] = useState<CreateScheduleFormState>(initialCreateScheduleForm);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2024, 4, 1));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 4, 16));
  const calendarDays = useMemo(() => getCreateCalendarDays(currentMonth), [currentMonth]);
  const selectedSlots = form.selectedDays.map<WeeklySlotItem>((day) => ({
    id: `selected-${day}`,
    day,
    dayLabel: selectedDayLabels[day],
    startTime: form.startTime,
    endTime: form.endTime,
    title: form.className,
    type: day === "T4" ? "conflict" : "selected",
  }));
  const hasConflict = form.selectedDays.includes("T4");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const updateField = <K extends keyof CreateScheduleFormState>(key: K, value: CreateScheduleFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleDay = (day: SelectedWeekDay) => {
    setForm((current) => ({
      ...current,
      selectedDays: current.selectedDays.includes(day)
        ? current.selectedDays.filter((item) => item !== day)
        : [...current.selectedDays, day],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Create schedule", form);
    onCreate?.();
    onClose();
  };

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="create-schedule-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.form
            className="create-schedule-modal"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <header className="create-schedule-modal__header">
              <h2>Tạo lịch cho lớp học mới</h2>
              <button type="button" onClick={onClose} aria-label="Đóng">
                <X size={38} />
              </button>
            </header>

            <main className="create-schedule-modal__content">
              <section className="create-schedule-modal__layout">
              <section className="create-schedule-form schedule-dashed-card">
                <SectionTitle icon={<PenLine size={29} />} title="1. Thông tin lịch học" />
                <FormSelect icon={<BookOpen />} label="Môn học" required value={form.subject} options={subjectOptions} onChange={(value) => updateField("subject", value)} />
                <FormSelect icon={<Users />} label="Lớp" required value={form.className} options={classOptions} onChange={(value) => updateField("className", value)} />
                <FormInput icon={<CalendarDays />} label="Ngày bắt đầu" required value={form.startDate} onChange={(value) => updateField("startDate", value)} suffix={<CalendarDays size={20} />} />
                <FormInput icon={<CalendarDays />} label="Ngày kết thúc" required value={form.endDate} onChange={(value) => updateField("endDate", value)} suffix={<CalendarDays size={20} />} />
                <FormSelect icon={<Monitor />} label="Hình thức học" required value={form.learningMode} options={["Học online", "Học tại lớp"]} onChange={(value) => updateField("learningMode", value)} />
                <FormInput icon={<Link />} label="Nền tảng / Phòng học" required value={form.platform} onChange={(value) => updateField("platform", value)} compact />
                <FormSelect icon={<RefreshCcw />} label="Lặp lại" required value={form.repeat} options={["Hàng tuần", "Một lần", "Hàng tháng"]} onChange={(value) => updateField("repeat", value)} />
                <div className="create-form-row">
                  <div className="create-form-label"><BookOpen size={24} /><span>Ngày học trong tuần <b>*</b></span></div>
                  <div className="create-day-tags">
                    {form.selectedDays.map((day) => (
                      <button type="button" key={day} onClick={() => toggleDay(day)}>
                        {day} <X size={13} />
                      </button>
                    ))}
                  </div>
                </div>
                <FormInput icon={<Clock3 />} label="Giờ bắt đầu" required value={form.startTime} onChange={(value) => updateField("startTime", value)} suffix={<Clock3 size={20} />} />
                <FormInput icon={<Clock3 />} label="Giờ kết thúc" required value={form.endTime} onChange={(value) => updateField("endTime", value)} suffix={<Clock3 size={20} />} />
                <div className="create-form-row create-note-row">
                  <div className="create-form-label"><MessageCircle size={24} /><span>Ghi chú ngắn cho lớp (optional)</span></div>
                  <label className="create-textarea">
                    <textarea value={form.note} maxLength={120} placeholder="Ghi chú (không bắt buộc)" onChange={(event) => updateField("note", event.target.value)} />
                    <span>{form.note.length}/120</span>
                  </label>
                </div>
                <div className="create-attachments">
                  <div className="create-attachment-title"><Paperclip size={25} />Đính kèm (tùy chọn)</div>
                  <div className="create-upload-grid">
                    <UploadBox icon={<FileText />} title="Tập tin" description="PDF, DOCX, PPTX" tone="red" />
                    <UploadBox icon={<Image />} title="Ảnh" description="PNG, JPG, JPEG" tone="blue" />
                    <UploadBox icon={<Folder />} title="Thư mục" description="Thư mục tài liệu" tone="orange" />
                  </div>
                </div>
              </section>

              <section className="create-schedule-right">
                <section className="create-schedule-week-picker schedule-dashed-card">
                  <SectionTitle icon={<CalendarDays size={29} />} title="2. Chọn lịch trong tuần" />
                  <WeekPicker selectedSlots={selectedSlots} onToggleDay={toggleDay} />
                  <div className="create-week-legend">
                    <span><i className="legend-existing" />Đã có lịch</span>
                    <span><i className="legend-selected" />Khung đã chọn</span>
                    <span><i className="legend-conflict" />Bị trùng</span>
                  </div>
                  <div className="create-selected-line">
                    <strong>Lịch đã chọn:</strong>
                    {form.selectedDays.map((day) => (
                      <button type="button" key={day} onClick={() => toggleDay(day)}>{selectedDayLabels[day]} <X size={13} /></button>
                    ))}
                  </div>
                  {hasConflict && (
                    <div className="create-conflict-alert">
                      <AlertTriangle size={34} />
                      <div>
                        <strong>{defaultScheduleConflict.message}</strong>
                        <p>{defaultScheduleConflict.description}</p>
                      </div>
                    </div>
                  )}
                </section>

                <section className="create-schedule-bottom">
                  <section className="create-schedule-month-preview schedule-dashed-card">
                    <SectionTitle icon={<CalendarDays size={27} />} title="3. Xem lịch trong tháng" />
                    <div className="create-month-head">
                      <strong>Tháng {currentMonth.getMonth() + 1} / {currentMonth.getFullYear()}</strong>
                      <div>
                        <button type="button" onClick={() => setCurrentMonth((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))}><ChevronLeft size={20} /></button>
                        <button type="button" onClick={() => setCurrentMonth((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))}><ChevronRight size={20} /></button>
                      </div>
                    </div>
                    <div className="create-month-weekdays">{["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => <span key={day}>{day}</span>)}</div>
                    <div className="create-month-grid">
                      {calendarDays.map((day) => (
                        <button
                          type="button"
                          key={day.id}
                          className={clsx("create-month-day", !day.isCurrentMonth && "muted", isSameDate(day.date, selectedDate) && "selected")}
                          onClick={() => setSelectedDate(day.date)}
                        >
                          <span>{day.dayNumber}</span>
                          <i className={`dot-${day.lessonTone}`} />
                        </button>
                      ))}
                    </div>
                    <div className="create-month-legend">
                      <span><i className="dot-blue" />Toán 9A</span>
                      <span><i className="dot-orange" />Văn 8B</span>
                      <span><i className="dot-red" />Lý 10C</span>
                      <span><i className="dot-green" />Toán 10A1</span>
                    </div>
                  </section>

                  <aside className="create-schedule-summary">
                    <Star className="summary-star" size={42} />
                    <Heart className="summary-heart" size={42} />
                    <h3>Tóm tắt lịch sắp tạo</h3>
                    <SummaryRow icon={<BookOpen />} label="Môn học:" value={form.subject} />
                    <SummaryRow icon={<Users />} label="Lớp:" value={form.className} />
                    <SummaryRow icon={<CalendarDays />} label="Bắt đầu:" value={form.startDate} />
                    <SummaryRow icon={<CalendarDays />} label="Kết thúc:" value={form.endDate} />
                    <SummaryRow icon={<CalendarDays />} label="Ngày học trong tuần:" value={form.selectedDays.join(", ")} />
                    <SummaryRow icon={<Clock3 />} label="Giờ học:" value={`${form.startTime} - ${form.endTime}`} />
                    <SummaryRow icon={<Monitor />} label="Hình thức:" value={form.learningMode} />
                    <SummaryRow icon={<RefreshCcw />} label="Lặp lại:" value={form.repeat} />
                  </aside>
                </section>
              </section>
              </section>
            </main>

            <footer className="create-schedule-modal__footer create-schedule-actions">
              <button type="button" className="create-cancel-button" onClick={onClose}>Hủy</button>
              <button type="submit" className="create-submit-button"><Plus size={30} />Tạo lịch mới</button>
            </footer>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return <h3 className="create-section-title"><span>{icon}</span>{title}</h3>;
}

interface FormFieldProps {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  value: string;
  compact?: boolean;
}

function FormInput({ icon, label, required, value, onChange, suffix, compact }: FormFieldProps & { onChange: (value: string) => void; suffix?: ReactNode }) {
  return (
    <div className="create-form-row">
      <div className="create-form-label">{icon}<span>{label} {required && <b>*</b>}</span></div>
      <label className={clsx("create-input", compact && "compact")}>
        <input value={value} onChange={(event) => onChange(event.target.value)} />
        {suffix}
      </label>
    </div>
  );
}

function FormSelect({ icon, label, required, value, options, onChange }: FormFieldProps & { options: string[]; onChange: (value: string) => void }) {
  return (
    <div className="create-form-row">
      <div className="create-form-label">{icon}<span>{label} {required && <b>*</b>}</span></div>
      <label className="create-input">
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
    </div>
  );
}

function UploadBox({ icon, title, description, tone }: { icon: ReactNode; title: string; description: string; tone: "red" | "blue" | "orange" }) {
  return <button type="button" className={`create-upload-box ${tone}`}>{icon}<strong>{title}</strong><span>{description}</span></button>;
}

function WeekPicker({ selectedSlots, onToggleDay }: { selectedSlots: WeeklySlotItem[]; onToggleDay: (day: SelectedWeekDay) => void }) {
  const allSlots = [...existingWeeklySlots, ...selectedSlots].filter(isSlotInTimeline);
  const hasBlockingSlot = (day: SelectedWeekDay, startTime: string) => {
    return allSlots.some((slot) => slot.day === day && slotsOverlap(startTime, "21:15", slot.startTime, slot.endTime));
  };

  return (
    <div className="create-week-table">
      <div className="create-week-header-row">
        <div className="create-week-time-corner" />
        {createScheduleWeekDays.map((day) => <div className="create-week-day-header" key={day.key}>{day.label}</div>)}
      </div>

      <div className="create-week-body">
        <div className="create-week-time-column">
          {createScheduleTimeLabels.map((time) => <div key={time}>{time}</div>)}
        </div>

        {createScheduleWeekDays.map((day) => (
          <div className="create-week-day-column" key={day.key}>
            {allSlots.filter((slot) => slot.day === day.key).map((slot) => (
              <div
                className={clsx("create-week-slot", `create-week-slot--${slot.type === "existing" ? "available" : slot.type}`)}
                key={slot.id}
                style={{
                  top: `${getSlotTop(slot.startTime)}px`,
                  height: `${getSlotHeight(slot.startTime, slot.endTime)}px`,
                }}
              >
                <span className="create-week-slot__time">{slot.startTime} - {slot.endTime}</span>
                <strong>{slot.title}</strong>
                {slot.type !== "existing" && <em><Check size={13} /></em>}
              </div>
            ))}

            {weekPlusSlots
              .filter((slot) => slot.day === day.key && !hasBlockingSlot(day.key, slot.startTime))
              .map((slot) => (
                <button
                  type="button"
                  className="create-week-plus"
                  key={slot.id}
                  style={{ top: `${getSlotTop(slot.startTime)}px` }}
                  aria-label={`Chọn khung giờ trống ${day.label} lúc ${slot.startTime}`}
                  onClick={() => onToggleDay(day.key)}
                >
                  <Plus size={25} />
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="summary-row"><span>{icon}</span><strong>{label}</strong><b>{value}</b></div>;
}

export default CreateScheduleModal;
