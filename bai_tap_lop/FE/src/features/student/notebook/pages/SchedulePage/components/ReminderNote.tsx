import type { ReminderItem } from "../../..";

const defaultReminders: ReminderItem[] = [
  { id: "reminder-1", text: "Đến lớp đúng giờ nhé!" },
  { id: "reminder-2", text: "Chuẩn bị sách vở và dụng cụ học tập." },
  { id: "reminder-3", text: "Xem bài tập trước khi vào lớp." }
];

type ReminderNoteProps = {
  items?: ReminderItem[];
};

export function ReminderNote({ items = defaultReminders }: ReminderNoteProps) {
  return (
    <div className="schedule-panel student-note-card reminder-note-card rounded-xl border border-orange-100 shadow-sm relative">
      <div className="student-note-pin" aria-hidden="true" />
      <div className="student-note-title student-note-title--coral">
        <span>Nhắc nhở</span>
        <span className="reminder-note-heart" aria-hidden="true">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12.1 20.3a1 1 0 0 1-.7-.3l-6-5.8a4.8 4.8 0 0 1 6.8-6.8l.5.5.5-.5a4.8 4.8 0 1 1 6.8 6.8l-6 5.8a1 1 0 0 1-.7.3Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </svg>
        </span>
      </div>

      <div className="reminder-note-list">
        {items.map((item) => (
          <div className="reminder-note-item" key={item.id}>
            <span className="reminder-note-check" aria-hidden="true" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <div className="reminder-note-smile" aria-hidden="true">
        :)
      </div>
    </div>
  );
}
