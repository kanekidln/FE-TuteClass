type SpreadHeaderProps = {
  title: string;
  accent: string;
  subtitle: string;
};

export function SpreadHeader({ title, accent, subtitle }: SpreadHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div data-purpose="main-title">
        <h1 className="text-4xl font-handwriting text-gray-800 mb-1">
          {title} <span className="text-blue-600">{accent}</span>
        </h1>
        <p className="text-sm italic text-gray-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-orange-400 w-12 h-6 rounded-md transform rotate-12 -mr-4 z-10 opacity-60" />
      </div>
    </div>
  );
}
