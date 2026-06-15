import type { ClassTabItem, NotebookLocation, SectionMarkerItem } from "../domain/types";

export const DEFAULT_NOTEBOOK_LOCATION: NotebookLocation = {
  classKey: "math",
  sectionKey: "overview"
};

export const classTabs: ClassTabItem[] = [
  { key: "math", name: "Toán 9A", teacher: "Cô Lan", themeClass: "current-class" },
  { key: "english", name: "Tiếng Anh 9A", teacher: "Thầy Nam", themeClass: "english-class" },
  { key: "physics", name: "Vật lý 9A", teacher: "Thầy Minh", themeClass: "physics-class" },
  { key: "literature", name: "Ngữ văn 9A", teacher: "Cô Hoa", themeClass: "literature-class" }
];

export const sectionMarkers: SectionMarkerItem[] = [
  { key: "overview", label: "Tổng quan" },
  { key: "schedule", label: "Lịch học" },
  { key: "assignments", label: "Bài tập" },
  { key: "resources", label: "Tài liệu" },
  { key: "discussion", label: "Trao đổi" }
];
