export type AssignmentView = "overview" | "create" | "edit" | "detail" | "grading";

export type StudentStatus = "missing" | "submitted" | "graded";

export interface StudentSubmission {
  id: string;
  name: string;
  initials: string;
  status: StudentStatus;
  submittedAt?: string;
  score?: number;
}

export interface AssignmentSession {
  id: string;
  title: string;
  date: string;
  time: string;
  className: string;
  state: "urgent" | "overdue" | "done";
  summary: string;
}
