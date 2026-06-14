import type { MiniCalendarDate } from "../../..";

const defaultDates: MiniCalendarDate[] = [
  { value: "29", state: "muted" },
  { value: "30", state: "muted" },
  { value: "1", state: "" },
  { value: "2", state: "" },
  { value: "3", state: "" },
  { value: "4", state: "" },
  { value: "5", state: "sun" },
  { value: "6", state: "" },
  { value: "7", state: "" },
  { value: "8", state: "" },
  { value: "9", state: "" },
  { value: "10", state: "" },
  { value: "11", state: "" },
  { value: "12", state: "sun" },
  { value: "13", state: "" },
  { value: "14", state: "" },
  { value: "15", state: "" },
  { value: "16", state: "" },
  { value: "17", state: "active" },
  { value: "18", state: "" },
  { value: "19", state: "sun" },
  { value: "20", state: "" },
  { value: "21", state: "" },
  { value: "22", state: "" },
  { value: "23", state: "" },
  { value: "24", state: "" },
  { value: "25", state: "" },
  { value: "26", state: "sun" },
  { value: "27", state: "" },
  { value: "28", state: "" },
  { value: "29", state: "" },
  { value: "30", state: "" },
  { value: "31", state: "" },
  { value: "1", state: "muted" },
  { value: "2", state: "sun-muted" }
];

type MiniCalendarProps = {
  dates?: MiniCalendarDate[];
  monthLabel?: string;
};

export function MiniCalendar({ dates = defaultDates, monthLabel = "Tháng 5, 2024" }: MiniCalendarProps) {
  return (
    <div className="schedule-panel student-note-card student-mini-calendar-card rounded-xl border border-orange-100 shadow-sm text-xs relative">
      <div className="student-note-pin student-note-pin--slate" aria-hidden="true" />

      <div className="mini-calendar-header">
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
        <div className="mini-calendar-month">{monthLabel}</div>
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>

      <div className="mini-calendar-grid">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => (
          <div className={`mini-calendar-day ${index === 6 ? "mini-calendar-day--sun" : ""}`} key={day}>
            {day}
          </div>
        ))}
        {dates.map((dateItem, index) => {
          const className =
            dateItem.state === "active"
              ? "mini-calendar-date mini-calendar-date--active"
              : dateItem.state === "muted"
                ? "mini-calendar-date mini-calendar-date--muted"
                : dateItem.state === "sun"
                  ? "mini-calendar-date mini-calendar-date--sun"
                  : dateItem.state === "sun-muted"
                    ? "mini-calendar-date mini-calendar-date--sun-muted"
                    : "mini-calendar-date";

          return (
            <div className={className} key={`${dateItem.value}-${index}`}>
              {dateItem.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
