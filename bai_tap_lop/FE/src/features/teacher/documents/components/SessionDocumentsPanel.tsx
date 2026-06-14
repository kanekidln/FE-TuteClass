import { ArrowDownUp, Users } from "lucide-react";
import { sessionDocuments } from "../constants/teacherDocuments.constants";
import { SessionDocumentRow } from "./DocumentRow";

type SessionDocumentsPanelProps = {
  className: string;
};

function SessionDocumentsPanel({ className }: SessionDocumentsPanelProps) {
  return (
    <div className="teacher-doc-panel-content">
      <div className="teacher-doc-panel-top">
        <span className="teacher-doc-class-badge">
          <Users size={27} />
          {className}
        </span>
        <button className="teacher-doc-sort-button" type="button">
          <ArrowDownUp size={21} />
          Sắp xếp: buổi mới → cũ, theo tên
        </button>
      </div>

      <div className="teacher-doc-session-list">
        {sessionDocuments.map((item) => (
          <SessionDocumentRow item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default SessionDocumentsPanel;
