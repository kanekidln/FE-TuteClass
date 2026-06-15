import type { ReactNode } from "react";
import { SpiralBinding } from "../../components/SpiralBinding";
import { ClassTabs } from "../../features/student/notebook/components/ClassTabs";
import { SidePageMarkers } from "../../features/student/notebook/components/SidePageMarkers";
import type { ClassKey, ClassTabItem, SectionKey, SectionMarkerItem } from "../../features/student/notebook";
import "./NotebookLayout.css";

const teacherClassTabs: ClassTabItem[] = [
  { key: "math", name: "Toán 9A", teacher: "Cô Lan", themeClass: "current-class" },
  { key: "english", name: "Tiếng Anh 9A", teacher: "Thầy Nam", themeClass: "english-class" },
  { key: "physics", name: "Vật lý 9A", teacher: "Thầy Minh", themeClass: "physics-class" },
  { key: "literature", name: "Ngữ văn 9A", teacher: "Cô Hoa", themeClass: "literature-class" }
];

const teacherSectionMarkers: SectionMarkerItem[] = [
  { key: "overview", label: "Tổng quan" },
  { key: "schedule", label: "Lịch dạy" },
  { key: "assignments", label: "Bài tập" },
  { key: "resources", label: "Tài liệu" },
  { key: "discussion", label: "Trao đổi" }
];

function navigateHash(hash: string) {
  if (window.location.hash === hash) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    return;
  }

  window.location.hash = hash;
}

function navigateTeacherSection(sectionKey: SectionKey) {
  if (sectionKey === "schedule") {
    navigateHash("#teacher/schedule");
    return;
  }

  if (sectionKey === "assignments") {
    navigateHash("#teacher/assignments");
    return;
  }

  navigateHash("#teacher/landing");
}

type NotebookLayoutProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function NotebookLayout({ children, className = "", contentClassName }: NotebookLayoutProps) {
  const activeClassKey: ClassKey = "math";

  return (
    <main className="notebook-stage mx-auto relative">
      <div className="notebook-page-shell">
        <ClassTabs
          activeClassKey={activeClassKey}
          items={teacherClassTabs}
          onClassChange={() => undefined}
          onNextClass={() => undefined}
          onPreviousClass={() => undefined}
        />
        <div className="notebook-page-shell-inner relative">
          <SpiralBinding />
          <div className={`notebook-container p-6 min-h-[600px] border border-gray-200 relative flex flex-col ${className}`}>
            {contentClassName ? <div className={contentClassName}>{children}</div> : children}
          </div>
        </div>
      </div>
      <SidePageMarkers activeSectionKey="assignments" items={teacherSectionMarkers} onSectionChange={navigateTeacherSection} />
    </main>
  );
}
