import { Megaphone, MessageSquare, MoreHorizontal } from "lucide-react";

export function PrivateHeader() {
  return (
    <header className="teacher-discussion-header teacher-private-header relative border-b border-[#eadcc6] bg-[linear-gradient(#f7ead5_1px,transparent_1px)] [background-size:100%_28px] px-5 py-2.5">
      <div className="absolute left-5 top-4 grid h-10 w-10 place-items-center rounded-xl bg-[#eaf1ff] text-[#1459d9]">
        <MessageSquare size={23} />
      </div>
      <div className="ml-14 min-w-0 pr-24">
        <h1 className="teacher-discussion-title font-extrabold">Chat riêng với học sinh</h1>
        <p className="mt-1 text-xs font-semibold">Trao đổi riêng tư và phản hồi từng học sinh</p>
      </div>
      <div className="absolute right-4 top-3 flex gap-2">
        <button className="teacher-private-chat-button" onClick={() => { window.location.hash = "#teacher/discussions"; }} type="button">
          <Megaphone size={16} />
          Thông báo chung
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-md border border-[#eadcc6] bg-white text-[#203b69] shadow" aria-label="Mở menu" type="button">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <div className="absolute -right-2 top-3 rotate-[18deg] rounded bg-[#f1cfa5]/70 px-4 py-8" />
    </header>
  );
}
