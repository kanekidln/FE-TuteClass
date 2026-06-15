import { useEffect, useState } from "react";
import { MainHeader } from "./components/MainHeader";
import { StudentNotebookWorkspace } from "./features/student/notebook";
import { TeacherScheduleWorkspace } from "./features/teacher/schedule";
import { TeacherOverviewPage } from "./features/teacher/overview";
import { TeacherDocumentsPage } from "./features/teacher/documents";
import { AssignmentFeature } from "./features/teacher/assignments";
import { TeacherNotebookShell, type TeacherNotebookSection } from "./features/teacher/layout";
import {
  parseTeacherOverviewHash,
  type TeacherOverviewRouteParams,
  type TeacherOverviewRouteState,
} from "./features/teacher/overview/utils/teacherOverviewRoute";
import { parseTeacherDocumentsHash } from "./features/teacher/documents/utils/teacherDocumentsRoute";
import type { TeacherDocumentsRouteParams } from "./features/teacher/documents";

type Workspace = "student" | "teacher";
type TeacherRoute =
  | { view: "schedule"; reopenLessonDetail: boolean }
  | { view: "assignments" }
  | { view: "overview"; params: TeacherOverviewRouteParams }
  | { view: "documents"; params: TeacherDocumentsRouteParams };

const DEFAULT_WORKSPACE: Workspace = "student";

function getWorkspaceFromHash(hash: string): Workspace {
  return hash.startsWith("#teacher") ? "teacher" : DEFAULT_WORKSPACE;
}

function getTeacherRouteFromHash(hash: string): TeacherRoute {
  if (hash.startsWith("#teacher/assignments")) {
    return { view: "assignments" };
  }

  const documentsParams = parseTeacherDocumentsHash(hash);

  if (documentsParams) {
    return { view: "documents", params: documentsParams };
  }

  const overviewParams = parseTeacherOverviewHash(hash);

  if (overviewParams) {
    return { view: "overview", params: overviewParams };
  }

  const state = window.history.state as TeacherOverviewRouteState | null;

  return { view: "schedule", reopenLessonDetail: Boolean(state?.returnToLessonDetail) };
}

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(() => getWorkspaceFromHash(window.location.hash));
  const [teacherRoute, setTeacherRoute] = useState<TeacherRoute>(() => getTeacherRouteFromHash(window.location.hash));

  useEffect(() => {
    const syncWorkspace = () => {
      setActiveWorkspace(getWorkspaceFromHash(window.location.hash));
      setTeacherRoute(getTeacherRouteFromHash(window.location.hash));
    };

    if (!window.location.hash) {
      window.history.replaceState(null, "", "#student");
    }

    syncWorkspace();
    window.addEventListener("hashchange", syncWorkspace);

    return () => {
      window.removeEventListener("hashchange", syncWorkspace);
    };
  }, []);

  const handleWorkspaceChange = (workspace: Workspace) => {
    const nextHash = `#${workspace}`;

    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
      return;
    }

    setActiveWorkspace(workspace);
  };

  const activeTeacherSection: TeacherNotebookSection =
    teacherRoute.view === "overview"
      ? "overview"
      : teacherRoute.view === "documents"
        ? "resources"
        : teacherRoute.view === "assignments"
          ? "assignments"
          : "schedule";
  const activeTeacherClassName =
    teacherRoute.view === "schedule" || teacherRoute.view === "assignments" ? "Web Foundation K12" : teacherRoute.params.className;

  const teacherContent =
    teacherRoute.view === "assignments" ? (
      <AssignmentFeature />
    ) : teacherRoute.view === "documents" ? (
      <TeacherDocumentsPage
        classId={teacherRoute.params.classId}
        className={teacherRoute.params.className}
        scope={teacherRoute.params.scope}
        type={teacherRoute.params.type}
      />
    ) : teacherRoute.view === "overview" ? (
      <TeacherOverviewPage classId={teacherRoute.params.classId} className={teacherRoute.params.className} />
    ) : (
      <TeacherScheduleWorkspace reopenLessonDetail={teacherRoute.reopenLessonDetail} />
    );

  return (
    <>
      <MainHeader
        activeFeature={
          activeWorkspace === "teacher" ? (teacherRoute.view === "assignments" ? "assignments" : teacherRoute.view === "overview" ? "landing" : "schedule") : undefined
        }
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={handleWorkspaceChange}
      />
      {activeWorkspace === "teacher" ? (
        <TeacherNotebookShell activeClassName={activeTeacherClassName} activeSection={activeTeacherSection}>
          {teacherContent}
        </TeacherNotebookShell>
      ) : (
        <StudentNotebookWorkspace />
      )}
    </>
  );
}
