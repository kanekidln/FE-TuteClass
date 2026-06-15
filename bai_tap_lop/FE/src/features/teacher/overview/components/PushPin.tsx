import clsx from "clsx";

type PushPinProps = {
  color?: "green" | "orange" | "pink" | "blue" | "purple";
  className?: string;
};

function PushPin({ color = "blue", className }: PushPinProps) {
  return (
    <span className={clsx("overview-push-pin", `pin-${color}`, className)} aria-hidden="true">
      <i />
    </span>
  );
}

export default PushPin;
