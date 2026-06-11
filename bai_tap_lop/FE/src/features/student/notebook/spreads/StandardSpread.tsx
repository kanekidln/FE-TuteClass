import { PaperCard } from "../components/common/PaperCard";
import type { InsightCard, SpreadNoteCard, StandardSpreadData } from "..";
import { SpreadHeader } from "./SpreadHeader";
import "./spreads.css";

type StandardSpreadProps = {
  data: StandardSpreadData;
};

const toneClasses: Record<InsightCard["tone"], string> = {
  orange: "orange",
  blue: "blue",
  green: "green",
  purple: "purple"
};

const noteToneClasses: Record<SpreadNoteCard["tone"], string> = {
  orange: "standard-note-card orange",
  indigo: "standard-note-card indigo",
  blue: "standard-note-card blue",
  green: "standard-note-card green"
};

export function StandardSpread({ data }: StandardSpreadProps) {
  return (
    <>
      <SpreadHeader accent={data.accent} subtitle={data.subtitle} title={data.heading} />
      <div className="flex gap-8 flex-1">
        <div className="w-3/4 flex flex-col gap-6">
          <div className="schedule-panel notebook-section-card rounded-xl p-4 border border-orange-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="notebook-section-heading flex items-center gap-2 text-blue-800 font-bold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>{data.panelTitle}</span>
              </div>
              <div className="text-yellow-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <p className="notebook-section-subtitle text-sm italic text-gray-500 mb-5">{data.panelSubtitle}</p>
            <div className="standard-card-grid">
              {data.cards.map((card) => (
                <PaperCard className={`standard-insight-card rounded-2xl border p-4 shadow-sm ${toneClasses[card.tone]}`} key={card.title}>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-gray-500 font-bold">{card.eyebrow}</div>
                  <div className="font-handwriting text-2xl text-gray-800 mt-2">{card.title}</div>
                  <p className="text-sm text-gray-600 mt-2 leading-6">{card.body}</p>
                </PaperCard>
              ))}
            </div>
            <div className="standard-checklist-card mt-5 rounded-2xl border border-blue-100 bg-white/80 px-4 py-4">
              <div className="text-xs font-bold text-blue-900 uppercase tracking-[0.12em] mb-3">Checklist triển khai</div>
              <div className="flex flex-col gap-3">
                {data.checklist.map((item) => (
                  <div className="flex items-center gap-3 text-sm text-gray-700" key={item}>
                    <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 inline-flex items-center justify-center text-xs font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 flex flex-col gap-6 -mt-20">
          {data.noteCards.map((noteCard) => (
            <div className={noteToneClasses[noteCard.tone]} key={noteCard.title}>
              <h3>{noteCard.title}</h3>
              {noteCard.items ? (
                <ul>
                  {noteCard.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{noteCard.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto pt-4 -mb-4 flex items-center justify-between text-xs text-gray-500 font-medium">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          {data.footerLeft}
        </div>
        <div className="flex items-center gap-2 italic text-blue-700">{data.footerRight}</div>
      </div>
    </>
  );
}
