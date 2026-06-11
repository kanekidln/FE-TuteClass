import type { UpcomingSession } from "../../../features/notebook";

const defaultSessions: UpcomingSession[] = [
  {
    id: "session-2024-05-15",
    date: "Vào ngày mai (Thứ 4)",
    dateClass: "text-red-500",
    subject: "Toán 9A",
    teacher: "Thầy Nam - Phòng online 1",
    time: "19:00 - 20:30"
  },
  {
    id: "session-2024-05-17",
    date: "Thứ 6, 17/05",
    dateClass: "text-gray-500",
    subject: "Toán 9A",
    teacher: "Cô Lan - Phòng online 2",
    time: "19:00 - 20:30"
  }
];

type UpcomingSessionsProps = {
  sessions?: UpcomingSession[];
};

export function UpcomingSessions({ sessions = defaultSessions }: UpcomingSessionsProps) {
  return (
    <div className="upcoming-panel border border-indigo-100 rounded-xl p-4 shadow-sm relative">
      <div className="absolute top-2 right-2">
        <svg className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>
      <h3 className="text-indigo-800 font-bold text-sm mb-4">Buổi học sắp tới</h3>
      {sessions.map((session, index) => (
        <button
          aria-label={`Xem buổi học ${session.subject} ${session.date.toLowerCase()} lúc ${session.time}`}
          className={`upcoming-session block w-full text-left p-2 ${index === 0 ? "mb-4 -m-2" : "pt-4 -mx-2 border-t border-indigo-100"}`}
          data-session-id={session.id}
          key={session.id}
          type="button"
        >
          <p className={`${session.dateClass} text-[10px] font-bold mb-2`}>{session.date}</p>
          <div className="flex gap-2 items-start">
            <svg className="w-4 h-4 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <div className="text-xs">
              <div className="font-bold text-indigo-900">{session.time}</div>
              <div className="font-medium">{session.subject}</div>
              <div className="text-indigo-500 text-[10px]">{session.teacher}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
