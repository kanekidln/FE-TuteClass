import { ChevronRight, FileText, Globe2, Image, Link } from "lucide-react";
import clsx from "clsx";
import type { ClassDocumentItem, SessionDocumentItem, TeacherDocumentType } from "../types/teacherDocuments.types";

type SessionRowProps = {
  item: SessionDocumentItem;
};

export function SessionDocumentRow({ item }: SessionRowProps) {
  return (
    <button className="teacher-doc-session-row" type="button">
      <span className={clsx("session-badge", `tone-${item.tone}`)}>{item.sessionLabel}</span>
      <span className="session-divider" aria-hidden="true" />
      <strong>{item.title}</strong>
      <span className="session-count count-link">
        <Link size={21} />
        {item.linkCount}
      </span>
      <span className="session-count count-file">
        <FileText size={21} />
        {item.fileCount}
      </span>
      <span className="session-count count-image">
        <Image size={21} />
        {item.imageCount}
      </span>
      <ChevronRight className="session-arrow" size={28} />
    </button>
  );
}

type ClassRowProps = {
  item: ClassDocumentItem;
  activeType: TeacherDocumentType;
};

function getFileClass(fileKind: ClassDocumentItem["fileKind"]) {
  return fileKind ? `file-${fileKind}` : "file-pdf";
}

export function ClassDocumentRow({ item, activeType }: ClassRowProps) {
  const Icon = activeType === "link" ? Globe2 : activeType === "image" ? Image : FileText;

  return (
    <button className={clsx("teacher-doc-class-row", `row-${activeType}`)} type="button">
      <span className={clsx("class-row-icon", activeType === "file" && getFileClass(item.fileKind))}>
        <Icon size={24} />
      </span>
      <strong>{item.title}</strong>
      <ChevronRight size={25} />
    </button>
  );
}
