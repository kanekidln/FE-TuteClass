export function FilterPill({ text, count, active, tone }: { text: string; count: string; active?: boolean; tone?: "green" | "orange" | "red" }) {
  const colors = active
    ? "border-[#1459d9] bg-[#edf3ff] text-[#1459d9]"
    : tone === "green"
    ? "border-[#b7d9a8] bg-[#f0fae8] text-[#15803d]"
    : tone === "red"
    ? "border-[#ffc9c1] bg-[#fff1ed] text-[#dc2626]"
    : "border-[#ffd69c] bg-[#fff7e8] text-[#c96a15]";

  return (
    <button className={`rounded-md border px-2 py-1.5 ${colors}`} type="button">
      {text} <span className="ml-1">{count}</span>
    </button>
  );
}
