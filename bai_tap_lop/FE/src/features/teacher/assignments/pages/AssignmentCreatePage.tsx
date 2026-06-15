import { ArrowLeft, Save, Send, X } from "lucide-react";
import type { AssignmentView } from "../types";
import { PaperTexture, TopButton, UploadPanel, PreviewPanel, SettingsPanel } from "../components/create";

interface AssignmentCreatePageProps {
  onNavigate: (view: AssignmentView) => void;
}

export function AssignmentCreatePage({ onNavigate }: AssignmentCreatePageProps) {
  return (
    <>
      <style>{`
        .assignment-create-page {
          font-family: 'Nunito', sans-serif;
        }

        .assignment-create-page .paper {
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

        .assignment-create-page .soft-paper {
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

      <div className="assignment-create-page relative min-h-full overflow-x-hidden rounded-xl p-2 text-[#14294f]">
          <PaperTexture />

        <header className="paper relative z-10 mb-3 flex flex-col gap-3 rounded-sm px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <button
              className="mb-1 flex items-center gap-2 text-xs font-extrabold text-[#1459d9]"
              onClick={() => onNavigate("overview")}
              type="button"
            >
              <ArrowLeft size={14} />
              <span>Quay lại danh sách bài tập</span>
            </button>

            <h1 className="title-font text-3xl font-bold leading-tight text-[#163467]">
              Tạo bài tập tự luận
            </h1>
            <p className="text-base font-semibold leading-snug text-[#203b69]">
              Giao bài nhanh cho buổi học
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <TopButton icon={<X size={16} />} label="Hủy" onClick={() => onNavigate("overview")} />
            <TopButton icon={<Save size={16} />} label="Lưu nháp" />
            <button className="flex min-h-10 items-center rounded-md bg-[#1459d9] px-4 py-2 text-sm font-extrabold text-white shadow-[0_6px_14px_rgba(20,89,217,.22)]">
              Tạo bài tập <Send className="ml-2" size={16} />
            </button>
          </div>
        </header>

        <main className="relative z-10 grid grid-cols-1 items-stretch gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(280px,310px)]">
          <section className="soft-paper flex min-h-0 min-w-0 flex-col rounded-xl p-3">
            <PreviewPanel />
          </section>

          <aside className="relative space-y-3">
            <section className="soft-paper rounded-xl p-3">
              <UploadPanel />
            </section>
            <section className="soft-paper rounded-xl p-3">
              <SettingsPanel />
            </section>
          </aside>
        </main>
      </div>
    </>
  );
}
