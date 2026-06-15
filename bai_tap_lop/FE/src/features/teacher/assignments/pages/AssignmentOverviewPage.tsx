import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  Edit3,
  Eye,
  MoreHorizontal,
  Plus,
  Send,
  TriangleAlert,
} from "lucide-react";
import type { AssignmentView } from "../types";
import { AssignmentGroup, IconButton, Panel, lessons, students, upcoming } from "../components/overview";


interface AssignmentOverviewPageProps {
  onNavigate: (view: AssignmentView) => void;
}

export function AssignmentOverviewPage({ onNavigate }: AssignmentOverviewPageProps) {
  const [openLessons, setOpenLessons] = useState<Set<string>>(
    () => new Set(lessons.filter((lesson) => lesson.open).map((lesson) => lesson.title)),
  );

  const toggleLesson = (title: string) => {
    setOpenLessons((current) => {
      const next = new Set(current);

      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }

      return next;
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Nunito:wght@400;600;700;800&family=Patrick+Hand&display=swap');

        .vintage-page {
          font-family: 'Nunito', sans-serif;
          color: #14294f;
          background: transparent;
        }

        .title-font {
          font-family: 'Lora', serif;
        }

        .hand-font {
          font-family: 'Patrick Hand', cursive;
        }

        .paper {
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

        .soft-paper {
          background:
            radial-gradient(circle at 15% 20%, rgba(120, 76, 30, .07), transparent 25%),
            radial-gradient(circle at 80% 85%, rgba(120, 76, 30, .06), transparent 24%),
            linear-gradient(135deg, rgba(255,255,255,.62), rgba(246,226,190,.78)),
            #fff6e6;
          box-shadow:
            0 8px 18px rgba(82, 54, 24, .12),
            inset 0 0 0 1px rgba(144, 109, 65, .18);
        }

        .note-lines {
          background:
            linear-gradient(to bottom, rgba(142, 112, 64, .18) 1px, transparent 1px),
            #f8e9b3;
          background-size: 100% 28px;
        }

        .tape {
          background:
            linear-gradient(45deg, rgba(255,255,255,.25), rgba(177,132,69,.12)),
            #e8cf9e;
          opacity: .75;
        }

        .assignment-overview-page {
          overflow-x: hidden;
        }

        .fold::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: 0;
          width: 54px;
          height: 54px;
          background: linear-gradient(135deg, rgba(255,255,255,.65), rgba(215,181,129,.8));
          clip-path: polygon(100% 0, 0 100%, 100% 100%);
          border-bottom-right-radius: 10px;
        }
      `}</style>

      <div className="vintage-page assignment-overview-page min-h-full rounded-xl p-2">
        <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(300px,330px)]">
          <section className="min-w-0 space-y-3">
            <header className="paper flex flex-col gap-3 rounded-sm px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h1 className="title-font text-3xl font-bold leading-tight text-[#163467]">
                  Bài tập
                </h1>
                <p className="text-base font-semibold leading-snug text-[#203b69]">
                  Tổng quan bài tập lớp 9A
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  className="flex min-h-10 items-center gap-2 rounded-md bg-[#1459d9] px-4 py-2 text-sm font-extrabold text-white shadow-[0_6px_14px_rgba(20,89,217,.22)]"
                  onClick={() => onNavigate("create")}
                  type="button"
                >
                  <Plus size={18} /> Giao bài tập mới
                </button>
              </div>
            </header>

            <section className="soft-paper flex h-[560px] flex-col rounded-xl p-3 xl:h-[510px]">
              <h2 className="mb-3 flex items-center gap-3 text-xl font-extrabold">
                <CalendarDays className="text-blue-700" />
                Danh sách buổi học và bài tập
              </h2>

              <div className="assignment-list-scroll min-h-0 flex-1 overflow-auto rounded-lg border border-[#d8bd91]">
                {lessons.map((item, index) => (
                  <div className="min-w-[720px]" key={item.title}>
                    <button
                      className="grid w-full grid-cols-[28px_minmax(210px,1fr)_86px_88px_88px_88px] items-center border-b border-[#dec7a3] bg-[#fff4df]/75 px-3 py-3 text-left text-sm font-bold hover:bg-[#f4e7cf]/80"
                      onClick={() => toggleLesson(item.title)}
                      type="button"
                      aria-expanded={openLessons.has(item.title)}
                    >
                      <ChevronDown className={`transition-transform ${openLessons.has(item.title) ? "" : "-rotate-90"}`} size={20} />
                      <div className="flex items-center gap-3">
                        <CalendarDays size={20} />
                        {item.title}
                      </div>
                      <span className="text-xs">{item.date}</span>
                      <span className="text-green-700">{item.submit}</span>
                      <span className="text-red-600">{item.late}</span>
                      <span className="text-violet-600">{item.grade}</span>
                    </button>

                    {index === 0 && openLessons.has(item.title) && (
                      <div className="bg-[#fff8ea]/80 p-3">
                        <AssignmentGroup
                          rows={[
                            ["Bài tập chương 2", "18/23 nộp", "8 cần chấm"],
                            ["Chứng minh đồ thị hàm số", "15/23 nộp", "7 cần chấm"],
                            ["Quiz 1 – Hàm số bậc hai", "22/23 nộp", "0 cần chấm"],
                            ["Quiz 2 – Đồ thị", "21/23 nộp", "0 cần chấm"],
                            ["Quiz 3 – Bất phương trình", "20/23 nộp", "0 cần chấm"],
                          ]}
                          onOpenAssignment={() => onNavigate("detail")}
                          onNavigate={onNavigate}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </section>

          <aside className="min-w-0 space-y-3">
            <Panel icon={<Clock />} title="Sắp cần xử lý" action="Xem lịch">
              <div className="space-y-2">
                {upcoming.map((item) => (
                  <div key={`${item[0]}-${item[1]}`} className="rounded-lg border border-[#e0c49a] bg-[#fff7e8]/80 p-2 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="shrink-0 rounded bg-[#dce9ff] px-2 py-0.5 text-xs font-extrabold text-[#1459d9]">
                          {item[0]}
                        </span>
                        <b className="truncate text-sm">{item[1]}</b>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-red-600">{item[4]}</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#273c62]">
                      <span className="shrink-0">Hạn: {item[2]}</span>
                      <span className="min-w-0 flex-1 truncate">{item[3]}</span>
                      <button
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-[#dec49d] bg-[#fff9ed] text-[#1459d9] hover:bg-[#f4e7cf]"
                        onClick={() => onNavigate("grading")}
                        type="button"
                        aria-label={`Chấm bài ${item[1]}`}
                        title={`Chấm bài ${item[1]}`}
                      >
                        <Edit3 size={14} />
                      </button>
                      <button className="grid h-7 w-7 shrink-0 place-items-center rounded-md hover:bg-[#ead6b6]" type="button" aria-label={`Mở menu ${item[1]}`}>
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-3 font-extrabold text-[#1459d9]">Xem tất cả</p>
            </Panel>

            <Panel icon={<TriangleAlert />} title="Học sinh cần chú ý" action="Xem tất cả">
              <div className="space-y-3">
                {students.map((s) => (
                  <div key={s[1]} className="flex items-center gap-2 rounded-lg border border-[#e3c9a0] bg-[#fff8ea]/85 p-2">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f1d5a2] text-xl">
                      {s[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <b>{s[1]}</b>
                      <p className="truncate text-xs font-semibold text-red-600">{s[2]}</p>
                    </div>
                    <IconButton icon={<Send size={14} />} label={`Nhắn ${s[1]}`} />
                    <IconButton icon={<Eye size={14} />} label={`Xem ${s[1]}`} />
                    <button className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[#dec49d] bg-[#fff9ed]" type="button">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </Panel>
          </aside>
        </div>
      </div>
    </>
  );
}
