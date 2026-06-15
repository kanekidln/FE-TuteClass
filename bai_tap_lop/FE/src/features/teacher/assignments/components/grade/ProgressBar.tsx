import { CheckCircle2 } from "lucide-react";

export function ProgressBar() {
  return (
    <section className="soft-paper rounded-xl p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#edf3ff] text-[#1459d9]">
            <CheckCircle2 size={20} />
          </span>
          <div>
            <h2 className="text-lg font-extrabold">Tiến độ chấm bài</h2>
            <p className="text-xs font-semibold text-[#66758a]">16 / 21 đã chấm, còn 5 bài cần xử lý</p>
          </div>
        </div>
        <div className="min-w-[220px]">
          <div className="mb-1 flex justify-between text-xs font-extrabold text-[#1459d9]">
            <span>76%</span>
            <span>5 bài còn lại</span>
          </div>
          <div className="h-2 rounded-full bg-[#d9cbb6]">
            <div className="h-full w-[76%] rounded-full bg-[#1459d9]" />
          </div>
        </div>
      </div>
    </section>
  );
}
