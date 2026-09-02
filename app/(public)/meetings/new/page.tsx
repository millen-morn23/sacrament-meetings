import Link from "next/link";
import MeetingForm from "@/components/MeetingForm";

export default function NewMeetingPage() {
  return (
    <section aria-labelledby="new-meeting-heading">
      <div className="mb-6">
        <Link
          href="/meetings"
          className="text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
        >
          ← Back to all meetings
        </Link>

        <h2
          id="new-meeting-heading"
          className="mt-4 text-3xl font-bold text-slate-900"
        >
          Create Meeting
        </h2>

        <p className="mt-2 text-slate-600">
          Create a new sacrament meeting program.
        </p>
      </div>

      <MeetingForm />
    </section>
  );
}