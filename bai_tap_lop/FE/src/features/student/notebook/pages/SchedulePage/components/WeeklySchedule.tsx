import type { ScheduleEvent } from "../../..";

const defaultDays: Array<[string, string]> = [
  ["Thứ 2", "13/05"],
  ["Thứ 3", "14/05"],
  ["Thứ 4", "15/05"],
  ["Thứ 5", "16/05"],
  ["Thứ 6", "17/05"],
  ["Thứ 7", "18/05"],
  ["Chủ nhật", "19/05"]
];

const defaultEvents: ScheduleEvent[] = [
  { left: "calc(12.5%*6 + 60px)", top: 432, className: "bg-green-50 border-green-200", subject: "Toán 9A", teacher: "Cô Lan", time: "09:00 - 10:30" },
  { left: "calc(12.5%*0 + 60px)", top: 912, className: "bg-green-50 border-green-200", subject: "Toán 9A", teacher: "Cô Lan", time: "19:00 - 20:30" },
  { left: "calc(12.5%*2 + 60px)", top: 912, className: "bg-blue-50 border-blue-200", subject: "Tiếng Anh 9A", teacher: "Thầy Nam", time: "19:00 - 20:30" },
  { left: "calc(12.5%*4 + 60px)", top: 912, className: "bg-green-50 border-green-200", subject: "Toán 9A", teacher: "Cô Lan", time: "19:00 - 20:30" }
];

type WeeklyScheduleProps = {
  currentTimeTop?: number;
  days?: Array<[string, string]>;
  events?: ScheduleEvent[];
  monthLabel?: string;
  weekLabel?: string;
};

export function WeeklySchedule({
  currentTimeTop = 492,
  days = defaultDays,
  events = defaultEvents,
  monthLabel = "Tháng 5, 2024",
  weekLabel = "Thời khóa biểu tuần này"
}: WeeklyScheduleProps) {
  return (
    <div className="schedule-panel notebook-section-card rounded-xl p-4 border border-orange-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="notebook-section-heading flex items-center gap-2 text-blue-800 font-bold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span>{weekLabel}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
        <div className="notebook-month-pill flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-gray-200 text-xs font-bold text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          {monthLabel}
        </div>
        <div className="text-yellow-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="calendar-grid text-[10px] text-blue-900 font-bold uppercase tracking-wider mb-2">
        <div />
        {days.map(([day, date], index) => (
          <div className={`text-center py-2 ${index === 6 ? "text-red-500" : ""}`} key={day}>
            {day}
            <br />
            <span className="font-normal normal-case">{date}</span>
          </div>
        ))}
      </div>

      <div className="timetable-scroll-area relative border-t border-gray-100">
        <div className="relative min-h-[1152px]">
          <div className="current-time-line" style={{ top: currentTimeTop }} />
          {Array.from({ length: 24 }).map((_, hour) => (
            <div className={`time-row calendar-grid ${hour === 23 ? "border-b-0" : ""}`} key={hour}>
              <div className={`flex items-center justify-end pr-2 text-[10px] ${hour >= 7 && hour <= 21 ? "text-gray-500 font-bold" : "text-gray-400"}`}>
                {hour.toString().padStart(2, "0")}:00
              </div>
              <div className="col-span-7" />
            </div>
          ))}
          {events.map((event, index) => (
            <div
              className={`weekly-event-card absolute w-[11%] h-[72px] border rounded p-1 text-[8px] shadow-sm z-10 ${event.className}`}
              key={`${event.subject}-${event.time}-${index}`}
              style={{ left: event.left, top: event.top }}
            >
              <div className="font-bold">{event.subject}</div>
              <div>{event.teacher}</div>
              <div className="text-gray-500">{event.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
