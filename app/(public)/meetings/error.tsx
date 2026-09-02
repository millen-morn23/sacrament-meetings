"use client";

import Link from "next/link";

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({
  reset,
}: MeetingsErrorProps) {
  return (
    <section
      aria-labelledby="meetings-error-heading"
      className="rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm"
    >
      <h2
        id="meetings-error-heading"
        className="text-2xl font-bold text-slate-900"
      >
        Something went wrong
      </h2>

      <p className="mt-3 text-slate-600">
        We couldn&apos;t load the meetings right now. Please try
        again or return to the meetings page.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Back to Meetings
        </Link>
      </div>
    </section>
  );
}