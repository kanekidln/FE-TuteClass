import type { ReactNode } from "react";
import { SpiralBinding } from "../../../../../components/SpiralBinding";
import { ClassTabs } from "../../components/ClassTabs";
import { SidePageMarkers } from "../../components/SidePageMarkers";
import type { ClassKey, ClassTabItem, SectionKey, SectionMarkerItem } from "../..";
import "./NotebookLayout.css";

type NotebookLayoutProps = {
  children: ReactNode;
  classItems: ClassTabItem[];
  isFlipping: boolean;
  isSpiralHidden: boolean;
  markerItems: SectionMarkerItem[];
  activeClassKey: ClassKey;
  activeSectionKey: SectionKey;
  onClassChange: (classKey: ClassKey) => void;
  onNextClass: () => void;
  onPreviousClass: () => void;
  onSectionChange: (sectionKey: SectionKey) => void;
};

export function NotebookLayout({
  children,
  classItems,
  isFlipping,
  isSpiralHidden,
  markerItems,
  activeClassKey,
  activeSectionKey,
  onClassChange,
  onNextClass,
  onPreviousClass,
  onSectionChange
}: NotebookLayoutProps) {
  return (
    <main className="notebook-stage mx-auto relative">
      <div className={`notebook-page-shell ${isFlipping ? "is-flipping" : ""}`}>
        <ClassTabs
          activeClassKey={activeClassKey}
          items={classItems}
          onClassChange={onClassChange}
          onNextClass={onNextClass}
          onPreviousClass={onPreviousClass}
        />
        <div
          className={`notebook-container border border-gray-200 relative overflow-visible ${isFlipping ? "is-flipping" : ""} ${
            isSpiralHidden ? "spiral-hidden" : ""
          }`}
        >
          <SpiralBinding />
          <div className="notebook-content-viewport">{children}</div>
        </div>
      </div>
      <SidePageMarkers activeSectionKey={activeSectionKey} items={markerItems} onSectionChange={onSectionChange} />
    </main>
  );
}
