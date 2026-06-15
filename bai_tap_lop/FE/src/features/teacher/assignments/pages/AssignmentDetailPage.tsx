import { useState } from "react";
import { ArrowLeft, CheckCircle2, Edit3 } from "lucide-react";
import type { AssignmentView } from "../types";
import { DetailTabs, StudentsTabOnly, InfoBar, QuestionsTabOnly, ProgressCard, TasksCard, ActivityCard, AttentionCard, QuickFiles } from "../components/detail";

interface AssignmentDetailPageProps {
  onNavigate: (view: AssignmentView) => void;
}

type DetailTab = "overview" | "questions" | "students" | "analytics";

export function AssignmentDetailPage({ onNavigate }: AssignmentDetailPageProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");

  return (
    <>
      <style>{`
        .assignment-detail-vintage {
          font-family: 'Nunito', sans-serif;
          color: #14294f;
        }

        .assignment-detail-vintage .paper {
          background:
            linear-gradient(to bottom, rgba(56, 91, 145, .12) 1px, transparent 1px),
            radial-gradient(circle at 20% 30%, rgba(98, 63, 25, .08), transparent 28%),
            linear-gradient(135deg, rgba(255,255,255,.72), rgba(247,232,201,.82)),
            #fff8ea;
          background-size: 100% 32px, 100% 100%, 100% 100%, 100% 100%;
          box-shadow:
            0 12px 24px rgba(82, 54, 24, .15),
            inset 0 0 0 1px rgba(136, 101, 58, .18);
        }

        .assignment-detail-vintage .soft-paper {
          background:
            radial-gradient(circle at 15% 20%, rgba(120, 76, 30, .07), transparent 25%),
            radial-gradient(circle at 80% 85%, rgba(120, 76, 30, .06), transparent 24%),
            linear-gradient(135deg, rgba(255,255,255,.62), rgba(246,226,190,.78)),
            #fff6e6;
          box-shadow:
            0 8px 18px rgba(82, 54, 24, .12),
            inset 0 0 0 1px rgba(144, 109, 65, .18);
        }

        .assignment-detail-vintage .assignment-detail-header {
          margin-bottom: 0 !important;
        }

        .assignment-detail-vintage .assignment-detail-tabs {
          width: 100% !important;
          border-top: 0 !important;
          border-right: 0 !important;
          border-left: 0 !important;
          border-radius: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 4px !important;
        }
      `}</style>

      <div className="assignment-detail-vintage min-h-full rounded-xl p-2">
          <header className="paper assignment-detail-header flex flex-col gap-3 rounded-sm px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <button
                className="mb-1 flex items-center gap-2 text-xs font-extrabold text-[#1459d9]"
                onClick={() => onNavigate("overview")}
                type="button"
              >
                <ArrowLeft size={14} />
                Quay lại danh sách bài tập
              </button>
              <h1 className="title-font text-3xl font-bold leading-tight text-[#163467]">
                Chi tiết bài tập
              </h1>
              <p className="text-base font-semibold leading-snug text-[#203b69]">
                Đề kiểm tra 45 phút - Chương 3
              </p>
              <p className="mt-1 text-xs font-bold text-[#40516a]">
                Buổi 15 - Hàm số bậc hai <span className="mx-2">•</span> Toán 9A, 9B, 9C
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className="flex min-h-10 items-center gap-2 rounded-md border border-[#d4b98c] bg-[#fff7e8] px-4 py-2 text-sm font-extrabold text-[#1459d9] shadow-sm"
                onClick={() => onNavigate("edit")}
                type="button"
              >
                <Edit3 size={16} />
                Chỉnh sửa
              </button>
              <button
                className="flex min-h-10 items-center gap-2 rounded-md bg-[#1459d9] px-4 py-2 text-sm font-extrabold text-white shadow-[0_6px_14px_rgba(20,89,217,.22)]"
                onClick={() => onNavigate("grading")}
                type="button"
              >
                <CheckCircle2 size={16} />
                Chấm bài
              </button>
            </div>
          </header>

          <DetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "questions" ? (
            <QuestionsTabOnly />
          ) : activeTab === "students" ? (
            <StudentsTabOnly onNavigate={onNavigate} />
          ) : (
            <>
              <InfoBar />
              <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(300px,330px)]">
                <section className="min-w-0 space-y-3">
                  <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)]">
                    <TasksCard onNavigate={onNavigate} />
                    <ProgressCard onNavigate={onNavigate} />
                  </div>
                  <AttentionCard />
                </section>

                <aside className="min-w-0 space-y-3">
                  <ActivityCard />
                  <QuickFiles />
                </aside>
              </div>
            </>
          )}
      </div>
    </>
  );
}
