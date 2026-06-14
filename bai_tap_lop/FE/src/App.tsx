import { useEffect, useState } from "react";
import { MainHeader } from "./components/MainHeader";
import { StudentNotebookWorkspace } from "./features/student/notebook";
import { TeacherScheduleWorkspace } from "./features/teacher/schedule";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

type Workspace = "student" | "teacher";
type AppRoute = Workspace | "login" | "register";

const DEFAULT_WORKSPACE: Workspace = "student";

function getRouteFromHash(hash: string): AppRoute {
  if (hash === "#teacher") {
    return "teacher";
  }

  if (hash === "#register") {
    return "register";
  }

  if (hash === "#login") {
    return "login";
  }

  return DEFAULT_WORKSPACE;
}

export default function App() {
  const [activeRoute, setActiveRoute] = useState<AppRoute>(() => getRouteFromHash(window.location.hash));
  const activeWorkspace: Workspace = activeRoute === "teacher" ? "teacher" : "student";

  useEffect(() => {
    const syncRoute = () => {
      setActiveRoute(getRouteFromHash(window.location.hash));
    };

    if (!window.location.hash) {
      window.history.replaceState(null, "", "#student");
    }

    syncRoute();
    window.addEventListener("hashchange", syncRoute);

    return () => {
      window.removeEventListener("hashchange", syncRoute);
    };
  }, []);

  const handleWorkspaceChange = (workspace: Workspace) => {
    const nextHash = `#${workspace}`;

    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
      return;
    }

    setActiveRoute(workspace);
  };

  return (
    <>
      <MainHeader activeWorkspace={activeWorkspace} onWorkspaceChange={handleWorkspaceChange} />
      {activeRoute === "login" ? (
        <LoginPage />
      ) : activeRoute === "register" ? (
        <RegisterPage />
      ) : activeRoute === "teacher" ? (
        <TeacherScheduleWorkspace />
      ) : (
        <StudentNotebookWorkspace />
      )}
    </>
  );
}
