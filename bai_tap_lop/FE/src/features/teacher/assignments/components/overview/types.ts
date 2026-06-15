import type { ReactNode } from "react";
import type { AssignmentView } from "../../types";

export type AssignmentGroupProps = {
  rows: string[][];
  onOpenAssignment: () => void;
  onNavigate: (view: AssignmentView) => void;
};

export type PanelProps = {
  icon: ReactNode;
  title: string;
  action: string;
  children: ReactNode;
};

export type IconButtonProps = {
  icon: ReactNode;
  label: string;
};
