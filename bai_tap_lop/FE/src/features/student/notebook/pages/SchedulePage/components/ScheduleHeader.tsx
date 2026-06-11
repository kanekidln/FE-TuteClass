type ScheduleHeaderProps = {
  heading?: string;
  accent?: string;
  subtitle?: string;
};

export function ScheduleHeader({
  heading = "Lịch học lớp",
  accent = "Toán 9A",
  subtitle = "Xem thời khóa biểu theo tuần và các buổi học của lớp bạn."
}: ScheduleHeaderProps) {
  return (
    <div className="notebook-spread-header flex justify-between items-start mb-6">
      <div data-purpose="main-title">
        <h1 className="notebook-spread-title mb-1">
          {heading} <span className="notebook-spread-title-accent">{accent}</span>
        </h1>
        <p className="notebook-spread-subtitle">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="notebook-spread-tape transform rotate-12 -mr-4 z-10" />
      </div>
    </div>
  );
}
