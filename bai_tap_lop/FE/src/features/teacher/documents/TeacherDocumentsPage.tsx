import DocumentsHeader from "./components/DocumentsHeader";
import DocumentTabs from "./components/DocumentTabs";
import ClassDocumentsPanel from "./components/ClassDocumentsPanel";
import SessionDocumentsPanel from "./components/SessionDocumentsPanel";
import PaperCard from "./components/PaperCard";
import PaperClip from "./components/PaperClip";
import PushPin from "./components/PushPin";
import Tape from "./components/Tape";
import DoodleDecoration from "./components/DoodleDecoration";
import { createTeacherDocumentsHash } from "./utils/teacherDocumentsRoute";
import type { TeacherDocumentType, TeacherDocumentsPageProps, TeacherDocumentsScope } from "./types/teacherDocuments.types";
import "./teacherDocuments.css";

function TeacherDocumentsPage({ classId, className, scope, type }: TeacherDocumentsPageProps) {
  const navigateDocuments = (nextScope: TeacherDocumentsScope, nextType: TeacherDocumentType = "link") => {
    window.history.pushState(null, "", createTeacherDocumentsHash(className, nextScope, nextType));
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  return (
    <main className="teacher-documents-page" data-class-id={classId}>
      <Tape className="doc-page-left-tape" tone="green" />
      <Tape className="doc-page-right-tape-blue" tone="blue" />
      <Tape className="doc-page-right-tape-green" tone="green" />
      <Tape className="doc-page-right-tape-orange" tone="orange" />
      <PaperClip className="doc-page-side-clip" tone="black" />
      <span className="doc-page-binder" aria-hidden="true">
        <i />
      </span>
      <DoodleDecoration kind="paper-plane" className="doc-page-plane" />

      <DocumentsHeader />

      <section className="teacher-doc-body">
        <DocumentTabs activeScope={scope} onChange={(nextScope) => navigateDocuments(nextScope, "link")} />

        <PaperCard className="teacher-doc-content-card">
          <PushPin className="doc-content-pin" />
          <PaperClip className="doc-content-clip" tone="green" />
          {scope === "class" ? (
            <ClassDocumentsPanel className={className} activeType={type} onTypeChange={(nextType) => navigateDocuments("class", nextType)} />
          ) : (
            <SessionDocumentsPanel className={className} />
          )}
        </PaperCard>
      </section>
    </main>
  );
}

export default TeacherDocumentsPage;
