import type { ReactNode } from "react";

export type QuestionTone = "green" | "purple" | "purpleActive" | "purpleWarn";
export type QuestionNavItem = {
  number: number;
  points: string;
  tone: QuestionTone;
};

export type FilterTone = "green" | "purple";
export type AttachedFileProps = {
  icon: string;
  color: string;
  name: string;
  size: string;
};

export type RichTextEditorProps = {
  label: string;
  count: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  toolbar?: "full" | "minimal";
  collapsed?: boolean;
  onToggle?: () => void;
};

export type EditableQuestionType = "essay" | "multipleChoice";
export type MultipleChoiceMode = "single" | "multiple";

export type MultipleChoiceOption = {
  key: string;
  text: string;
  correct?: boolean;
};
