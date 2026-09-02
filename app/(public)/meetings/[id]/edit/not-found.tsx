import Link from "next/link";

export default function EditMeetingNotFound() {
  return (
    <section
      aria-labelledby="meeting-not-found-heading"
      className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm"
    >
      <h1
        id="meeting-not-found-heading"
        className="text-2xl font-bold text-slate-900"
      >
        Meeting Not Found
      </h1>

      <p className="mt-3 text-slate-600">
        We couldn&apos;t find the meeting you&apos;re trying to edit.
        It may have been deleted or the meeting ID may be incorrect.
      </p>

      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      >
        Back to Meetings
      </Link>
    </section>
  );
}