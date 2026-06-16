import { Megaphone, MessageSquare, MoreHorizontal, Plus } from "lucide-react";

type PageHeaderProps = {
  onCreate: () => void;
};

export function PageHeader({ onCreate }: PageHeaderProps) {
  return (
    <header className="teacher-discussion-header relative border-b border-[#eadcc6] bg-[linear-gradient(#f7ead5_1px,transparent_1px)] [background-size:100%_28px] px-6 py-3">
      <div className="absolute left-6 top-5 grid h-11 w-11 place-items-center rounded-xl bg-[#eaf1ff] text-[#1459d9]">
        <Megaphone size={26} />
      </div>
      <div className="ml-16 min-w-0 pr-40">
        <h1 className="teacher-discussion-title font-extrabold">Thông báo chung</h1>
        <p className="mt-1 text-sm font-semibold">Gửi thông báo đến cả lớp và theo dõi phản hồi của học sinh</p>
      </div>
      <div className="absolute right-4 top-3 flex gap-2">
        <button className="teacher-private-chat-button" onClick={() => { window.location.hash = "#teacher/discussions/private"; }} type="button">
          <MessageSquare size={16} />
          Chat riêng
          <span>12</span>
        </button>
        <button className="inline-flex items-center gap-2 rounded-md bg-[#1459d9] px-4 py-2 text-sm font-extrabold text-white shadow" onClick={onCreate} type="button">
          <Plus size={16} />
          Tạo thông báo
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-md border border-[#eadcc6] bg-white text-[#203b69] shadow" aria-label="Mở menu" type="button">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <div className="absolute -right-2 top-3 rotate-[18deg] rounded bg-[#f1cfa5]/70 px-4 py-8" />
    </header>
  );
}
