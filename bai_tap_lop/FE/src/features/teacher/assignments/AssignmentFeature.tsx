import { useEffect, useState } from "react";
import { AssignmentCreatePage } from "./pages/AssignmentCreatePage";
import { AssignmentDetailPage } from "./pages/AssignmentDetailPage";
import { AssignmentEditPage } from "./pages/AssignmentEditPage";
import { AssignmentGradingPage } from "./pages/AssignmentGradingPage";
import { AssignmentOverviewPage } from "./pages/AssignmentOverviewPage";
import type { AssignmentView } from "./types";
import "./assignments.css";

export function AssignmentFeature() {
  const [view, setView] = useState<AssignmentView>("overview");

  useEffect(() => {
    const resetToOverview = () => {
      if (window.location.hash.startsWith("#teacher/assignments")) {
        setView("overview");
      }
    };

    window.addEventListener("hashchange", resetToOverview);

    return () => {
      window.removeEventListener("hashchange", resetToOverview);
    };
  }, []);

  return (
    <div className="assignment-feature">
      {view === "overview" && <AssignmentOverviewPage onNavigate={setView} />}
      {view === "create" && <AssignmentCreatePage onNavigate={setView} />}
      {view === "edit" && <AssignmentEditPage onNavigate={setView} />}
      {view === "detail" && <AssignmentDetailPage onNavigate={setView} />}
      {view === "grading" && <AssignmentGradingPage onNavigate={setView} />}
    </div>
  );
}
