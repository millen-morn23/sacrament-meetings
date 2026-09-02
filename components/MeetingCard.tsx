import Link from "next/link";
import { deleteMeeting } from "@/lib/actions";
import type { SacramentMeeting } from "../lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            {meeting.meetingType} meeting
          </p>

          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            {new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Presiding: {meeting.presiding}
          </p>

          <p className="text-sm text-slate-600">
            Conducting: {meeting.conducting}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/meetings/${meeting.id}`}
            className="rounded-md bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            View Program
          </Link>

          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="rounded-md border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Edit
          </Link>

          <form action={deleteMeeting}>
            <input
              type="hidden"
              name="id"
              value={meeting.id}
            />

            <button
              type="submit"
              className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}