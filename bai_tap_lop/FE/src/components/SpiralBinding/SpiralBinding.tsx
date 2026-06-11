import "./SpiralBinding.css";

const RING_COUNT = 14;

export function SpiralBinding() {
  return (
    <div className="notebook-spiral" aria-hidden="true">
      {Array.from({ length: RING_COUNT }).map((_, index) => (
        <div className="spiral-ring" key={index} />
      ))}
    </div>
  );
}
