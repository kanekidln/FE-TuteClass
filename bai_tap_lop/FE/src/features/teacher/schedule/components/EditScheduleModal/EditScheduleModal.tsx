import { FormEvent, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import {
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  Heart,
  Laptop,
  Leaf,
  Monitor,
  PenLine,
  Plus,
  RefreshCcw,
  Star,
  Users,
  X,
} from "lucide-react";
import {
  DEFAULT_EDIT_FORM_STATE,
  EDIT_SCHEDULE_LESSONS,
  EDIT_WEEK_DAYS,
  SELECTED_EDIT_LESSON,
} from "../../constants/teacherSchedule.constants";
import type { EditableLessonItem, EditScheduleFormState, EditScheduleModalProps } from "../../types/teacherSchedule.types";
import "./EditScheduleModal.css";

const weekTags = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function EditScheduleModal({ isOpen, onClose, onSave }: EditScheduleModalProps) {
  const [selectedLesson, setSelectedLesson] = useState<EditableLessonItem>(SELECTED_EDIT_LESSON);
  const [form, setForm] = useState<EditScheduleFormState>(DEFAULT_EDIT_FORM_STATE);

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

  const updateField = <K extends keyof EditScheduleFormState>(key: K, value: EditScheduleFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const chooseLesson = (lesson: EditableLessonItem) => {
    setSelectedLesson(lesson);
    setForm((current) => ({
      ...current,
      date: lesson.dateLabel,
      startTime: lesson.startTime,
      endTime: lesson.endTime,
      weekDay: lesson.dayLabel.replace("Thứ ", "T"),
      learningType: lesson.platform,
      platform: lesson.platform,
    }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Save edited schedule", { selectedLesson, form });
    onSave?.();
    onClose();
  };

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="edit-schedule-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.form
            className="edit-schedule-modal"
            onSubmit={submit}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <span className="edit-notebook-spine" aria-hidden="true">
              {Array.from({ length: 14 }, (_, index) => <i key={index} />)}
            </span>

            <header className="edit-schedule-modal__header">
              <h2>Chỉnh sửa lịch học</h2>
              <button type="button" onClick={onClose} aria-label="Đóng">
                <X size={38} />
              </button>
            </header>

            <main className="edit-schedule-modal__content">
              <section className="edit-quick-info">
                <InfoCard icon={<BookOpen />} tone="purple" text="Lớp: Toán 9A" />
                <InfoCard icon={<Users />} tone="green" text="Sĩ số: 28 học sinh" />
                <InfoCard icon={<CalendarDays />} tone="blue" text="Tuần hiện tại: Tuần 2 (13/05 - 19/05/2024)" />
                <InfoCard icon={<CalendarDays />} tone="orange" text="Tổng số buổi trong tuần: 6" />
              </section>

              <section className="edit-week-section">
                <h3><CalendarDays size={28} />Lịch học tuần hiện tại</h3>
                <div className="edit-week-grid">
                  {EDIT_WEEK_DAYS.map((day) => (
                    <article className="edit-week-day-card" key={day.id}>
                      <header>
                        <strong>{day.label}</strong>
                        <span>{day.date}</span>
                      </header>
                      <div className="edit-week-day-body">
                        {EDIT_SCHEDULE_LESSONS.filter((lesson) => lesson.dayId === day.id).map((lesson) => (
                          <button
                            type="button"
                            key={lesson.id}
                            className={clsx("edit-lesson-card", selectedLesson.id === lesson.id && "is-selected", lesson.startTime.startsWith("14") && "orange-time")}
                            onClick={() => chooseLesson(lesson)}
                          >
                            <span className="edit-time-badge">{lesson.startTime}</span>
                            <strong>{lesson.subject} {lesson.className}</strong>
                            <small>{lesson.learningType === "online" ? <Monitor size={18} /> : <Laptop size={18} />} {lesson.platform}</small>
                            {selectedLesson.id === lesson.id && <b><Star size={15} />Đang chọn</b>}
                          </button>
                        ))}
                        {(day.id !== "mon" && day.id !== "sat") && (
                          <button type="button" className="edit-week-plus" aria-label={`Thêm lịch vào ${day.label}`} onClick={() => console.log("Add slot", day.id)}>
                            <Plus size={29} strokeWidth={2.2} />
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="edit-schedule-bottom">
                <SelectedLessonCard lesson={selectedLesson} />

                <section className="edit-card edit-form-card">
                  <h3><PenLine size={30} />Chỉnh sửa thông tin</h3>
                  <EditInput label="Đổi ngày học" icon={<CalendarDays />} value={form.date} onChange={(value) => updateField("date", value)} />
                  <EditInput label="Đổi giờ bắt đầu" icon={<Clock3 />} value={form.startTime} onChange={(value) => updateField("startTime", value)} />
                  <EditInput label="Đổi giờ kết thúc" icon={<Clock3 />} value={form.endTime} onChange={(value) => updateField("endTime", value)} />
                  <div className="edit-form-row">
                    <label>Ngày trong tuần</label>
                    <div className="edit-week-tags">
                      {weekTags.map((tag) => (
                        <button type="button" key={tag} className={clsx(form.weekDay === tag && "active")} onClick={() => updateField("weekDay", tag)}>
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <EditSelect label="Hình thức học" icon={<Monitor />} value={form.learningType} options={["Google Meet", "Học online"]} onChange={(value) => updateField("learningType", value)} />
                  <EditSelect label="Nền tảng/Phòng học" icon={<Laptop />} value={form.platform} options={["Google Meet", "Học online", "Phòng A2"]} onChange={(value) => updateField("platform", value)} />
                  <EditSelect label="Lặp lại" icon={<RefreshCcw />} value={form.repeatType} options={["Hàng tuần", "Một lần", "Hàng tháng"]} onChange={(value) => updateField("repeatType", value)} />
                  <EditInput label="Lý do thay đổi" value={form.reason} placeholder="VD: Bận công việc cá nhân" onChange={(value) => updateField("reason", value)} />
                  <label className="edit-checkbox-row">
                    <span>Thông báo cho học sinh</span>
                    <input type="checkbox" checked={form.notifyStudents} onChange={(event) => updateField("notifyStudents", event.target.checked)} />
                    <b>Gửi thông báo cập nhật lịch cho học sinh</b>
                  </label>
                </section>

                <SummaryCard lesson={selectedLesson} form={form} />
              </section>
            </main>

            <footer className="edit-schedule-modal__footer">
              <div className="edit-footer-slogan"><span /><Leaf size={25} />Dạy học khoa học - Quản lý hiệu quả - Học sinh tiến bộ mỗi ngày!<Heart size={25} /><span /></div>
              <div className="edit-actions">
                <button type="button" className="edit-cancel-button" onClick={onClose}>Hủy</button>
                <button type="submit" className="edit-save-button"><Check size={25} />Lưu thay đổi</button>
              </div>
            </footer>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}

function InfoCard({ icon, text, tone }: { icon: ReactNode; text: string; tone: "purple" | "green" | "blue" | "orange" }) {
  return <article className={`edit-info-card ${tone}`}><span>{icon}</span><strong>{text}</strong></article>;
}

function SelectedLessonCard({ lesson }: { lesson: EditableLessonItem }) {
  return (
    <section className="edit-card edit-selected-card">
      <h3><CalendarDays size={30} />Buổi học đã chọn</h3>
      <DetailRow icon={<BookOpen />} label="Môn học:" value={lesson.subject} />
      <DetailRow icon={<BookOpen />} label="Lớp:" value={lesson.className} />
      <DetailRow icon={<CalendarDays />} label="Ngày học:" value={`${lesson.dayLabel}, ${lesson.dateLabel}`} />
      <DetailRow icon={<Clock3 />} label="Giờ bắt đầu:" value={lesson.startTime} />
      <DetailRow icon={<Clock3 />} label="Giờ kết thúc:" value={lesson.endTime} />
      <DetailRow icon={<Monitor />} label="Hình thức:" value={lesson.platform} />
      <DetailRow icon={<Laptop />} label="Nền tảng/Phòng học:" value={lesson.platform} />
      <div className="edit-suggestion"><Bell size={27} />Lý do gợi ý: Thay đổi lịch trong khung giờ này vào Thứ 2.</div>
    </section>
  );
}

function DetailRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="edit-detail-row"><span>{icon}</span><strong>{label}</strong><b>{value}</b></div>;
}

function EditInput({ label, icon, value, placeholder, onChange }: { label: string; icon?: ReactNode; value: string; placeholder?: string; onChange: (value: string) => void }) {
  return (
    <div className="edit-form-row">
      <label>{label}</label>
      <div className="edit-input-wrap">{icon}<input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></div>
    </div>
  );
}

function EditSelect({ label, icon, value, options, onChange }: { label: string; icon: ReactNode; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <div className="edit-form-row">
      <label>{label}</label>
      <div className="edit-input-wrap">{icon}<select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></div>
    </div>
  );
}

function SummaryCard({ lesson, form }: { lesson: EditableLessonItem; form: EditScheduleFormState }) {
  return (
    <aside className="edit-card edit-summary-card">
      <span className="edit-summary-tape" />
      <Star className="edit-summary-star" size={45} />
      <Heart className="edit-summary-heart" size={43} />
      <h3>Tóm tắt sau khi chỉnh sửa</h3>
      <p>Thay đổi lịch:</p>
      <div className="summary-group before">
        <strong><CalendarDays size={22} />Trước khi sửa:</strong>
        <span>{lesson.dayLabel}, {lesson.dateLabel}</span>
        <span>{lesson.startTime} - {lesson.endTime}</span>
        <span>{lesson.platform}</span>
      </div>
      <div className="summary-divider" />
      <div className="summary-group after">
        <strong><CalendarDays size={22} />Sau khi sửa:</strong>
        <span>{lesson.dayLabel}, {form.date}</span>
        <span>{form.startTime} - {form.endTime}</span>
        <span>{form.platform}</span>
        <span>Lặp lại: {form.repeatType}</span>
      </div>
      <b className="summary-stable"><RefreshCcw size={22} />Không thay đổi nội dung buổi học</b>
    </aside>
  );
}

export default EditScheduleModal;
