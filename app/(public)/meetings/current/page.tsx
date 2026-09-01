import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

function getCurrentSunday(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);

  sunday.setDate(today.getDate() - dayOfWeek);

  return sunday.toISOString().split("T")[0];
}

export default async function CurrentMeetingPage() {
  const sunday = getCurrentSunday();
  const meetings = await getMeetings(sunday);
  const currentMeeting = meetings[0];

  if (currentMeeting) {
    redirect(`/meetings/${currentMeeting.id}`);
  }

  redirect("/meetings");
}
