import { CalendarDays, Users } from "lucide-react";
import clsx from "clsx";
import { teacherDocumentTabs } from "../constants/teacherDocuments.constants";
import type { TeacherDocumentsScope } from "../types/teacherDocuments.types";

type DocumentTabsProps = {
  activeScope: TeacherDocumentsScope;
  onChange: (scope: TeacherDocumentsScope) => void;
};

function DocumentTabs({ activeScope, onChange }: DocumentTabsProps) {
  return (
    <div className="teacher-doc-main-tabs" role="tablist" aria-label="Nhóm tài liệu">
      {teacherDocumentTabs.map((tab) => {
        const Icon = tab.id === "class" ? Users : CalendarDays;

        return (
          <button
            className={clsx("teacher-doc-main-tab", activeScope === tab.id && "is-active")}
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
          >
            <Icon size={25} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default DocumentTabs;
