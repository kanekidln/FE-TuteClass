import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { SpiralBinding } from "../../../components/SpiralBinding";
import { ClassTabs } from "../../student/notebook/components/ClassTabs";
import { SidePageMarkers } from "../../student/notebook/components/SidePageMarkers";
import { useFlipTransition } from "../../student/notebook/hooks/useFlipTransition";
import type { ClassKey, ClassTabItem, SectionKey, SectionMarkerItem } from "../../student/notebook";
import { createTeacherDocumentsHash } from "../documents/utils/teacherDocumentsRoute";
import { createTeacherOverviewHash } from "../overview/utils/teacherOverviewRoute";
import type { TeacherDocumentsScope } from "../documents";
import "./TeacherNotebookShell.css";

export type TeacherNotebookSection = SectionKey;

type TeacherNotebookShellProps = {
  activeClassName: string;
  activeSection: TeacherNotebookSection;
  renderPage: (section: TeacherNotebookSection) => ReactNode;
};

const teacherClasses: ClassTabItem[] = [
  { key: "math", name: "Web Foundation K12", teacher: "Cô Lan", themeClass: "current-class" },
  { key: "english", name: "Toán 9A", teacher: "Cô Lan", themeClass: "english-class" },
  { key: "physics", name: "Vật lý 9A", teacher: "Thầy Minh", themeClass: "physics-class" },
  { key: "literature", name: "Ngữ văn 9A", teacher: "Cô Hoa", themeClass: "literature-class" },
];

const teacherSections: SectionMarkerItem[] = [
  { key: "overview", label: "Tổng quan" },
  { key: "schedule", label: "Lịch dạy" },
  { key: "assignments", label: "Bài tập" },
  { key: "resources", label: "Tài liệu" },
  { key: "discussion", label: "Trao đổi" },
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

  if (section === "discussion") {
    return "#teacher/discussions";
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
    "spread-page",
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
      <div className="spread-leaf teacher-spread-leaf">
        <div className="spread-face spread-face-front teacher-spread-face teacher-spread-face-front">
          <div className="spread-page-shell teacher-spread-page-shell">
            <div className="teacher-notebook-content">{children}</div>
            <div className="spread-page-curl teacher-spread-page-curl" />
          </div>
        </div>
        <div className="spread-face spread-face-back teacher-spread-face teacher-spread-face-back">
          <div className="spread-page-backdrop teacher-spread-page-backdrop" />
          <div className="spread-page-backshade teacher-spread-page-backshade" />
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
      className={`notebook-flip-stage teacher-flip-stage ${accelerateTransition ? "is-accelerating" : ""}`}
      style={{
        ["--teacher-turn-duration" as string]: accelerateTransition ? "240ms" : "1080ms",
        ["--turn-duration" as string]: accelerateTransition ? "240ms" : "1080ms",
      }}
    >
      <div className="spread-book teacher-spread-book">{pageNodes}</div>
    </div>
  );
}

export function TeacherNotebookShell({ activeClassName, activeSection, renderPage }: TeacherNotebookShellProps) {
  const initialClass = teacherClasses.find((item) => item.name === activeClassName) ?? teacherClasses[0];
  const [activeClassKey, setActiveClassKey] = useState<ClassKey>(initialClass.key);
  const currentClass = teacherClasses.find((item) => item.key === activeClassKey) ?? initialClass;
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

  useEffect(() => {
    setActiveClassKey(initialClass.key);
  }, [initialClass.key]);

  const handleClassChange = (classKey: ClassKey) => {
    const nextClass = teacherClasses.find((item) => item.key === classKey) ?? currentClass;
    setActiveClassKey(nextClass.key);
    navigateHash(getSectionHash(activeSection, nextClass.name));
  };

  const handlePreviousClass = () => {
    const currentClassIndex = teacherClasses.findIndex((item) => item.key === currentClass.key);
    const nextClass = teacherClasses[(currentClassIndex - 1 + teacherClasses.length) % teacherClasses.length];
    setActiveClassKey(nextClass.key);
    navigateHash(getSectionHash(activeSection, nextClass.name));
  };

  const handleNextClass = () => {
    const currentClassIndex = teacherClasses.findIndex((item) => item.key === currentClass.key);
    const nextClass = teacherClasses[(currentClassIndex + 1) % teacherClasses.length];
    setActiveClassKey(nextClass.key);
    navigateHash(getSectionHash(activeSection, nextClass.name));
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
    <main className={`teacher-notebook-stage ${transitionController.transition ? "is-flipping" : ""}`}>
      <div className={`teacher-notebook-page-shell notebook-page-shell ${transitionController.transition ? "is-flipping" : ""}`}>
        <ClassTabs
          activeClassKey={currentClass.key}
          items={teacherClasses}
          onClassChange={handleClassChange}
          onNextClass={handleNextClass}
          onPreviousClass={handlePreviousClass}
        />

        <section className={`notebook-container teacher-notebook-container ${transitionController.transition ? "is-flipping is-page-turning" : ""} ${transitionController.spiralHidden ? "spiral-hidden" : ""}`} aria-label="Teacher notebook">
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

      <SidePageMarkers activeSectionKey={activeSection} items={teacherSections} onSectionChange={handleSectionChange} />
    </main>
  );
}

export default TeacherNotebookShell;
