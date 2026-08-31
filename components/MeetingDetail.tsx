import type { SacramentMeeting } from "../lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(
    `${meeting.date}T00:00:00`,
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm print:border-0 print:p-0 print:shadow-none">
      <header className="border-b border-slate-200 pb-6 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          {meeting.meetingType} meeting
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Sacrament Meeting
        </h1>

        <p className="mt-2 text-slate-600">{formattedDate}</p>

        <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          <p>
            <span className="font-semibold text-slate-900">Presiding:</span>{" "}
            {meeting.presiding}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Conducting:</span>{" "}
            {meeting.conducting}
          </p>
        </div>
      </header>

      <div className="mt-6 space-y-8">
        {meeting.announcements &&
          meeting.announcements.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                Announcements
              </h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                {meeting.announcements.map((announcement) => (
                  <li key={announcement}>{announcement}</li>
                ))}
              </ul>
            </section>
          )}

        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            Opening
          </h2>

          <div className="mt-3 space-y-2 text-slate-700">
            <p>
              <span className="font-semibold">Opening Hymn:</span>{" "}
              Hymn {meeting.openingHymn.number},{" "}
              {meeting.openingHymn.title}
            </p>

            <p>
              <span className="font-semibold">Opening Prayer:</span>{" "}
              {meeting.openingPrayer}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            Ward Business
          </h2>

          {meeting.wardBusiness.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              {meeting.wardBusiness.map((item) => (
                <li key={item.description}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-slate-600">
              No ward business scheduled.
            </p>
          )}

          <p className="mt-3 text-slate-700">
            <span className="font-semibold">Stake Business:</span>{" "}
            {meeting.stakeBusiness ? "Yes" : "No"}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            Sacrament
          </h2>

          <p className="mt-3 text-slate-700">
            <span className="font-semibold">Sacrament Hymn:</span>{" "}
            Hymn {meeting.sacramentHymn.number},{" "}
            {meeting.sacramentHymn.title}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            Speakers & Musical Numbers
          </h2>

          {meeting.speakers.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {meeting.speakers.map((item) => (
                <li
                  key={`${item.type}-${item.name}`}
                  className="rounded-lg bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-sm capitalize text-slate-500">
                    {item.type.replace("-", " ")}
                  </p>
                  {item.topic && (
                    <p className="mt-1 text-slate-700">{item.topic}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-slate-600">
              No speakers or musical numbers scheduled.
            </p>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            Closing
          </h2>

          <div className="mt-3 space-y-2 text-slate-700">
            <p>
              <span className="font-semibold">Closing Hymn:</span>{" "}
              Hymn {meeting.closingHymn.number},{" "}
              {meeting.closingHymn.title}
            </p>

            <p>
              <span className="font-semibold">Closing Prayer:</span>{" "}
              {meeting.closingPrayer}
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}