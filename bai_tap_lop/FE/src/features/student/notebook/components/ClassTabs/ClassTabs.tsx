import type { ClassKey, ClassTabItem } from "../..";

type ClassTabsProps = {
  activeClassKey: ClassKey;
  items: ClassTabItem[];
  onClassChange: (classKey: ClassKey) => void;
  onNextClass: () => void;
  onPreviousClass: () => void;
};

export function ClassTabs({ activeClassKey, items, onClassChange, onNextClass, onPreviousClass }: ClassTabsProps) {
  return (
    <div className="class-tab-list mt-4 -mb-2">
      <button type="button" className="class-tab-nav prev" aria-label="Xem lớp trước" onClick={onPreviousClass}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </button>
      {items.map((classItem) => {
        const isActive = classItem.key === activeClassKey;
        return (
          <div className={`class-fold-tab-wrap ${isActive ? "current-tab-wrap" : ""}`} key={classItem.key}>
            <button
              type="button"
              className="class-fold-tab-button"
              data-class={classItem.key}
              onClick={() => onClassChange(classItem.key)}
            >
              <div
                className={`class-fold-tab ${classItem.themeClass} px-8 py-3 rounded-t-xl flex flex-col items-center min-w-[140px] ${
                  isActive ? "border-t border-x border-gray-100" : "opacity-90"
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className={`${isActive ? "text-xl text-blue-800" : "text-lg text-black"} font-handwriting`}>
                    {classItem.name}
                  </span>
                  {isActive && <span className="text-black">★</span>}
                </div>
                <span className={`text-xs font-medium ${isActive ? "text-green-700" : "text-gray-500"}`}>
                  {classItem.teacher}
                </span>
              </div>
            </button>
          </div>
        );
      })}
      <button type="button" className="class-tab-nav next" aria-label="Xem lớp tiếp theo" onClick={onNextClass}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}
