import { getMeetingById } from "../../../../lib/meetings-db";

interface MeetingRouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  context: MeetingRouteContext,
) {
  const { id } = await context.params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    return Response.json(
      { error: "Meeting ID must be a valid number." },
      { status: 400 },
    );
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return Response.json(
      { error: "Meeting not found." },
      { status: 404 },
    );
  }

  return Response.json(meeting);
}