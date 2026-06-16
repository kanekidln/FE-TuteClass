import { Paperclip, Send, Smile } from "lucide-react";
import { quickReplies } from "./data";
import { tagClass } from "./helper";
import { Attachment } from "./Attachment";

type ChatPanelProps = {
  needsFollowUp: boolean;
  onToggleFollowUp: () => void;
};

export function ChatPanel({ needsFollowUp, onToggleFollowUp }: ChatPanelProps) {
  return (
    <section className="flex min-h-0 flex-col rounded-lg border border-[#eadcc6] bg-[#fffdf8]">
      <div className="flex items-center justify-between gap-3 border-b border-[#eadcc6] p-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffd5a7] text-xs font-extrabold">LN</span>
          <div className="min-w-0">
            <h2 className="truncate text-base font-extrabold">Lan Nguyễn</h2>
            <p className="text-xs font-bold text-[#5d708c]">Lớp 9A - Mã HS: HS0123 - Phụ huynh: 0912 345 678</p>
          </div>
        </div>
        <button
          className={`teacher-private-follow-toggle ${needsFollowUp ? "is-on" : ""}`}
          onClick={onToggleFollowUp}
          type="button"
          aria-pressed={needsFollowUp}
        >
          <span>{needsFollowUp ? "Cần theo dõi" : "Hoàn tất"}</span>
          <i />
        </button>
      </div>

      <div className="flex items-center gap-2 border-b border-[#eadcc6] px-3 py-2">
        <span className={tagClass("Bài tập")}>Bài tập</span>
        <span className="teacher-category-tag tag-schedule">Chưa hiểu bài</span>
        <span className="teacher-category-tag tag-other">Câu hỏi</span>
      </div>

      <div className="teacher-private-messages min-h-0 flex-1 space-y-3 overflow-auto p-3">
        <div className="text-center">
          <span className="rounded-full border border-[#eadcc6] bg-white px-4 py-1 text-xs font-bold text-[#5d708c]">20/05/2024</span>
        </div>

        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ffd5a7] text-xs font-extrabold">LN</span>
          <div className="max-w-[340px] rounded-lg border border-[#eadcc6] bg-white p-2.5">
            <div className="mb-1 flex justify-between gap-6 text-sm">
              <b>Lan Nguyễn</b>
              <span className="font-semibold text-[#5d708c]">09:15</span>
            </div>
            <p className="text-xs font-semibold leading-5">Em chào cô ạ, em chưa hiểu cách làm câu 5 bài tập 2 phần phương trình. Cô giải thích lại giúp em với ạ.</p>
            <Attachment name="bt_toan_phuong_trinh.pdf" size="1.2 MB" />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <div className="max-w-[330px] rounded-lg border border-[#b9cdf5] bg-[#eaf1ff] p-2.5">
            <div className="mb-1 text-right text-sm font-semibold text-[#5d708c]">09:23</div>
            <p className="text-xs font-semibold leading-5">Cô chào Lan, cô đã xem bài của em nhé. Cô gửi lời giải chi tiết câu 5, em xem và làm lại giúp cô nhé!</p>
            <Attachment name="loi_giai_cau_5.pdf" size="800 KB" />
            <p className="mt-2 text-right text-xs font-bold text-[#5d708c]">✓✓ Đã gửi</p>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#dce9ff] text-xs font-extrabold text-[#1459d9]">CH</span>
        </div>

        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ffd5a7] text-xs font-extrabold">LN</span>
          <div className="max-w-[300px] rounded-lg border border-[#eadcc6] bg-white p-2.5">
            <div className="mb-1 flex justify-between gap-6 text-sm">
              <b>Lan Nguyễn</b>
              <span className="font-semibold text-[#5d708c]">09:27</span>
            </div>
            <p className="text-xs font-semibold leading-5">Dạ em hiểu rồi ạ! Em cảm ơn cô nhiều ạ!</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#eadcc6] p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {quickReplies.map((text) => (
            <button className="rounded-md border border-[#eadcc6] bg-[#fff8ee] px-2.5 py-1.5 text-[11px] font-extrabold" key={text} type="button">
              {text}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-[#eadcc6] bg-white px-3">
            <Paperclip className="text-[#5d708c]" size={18} />
            <input className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none" placeholder="Nhập tin nhắn..." />
            <Smile className="text-[#5d708c]" size={18} />
          </div>
          <button className="inline-flex min-w-20 items-center justify-center gap-2 rounded-lg bg-[#1459d9] px-4 text-sm font-extrabold text-white" type="button">
            <Send size={16} />
            Gửi
          </button>
        </div>
      </div>
    </section>
  );
}
