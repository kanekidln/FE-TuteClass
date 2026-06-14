export interface TeacherOverviewRouteState {
  returnToLessonDetail?: boolean;
}

export interface TeacherOverviewRouteParams {
  classId: string;
  className: string;
}

export function createClassId(className: string): string {
  return className
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function createTeacherOverviewHash(className: string): string {
  const classId = createClassId(className);
  const params = new URLSearchParams({ className });

  return `#teacher/classes/${classId}/overview?${params.toString()}`;
}

export function parseTeacherOverviewHash(hash: string): TeacherOverviewRouteParams | null {
  const [path, queryString = ""] = hash.replace(/^#/, "").split("?");
  const match = /^teacher\/classes\/([^/]+)\/overview$/.exec(path);

  if (!match) {
    return null;
  }

  const params = new URLSearchParams(queryString);
  const classId = decodeURIComponent(match[1]);
  const className = params.get("className") ?? classId;

  return { classId, className };
}
