import { useEffect, useState } from "react";
import { MainHeader } from "./components/MainHeader";
import { StudentNotebookWorkspace } from "./features/student/notebook";
import { TeacherScheduleWorkspace } from "./features/teacher/schedule";

type Workspace = "student" | "teacher";

const DEFAULT_WORKSPACE: Workspace = "student";

function getWorkspaceFromHash(hash: string): Workspace {
  return hash === "#teacher" ? "teacher" : DEFAULT_WORKSPACE;
}

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(() => getWorkspaceFromHash(window.location.hash));

  useEffect(() => {
    const syncWorkspace = () => {
      setActiveWorkspace(getWorkspaceFromHash(window.location.hash));
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

  return (
    <>
      <MainHeader activeWorkspace={activeWorkspace} onWorkspaceChange={handleWorkspaceChange} />
      {activeWorkspace === "teacher" ? <TeacherScheduleWorkspace /> : <StudentNotebookWorkspace />}
    </>
  );
}
