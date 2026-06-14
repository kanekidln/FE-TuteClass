import type { TodayAgendaItem } from "../../..";

const defaultAgenda: TodayAgendaItem[] = [
  { id: "today-1", time: "07:30 - 09:00", subject: "Toán 9A", detail: "Cô Lan - Phòng online 2" },
  { id: "today-2", time: "15:30 - 17:00", subject: "Tự học Toán", detail: "Tự học" }
];

type TodayAgendaProps = {
  items?: TodayAgendaItem[];
};

export function TodayAgenda({ items = defaultAgenda }: TodayAgendaProps) {
  return (
    <div className="schedule-panel student-note-card today-agenda-card rounded-xl border border-orange-100 shadow-sm relative">
      <div className="student-note-pin" aria-hidden="true" />
      <div className="student-note-tape" aria-hidden="true" />
      <div className="student-note-title student-note-title--teal">
        <span>Hôm nay</span>
        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.364 6.364-1.414-1.414M8.05 8.05 6.636 6.636m10.728 0L15.95 8.05M8.05 15.95l-1.414 1.414M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>

      <div className="today-agenda-list">
        {items.map((item) => (
          <div className="today-agenda-item" key={item.id}>
            <div className="today-agenda-time">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <strong>{item.time}</strong>
            </div>
            <div className="today-agenda-subject">{item.subject}</div>
            <div className="today-agenda-detail">{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
