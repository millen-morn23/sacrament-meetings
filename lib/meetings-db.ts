import { neon } from "@neondatabase/serverless";
import type {
  MeetingType,
  SacramentMeeting,
} from "./types";

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

interface MeetingRow {
  id: number;
  date: string | Date;
  meeting_type: string;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: SacramentMeeting["openingHymn"];
  opening_prayer: string;
  ward_business: SacramentMeeting["wardBusiness"] | null;
  stake_business: boolean;
  sacrament_hymn: SacramentMeeting["sacramentHymn"];
  speakers: SacramentMeeting["speakers"] | null;
  closing_hymn: SacramentMeeting["closingHymn"];
  closing_prayer: string;
}

function parseMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date:
      row.date instanceof Date
        ? row.date.toISOString().split("T")[0]
        : row.date,
    meetingType: row.meeting_type as MeetingType,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(
  date?: string | null,
): Promise<SacramentMeeting[]> {
  const rows = date
    ? await sql`
        SELECT *
        FROM meetings
        WHERE date = ${date}
        ORDER BY date DESC, id DESC
      `
    : await sql`
        SELECT *
        FROM meetings
        ORDER BY date DESC, id DESC
      `;

  return (rows as MeetingRow[]).map(parseMeeting);
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return null;
  }

  return parseMeeting(rows[0] as MeetingRow);
}

export async function getMeetingsTotalPages(
  query = "",
): Promise<number> {
  const searchTerm = `%${query.trim()}%`;

  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
    WHERE presiding ILIKE ${searchTerm}
       OR conducting ILIKE ${searchTerm}
       OR meeting_type ILIKE ${searchTerm}
       OR EXISTS (
         SELECT 1
         FROM jsonb_array_elements_text(announcements) AS announcement
         WHERE announcement ILIKE ${searchTerm}
       )
       OR EXISTS (
         SELECT 1
         FROM jsonb_array_elements(speakers) AS speaker
         WHERE speaker->>'name' ILIKE ${searchTerm}
            OR speaker->>'topic' ILIKE ${searchTerm}
       )
  `;

  const count = Number(rows[0]?.count ?? 0);

  return Math.max(1, Math.ceil(count / ITEMS_PER_PAGE));
}

export async function getMeetingsBySearch(
  query: string,
  currentPage: number,
): Promise<SacramentMeeting[]> {
  const safePage =
    Number.isInteger(currentPage) && currentPage > 0
      ? currentPage
      : 1;

  const offset = (safePage - 1) * ITEMS_PER_PAGE;
  const searchTerm = `%${query.trim()}%`;

  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE presiding ILIKE ${searchTerm}
       OR conducting ILIKE ${searchTerm}
       OR meeting_type ILIKE ${searchTerm}
       OR EXISTS (
         SELECT 1
         FROM jsonb_array_elements_text(announcements) AS announcement
         WHERE announcement ILIKE ${searchTerm}
       )
       OR EXISTS (
         SELECT 1
         FROM jsonb_array_elements(speakers) AS speaker
         WHERE speaker->>'name' ILIKE ${searchTerm}
            OR speaker->>'topic' ILIKE ${searchTerm}
       )
    ORDER BY date DESC, id DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return (rows as MeetingRow[]).map(parseMeeting);
}

export async function createMeeting(
  _meeting: Omit<SacramentMeeting, "id">,
): Promise<never> {
  throw new Error("createMeeting is not implemented in W03.");
}

export async function updateMeeting(
  _id: number,
  _meeting: Partial<SacramentMeeting>,
): Promise<never> {
  throw new Error("updateMeeting is not implemented in W03.");
}

export async function deleteMeeting(
  _id: number,
): Promise<never> {
  throw new Error("deleteMeeting is not implemented in W03.");
}