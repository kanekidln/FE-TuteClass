import type { SupportTab } from "./type";
import { HistoryPanel } from "./HistoryPanel";
import { SharedFilesPanel } from "./SharedFilesPanel";
import { StudentInfoPanel } from "./StudentInfoPanel";

type SupportPanelProps = {
  activeTab: SupportTab;
  onChangeTab: (tab: SupportTab) => void;
};

export function SupportPanel({ activeTab, onChangeTab }: SupportPanelProps) {
  return (
    <aside className="teacher-private-support flex min-h-0 flex-col rounded-lg border border-[#eadcc6] bg-[#fffdf8]">
      <div className="grid grid-cols-3 border-b border-[#eadcc6] text-center text-xs font-extrabold">
        {[
          ["info", "Thông tin"],
          ["files", "Tệp"],
          ["history", "Lịch sử"],
        ].map(([tab, label]) => (
          <button
            className={`teacher-private-tab ${activeTab === tab ? "is-active" : ""}`}
            key={tab}
            onClick={() => onChangeTab(tab as SupportTab)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-4">
        {activeTab === "info" ? <StudentInfoPanel /> : null}
        {activeTab === "files" ? <SharedFilesPanel /> : null}
        {activeTab === "history" ? <HistoryPanel /> : null}
      </div>
    </aside>
  );
}
