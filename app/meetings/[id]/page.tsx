import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "../../../components/MeetingDetail";
import PrintButton from "../../../components/PrintButton";
import { getMeetingById } from "../../../lib/meetings-db";

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    notFound();
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/meetings"
          className="text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
        >
          ← Back to all meetings
        </Link>

        <PrintButton />
      </div>

      <MeetingDetail meeting={meeting} />
    </section>
  );
}