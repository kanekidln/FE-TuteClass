import type { ScheduleSpreadData } from "../features/notebook";
import { MiniCalendar } from "../pages/SchedulePage/components/MiniCalendar";
import { ScheduleHeader } from "../pages/SchedulePage/components/ScheduleHeader";
import { UpcomingSessions } from "../pages/SchedulePage/components/UpcomingSessions";
import { WeeklySchedule } from "../pages/SchedulePage/components/WeeklySchedule";
import "../pages/SchedulePage/SchedulePage.css";

type ScheduleSpreadProps = {
  data: ScheduleSpreadData;
};

export function ScheduleSpread({ data }: ScheduleSpreadProps) {
  return (
    <>
      <ScheduleHeader accent={data.accent} heading={data.heading} subtitle={data.subtitle} />
      <div className="flex gap-8 flex-1">
        <div className="w-3/4">
          <WeeklySchedule
            currentTimeTop={data.currentTimeTop}
            days={data.days}
            events={data.events}
            monthLabel={data.monthLabel}
            weekLabel={data.weekLabel}
          />
        </div>
        <div className="w-1/4 flex flex-col gap-6 -mt-20">
          <MiniCalendar dates={data.calendarDates} monthLabel={data.calendarMonthLabel} />
          <UpcomingSessions sessions={data.sessions} />
        </div>
      </div>
      <div className="mt-auto pt-4 -mb-4 flex items-center justify-between text-xs text-gray-500 font-medium">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          {data.footerLeft}
        </div>
        <div className="flex items-center gap-2 italic text-blue-700">{data.footerRight}</div>
      </div>
    </>
  );
}
