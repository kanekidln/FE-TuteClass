import type { UpcomingSession } from "../../..";

const defaultSessions: UpcomingSession[] = [
  {
    id: "session-2024-05-15",
    date: "Vào ngày mai (Thứ 4)",
    dateClass: "text-red-500",
    subject: "Toán 9A",
    teacher: "Cô Lan - Phòng online 2",
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
  compact?: boolean;
  onSelectSession?: (session: UpcomingSession) => void;
  sessions?: UpcomingSession[];
};

export function UpcomingSessions({ compact = false, onSelectSession, sessions = defaultSessions }: UpcomingSessionsProps) {
  const visibleSessions = compact ? sessions.slice(0, 1) : sessions;

  return (
    <div className={`upcoming-panel ${compact ? "student-note-card compact-upcoming-card" : ""} border border-indigo-100 rounded-xl shadow-sm relative`}>
      {compact ? <div className="student-note-pin" aria-hidden="true" /> : null}
      <div className="absolute top-3 right-3">
        <svg className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>

      <h3 className="compact-upcoming-heading">Buổi học sắp tới</h3>

      {visibleSessions.map((session, index) => (
        <button
          aria-label={`Xem buổi học ${session.subject} ${session.date.toLowerCase()} lúc ${session.time}`}
          className={`upcoming-session compact-upcoming-session ${index === 0 ? "" : "compact-upcoming-session--stacked"}`}
          data-session-id={session.id}
          key={session.id}
          onClick={() => onSelectSession?.(session)}
          type="button"
        >
          <p className={`${session.dateClass} compact-upcoming-date`}>{session.date}</p>
          <div className="compact-upcoming-content">
            <svg className="w-4 h-4 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <div className="compact-upcoming-copy">
              <div className="compact-upcoming-time">{session.time}</div>
              <div className="compact-upcoming-subject">{session.subject}</div>
              <div className="compact-upcoming-teacher">{session.teacher}</div>
            </div>
          </div>
        </button>
      ))}

      {compact ? (
        <button className="student-note-button student-note-button--violet" onClick={() => visibleSessions[0] && onSelectSession?.(visibleSessions[0])} type="button">
          Xem chi tiết
        </button>
      ) : null}
    </div>
  );
}
