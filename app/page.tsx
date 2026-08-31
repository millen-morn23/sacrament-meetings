import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Nairobi Ward
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Sacrament Meeting Planner
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Plan, review, and print sacrament meeting programs for current
            and past Sundays.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/meetings"
              className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              View Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Current Sunday
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-slate-100">
          <Image
            src="/meeting-placeholder.svg"
            alt="Sacrament meeting program illustration"
            width={800}
            height={500}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}