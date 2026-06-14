import type { CSSProperties } from "react";
import { BarChart3, CalendarDays, ClipboardCheck, Star, WalletCards } from "lucide-react";
import clsx from "clsx";
import PushPin from "./PushPin";
import type { OverviewSvgIcon, TeacherStat, TeacherStatIcon } from "../types/teacherOverview.types";

const statIcons: Record<TeacherStatIcon, OverviewSvgIcon> = {
  star: Star,
  wallet: WalletCards,
  checklist: ClipboardCheck,
  calendar: CalendarDays,
  chart: BarChart3,
};

const pinColors: Record<TeacherStat["color"], "green" | "orange" | "pink" | "blue" | "purple"> = {
  green: "green",
  yellow: "orange",
  pink: "pink",
  blue: "blue",
  purple: "purple",
};

type StatStickyNoteProps = {
  stat: TeacherStat;
};

function StatStickyNote({ stat }: StatStickyNoteProps) {
  const Icon = statIcons[stat.icon];

  return (
    <section
      className={clsx("overview-stat-note", `stat-${stat.color}`)}
      style={{ "--note-rotation": `${stat.rotation}deg` } as CSSProperties}
    >
      <PushPin color={pinColors[stat.color]} />
      <Icon className="overview-stat-icon" aria-hidden="true" />
      <h2>{stat.title}</h2>
      <strong>{stat.value}</strong>
      {stat.detail ? <span>{stat.detail}</span> : null}
    </section>
  );
}

export default StatStickyNote;
