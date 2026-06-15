export function statusColor(tone: string | undefined) {
  if (tone === "green") return "text-[#14954a]";
  if (tone === "red") return "text-[#dc2626]";
  return "text-[#c96a15]";
}
