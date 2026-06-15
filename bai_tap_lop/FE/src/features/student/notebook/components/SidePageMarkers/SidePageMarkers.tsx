import type { ReactNode } from "react";
import type { SectionKey, SectionMarkerItem } from "../..";

const icons: Record<SectionKey, ReactNode> = {
  overview: (
    <>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </>
  ),
  schedule: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  assignments: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l3 3" />
      <path d="M9 2h6" />
      <path d="M12 2v3" />
    </>
  ),
  resources: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </>
  ),
  discussion: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
};

type SidePageMarkersProps = {
  activeSectionKey: SectionKey;
  items: SectionMarkerItem[];
  onSectionChange: (sectionKey: SectionKey) => void;
};

export function SidePageMarkers({ activeSectionKey, items, onSectionChange }: SidePageMarkersProps) {
  return (
    <div className="side-page-markers" data-purpose="right-navigation-tabs">
      {items.map((marker) => {
        const isActive = marker.key === activeSectionKey;
        return (
          <button
            className={`page-marker ${marker.key} ${isActive ? "active" : ""}`}
            data-section={marker.key}
            key={marker.key}
            onClick={() => onSectionChange(marker.key)}
            type="button"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {icons[marker.key]}
            </svg>
            <span>{marker.label}</span>
          </button>
        );
      })}
    </div>
  );
}
