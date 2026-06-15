export function PaperTexture() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-80">
      <div className="absolute inset-0 bg-[radial-gradient(#cba56f_0.8px,transparent_0.8px)] [background-size:18px_18px] opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.26)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,.55),transparent_38%),radial-gradient(circle_at_90%_15%,rgba(255,246,225,.7),transparent_32%)]" />
    </div>
  );
}
