import clsx from "clsx";

type TapeProps = {
  className?: string;
  tone?: "kraft" | "blue" | "green" | "orange";
};

function Tape({ className, tone = "kraft" }: TapeProps) {
  return <span className={clsx("teacher-doc-tape", `doc-tape-${tone}`, className)} aria-hidden="true" />;
}

export default Tape;
