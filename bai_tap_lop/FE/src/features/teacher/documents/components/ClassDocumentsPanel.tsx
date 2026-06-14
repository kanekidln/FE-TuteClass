import { Users } from "lucide-react";
import DocumentList from "./DocumentList";
import DocumentTypeTabs from "./DocumentTypeTabs";
import { classDocumentsByType } from "../constants/teacherDocuments.constants";
import type { TeacherDocumentType } from "../types/teacherDocuments.types";

type ClassDocumentsPanelProps = {
  className: string;
  activeType: TeacherDocumentType;
  onTypeChange: (type: TeacherDocumentType) => void;
};

function ClassDocumentsPanel({ className, activeType, onTypeChange }: ClassDocumentsPanelProps) {
  const documents = classDocumentsByType[activeType];

  return (
    <div className="teacher-doc-panel-content">
      <div className="teacher-doc-panel-top">
        <span className="teacher-doc-class-badge">
          <Users size={27} />
          {className}
        </span>
        <DocumentTypeTabs activeType={activeType} onChange={onTypeChange} />
      </div>
      <DocumentList activeType={activeType} items={documents} />
    </div>
  );
}

export default ClassDocumentsPanel;
