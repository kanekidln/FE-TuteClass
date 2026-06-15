import { useEffect, useState } from "react";
import { MainHeader } from "./components/MainHeader";
import { StudentNotebookWorkspace } from "./features/student/notebook";
import { AssignmentFeature } from "./features/teacher/assignments";
import { LandingPage } from "./features/teacher/landingpage";
import { TeacherScheduleWorkspace } from "./features/teacher/schedule";

type Workspace = "student" | "teacher";
type TeacherFeature = "landing" | "schedule" | "assignments";

type AppRoute =
  | {
      workspace: "student";
    }
  | {
      workspace: "teacher";
      feature: TeacherFeature;
    };

const DEFAULT_WORKSPACE: Workspace = "student";
const DEFAULT_STUDENT_ROUTE: AppRoute = { workspace: "student" };
const DEFAULT_TEACHER_ROUTE: AppRoute = { workspace: "teacher", feature: "landing" };

function getRouteFromHash(hash: string): AppRoute {
  const [workspace, feature] = hash.replace(/^#\/?/, "").split("/");

  if (workspace === "teacher") {
    if (feature === "schedule" || feature === "assignments" || feature === "landing") {
      return { workspace, feature };
    }

    return DEFAULT_TEACHER_ROUTE;
  }

  return DEFAULT_STUDENT_ROUTE;
}

function getHashFromRoute(route: AppRoute) {
  if (route.workspace === "student") {
    return "#student";
  }

  return `#${route.workspace}/${route.feature}`;
}

function getDefaultRouteForWorkspace(workspace: Workspace): AppRoute {
  return workspace === "teacher" ? { ...DEFAULT_TEACHER_ROUTE } : { ...DEFAULT_STUDENT_ROUTE };
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash(window.location.hash));

  useEffect(() => {
    const syncRoute = () => {
      setRoute(getRouteFromHash(window.location.hash));
    };

    if (!window.location.hash) {
      window.history.replaceState(null, "", getHashFromRoute(DEFAULT_STUDENT_ROUTE));
    }

    syncRoute();
    window.addEventListener("hashchange", syncRoute);

    return () => {
      window.removeEventListener("hashchange", syncRoute);
    };
  }, []);

  const handleWorkspaceChange = (workspace: Workspace) => {
    const nextRoute = getDefaultRouteForWorkspace(workspace);
    const nextHash = getHashFromRoute(nextRoute);

    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
      return;
    }

    setRoute(nextRoute);
  };

  const activeWorkspace = route.workspace;
  const activeFeature = route.workspace === "teacher" ? route.feature : undefined;

  return (
    <>
      <MainHeader activeFeature={activeFeature} activeWorkspace={activeWorkspace} onWorkspaceChange={handleWorkspaceChange} />
      {route.workspace === "student" && <StudentNotebookWorkspace />}
      {route.workspace === "teacher" && route.feature === "landing" && <LandingPage />}
      {route.workspace === "teacher" && route.feature === "schedule" && <TeacherScheduleWorkspace />}
      {route.workspace === "teacher" && route.feature === "assignments" && <AssignmentFeature />}
    </>
  );
}
