import { useEffect } from "react";
import TeacherSchedulePage from "./components/TeacherSchedulePage";
import "./teacherShell.css";

export function TeacherScheduleWorkspace() {
  useEffect(() => {
    document.title = "Tuteclass - Lịch dạy";
  }, []);

  return (
    <div className="teacher-shell">
      <TeacherSchedulePage />
    </div>
  );
}
