import type { ReactNode } from "react";
import { BookOpen, CalendarDays, ChevronLeft, ChevronRight, FileText, Home, MessageSquare, Timer } from "lucide-react";
import { createTeacherDocumentsHash } from "../documents/utils/teacherDocumentsRoute";
import { createTeacherOverviewHash } from "../overview/utils/teacherOverviewRoute";
import type { TeacherDocumentsScope } from "../documents";
import "./TeacherNotebookShell.css";

export type TeacherNotebookSection = "overview" | "schedule" | "resources" | "assignments" | "discussion";

type TeacherNotebookShellProps = {
  activeClassName: string;
  activeSection: TeacherNotebookSection;
  children: ReactNode;
};

const teacherClasses = [
  { id: "web-foundation", name: "Web Foundation K12", teacher: "Cô Lan", themeClass: "current-class" },
  { id: "math-9a", name: "Toán 9A", teacher: "Cô Lan", themeClass: "english-class" },
  { id: "physics-9a", name: "Vật lý 9A", teacher: "Thầy Minh", themeClass: "physics-class" },
  { id: "literature-9a", name: "Ngữ văn 9A", teacher: "Cô Hoa", themeClass: "literature-class" },
];

const teacherSections: Array<{
  key: TeacherNotebookSection;
  label: string;
  disabled?: boolean;
  icon: typeof Home;
}> = [
  { key: "overview", label: "Tổng quan", icon: Home },
  { key: "schedule", label: "Lịch dạy", icon: CalendarDays },
  { key: "assignments", label: "Bài tập", icon: Timer, disabled: true },
  { key: "resources", label: "Tài liệu", icon: FileText },
  { key: "discussion", label: "Trao đổi", icon: MessageSquare, disabled: true },
];

function getSectionHash(section: TeacherNotebookSection, className: string): string {
  if (section === "overview") {
    return createTeacherOverviewHash(className);
  }

  if (section === "resources") {
    return createTeacherDocumentsHash(className, "sessions" satisfies TeacherDocumentsScope);
  }

  return "#teacher";
}

function navigateHash(hash: string) {
  window.history.pushState(null, "", hash);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function TeacherNotebookShell({ activeClassName, activeSection, children }: TeacherNotebookShellProps) {
  const currentClass = teacherClasses.find((item) => item.name === activeClassName) ?? teacherClasses[0];

  const handleClassChange = (className: string) => {
    navigateHash(getSectionHash(activeSection, className));
  };

  return (
    <main className="teacher-notebook-stage">
      <div className="teacher-notebook-page-shell">
        <div className="teacher-class-tab-list">
          <button type="button" className="teacher-class-tab-nav prev" aria-label="Xem lớp trước">
            <ChevronLeft size={25} />
          </button>
          {teacherClasses.map((item) => {
            const isActive = item.id === currentClass.id;

            return (
              <div className={`teacher-class-fold-tab-wrap ${isActive ? "current-tab-wrap" : ""}`} key={item.id}>
                <button type="button" className="teacher-class-fold-tab-button" onClick={() => handleClassChange(item.name)}>
                  <div className={`teacher-class-fold-tab ${item.themeClass} ${isActive ? "is-active" : ""}`}>
                    <div>
                      <span>{item.name}</span>
                      {isActive ? <b>★</b> : null}
                    </div>
                    <small>{item.teacher}</small>
                  </div>
                </button>
              </div>
            );
          })}
          <button type="button" className="teacher-class-tab-nav next" aria-label="Xem lớp tiếp theo">
            <ChevronRight size={25} />
          </button>
        </div>

        <section className="teacher-notebook-container" aria-label="Teacher notebook">
          <div className="teacher-notebook-spiral" aria-hidden="true">
            {Array.from({ length: 14 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <span className="teacher-shell-tape" aria-hidden="true" />
          <span className="teacher-shell-paperclip" aria-hidden="true" />
          <BookOpen className="teacher-shell-doodle" aria-hidden="true" />
          <div className="teacher-notebook-content">{children}</div>
        </section>
      </div>

      <nav className="teacher-side-page-markers" aria-label="Teacher sections">
        {teacherSections.map((section) => {
          const Icon = section.icon;
          const isActive = section.key === activeSection;

          return (
            <button
              className={`teacher-page-marker ${section.key} ${isActive ? "active" : ""}`}
              disabled={section.disabled}
              key={section.key}
              onClick={() => navigateHash(getSectionHash(section.key, currentClass.name))}
              type="button"
            >
              <Icon size={28} />
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>
    </main>
  );
}

export default TeacherNotebookShell;
