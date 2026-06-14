import { useEffect } from "react";
import TeacherSchedulePage from "./components/TeacherSchedulePage";
import "./teacherShell.css";

interface TeacherScheduleWorkspaceProps {
  reopenLessonDetail?: boolean;
}

export function TeacherScheduleWorkspace({ reopenLessonDetail = false }: TeacherScheduleWorkspaceProps) {
  useEffect(() => {
    document.title = "Tuteclass - Lịch dạy";
  }, []);

  return (
    <div className="teacher-shell">
      <TeacherSchedulePage initialLessonModalOpen={reopenLessonDetail} />
    </div>
  );
}
