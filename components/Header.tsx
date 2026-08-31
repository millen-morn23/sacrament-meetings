export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Sacrament Meeting Planner
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            Nairobi Ward
          </h1>
        </div>

        <time
          dateTime={new Date().toISOString().split("T")[0]}
          className="hidden text-sm text-slate-600 sm:block"
        >
          {currentDate}
        </time>
      </div>
    </header>
  );
}