import { Leaf, Lightbulb, Pencil } from "lucide-react";
import clsx from "clsx";
import type { DoodleIconName, OverviewSvgIcon } from "../types/teacherOverview.types";

const doodleIcons: Record<DoodleIconName, OverviewSvgIcon> = {
  pencil: Pencil,
  leaf: Leaf,
  lightbulb: Lightbulb,
};

type DoodleIconProps = {
  name: DoodleIconName;
  className?: string;
};

function DoodleIcon({ name, className }: DoodleIconProps) {
  const Icon = doodleIcons[name];

  return <Icon className={clsx("overview-doodle", `doodle-${name}`, className)} aria-hidden="true" />;
}

export default DoodleIcon;
