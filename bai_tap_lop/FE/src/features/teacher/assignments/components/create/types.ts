import type { ReactNode } from "react";

export type StatProps = {
  icon: ReactNode;
  label: string;
  value: string;
  last?: boolean;
};

export type QuestionCardProps = {
  no: number;
  type: string;
  color: "blue" | "orange";
  score: string;
  trust: string;
  children: ReactNode;
};

export type AnswerProps = {
  label: string;
  text: string;
  selected?: boolean;
  small?: boolean;
};
