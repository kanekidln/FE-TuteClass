import { createClassId } from "../../overview/utils/teacherOverviewRoute";
import type { TeacherDocumentType, TeacherDocumentsRouteParams, TeacherDocumentsScope } from "../types/teacherDocuments.types";

const validScopes: TeacherDocumentsScope[] = ["class", "sessions"];
const validTypes: TeacherDocumentType[] = ["link", "file", "image"];

export function createTeacherDocumentsHash(
  className: string,
  scope: TeacherDocumentsScope = "sessions",
  type: TeacherDocumentType = "link",
): string {
  const classId = createClassId(className);
  const params = new URLSearchParams({ className });

  if (scope === "class") {
    params.set("type", type);
  }

  return `#teacher/classes/${classId}/documents/${scope}?${params.toString()}`;
}

export function parseTeacherDocumentsHash(hash: string): TeacherDocumentsRouteParams | null {
  const [path, queryString = ""] = hash.replace(/^#/, "").split("?");
  const match = /^teacher\/classes\/([^/]+)\/documents\/([^/]+)$/.exec(path);

  if (!match) {
    return null;
  }

  const scope = match[2] as TeacherDocumentsScope;

  if (!validScopes.includes(scope)) {
    return null;
  }

  const params = new URLSearchParams(queryString);
  const rawType = params.get("type") as TeacherDocumentType | null;
  const type = rawType && validTypes.includes(rawType) ? rawType : "link";
  const classId = decodeURIComponent(match[1]);
  const className = params.get("className") ?? classId;

  return { classId, className, scope, type };
}
