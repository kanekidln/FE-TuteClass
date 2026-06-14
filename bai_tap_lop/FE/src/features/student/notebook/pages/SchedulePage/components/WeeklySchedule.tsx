import type { CSSProperties } from "react";
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
  { left: "calc(12.5%*5 + 60px)", top: 432, className: "bg-green-50 border-green-200", subject: "Toán 9A", teacher: "Cô Lan", time: "09:00 - 10:30" },
  { left: "calc(12.5%*0 + 60px)", top: 912, className: "bg-green-50 border-green-200", subject: "Toán 9A", teacher: "Cô Lan", time: "19:00 - 20:30" },
  { left: "calc(12.5%*2 + 60px)", top: 912, className: "bg-blue-50 border-blue-200", subject: "Tiếng Anh 9A", teacher: "Thầy Nam", time: "19:00 - 20:30" },
  { left: "calc(12.5%*4 + 60px)", top: 912, className: "bg-green-50 border-green-200", subject: "Toán 9A", teacher: "Cô Lan", time: "19:00 - 20:30" }
];

const timeColumnWidth = 68;
type ScheduleBoundary = {
  hidden?: boolean;
  label: string;
  minutes: number;
};

type PositionedEvent = ScheduleEvent & {
  style: CSSProperties;
};

const scheduleBoundaries: ScheduleBoundary[] = [
  { label: "07:30", minutes: 450 },
  { label: "09:30", minutes: 570 },
  { label: "11:00", minutes: 660 },
  { label: "13:30", minutes: 810 },
  { label: "15:00", minutes: 900 },
  { label: "15:30", minutes: 930 },
  { label: "17:00", minutes: 1020 },
  { label: "19:00", minutes: 1140 },
  { label: "20:30", minutes: 1230 },
  { label: "21:30", minutes: 1290, hidden: true }
];

function parseTimeValue(value: string): number | null {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);

  if (!match) {
    return null;
  }

  return Number(match[1]) * 60 + Number(match[2]);
}

function parseTimeRange(value: string): [number, number] | null {
  const [rawStart, rawEnd] = value.split("-").map((part) => part.trim());
  const start = parseTimeValue(rawStart);
  const end = parseTimeValue(rawEnd);

  if (start === null || end === null || end <= start) {
    return null;
  }

  return [start, end];
}

function extractDayIndex(leftExpression: string, fallbackIndex: number, totalDays: number): number {
  const match = leftExpression.match(/\*\s*(\d+)/);
  const parsedIndex = match ? Number(match[1]) : fallbackIndex % totalDays;

  return Math.min(Math.max(parsedIndex, 0), Math.max(totalDays - 1, 0));
}

function mapMinutesToCompressedPercent(minutes: number): number {
  const firstBoundary = scheduleBoundaries[0].minutes;
  const lastBoundary = scheduleBoundaries[scheduleBoundaries.length - 1].minutes;
  const clampedMinutes = Math.min(Math.max(minutes, firstBoundary), lastBoundary);
  const intervalCount = scheduleBoundaries.length - 1;

  for (let index = 0; index < intervalCount; index += 1) {
    const currentBoundary = scheduleBoundaries[index];
    const nextBoundary = scheduleBoundaries[index + 1];

    if (clampedMinutes <= nextBoundary.minutes || index === intervalCount - 1) {
      const intervalSpan = nextBoundary.minutes - currentBoundary.minutes;
      const offset = clampedMinutes - currentBoundary.minutes;
      const progress = intervalSpan === 0 ? 0 : offset / intervalSpan;

      return ((index + progress) / intervalCount) * 100;
    }
  }

  return 100;
}

type WeeklyScheduleProps = {
  currentTimeTop?: number;
  days?: Array<[string, string]>;
  events?: ScheduleEvent[];
  monthLabel?: string;
  onSelectEvent?: (event: ScheduleEvent) => void;
  weekLabel?: string;
};

export function WeeklySchedule({
  currentTimeTop: _currentTimeTop = 492,
  days = defaultDays,
  events = defaultEvents,
  monthLabel = "Tháng 5, 2024",
  onSelectEvent,
  weekLabel = "Thời khóa biểu tuần này"
}: WeeklyScheduleProps) {
  const visibleTimeLabels = scheduleBoundaries.filter((entry) => !entry.hidden);
  const positionedEvents = events.reduce<PositionedEvent[]>((result, event, index) => {
      const parsedRange = parseTimeRange(event.time);

      if (!parsedRange) {
        return result;
      }

      const [startMinutes, endMinutes] = parsedRange;
      const top = mapMinutesToCompressedPercent(startMinutes);
      const bottom = mapMinutesToCompressedPercent(endMinutes);
      const eventHeight = Math.max(bottom - top, 9.75);
      const dayIndex = extractDayIndex(event.left, index, days.length);
      const style = {
        left: `calc(${timeColumnWidth}px + ((100% - ${timeColumnWidth}px) / ${days.length}) * ${dayIndex} + 6px)`,
        width: `calc((100% - ${timeColumnWidth}px) / ${days.length} - 12px)`,
        top: `calc(${top}% + 8px)`,
        height: `calc(${eventHeight}% - 8px)`
      } satisfies CSSProperties;

      result.push({
        ...event,
        style
      });

      return result;
    }, []);

  return (
    <div className="schedule-panel weekly-schedule-card notebook-section-card rounded-xl border border-orange-100 shadow-sm">
      <div className="weekly-schedule-toolbar">
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

      <div className="weekly-schedule-days">
        <div />
        {days.map(([day, date], index) => (
          <div className={`weekly-schedule-day ${index === 6 ? "text-red-500" : ""}`} key={`${day}-${date}`}>
            {day}
            <span>{date}</span>
          </div>
        ))}
      </div>

      <div className="weekly-schedule-body">
        <div className="weekly-schedule-columns" aria-hidden="true">
          {days.map(([, date]) => (
            <div className="weekly-schedule-column" key={date} />
          ))}
        </div>

        {visibleTimeLabels.map((entry) => {
          const top = mapMinutesToCompressedPercent(entry.minutes);

          return (
            <div className="weekly-schedule-time-row" key={entry.label} style={{ top: `${top}%` }}>
              <div className="weekly-schedule-time">{entry.label}</div>
              <div className="weekly-schedule-line" />
            </div>
          );
        })}

        {positionedEvents.map((event, index) => (
          <button
            className={`weekly-event-card absolute border shadow-sm z-10 ${event.className}`}
            key={`${event.subject}-${event.time}-${index}`}
            onClick={() => onSelectEvent?.(event)}
            style={event.style}
            type="button"
          >
            <div className="weekly-event-card-title">{event.subject}</div>
            <div className="weekly-event-card-teacher">{event.teacher}</div>
            <div className="weekly-event-card-time">{event.time}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
