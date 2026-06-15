import { CheckCircle2 } from "lucide-react";
import { TeacherComment } from "./TeacherComment";

type QuestionCardProps = {
  comment: string;
  correct: number;
  no: string;
  options: string[];
  point: string;
  question: string;
  tag: string;
  time: string;
};

export function QuestionCard({ no, tag, point, question, options, correct, comment, time }: QuestionCardProps) {
  return (
    <section className="rounded-lg border border-[#e0cdae] bg-[#fffdf8] p-3">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#169654] text-sm font-extrabold text-white">{no}</span>
        <span className="rounded bg-[#edf8e3] px-2.5 py-1 text-xs font-extrabold text-[#188344]">{tag}</span>
        <b className="text-sm">{point}</b>
        <span className="ml-auto flex items-center gap-1 text-xs font-extrabold text-[#14954a]">
          <CheckCircle2 size={14} />
          Tự động chấm
        </span>
      </div>
      <p className="text-sm font-semibold leading-6 text-[#273d5e]">{question}</p>
      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
        {options.map((option, index) => (
          <div
            className={`flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm font-semibold ${
              index === correct ? "border-[#9bd594] bg-[#eef8e5] text-[#116b35]" : "border-[#e0cdae] bg-white"
            }`}
            key={option}
          >
            <span>{index === correct ? "●" : "○"}</span>
            <span>{option}</span>
          </div>
        ))}
      </div>
      <TeacherComment comment={comment} time={time} />
    </section>
  );
}
