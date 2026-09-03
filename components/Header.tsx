import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const session = await auth();

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Sacrament Meeting Planner
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            Nairobi Ward
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <time
            dateTime={new Date().toISOString().split("T")[0]}
            className="hidden text-sm text-slate-600 sm:block"
          >
            {currentDate}
          </time>

          {session?.user ? (
            <LogoutButton />
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}