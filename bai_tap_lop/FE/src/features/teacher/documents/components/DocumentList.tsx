import { FileText, Image, Link } from "lucide-react";
import clsx from "clsx";
import { ClassDocumentRow } from "./DocumentRow";
import type { ClassDocumentItem, TeacherDocumentType } from "../types/teacherDocuments.types";

type DocumentListProps = {
  activeType: TeacherDocumentType;
  items: ClassDocumentItem[];
};

function DocumentList({ activeType, items }: DocumentListProps) {
  const Icon = activeType === "link" ? Link : activeType === "file" ? FileText : Image;
  const title = activeType === "link" ? "Link" : activeType === "file" ? "File" : "Ảnh";

  if (activeType === "image") {
    return (
      <section className="teacher-doc-list-card image-list-card">
        <div className={clsx("doc-list-title", `title-${activeType}`)}>
          <Icon size={33} />
          <h2>{title}</h2>
        </div>
        <div className="teacher-doc-image-grid">
          {items.map((item) => (
            <button className="teacher-doc-image-card" type="button" key={item.id}>
              <span className={clsx("image-thumb", item.thumbnailTone)} />
              <strong>
                <Image size={19} />
                {item.title}
              </strong>
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={clsx("teacher-doc-list-card", `list-${activeType}`)}>
      <div className={clsx("doc-list-title", `title-${activeType}`)}>
        <Icon size={33} />
        <h2>{title}</h2>
      </div>
      <div className={clsx("teacher-doc-class-list", activeType === "file" && "file-grid")}>
        {items.map((item) => (
          <ClassDocumentRow item={item} activeType={activeType} key={item.id} />
        ))}
      </div>
    </section>
  );
}

export default DocumentList;
