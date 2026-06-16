import { sharedFiles } from "./data";

export function SharedFilesPanel() {
  return (
    <>
      <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide">File / Ảnh / Link</h3>
      <div className="grid gap-2">
        {sharedFiles.map(({ Icon, meta, name }) => (
          <button className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 rounded-lg border border-[#eadcc6] bg-white/70 p-3 text-left" key={name} type="button">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eaf1ff] text-[#1459d9]">
              <Icon size={17} />
            </span>
            <span className="min-w-0">
              <b className="block truncate text-sm">{name}</b>
              <small className="block truncate text-xs font-bold text-[#5d708c]">{meta}</small>
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
