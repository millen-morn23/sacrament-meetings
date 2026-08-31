import MeetingCard from "../../components/MeetingCard";
import type { SacramentMeeting } from "../../lib/types";

async function getMeetings(): Promise<SacramentMeeting[]> {
  const response = await fetch("http://localhost:3000/api/meetings", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meetings.");
  }

  return response.json() as Promise<SacramentMeeting[]>;
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <section aria-labelledby="meetings-heading">
      <div className="mb-6">
        <h2
          id="meetings-heading"
          className="text-3xl font-bold text-slate-900"
        >
          All Meetings
        </h2>

        <p className="mt-2 text-slate-600">
          Browse current and past sacrament meeting programs.
        </p>
      </div>

      <div className="grid gap-5">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </section>
  );
}