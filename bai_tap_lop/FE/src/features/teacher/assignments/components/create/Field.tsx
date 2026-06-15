export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mt-4 block">
      <div className="mb-2 text-sm font-extrabold text-[#34445a]">{label}</div>
      {children}
    </label>
  );
}
