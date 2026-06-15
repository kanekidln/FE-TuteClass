import { ArrowLeft, Save, Send } from "lucide-react";
import type { AssignmentView } from "../types";
import { HeaderButton, StudentList, ProgressBar, SubmissionPanel, ScorePanel } from "../components/grade";

type AssignmentGradingPageProps = {
  onNavigate?: (view: AssignmentView) => void;
};

export function AssignmentGradingPage({ onNavigate }: AssignmentGradingPageProps) {
  return (
    <>
      <style>{`
        .assignment-grading-page {
          font-family: 'Nunito', sans-serif;
          color: #14294f;
        }

        .assignment-grading-page .paper {
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

        .assignment-grading-page .soft-paper {
          background:
            radial-gradient(circle at 15% 20%, rgba(120, 76, 30, .07), transparent 25%),
            radial-gradient(circle at 80% 85%, rgba(120, 76, 30, .06), transparent 24%),
            linear-gradient(135deg, rgba(255,255,255,.62), rgba(246,226,190,.78)),
            #fff6e6;
          box-shadow:
            0 8px 18px rgba(82, 54, 24, .12),
            inset 0 0 0 1px rgba(144, 109, 65, .18);
        }
      `}</style>

      <div className="assignment-grading-page min-h-full rounded-xl p-2">
          <header className="paper mb-3 flex flex-col gap-3 rounded-sm px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <button
                className="mb-1 flex items-center gap-2 text-xs font-extrabold text-[#1459d9]"
                onClick={() => onNavigate?.("detail")}
                type="button"
              >
                <ArrowLeft size={14} />
                Quay lại chi tiết bài tập
              </button>
              <h1 className="title-font text-3xl font-bold leading-tight text-[#163467]">
                Chấm bài
              </h1>
              <p className="text-base font-semibold leading-snug text-[#203b69]">
                Đề kiểm tra 45 phút - Toán 9A (Chương 3)
              </p>
              <p className="mt-1 text-xs font-bold text-[#40516a]">
                Buổi 15 - Hàm số bậc hai <span className="mx-2">•</span> 21 bài nộp
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <HeaderButton icon={<Save size={16} />} text="Lưu nháp" />
              <button className="flex min-h-10 items-center gap-2 rounded-md bg-[#1459d9] px-4 py-2 text-sm font-extrabold text-white shadow-[0_6px_14px_rgba(20,89,217,.22)]" type="button">
                <Send size={16} />
                Chấm & tiếp theo
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-3 xl:grid-cols-[280px_minmax(0,1fr)_300px]">
            <StudentList />

            <main className="min-w-0 space-y-3">
              <ProgressBar />
              <SubmissionPanel />
            </main>

            <ScorePanel />
          </div>
      </div>
    </>
  );
}
