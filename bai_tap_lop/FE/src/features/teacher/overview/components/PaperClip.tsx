import clsx from "clsx";

type PaperClipProps = {
  color?: "blue" | "gold" | "black";
  className?: string;
};

function PaperClip({ color = "blue", className }: PaperClipProps) {
  return <span className={clsx("overview-paper-clip", `clip-${color}`, className)} aria-hidden="true" />;
}

export default PaperClip;
