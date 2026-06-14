import { Send, Star } from "lucide-react";
import clsx from "clsx";

type DoodleDecorationProps = {
  kind: "paper-plane" | "star" | "loop";
  className?: string;
};

function DoodleDecoration({ kind, className }: DoodleDecorationProps) {
  if (kind === "star") {
    return <Star className={clsx("teacher-doc-doodle", "doc-doodle-star", className)} aria-hidden="true" />;
  }

  if (kind === "paper-plane") {
    return <Send className={clsx("teacher-doc-doodle", "doc-doodle-plane", className)} aria-hidden="true" />;
  }

  return <span className={clsx("teacher-doc-doodle-loop", className)} aria-hidden="true" />;
}

export default DoodleDecoration;
