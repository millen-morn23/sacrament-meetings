export default function Loading() {
  return (
    <div
      className="rounded-xl border border-slate-200 bg-white p-8 text-center"
      role="status"
      aria-live="polite"
    >
      <p className="text-slate-600">Loading meeting programs...</p>
    </div>
  );
}