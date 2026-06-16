import { Clock3 } from "lucide-react";
import { historyEvents } from "./data";
import { tagClass } from "./helper";

export function HistoryPanel() {
  return (
    <>
      <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide">Tóm tắt lịch sử</h3>
      <div className="grid gap-3">
        {historyEvents.map((event) => (
          <div className="relative rounded-lg border border-[#eadcc6] bg-white/70 p-3 pl-9" key={`${event.tag}-${event.time}`}>
            <Clock3 className="absolute left-3 top-3 text-[#1459d9]" size={16} />
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={tagClass(event.tag)}>{event.tag}</span>
              <span className="text-xs font-bold text-[#5d708c]">{event.time}</span>
            </div>
            <p className="text-sm font-semibold leading-5">{event.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
