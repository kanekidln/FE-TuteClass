import clsx from "clsx";

type PushPinProps = {
  className?: string;
};

function PushPin({ className }: PushPinProps) {
  return <span className={clsx("teacher-doc-push-pin", className)} aria-hidden="true" />;
}

export default PushPin;
