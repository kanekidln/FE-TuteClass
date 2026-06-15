import { FileText, Image, Link } from "lucide-react";
import clsx from "clsx";
import { teacherDocumentTypeTabs } from "../constants/teacherDocuments.constants";
import type { TeacherDocumentType } from "../types/teacherDocuments.types";

type DocumentTypeTabsProps = {
  activeType: TeacherDocumentType;
  onChange: (type: TeacherDocumentType) => void;
};

function DocumentTypeTabs({ activeType, onChange }: DocumentTypeTabsProps) {
  return (
    <div className="teacher-doc-type-tabs" role="tablist" aria-label="Loại tài liệu">
      {teacherDocumentTypeTabs.map((tab) => {
        const Icon = tab.id === "link" ? Link : tab.id === "file" ? FileText : Image;

        return (
          <button
            className={clsx("teacher-doc-type-tab", `type-${tab.id}`, activeType === tab.id && "is-active")}
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
          >
            <Icon size={24} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default DocumentTypeTabs;
