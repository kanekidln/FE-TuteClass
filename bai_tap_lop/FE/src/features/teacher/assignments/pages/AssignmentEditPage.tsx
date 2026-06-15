import { useState } from "react";

import type { AssignmentView } from "../types";
import { Texture, Decor, Header, TopForm, QuestionNavigator, EditingQuestion, ScanImportCard, DescriptionCard, FilesCard, OptionsCard } from "../components/edit";
import type { EditableQuestionType } from "../components/edit";

interface AssignmentEditPageProps {
  onNavigate: (view: AssignmentView) => void;
}

type QuestionTone = "green" | "purple" | "purpleActive" | "purpleWarn";
type QuestionNavItem = {
  number: number;
  points: string;
  tone: QuestionTone;
};
const initialQuestionItems: QuestionNavItem[] = [
  "multipleChoice",
].map((type, index) => ({
  number: index + 1,
  points: type === "essay" ? "3đ" : "2đ",
  tone: type === "essay" ? "purple" : "green",
}));

export function AssignmentEditPage({ onNavigate }: AssignmentEditPageProps) {
  const [questionItems, setQuestionItems] = useState<QuestionNavItem[]>(initialQuestionItems);
  const [activeQuestionNumber, setActiveQuestionNumber] = useState(1);
  const activeQuestion = questionItems.find((item) => item.number === activeQuestionNumber) ?? questionItems[0];
  const activeQuestionIndex = questionItems.findIndex((item) => item.number === activeQuestion.number);
  const previousQuestion = activeQuestionIndex > 0 ? questionItems[activeQuestionIndex - 1] : undefined;
  const nextQuestion = activeQuestionIndex >= 0 && activeQuestionIndex < questionItems.length - 1 ? questionItems[activeQuestionIndex + 1] : undefined;
  const addQuestion = (count = 1) => {
    setQuestionItems((current) => {
      const firstNextNumber = Math.max(...current.map((item) => item.number)) + 1;
      setActiveQuestionNumber(firstNextNumber);

      return [
        ...current,
        ...Array.from({ length: count }, (_, index) => ({
          number: firstNextNumber + index,
          points: "2đ",
          tone: "green" as const,
        })),
      ];
    });
  };
  const updateQuestionType = (number: number, type: EditableQuestionType) => {
    setQuestionItems((current) =>
      current.map((item) =>
        item.number === number
          ? {
              ...item,
              points: type === "essay" ? "3đ" : "2đ",
              tone: type === "essay" ? "purple" : "green",
            }
          : item,
      ),
    );
  };

  return (
    <>
      <style>{`
        .assignment-edit-page {
          font-family: 'Nunito', sans-serif;
          color: #14294f;
        }

        .assignment-edit-page .paper {
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

        .assignment-edit-page .soft-paper {
          background:
            radial-gradient(circle at 15% 20%, rgba(120, 76, 30, .07), transparent 25%),
            radial-gradient(circle at 80% 85%, rgba(120, 76, 30, .06), transparent 24%),
            linear-gradient(135deg, rgba(255,255,255,.62), rgba(246,226,190,.78)),
            #fff6e6;
          box-shadow:
            0 8px 18px rgba(82, 54, 24, .12),
            inset 0 0 0 1px rgba(144, 109, 65, .18);
        }

        .assignment-edit-input {
          width: 100%;
          min-height: 42px;
          border: 1px solid #d8c7ab;
          background: #fffaf1;
          border-radius: 7px;
          padding: 10px 12px;
          color: #253b5a;
          font-size: 13px;
          font-weight: 700;
          outline: none;
        }
      `}</style>

      <div className="assignment-edit-page relative min-h-full overflow-x-hidden rounded-xl p-2">
          <Texture />
          <Decor />

          <div className="relative z-10">
            <Header onNavigate={onNavigate} />
            <TopForm />
            <QuestionNavigator
              activeNumber={activeQuestion.number}
              items={questionItems}
              onAddQuestion={addQuestion}
              onSelect={setActiveQuestionNumber}
            />
            <main className="assignment-edit-workspace mt-2 grid grid-cols-1 gap-2 2xl:grid-cols-[minmax(0,1fr)_minmax(280px,320px)]">
              <section className="min-w-0 space-y-2">
                <EditingQuestion
                  key={activeQuestion.number}
                  initialOpen
                  initialType={activeQuestion.tone === "green" ? "multipleChoice" : "essay"}
                  nextQuestionNumber={nextQuestion?.number}
                  number={activeQuestion.number}
                  onTypeChange={updateQuestionType}
                  onNavigateQuestion={setActiveQuestionNumber}
                  previousQuestionNumber={previousQuestion?.number}
                  points={activeQuestion.points}
                  totalQuestions={questionItems.length}
                />
              </section>

              <aside className="min-w-0 space-y-3">
                <ScanImportCard onAddQuestion={addQuestion} />
                <DescriptionCard />
                <FilesCard />
                <OptionsCard />
              </aside>
            </main>
          </div>
      </div>
    </>
  );
}
