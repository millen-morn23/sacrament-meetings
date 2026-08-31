import MeetingCard from "../../components/MeetingCard";
import { getMeetings } from "../../lib/meetings-db";

export default function MeetingsPage() {
  const meetings = getMeetings();

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