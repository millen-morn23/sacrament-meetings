"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createMeeting, type State } from "@/lib/actions";

const initialMeetingState: State = {
  message: "",
};

const defaultHymn = JSON.stringify({
  number: 1,
  title: "",
});

const defaultWardBusiness = JSON.stringify([]);

const defaultSpeakers = JSON.stringify([]);

const defaultAnnouncements = JSON.stringify([]);

export default function MeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialMeetingState,
  );

  return (
    <form
      action={formAction}
      className="space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div
        id="form-error"
        aria-live="polite"
        className={
          state.message
            ? "rounded-lg bg-red-50 p-4 text-red-800"
            : ""
        }
      >
        {state.message && <p>{state.message}</p>}
      </div>

      <section aria-labelledby="meeting-information-heading">
        <h2
          id="meeting-information-heading"
          className="text-xl font-semibold text-slate-900"
        >
          Meeting Information
        </h2>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-slate-700"
            >
              Date
            </label>

            <input
              id="date"
              name="date"
              type="date"
              aria-describedby="date-error"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />

            <p
              id="date-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.date?.[0]}
            </p>
          </div>

          <div>
            <label
              htmlFor="meetingType"
              className="block text-sm font-medium text-slate-700"
            >
              Meeting Type
            </label>

            <select
              id="meetingType"
              name="meetingType"
              defaultValue="regular"
              aria-describedby="meetingType-error"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="regular">Regular</option>
              <option value="testimony">Testimony</option>
              <option value="stake">Stake</option>
              <option value="general">General</option>
            </select>

            <p
              id="meetingType-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.meetingType?.[0]}
            </p>
          </div>

          <div>
            <label
              htmlFor="presiding"
              className="block text-sm font-medium text-slate-700"
            >
              Presiding
            </label>

            <input
              id="presiding"
              name="presiding"
              type="text"
              aria-describedby="presiding-error"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />

            <p
              id="presiding-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.presiding?.[0]}
            </p>
          </div>

          <div>
            <label
              htmlFor="conducting"
              className="block text-sm font-medium text-slate-700"
            >
              Conducting
            </label>

            <input
              id="conducting"
              name="conducting"
              type="text"
              aria-describedby="conducting-error"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />

            <p
              id="conducting-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.conducting?.[0]}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="opening-heading">
        <h2
          id="opening-heading"
          className="text-xl font-semibold text-slate-900"
        >
          Opening
        </h2>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Opening Hymn Number
            </label>

            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              defaultValue="1"
              aria-describedby="openingHymn-error"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label
              htmlFor="openingHymnTitle"
              className="block text-sm font-medium text-slate-700"
            >
              Opening Hymn Title
            </label>

            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              aria-describedby="openingHymn-error"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        <p
          id="openingHymn-error"
          aria-live="polite"
          className="mt-1 text-sm text-red-600"
        >
          {state.errors?.openingHymn?.[0]}
        </p>

        <div className="mt-5">
          <label
            htmlFor="openingPrayer"
            className="block text-sm font-medium text-slate-700"
          >
            Opening Prayer
          </label>

          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            aria-describedby="openingPrayer-error"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />

          <p
            id="openingPrayer-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.openingPrayer?.[0]}
          </p>
        </div>
      </section>

      <section aria-labelledby="sacrament-heading">
        <h2
          id="sacrament-heading"
          className="text-xl font-semibold text-slate-900"
        >
          Sacrament
        </h2>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Sacrament Hymn Number
            </label>

            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              defaultValue="1"
              aria-describedby="sacramentHymn-error"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="block text-sm font-medium text-slate-700"
            >
              Sacrament Hymn Title
            </label>

            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              aria-describedby="sacramentHymn-error"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        <p
          id="sacramentHymn-error"
          aria-live="polite"
          className="mt-1 text-sm text-red-600"
        >
          {state.errors?.sacramentHymn?.[0]}
        </p>
      </section>

      <section aria-labelledby="closing-heading">
        <h2
          id="closing-heading"
          className="text-xl font-semibold text-slate-900"
        >
          Closing
        </h2>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Closing Hymn Number
            </label>

            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              defaultValue="1"
              aria-describedby="closingHymn-error"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label
              htmlFor="closingHymnTitle"
              className="block text-sm font-medium text-slate-700"
            >
              Closing Hymn Title
            </label>

            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              aria-describedby="closingHymn-error"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        <p
          id="closingHymn-error"
          aria-live="polite"
          className="mt-1 text-sm text-red-600"
        >
          {state.errors?.closingHymn?.[0]}
        </p>

        <div className="mt-5">
          <label
            htmlFor="closingPrayer"
            className="block text-sm font-medium text-slate-700"
          >
            Closing Prayer
          </label>

          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            aria-describedby="closingPrayer-error"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />

          <p
            id="closingPrayer-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.closingPrayer?.[0]}
          </p>
        </div>
      </section>

      <section aria-labelledby="business-heading">
        <h2
          id="business-heading"
          className="text-xl font-semibold text-slate-900"
        >
          Ward Business
        </h2>

        <div className="mt-4">
          <label
            htmlFor="stakeBusiness"
            className="block text-sm font-medium text-slate-700"
          >
            Stake Business
          </label>

          <select
            id="stakeBusiness"
            name="stakeBusiness"
            defaultValue="false"
            aria-describedby="stakeBusiness-error"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>

          <p
            id="stakeBusiness-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.stakeBusiness?.[0]}
          </p>
        </div>
      </section>

      <input
        type="hidden"
        name="announcements"
        value={defaultAnnouncements}
      />

      <input
        type="hidden"
        name="openingHymn"
        value={defaultHymn}
      />

      <input
        type="hidden"
        name="wardBusiness"
        value={defaultWardBusiness}
      />

      <input
        type="hidden"
        name="sacramentHymn"
        value={defaultHymn}
      />

      <input
        type="hidden"
        name="speakers"
        value={defaultSpeakers}
      />

      <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create Meeting"}
        </button>

        <Link
          href="/meetings"
          className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}