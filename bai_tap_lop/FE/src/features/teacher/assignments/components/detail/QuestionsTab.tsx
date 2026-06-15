import { type CSSProperties, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function QuestionsTabOnly() {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(() => new Set(["1", "4"]));
  const toggleQuestion = (questionNo: string) => {
    setExpandedQuestions((current) => {
      const next = new Set(current);

      if (next.has(questionNo)) {
        next.delete(questionNo);
      } else {
        next.add(questionNo);
      }

      return next;
    });
  };

  return (
    <div className="assignment-detail-question-layout mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(280px,320px)]">
      <main className="assignment-detail-question-list min-w-0 space-y-2">
        <QuestionOne expanded={expandedQuestions.has("1")} onToggle={() => toggleQuestion("1")} />
        <QuestionFour expanded={expandedQuestions.has("4")} onToggle={() => toggleQuestion("4")} />

        {[
          ["2", "Trắc nghiệm", "2 điểm", "Đáp án đúng:", "A", "16/25 học sinh trả lời đúng", "orange"],
          ["3", "Trắc nghiệm", "2 điểm", "Đáp án đúng:", "D", "9/25 học sinh trả lời đúng", "red"],
          ["5", "Trắc nghiệm", "2 điểm", "Đáp án đúng:", "C", "20/25 học sinh trả lời đúng", "gray"],
          ["6", "Tự luận", "3 điểm", "Điểm trung bình:", "2.2 / 3", "7/25 học sinh đạt tối đa", "gray"],
        ].map((question) => (
          <QuestionSummary
            key={question[0]}
            data={question as CollapsedQuestionData}
            expanded={expandedQuestions.has(question[0])}
            onToggle={() => toggleQuestion(question[0])}
          />
        ))}
      </main>

      <QuestionMap />
    </div>
  );
}

export function QuestionOne({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  return (
    <section className="soft-paper overflow-hidden rounded-xl border border-[#e2cda7]" data-question-type="mcq">
      <QuestionHeader
        no="1"
        badge="Trắc nghiệm"
        score="2 điểm"
        right="Đáp án đúng:"
        answer="B"
        stat="21/25 học sinh trả lời đúng"
        color="green"
        expanded={expanded}
        onToggle={onToggle}
      />

      {expanded && (
        <div className="assignment-question-detail-body grid grid-cols-1 border-t border-[#dfcaa4] lg:grid-cols-[minmax(260px,360px)_1fr]">
          <div className="assignment-question-prompt p-4 text-sm leading-7">
            <b>Câu 1:</b>
            <p className="mt-2">Cho phương trình 2x² − 5x + 2 = 0.</p>
            <p>Nghiệm của phương trình là:</p>

            <QuestionAnswer label="A" text="x = 1 và x = 2" />
            <QuestionAnswer active label="B" text="x = 2 và x = 1/2" />
            <QuestionAnswer label="C" text="x = −1 và x = −2" />
            <QuestionAnswer label="D" text="x = −2 và x = −1/2" />
          </div>

          <div className="assignment-question-chart border-t border-[#dfcaa4] p-4 lg:border-l lg:border-t-0">
            <h3 className="mb-4 text-sm font-extrabold">Tỉ lệ chọn đáp án</h3>

          <div className="mx-auto grid h-48 max-w-[240px] grid-cols-4 items-end gap-1 border-b border-l border-[#9c9487] px-2 pb-2">
              <Bar h="8%" val="8%" label="A" color="bg-[#7298cf]" />
              <Bar h="84%" val="84%" label="B" color="bg-[#32894c]" />
              <Bar h="4%" val="4%" label="C" color="bg-[#eda330]" />
              <Bar h="4%" val="4%" label="D" color="bg-[#d85d58]" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function QuestionFour({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  return (
    <section className="soft-paper overflow-hidden rounded-xl border border-[#e2cda7]" data-question-type="essay">
      <QuestionHeader
        no="4"
        badge="Tự luận"
        score="3 điểm"
        right="Điểm trung bình:"
        answer="1.8 / 3"
        stat="4/25 học sinh đạt tối đa"
        color="purple"
        expanded={expanded}
        onToggle={onToggle}
      />

      {expanded && (
        <div className="assignment-question-detail-body grid grid-cols-1 border-t border-[#dfcaa4] lg:grid-cols-[minmax(260px,360px)_1fr]">
          <div className="assignment-question-prompt p-4 text-sm leading-7">
            <b>Câu 4:</b>
            <p className="mt-2">Giải hệ phương trình:</p>
            <div className="mt-2 border-l-2 border-[#2b241c] pl-4 font-serif text-base leading-8">
              2x + y = 5 <br />
              x − 3y = −4
            </div>
          </div>

        <div className="assignment-question-chart border-t border-[#dfcaa4] p-4 lg:border-l lg:border-t-0">
          <h3 className="mb-4 text-sm font-extrabold">Phân bổ điểm</h3>
          <div className="mx-auto max-w-[320px]">
            <ScoreRow label="3 điểm" percent="16%" width="20%" color="bg-[#329052]" />
            <ScoreRow label="2 điểm" percent="32%" width="44%" color="bg-[#f2bd58]" />
            <ScoreRow label="1 điểm" percent="36%" width="48%" color="bg-[#eda33a]" />
            <ScoreRow label="0 điểm" percent="18%" width="21%" color="bg-[#d95e58]" />
          </div>
        </div>
        </div>
      )}
    </section>
  );
}

export type QuestionHeaderProps = {
  no: string;
  badge: string;
  score: string;
  right: string;
  answer: string;
  stat: string;
  color: "green" | "purple" | "orange" | "red" | "gray";
  expanded: boolean;
  onToggle: () => void;
};

export function QuestionHeader({ no, badge, score, right, answer, stat, color, expanded, onToggle }: QuestionHeaderProps) {
  const colorMap = {
    green: "bg-[#2f9955]",
    purple: "bg-[#5940a8]",
    orange: "bg-[#e99025]",
    red: "bg-[#c9433f]",
    gray: "bg-[#9b9485]",
  };

  return (
    <button
      className="flex w-full flex-col gap-2 px-4 py-3 text-left lg:flex-row lg:items-center lg:justify-between"
      onClick={onToggle}
      type="button"
      aria-label={`${expanded ? "Thu gọn" : "Mở rộng"} câu ${no}`}
      aria-expanded={expanded}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className={`grid h-7 w-7 place-items-center rounded-full text-sm font-bold text-white ${colorMap[color]}`}>
          {no}
        </span>
        <b className={`text-sm ${badge === "Tự luận" ? "text-[#5940a8]" : "text-[#24804c]"}`}>{badge}</b>
        <span className="text-xs text-[#6b7280]">•</span>
        <span className="text-sm">{score}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span>{right}</span>
        <b className="text-[#21844c]">{answer}</b>
        <span className="hidden h-5 border-l border-[#d6bd91] sm:block" />
        <b className="text-[#21844c]">{stat}</b>
        <span className="grid h-7 w-7 place-items-center rounded-md">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </div>
    </button>
  );
}

export function QuestionAnswer({ label, text, active }: { label: string; text: string; active?: boolean }) {
  return (
    <div className={`mt-2 flex items-center gap-3 ${active ? "text-[#21844c]" : ""}`}>
      <span
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold ${
          active ? "border-[#21844c] bg-[#21844c] text-white" : "border-[#9a8f7d] text-[#5a5145]"
        }`}
      >
        {label}
      </span>
      <span className="font-serif text-sm">{text}</span>
    </div>
  );
}

function chartColor(color: string) {
  return color.match(/#([0-9a-fA-F]{3,8})/)?.[0] ?? color;
}

type ChartStyle = CSSProperties & {
  "--assignment-chart-color": string;
};

export function Bar({ h, val, label, color }: { h: string; val: string; label: string; color: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-end">
      <span className="mb-1 text-xs font-bold">{val}</span>
      <div
        className="assignment-question-chart-bar w-8 rounded-t"
        style={{ height: h, "--assignment-chart-color": chartColor(color) } as ChartStyle}
      />
      <span className="mt-1.5 text-xs">{label}</span>
    </div>
  );
}

export function ScoreRow({ label, percent, width, color }: { label: string; percent: string; width: string; color: string }) {
  return (
    <div className="mb-3 grid grid-cols-[60px_1fr] items-center gap-3 text-xs">
      <span>{label}</span>
      <div className="relative h-4 rounded bg-[#f0dfbf]">
        <div
          className="assignment-question-score-bar h-full rounded"
          style={{ width, "--assignment-chart-color": chartColor(color) } as ChartStyle}
        />
        <span
          className="absolute top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#40516a]"
          style={{ left: `calc(${width} + 6px)` }}
        >
          {percent}
        </span>
      </div>
    </div>
  );
}

export type CollapsedQuestionData = [string, string, string, string, string, string, "orange" | "red" | "gray"];

export function QuestionSummary({
  data,
  expanded,
  onToggle,
}: {
  data: CollapsedQuestionData;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [no, type, score, label, answer, stat] = data;
  const color = type === "Tự luận" ? "purple" : "green";

  return (
    <section className="soft-paper overflow-hidden rounded-xl border border-[#e2cda7]" data-question-type={type === "Tự luận" ? "essay" : "mcq"}>
      <QuestionHeader
        no={no}
        badge={type}
        score={score}
        right={label}
        answer={answer}
        stat={stat}
        color={color}
        expanded={expanded}
        onToggle={onToggle}
      />

      {expanded && (
        <div className="border-t border-[#dfcaa4] px-4 py-3 text-sm text-[#40516a]">
          Nội dung chi tiết câu {no} sẽ hiển thị tại đây.
        </div>
      )}
    </section>
  );
}

export function QuestionMap() {
  return (
    <aside className="assignment-detail-question-map soft-paper rounded-xl border border-[#e2cda7] p-4">
      <h2 className="text-xl font-extrabold">Map số câu hỏi</h2>
      <div className="my-4 border-t border-dashed border-[#d8bd91]" />

      <div className="mb-4 flex flex-wrap gap-4 text-xs font-semibold">
        <span className="flex items-center gap-2">
          <i className="h-4 w-6 rounded bg-[#b8cd94]" /> Trắc nghiệm
        </span>
        <span className="flex items-center gap-2">
          <i className="h-4 w-6 rounded bg-[#c9aedc]" /> Tự luận
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 12 }).map((_, i) => {
          const number = i + 1;
          const essay = [4, 9, 10, 11, 12].includes(number);
          return (
            <button
              key={number}
              className={`grid h-10 place-items-center rounded-md text-sm font-extrabold shadow-sm ${
                essay ? "bg-[#c9aedc] text-[#5940a8]" : "bg-[#c9dca5] text-[#24804c]"
              }`}
              type="button"
            >
              {number}
            </button>
          );
        })}
      </div>

      <div className="my-4 border-t border-dashed border-[#d8bd91]" />

      <div className="text-sm">Tổng: <b>12 câu</b></div>
      <div className="mt-2 text-sm font-semibold text-[#24804c]">8 trắc nghiệm</div>
      <div className="mt-2 text-sm font-semibold text-[#5940a8]">4 tự luận</div>
    </aside>
  );
}
