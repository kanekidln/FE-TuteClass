import { classTabs, sectionMarkers } from "../config/navigation";
import { calendarDates, classProfiles, scheduleDays } from "../content/classProfiles";
import { buildChecklist, buildInsightCards, buildNoteCards, buildStandardSubtitle, standardSectionCopy } from "../content/standardSpreadContent";
import type { ClassKey, NotebookPage, ScheduleSpreadData, SectionKey, StandardSpreadData } from "../domain/types";

function buildScheduleData(classKey: ClassKey): ScheduleSpreadData {
  const profile = classProfiles[classKey];

  return {
    heading: "Lịch học lớp",
    accent: profile.className,
    subtitle: `Xem thời khóa biểu theo tuần và các buổi học của lớp ${profile.className}.`,
    weekLabel: "Thời khóa biểu tuần này",
    monthLabel: "Tháng 5, 2024",
    days: scheduleDays,
    events: profile.scheduleEvents.map((event) => ({ ...event })),
    sessions: profile.upcoming.map((session) => ({ ...session })),
    footerLeft: "Lịch học có thể thay đổi. Thầy/Cô sẽ thông báo trên lớp học khi có cập nhật nhé!",
    footerRight: "Học tập đều - Tiến bộ nhiều mỗi ngày!",
    currentTimeTop: 492,
    calendarMonthLabel: "Tháng 5, 2024",
    calendarDates
  };
}

function buildStandardData(classKey: ClassKey, sectionKey: Exclude<SectionKey, "schedule">): StandardSpreadData {
  const profile = classProfiles[classKey];
  const sectionCopy = standardSectionCopy[sectionKey];

  return {
    heading: sectionCopy.title,
    accent: profile.className,
    subtitle: buildStandardSubtitle(sectionKey, profile),
    panelTitle: sectionCopy.panelTitle,
    panelSubtitle: sectionCopy.panelSubtitle,
    cards: buildInsightCards(sectionKey, profile),
    checklist: buildChecklist(sectionKey),
    noteCards: buildNoteCards(sectionKey, profile),
    footerLeft: `${sectionCopy.title} của ${profile.className} được giữ cùng shell notebook để không tách rời trải nghiệm.`,
    footerRight: `${profile.teacher} luôn có thể cập nhật nhanh ở đúng section này.`
  };
}

export function buildNotebookPages(): NotebookPage[] {
  return classTabs.flatMap((classItem) =>
    sectionMarkers.map((marker) => {
      if (marker.key === "schedule") {
        return {
          key: `${classItem.key}-${marker.key}`,
          classKey: classItem.key,
          className: classItem.name,
          teacher: classItem.teacher,
          sectionKey: marker.key,
          navLabel: marker.label,
          spreadType: "schedule" as const,
          data: buildScheduleData(classItem.key)
        };
      }

      return {
        key: `${classItem.key}-${marker.key}`,
        classKey: classItem.key,
        className: classItem.name,
        teacher: classItem.teacher,
        sectionKey: marker.key,
        navLabel: marker.label,
        spreadType: "standard" as const,
        data: buildStandardData(classItem.key, marker.key)
      };
    })
  );
}

export const notebookPages = buildNotebookPages();
