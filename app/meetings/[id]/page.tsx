import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "../../../components/MeetingDetail";
import PrintButton from "../../../components/PrintButton";
import type { SacramentMeeting } from "../../../lib/types";

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getMeeting(id: string): Promise<SacramentMeeting> {
  const response = await fetch(
    `http://localhost:3000/api/meetings/${id}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404 || response.status === 400) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch meeting.");
  }

  return response.json() as Promise<SacramentMeeting>;
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeeting(id);

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