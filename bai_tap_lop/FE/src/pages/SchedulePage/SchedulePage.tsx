import { MiniCalendar } from "./components/MiniCalendar";
import { ScheduleHeader } from "./components/ScheduleHeader";
import { UpcomingSessions } from "./components/UpcomingSessions";
import { WeeklySchedule } from "./components/WeeklySchedule";
import "./SchedulePage.css";

export function SchedulePage() {
  return (
    <div className="flex h-full flex-col">
      <ScheduleHeader />
      <div className="flex gap-8 flex-1">
        <div className="w-3/4">
          <WeeklySchedule />
        </div>
        <div className="w-1/4 flex flex-col gap-6 -mt-20">
          <MiniCalendar />
          <UpcomingSessions />
        </div>
      </div>
      <div className="mt-auto pt-4 -mb-4 flex items-center justify-between text-xs text-gray-500 font-medium">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          Lịch học có thể thay đổi. Thầy/Cô sẽ thông báo trên lớp học khi có cập nhật nhé!
        </div>
        <div className="flex items-center gap-2 italic text-blue-700">Học tập đều - Tiến bộ nhiều mỗi ngày!</div>
      </div>
    </div>
  );
}
