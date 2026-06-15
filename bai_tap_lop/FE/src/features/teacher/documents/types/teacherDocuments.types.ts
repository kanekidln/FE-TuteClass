export type TeacherDocumentsScope = "class" | "sessions";

export type TeacherDocumentType = "link" | "file" | "image";

export interface TeacherDocumentsRouteParams {
  classId: string;
  className: string;
  scope: TeacherDocumentsScope;
  type: TeacherDocumentType;
}

export interface TeacherDocumentsPageProps extends TeacherDocumentsRouteParams {}

export interface ClassDocumentItem {
  id: string;
  title: string;
  type: TeacherDocumentType;
  fileKind?: "pdf" | "doc" | "ppt" | "sheet";
  thumbnailTone?: "mindmap" | "board" | "notebook" | "group" | "poster" | "model";
}

export interface SessionDocumentItem {
  id: string;
  sessionLabel: string;
  title: string;
  linkCount: number;
  fileCount: number;
  imageCount: number;
  tone: "purple" | "green" | "orange" | "blue";
}

export interface TeacherDocumentTab {
  id: TeacherDocumentsScope;
  label: string;
}

export interface TeacherDocumentTypeTab {
  id: TeacherDocumentType;
  label: string;
}
