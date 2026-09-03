import type { Metadata } from "next";
import Link from "next/link";
import MeetingCard from "@/components/MeetingCard";
import {
  getMeetingsBySearch,
  getMeetingsTotalPages,
} from "@/lib/meetings-db";

export const metadata: Metadata = {
  title: "Meetings",
  description:
    "Browse, search, and manage sacrament meeting programs for the Nairobi Ward.",
};

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params.query?.trim() ?? "";
  const requestedPage = Number(params.page ?? "1");

  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetingsBySearch(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  const safeCurrentPage = Math.min(currentPage, totalPages);

  return (
    <section aria-labelledby="meetings-heading">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
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

        <Link
          href="/meetings/new"
          className="rounded-lg bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Create Meeting
        </Link>
      </div>

      <form
        method="GET"
        action="/meetings"
        className="mb-8"
      >
        <label
          htmlFor="meeting-search"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Search meetings
        </label>

        <div className="flex gap-2">
          <input
            id="meeting-search"
            type="search"
            name="query"
            defaultValue={query}
            placeholder="Search by speaker, topic, or meeting type..."
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200"
          />

          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </form>

      {meetings.length > 0 ? (
        <div className="grid gap-5">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-slate-200 p-6 text-center text-slate-600">
          No meetings found.
        </p>
      )}

      {totalPages > 1 && (
        <nav
          className="mt-8 flex items-center justify-center gap-4"
          aria-label="Meeting pagination"
        >
          {safeCurrentPage > 1 ? (
            <Link
              href={`/meetings?${new URLSearchParams({
                ...(query ? { query } : {}),
                page: String(safeCurrentPage - 1),
              }).toString()}`}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Previous
            </Link>
          ) : (
            <span className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-400">
              Previous
            </span>
          )}

          <span className="text-sm text-slate-600">
            Page {safeCurrentPage} of {totalPages}
          </span>

          {safeCurrentPage < totalPages ? (
            <Link
              href={`/meetings?${new URLSearchParams({
                ...(query ? { query } : {}),
                page: String(safeCurrentPage + 1),
              }).toString()}`}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Next
            </Link>
          ) : (
            <span className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-400">
              Next
            </span>
          )}
        </nav>
      )}
    </section>
  );
}