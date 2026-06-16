import { FileText } from "lucide-react";

type AttachmentProps = {
  name: string;
  size: string;
};

export function Attachment({ name, size }: AttachmentProps) {
  return (
    <div className="mt-3 flex items-center gap-3 rounded-md border border-[#eadcc6] bg-[#fffdf8] px-3 py-2">
      <FileText className="shrink-0 text-[#1459d9]" size={20} />
      <span className="min-w-0 flex-1">
        <b className="block truncate text-xs">{name}</b>
        <small className="text-xs font-bold text-[#5d708c]">{size}</small>
      </span>
    </div>
  );
}
