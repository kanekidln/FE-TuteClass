import clsx from "clsx";
import type { PropsWithChildren } from "react";

type PaperCardProps = PropsWithChildren<{
  className?: string;
  variant?: "lined" | "notebook" | "rough";
}>;

function PaperCard({ children, className, variant = "lined" }: PaperCardProps) {
  return <article className={clsx("overview-paper-card", `paper-${variant}`, className)}>{children}</article>;
}

export default PaperCard;
