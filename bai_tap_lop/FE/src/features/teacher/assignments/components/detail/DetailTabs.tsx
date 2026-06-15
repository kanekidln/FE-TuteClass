import { BarChart3, Clock, FileText, Users } from "lucide-react";
import type { DetailTab } from "./types";

export function DetailTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: DetailTab;
  onTabChange: (tab: DetailTab) => void;
}) {
  const tabs = [
    { id: "overview" as const, label: "Tổng quan", icon: <BarChart3 size={16} /> },
    { id: "questions" as const, label: "Câu hỏi", icon: <FileText size={16} />, badge: "12" },
    { id: "students" as const, label: "Học sinh", icon: <Users size={16} />, badge: "25" },
    { id: "analytics" as const, label: "Phân tích", icon: <Clock size={16} /> },
  ];

  return (
    <nav className="assignment-detail-tabs mb-3 mt-2 flex flex-wrap gap-5 border-b border-[#e0c49a]/70 px-1">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`flex min-h-9 items-center gap-2 border-b-2 bg-transparent px-1 pb-2 pt-1 text-sm font-extrabold ${
            activeTab === tab.id ? "border-[#1459d9] text-[#1459d9]" : "border-transparent text-[#40516a] hover:text-[#1459d9]"
          }`}
          onClick={() => onTabChange(tab.id)}
          type="button"
          aria-current={activeTab === tab.id ? "page" : undefined}
        >
          {tab.icon}
          {tab.label}
          {tab.badge && (
            <span className="text-xs font-bold text-[#6b7280]">
              ({tab.badge})
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}
