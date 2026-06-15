import type { ComponentType, SVGProps } from "react";

export type StickyNoteColor = "green" | "yellow" | "pink" | "blue" | "purple";

export type TeacherStatIcon = "star" | "wallet" | "checklist" | "calendar" | "chart";

export interface TeacherStat {
  id: string;
  title: string;
  value: string;
  detail?: string;
  color: StickyNoteColor;
  icon: TeacherStatIcon;
  rotation: number;
}

export interface TeacherTodo {
  id: string;
  label: string;
  completed: boolean;
}

export interface TeacherNote {
  id: string;
  content: string;
}

export interface ClassroomStatus {
  id: string;
  title: string;
  value: string;
  percent: string;
  tone: "yellow" | "blue";
}

export type DoodleIconName = "pencil" | "leaf" | "lightbulb";

export type OverviewSvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface TeacherOverviewPageProps {
  classId: string;
  className: string;
}
