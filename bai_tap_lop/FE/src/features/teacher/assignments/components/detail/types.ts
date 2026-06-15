export type DetailTab = "overview" | "questions" | "students" | "analytics";

export type StudentSubmissionCard = {
  name: string;
  avatar: string;
  status: string;
  statusTone: "orange" | "green" | "red" | "gray";
  time: string;
  mcq: string;
  essay: string;
  scoreLabel: string;
  score: string;
  scoreTone: "orange" | "green" | "black";
  action: "grade" | "view" | "none";
};

export type AttentionTone = "red" | "orange";

export type AttentionStudent = {
  name: string;
  tag: string;
  desc: string;
  tone: AttentionTone;
};
