import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, CheckCircle2, ChevronDown, Copy, Eye, Flag, Image, Link, MoreHorizontal, Paperclip, Plus, Repeat2, Save, Trash2 } from "lucide-react";
import type { EditableQuestionType, MultipleChoiceMode, MultipleChoiceOption, RichTextEditorProps } from "./types";

export function EditingQuestion({
  number,
  points,
  initialType,
  initialOpen,
  previousQuestionNumber,
  nextQuestionNumber,
  totalQuestions,
  onNavigateQuestion,
  onTypeChange,
}: {
  number: number;
  points: string;
  initialType: EditableQuestionType;
  initialOpen: boolean;
  previousQuestionNumber?: number;
  nextQuestionNumber?: number;
  totalQuestions: number;
  onNavigateQuestion: (number: number) => void;
  onTypeChange: (number: number, type: EditableQuestionType) => void;
}) {
  const [questionOpen, setQuestionOpen] = useState(initialOpen);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const [questionType, setQuestionType] = useState<EditableQuestionType>(initialType);
  const [answerOpen, setAnswerOpen] = useState(true);
  const [rubricOpen, setRubricOpen] = useState(true);
  const isEssay = questionType === "essay";
  const typeLabel = isEssay ? "Tự luận" : "Trắc nghiệm";
  const typeColor = isEssay
    ? "bg-[#eadcff] text-[#8052cf]"
    : "bg-[#edf8e3] text-[#188344]";
  const numberColor = isEssay ? "bg-[#7547b8]" : "bg-[#169654]";
  const mcqOptions: MultipleChoiceOption[] = [
    { key: "A", text: "6 cm" },
    { key: "B", text: "8 cm" },
    { key: "C", text: "10 cm", correct: true },
    { key: "D", text: "12 cm" },
  ];

  return (
    <section className="soft-paper overflow-hidden rounded-xl">
      <div
        className="flex w-full cursor-pointer flex-col gap-2 border-b border-[#ead6b6] bg-[#fffaf1]/70 px-3 py-2 text-left transition-colors hover:bg-[#fff4df] lg:flex-row lg:items-center lg:justify-between"
        onClick={() => setQuestionOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setQuestionOpen((current) => !current);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={questionOpen}
      >
        <div
          className="flex min-w-0 cursor-pointer flex-wrap items-center gap-3 text-left"
          onClick={(event) => {
            event.stopPropagation();
            setQuestionOpen((current) => !current);
          }}
        >
          <button
            className="grid h-8 w-8 place-items-center rounded-md border border-[#dcc8a8] bg-[#fffaf0] text-[#33445f] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={previousQuestionNumber === undefined}
            onClick={(event) => {
              event.stopPropagation();
              if (previousQuestionNumber !== undefined) {
                onNavigateQuestion(previousQuestionNumber);
              }
            }}
            type="button"
            aria-label="Chuyển sang câu trước"
            title="Câu trước"
          >
            <ArrowLeft size={15} />
          </button>
          <span className={`grid h-8 min-w-8 place-items-center rounded-full px-2 text-base font-bold text-white ${numberColor}`}>
            {number}
          </span>
          <span className="text-xs font-extrabold text-[#66758a]">/ {totalQuestions}</span>
          <button
            className="grid h-8 w-8 place-items-center rounded-md border border-[#dcc8a8] bg-[#fffaf0] text-[#33445f] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={nextQuestionNumber === undefined}
            onClick={(event) => {
              event.stopPropagation();
              if (nextQuestionNumber !== undefined) {
                onNavigateQuestion(nextQuestionNumber);
              }
            }}
            type="button"
            aria-label="Chuyển sang câu tiếp theo"
            title="Câu tiếp theo"
          >
          <ArrowRight size={15} />
          </button>
          <span className={`rounded px-3 py-1 text-sm font-extrabold ${typeColor}`}>{typeLabel}</span>
          <b className="text-sm">{points.replace("đ", " điểm")}</b>
          <span className="flex items-center gap-1 rounded-full border border-[#b9d2aa] bg-[#eef5e6] px-2 py-1 text-xs font-extrabold text-[#426f3f]">
            <CheckCircle2 size={13} />
            Đã lưu
          </span>
          <ChevronDown className={`text-[#536270] transition-transform ${questionOpen ? "rotate-180" : ""}`} size={16} />
        </div>

        <div className="flex flex-wrap items-center gap-1.5" onClick={(event) => event.stopPropagation()}>
          <div className="relative">
            <button
              className="flex h-9 items-center gap-2 rounded-md border border-[#dcc8a8] bg-[#fffaf0] px-3 text-sm font-extrabold text-[#33445f]"
              onClick={() => setTypeMenuOpen((current) => !current)}
              type="button"
              aria-expanded={typeMenuOpen}
              aria-haspopup="menu"
            >
              <Repeat2 size={15} />
              Đổi loại
              <ChevronDown size={14} />
            </button>
            {typeMenuOpen && (
              <div className="absolute right-0 top-full z-30 mt-1 w-44 overflow-hidden rounded-md border border-[#d8c7ab] bg-[#fffaf1] text-xs shadow-lg" role="menu">
                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-left font-extrabold text-[#8052cf] hover:bg-[#f3e9ff]"
                  onClick={() => {
                    setQuestionType("essay");
                    onTypeChange(number, "essay");
                    setTypeMenuOpen(false);
                  }}
                  type="button"
                  role="menuitem"
                >
                  <span className="h-3 w-3 rounded-sm bg-[#c9aedc]" />
                  Tự luận
                </button>
                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-left font-extrabold text-[#188344] hover:bg-[#eef8e5]"
                  onClick={() => {
                    setQuestionType("multipleChoice");
                    onTypeChange(number, "multipleChoice");
                    setTypeMenuOpen(false);
                  }}
                  type="button"
                  role="menuitem"
                >
                  <span className="h-3 w-3 rounded-sm bg-[#b8d89a]" />
                  Trắc nghiệm
                </button>
              </div>
            )}
          </div>
          <QuestionActionMenu
            open={actionMenuOpen}
            questionNumber={number}
            onOpenChange={setActionMenuOpen}
          />
        </div>
      </div>

      {questionOpen && (
        <>
      {isEssay ? (
        <EssayEditor
          answerOpen={answerOpen}
          rubricOpen={rubricOpen}
          onAnswerToggle={() => setAnswerOpen((current) => !current)}
          onRubricToggle={() => setRubricOpen((current) => !current)}
        />
      ) : (
        <MultipleChoiceEditor options={mcqOptions} />
      )}

      <div className="flex justify-end gap-2 border-t border-[#ead6b6] bg-[#fffaf1]/70 px-3 py-2">
          <button className="grid h-9 w-9 place-items-center rounded-md border border-[#d8c7ab] bg-[#fffdf8] text-[#1459d9]" type="button" aria-label="Xem trước câu">
            <Eye size={15} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-md bg-[#1459d9] text-white shadow-[0_6px_14px_rgba(20,89,217,.22)]" type="button" aria-label="Lưu câu">
            <Save size={15} />
          </button>
      </div>
        </>
      )}

    </section>
  );
}

export function QuestionActionMenu({
  open,
  questionNumber,
  onOpenChange,
}: {
  open: boolean;
  questionNumber: number;
  onOpenChange: (open: boolean) => void;
}) {
  const actions = [
    { label: "Nhân bản câu hỏi", icon: <Copy size={14} /> },
    { label: "Di chuyển lên", icon: <ArrowUp size={14} /> },
    { label: "Di chuyển xuống", icon: <ArrowDown size={14} /> },
    { label: "Đánh dấu cần kiểm tra", icon: <Flag size={14} /> },
    { label: "Xóa câu hỏi", icon: <Trash2 size={14} />, danger: true },
  ];

  return (
    <div className="relative">
      <button
        className="grid h-9 w-9 place-items-center rounded-md border border-[#dcc8a8] bg-[#fffaf0] text-[#33445f]"
        onClick={() => onOpenChange(!open)}
        type="button"
        aria-label={`Mở thêm thao tác cho câu ${questionNumber}`}
        aria-expanded={open}
        aria-haspopup="menu"
        title={`Thao tác khác cho câu ${questionNumber}`}
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-30 mt-1 w-56 overflow-hidden rounded-md border border-[#d8c7ab] bg-[#fffaf1] text-xs shadow-lg"
          role="menu"
        >
          {actions.map((action) => (
            <button
              key={action.label}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left font-extrabold hover:bg-[#f4e7cf] ${
                action.danger ? "text-red-600" : "text-[#33445f]"
              }`}
              onClick={() => onOpenChange(false)}
              role="menuitem"
              type="button"
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function EssayEditor({
  answerOpen,
  rubricOpen,
  onAnswerToggle,
  onRubricToggle,
}: {
  answerOpen: boolean;
  rubricOpen: boolean;
  onAnswerToggle: () => void;
  onRubricToggle: () => void;
}) {
  return (
    <div className="assignment-question-editor-layout assignment-question-editor-layout--essay grid grid-cols-1 items-start gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_280px]">
      <div className="assignment-question-editor-prompt space-y-2">
        <RichTextEditor label="Câu hỏi *" count="42/2000" contentClassName="h-[76px] overflow-y-auto">
          <div className="text-[15px]">
            Giải hệ phương trình:
            <span className="ml-4 font-serif text-lg">
              &#123; 2x + y = 5 <br />
              <span className="ml-[135px]">x − 3y = −4</span>
            </span>
          </div>
        </RichTextEditor>
      </div>

      <aside className="assignment-question-editor-side space-y-2">
        <ScoreBox points="3" />

        <RichTextEditor
          label="Đáp án *"
          count="156/1000"
          contentClassName="h-[92px] overflow-y-auto"
          toolbar="minimal"
          collapsed={!answerOpen}
          onToggle={onAnswerToggle}
        >
          <div className="text-sm leading-7">
            Nghiệm của hệ phương trình là: x = 1, y = 3. <br />
            Học sinh trình bày đầy đủ lời giải như sau: <br />
          </div>
        </RichTextEditor>

        <RichTextEditor
          label="Rubric"
          count="78/500"
          contentClassName="h-[72px] overflow-y-auto"
          toolbar="minimal"
          collapsed={!rubricOpen}
          onToggle={onRubricToggle}
        >
          <div className="text-sm leading-7">
            • Biến đổi đúng phương trình (1đ) <br />
            • Giải đúng ẩn x (1đ) <br />
            • Giải đúng ẩn y (1đ)
          </div>
        </RichTextEditor>

        <label className="flex items-center gap-2 rounded-lg border border-[#e0cdae] bg-[#fffdf8] px-2.5 py-2 text-xs font-semibold">
          <input type="checkbox" className="h-4 w-4" />
          Hiển thị rubric cho học sinh
        </label>
      </aside>
    </div>
  );
}

export function MultipleChoiceEditor({ options }: { options: MultipleChoiceOption[] }) {
  const [answerMode, setAnswerMode] = useState<MultipleChoiceMode>("single");
  const isMultipleAnswer = answerMode === "multiple";

  return (
    <div className="assignment-question-editor-layout assignment-question-editor-layout--mcq grid grid-cols-1 items-start gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="assignment-question-editor-prompt space-y-2">
        <RichTextEditor label="Câu hỏi *" count="56/2000" contentClassName="h-[96px] overflow-y-auto">
          <div className="text-sm leading-7">
            Cho tam giác <i>ABC</i> vuông tại <i>A</i>, <i>AB = 6cm</i>, <i>AC = 8cm</i>.
            <br />
            Độ dài <i>BC</i> là:
          </div>
        </RichTextEditor>

        <RichTextEditor label="Giải thích" count="89/1500" contentClassName="h-[60px] overflow-y-auto" toolbar="minimal">
          <div className="text-sm leading-7">
            Áp dụng định lý Pythagore: BC² = 6² + 8² = 100, suy ra BC = 10cm.
          </div>
        </RichTextEditor>
      </div>

      <aside className="assignment-question-editor-side space-y-2">
        <ScoreBox points="2" />

        <section className="rounded-lg border border-[#e0cdae] bg-[#fffdf8] p-2">
          <Label title="Loại đáp án" />
          <div className="grid grid-cols-2 gap-1 rounded-md border border-[#d8c7ab] bg-[#fffaf1] p-1 text-xs font-extrabold">
            <button
              className={`rounded px-2 py-1.5 ${!isMultipleAnswer ? "bg-[#1459d9] text-white" : "text-[#536270]"}`}
              onClick={() => setAnswerMode("single")}
              type="button"
            >
              Chọn 1
            </button>
            <button
              className={`rounded px-2 py-1.5 ${isMultipleAnswer ? "bg-[#1459d9] text-white" : "text-[#536270]"}`}
              onClick={() => setAnswerMode("multiple")}
              type="button"
            >
              Chọn nhiều
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-[#e0cdae] bg-[#fffdf8]">
          <div className="flex items-center justify-between border-b border-[#ead6b6] px-3 py-1.5">
            <Label title="Đáp án *" className="mb-0" />
            <span className="text-xs font-semibold text-[#66758a]">
              {isMultipleAnswer ? "Nhiều đáp án đúng" : "1 đáp án đúng"}
            </span>
          </div>
          <div className="divide-y divide-[#ead6b6]">
            {options.map((option) => (
              <button
                key={option.key}
                className={`grid w-full grid-cols-[24px_22px_minmax(0,1fr)] items-center gap-2 px-3 py-2 text-left text-sm font-semibold ${
                  option.correct ? "bg-[#eef8e5]" : "bg-white"
                }`}
                type="button"
              >
                <span
                  className={`grid h-4 w-4 place-items-center border text-[9px] ${
                    isMultipleAnswer ? "rounded" : "rounded-full"
                  } ${option.correct ? "border-[#14954a] bg-[#14954a] text-white" : "border-[#8fa0b7]"}`}
                >
                  {option.correct ? (isMultipleAnswer ? "✓" : "●") : ""}
                </span>
                <b>{option.key}.</b>
                <span className="truncate">{option.text}</span>
              </button>
            ))}
          </div>
          <button className="flex w-full items-center justify-center gap-1 border-t border-[#ead6b6] py-2 text-xs font-extrabold text-[#1261e8]" type="button">
            <Plus size={14} />
            Thêm đáp án
          </button>
        </section>
      </aside>
    </div>
  );
}

export function ScoreBox({ points }: { points: string }) {
  return (
    <section className="rounded-lg border border-[#e0cdae] bg-[#fffdf8] p-2">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-[#1f3558]">Điểm</h3>
        <span className="rounded-full bg-[#edf3ff] px-2 py-1 text-xs font-extrabold text-[#1459d9]">
          / 10
        </span>
      </div>
      <div className="grid grid-cols-[38px_1fr_38px_48px] overflow-hidden rounded-md border border-[#e0cdae] bg-[#fffaf1] text-center text-base font-extrabold">
        <button className="py-2">−</button>
        <div className="border-x border-[#e0cdae] py-2 text-[#0d3a7a]">{points}</div>
        <button className="border-r border-[#e0cdae] py-2">+</button>
        <span className="py-2 text-xs">điểm</span>
      </div>
    </section>
  );
}

export function Label({ title, className = "" }: { title: string; className?: string }) {
  return <div className={`mb-1.5 text-xs font-extrabold text-[#1f3558] ${className}`}>{title}</div>;
}

export function RichTextEditor({
  label,
  count,
  children,
  className = "",
  contentClassName = "",
  toolbar = "full",
  collapsed = false,
  onToggle,
}: RichTextEditorProps) {
  const headerContent = (
    <>
      <Label title={label} className="mb-0" />
      <span className="ml-auto shrink-0 text-xs font-semibold text-[#66758a]">{count}</span>
      {onToggle && (
        <ChevronDown className={`shrink-0 text-[#536270] transition-transform ${collapsed ? "" : "rotate-180"}`} size={15} />
      )}
    </>
  );

  return (
    <section className={`rounded-lg border border-[#e0cdae] bg-[#fffdf8] ${className}`}>
      {onToggle ? (
        <button
          className="flex w-full cursor-pointer items-center gap-3 border-b border-[#ead6b6] px-3 py-1.5 text-left transition-colors hover:bg-[#fff4df]"
          onClick={onToggle}
          type="button"
          aria-expanded={!collapsed}
        >
          {headerContent}
        </button>
      ) : (
        <div className="flex items-center gap-3 border-b border-[#ead6b6] px-3 py-1.5">
          {headerContent}
        </div>
      )}
      {!collapsed && (
        <>
          <Toolbar variant={toolbar} />
          <div className={`p-3 ${contentClassName}`}>{children}</div>
      <AttachmentToolbar />
        </>
      )}
    </section>
  );
}

export function Toolbar({ variant = "full" }: { variant?: "full" | "minimal" }) {
  const tools = variant === "minimal" ? ["B", "I", "≡", "x²"] : ["B", "I", "U", "≡", "☷", "x²", "x₂", "▧", "♧"];

  return (
    <div className="flex flex-wrap gap-1 border-b border-[#ead6b6] px-3 py-1.5 text-xs text-[#25344a]">
      {tools.map((x) => (
        <button key={x} className="grid h-6 min-w-6 place-items-center rounded border border-transparent px-1.5 font-bold hover:border-[#dcc8a8] hover:bg-[#fff5e3]">{x}</button>
      ))}
    </div>
  );
}

export function AttachmentToolbar() {
  const actions = [
    { label: "Tệp", icon: <Paperclip size={14} /> },
    { label: "Ảnh", icon: <Image size={14} /> },
    { label: "Link", icon: <Link size={14} /> },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5 border-t border-[#ead6b6] bg-[#fffaf1]/75 px-3 py-1.5">
      <div className="flex flex-wrap gap-1.5">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex items-center gap-1 rounded-md border border-[#dcc8a8] bg-[#fffdf8] px-2 py-1 text-xs font-extrabold text-[#1459d9]"
            type="button"
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
