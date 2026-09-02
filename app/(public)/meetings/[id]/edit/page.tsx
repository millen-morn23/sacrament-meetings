import Link from "next/link";
import { notFound } from "next/navigation";
import EditMeetingForm from "@/components/EditMeetingForm";
import { getMeetingById } from "@/lib/meetings-db";

interface EditMeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <section aria-labelledby="edit-meeting-heading">
      <div className="mb-6">
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
        >
          ← Back to meeting
        </Link>

        <h2
          id="edit-meeting-heading"
          className="mt-4 text-3xl font-bold text-slate-900"
        >
          Edit Meeting
        </h2>

        <p className="mt-2 text-slate-600">
          Update the sacrament meeting program details.
        </p>
      </div>

      <EditMeetingForm meeting={meeting} />
    </section>
  );
}