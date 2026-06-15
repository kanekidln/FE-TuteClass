import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, CalendarDays, ChevronLeft, ChevronRight, FileText, Home, MessageSquare, Timer } from "lucide-react";
import { SpiralBinding } from "../../../components/SpiralBinding";
import { useFlipTransition } from "../../student/notebook/hooks/useFlipTransition";
import { createTeacherDocumentsHash } from "../documents/utils/teacherDocumentsRoute";
import { createTeacherOverviewHash } from "../overview/utils/teacherOverviewRoute";
import type { TeacherDocumentsScope } from "../documents";
import "./TeacherNotebookShell.css";

export type TeacherNotebookSection = "overview" | "schedule" | "resources" | "assignments" | "discussion";

type TeacherNotebookShellProps = {
  activeClassName: string;
  activeSection: TeacherNotebookSection;
  renderPage: (section: TeacherNotebookSection) => ReactNode;
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
  { key: "assignments", label: "Bài tập", icon: Timer },
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

  if (section === "assignments") {
    return "#teacher/assignments";
  }

  return "#teacher";
}

function navigateHash(hash: string) {
  window.history.pushState(null, "", hash);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

function getSectionIndex(section: TeacherNotebookSection) {
  const index = teacherSections.findIndex((item) => item.key === section);
  return index < 0 ? 0 : index;
}

type TeacherPageFrameProps = {
  children: ReactNode;
  faceBackOnly?: boolean;
  mode: "static" | "under" | "outgoing" | "incoming";
  onTransitionComplete?: () => void;
  section: TeacherNotebookSection;
};

function TeacherPageFrame({ children, faceBackOnly = false, mode, onTransitionComplete, section }: TeacherPageFrameProps) {
  const [animate, setAnimate] = useState(mode === "static" || mode === "under");

  useEffect(() => {
    setAnimate(mode === "static" || mode === "under");
  }, [mode, section]);

  useEffect(() => {
    if (mode === "static" || mode === "under") {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setAnimate(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [mode, section]);

  const transform =
    mode === "incoming"
      ? animate
        ? "rotateY(0deg)"
        : "rotateY(-176deg)"
      : mode === "outgoing"
        ? animate
          ? "rotateY(-176deg)"
          : "rotateY(0deg)"
        : "rotateY(0deg)";

  const className = [
    "teacher-spread-page",
    mode === "static" ? "page-static" : "",
    mode === "under" ? "page-under" : "",
    mode === "outgoing" ? "page-outgoing" : "",
    mode === "incoming" ? "page-incoming" : "",
    (mode === "outgoing" || mode === "incoming") && animate ? "turning" : "",
    faceBackOnly ? "face-back-only" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={className} data-section={section} onTransitionEnd={mode === "outgoing" || mode === "incoming" ? onTransitionComplete : undefined} style={{ transform }}>
      <div className="teacher-spread-leaf">
        <div className="teacher-spread-face teacher-spread-face-front">
          <div className="teacher-spread-page-shell">
            <div className="teacher-notebook-content">{children}</div>
            <div className="teacher-spread-page-curl" />
          </div>
        </div>
        <div className="teacher-spread-face teacher-spread-face-back">
          <div className="teacher-spread-page-backdrop" />
          <div className="teacher-spread-page-backshade" />
        </div>
      </div>
    </section>
  );
}

type TeacherFlipBookProps = {
  accelerateTransition: boolean;
  currentIndex: number;
  faceBackOnly: boolean;
  onTransitionComplete: () => void;
  renderPage: (section: TeacherNotebookSection) => ReactNode;
  transition: { fromIndex: number; toIndex: number; forward: boolean } | null;
};

function TeacherFlipBook({ accelerateTransition, currentIndex, faceBackOnly, onTransitionComplete, renderPage, transition }: TeacherFlipBookProps) {
  const pageNodes = useMemo(() => {
    const currentSection = teacherSections[currentIndex].key;

    if (!transition) {
      return <TeacherPageFrame key={currentSection} mode="static" section={currentSection}>{renderPage(currentSection)}</TeacherPageFrame>;
    }

    const fromSection = teacherSections[transition.fromIndex].key;
    const toSection = teacherSections[transition.toIndex].key;

    if (transition.forward) {
      return (
        <>
          <TeacherPageFrame key={`${toSection}-under`} mode="under" section={toSection}>{renderPage(toSection)}</TeacherPageFrame>
          <TeacherPageFrame faceBackOnly={faceBackOnly} key={`${fromSection}-out`} mode="outgoing" onTransitionComplete={onTransitionComplete} section={fromSection}>{renderPage(fromSection)}</TeacherPageFrame>
        </>
      );
    }

    return (
      <>
        <TeacherPageFrame key={`${fromSection}-under`} mode="under" section={fromSection}>{renderPage(fromSection)}</TeacherPageFrame>
        <TeacherPageFrame key={`${toSection}-in`} mode="incoming" onTransitionComplete={onTransitionComplete} section={toSection}>{renderPage(toSection)}</TeacherPageFrame>
      </>
    );
  }, [currentIndex, faceBackOnly, onTransitionComplete, renderPage, transition]);

  return (
    <div
      className={`teacher-flip-stage ${accelerateTransition ? "is-accelerating" : ""}`}
      style={{ ["--teacher-turn-duration" as string]: accelerateTransition ? "240ms" : "1080ms" }}
    >
      <div className="teacher-spread-book">{pageNodes}</div>
    </div>
  );
}

export function TeacherNotebookShell({ activeClassName, activeSection, renderPage }: TeacherNotebookShellProps) {
  const currentClass = teacherClasses.find((item) => item.name === activeClassName) ?? teacherClasses[0];
  const [currentIndex, setCurrentIndex] = useState(() => getSectionIndex(activeSection));
  const transitionController = useFlipTransition({
    currentIndex,
    pageCount: teacherSections.length,
    setCurrentIndex,
  });

  useEffect(() => {
    const nextIndex = getSectionIndex(activeSection);
    if (!transitionController.transition && nextIndex !== currentIndex) {
      transitionController.goToIndex(nextIndex, { animate: false });
    }
  }, [activeSection, currentIndex, transitionController]);

  const handleClassChange = (className: string) => {
    navigateHash(getSectionHash(activeSection, className));
  };

  const handleSectionChange = (section: TeacherNotebookSection) => {
    const hash = getSectionHash(section, currentClass.name);

    if (section === activeSection) {
      navigateHash(hash);
      return;
    }

    const targetIndex = teacherSections.findIndex((item) => item.key === section);
    transitionController.goToIndex(targetIndex, { animate: true });
    navigateHash(hash);
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

        <section className={`teacher-notebook-container ${transitionController.transition ? "is-page-turning" : ""} ${transitionController.spiralHidden ? "spiral-hidden" : ""}`} aria-label="Teacher notebook">
          <SpiralBinding />
          <span className="teacher-shell-tape" aria-hidden="true" />
          <span className="teacher-shell-paperclip" aria-hidden="true" />
          <BookOpen className="teacher-shell-doodle" aria-hidden="true" />
          <TeacherFlipBook
            accelerateTransition={transitionController.accelerateTransition}
            currentIndex={currentIndex}
            faceBackOnly={transitionController.faceBackOnly}
            onTransitionComplete={transitionController.completeTransition}
            renderPage={renderPage}
            transition={transitionController.transition}
          />
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
              onClick={() => handleSectionChange(section.key)}
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
