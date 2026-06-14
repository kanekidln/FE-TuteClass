import clsx from "clsx";

type PaperClipProps = {
  className?: string;
  tone?: "blue" | "green" | "black";
};

function PaperClip({ className, tone = "blue" }: PaperClipProps) {
  return <span className={clsx("teacher-doc-paperclip", `doc-clip-${tone}`, className)} aria-hidden="true" />;
}

export default PaperClip;
