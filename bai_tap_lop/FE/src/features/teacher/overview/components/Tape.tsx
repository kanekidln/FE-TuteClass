import clsx from "clsx";

type TapeProps = {
  variant?: "kraft" | "stripe" | "cream";
  className?: string;
};

function Tape({ variant = "kraft", className }: TapeProps) {
  return <span className={clsx("overview-tape", `tape-${variant}`, className)} aria-hidden="true" />;
}

export default Tape;
