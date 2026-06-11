import type { MiniCalendarDate } from "../../../features/notebook";

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
    <div className="schedule-panel p-4 rounded-xl border border-orange-100 shadow-sm text-xs">
      <div className="flex justify-between items-center mb-4">
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
        <div className="font-bold text-blue-900">{monthLabel}</div>
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-[10px]">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => (
          <div className={index === 6 ? "text-red-400" : "text-gray-400"} key={day}>
            {day}
          </div>
        ))}
        {dates.map((dateItem, index) => {
          const className =
            dateItem.state === "active"
              ? "bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full mx-auto"
              : dateItem.state === "muted"
                ? "text-gray-300"
                : dateItem.state === "sun"
                  ? "text-red-500"
                  : dateItem.state === "sun-muted"
                    ? "text-red-200"
                    : "";

          return (
            <div className={className} key={`${dateItem.value}-${index}`}>
              {dateItem.value}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-center">
        <div className="w-1 h-1 bg-blue-500 rounded-full" />
      </div>
    </div>
  );
}
