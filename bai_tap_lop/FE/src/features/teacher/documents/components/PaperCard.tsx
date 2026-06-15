import clsx from "clsx";
import type { PropsWithChildren } from "react";

type PaperCardProps = PropsWithChildren<{
  className?: string;
}>;

function PaperCard({ children, className }: PaperCardProps) {
  return <section className={clsx("teacher-doc-paper-card", className)}>{children}</section>;
}

export default PaperCard;
