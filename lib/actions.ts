"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import {
  createMeeting as createMeetingDb,
  updateMeeting as updateMeetingDb,
  deleteMeeting as deleteMeetingDb,
} from "@/lib/meetings-db";

const HymnSchema = z.object({
  number: z.coerce
    .number()
    .int()
    .positive("Hymn number must be greater than 0."),
  title: z.string().trim().min(1, "Hymn title is required."),
});

const SpeakerSchema = z.object({
  name: z.string().trim().min(1, "Speaker name is required."),
  topic: z.string().trim(),
  type: z.enum(["speaker", "musical-number"]),
});

const WardBusinessSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Ward business description is required."),
});

const MeetingFormSchema = z.object({
  date: z.string().min(1, "Meeting date is required."),
  meetingType: z.enum(
    ["testimony", "regular", "stake", "general"],
    "Please select a valid meeting type.",
  ),
  presiding: z.string().trim().min(1, "Presiding is required."),
  conducting: z.string().trim().min(1, "Conducting is required."),
  announcements: z.array(z.string().trim()),
  openingHymn: HymnSchema,
  openingPrayer: z.string().trim().min(1, "Opening prayer is required."),
  wardBusiness: z.array(WardBusinessSchema),
  stakeBusiness: z.boolean(),
  sacramentHymn: HymnSchema,
  speakers: z.array(SpeakerSchema),
  closingHymn: HymnSchema,
  closingPrayer: z.string().trim().min(1, "Closing prayer is required."),
});

export type State = {
  message: string;
  errors?: Record<string, string[]>;
};

function parseJsonField(
  formData: FormData,
  fieldName: string,
): unknown {
  const value = formData.get(fieldName);

  if (typeof value !== "string" || value.trim() === "") {
    return [];
  }

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function formDataToMeetingData(formData: FormData) {
  return {
    date: String(formData.get("date") ?? ""),
    meetingType: String(formData.get("meetingType") ?? ""),
    presiding: String(formData.get("presiding") ?? ""),
    conducting: String(formData.get("conducting") ?? ""),

    announcements: parseJsonField(
      formData,
      "announcements",
    ),

    openingHymn: {
      number: formData.get("openingHymnNumber"),
      title: String(
        formData.get("openingHymnTitle") ?? "",
      ),
    },

    openingPrayer: String(
      formData.get("openingPrayer") ?? "",
    ),

    wardBusiness: parseJsonField(
      formData,
      "wardBusiness",
    ),

    stakeBusiness:
      formData.get("stakeBusiness") === "true",

    sacramentHymn: {
      number: formData.get("sacramentHymnNumber"),
      title: String(
        formData.get("sacramentHymnTitle") ?? "",
      ),
    },

    speakers: parseJsonField(
      formData,
      "speakers",
    ),

    closingHymn: {
      number: formData.get("closingHymnNumber"),
      title: String(
        formData.get("closingHymnTitle") ?? "",
      ),
    },

    closingPrayer: String(
      formData.get("closingPrayer") ?? "",
    ),
  };
}

export async function createMeeting(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const validatedFields = MeetingFormSchema.safeParse(
    formDataToMeetingData(formData),
  );

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors:
        validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await createMeetingDb(validatedFields.data);

    revalidatePath("/meetings");
  } catch (error) {
    console.error(
      "Failed to create meeting:",
      error,
    );

    throw new Error(
      "Something went wrong while creating the meeting. Please try again.",
    );
  }

  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const validatedFields = MeetingFormSchema.safeParse(
    formDataToMeetingData(formData),
  );

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors:
        validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await updateMeetingDb(
      id,
      validatedFields.data,
    );

    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);
  } catch (error) {
    console.error(
      "Failed to update meeting:",
      error,
    );

    throw new Error(
      "Something went wrong while updating the meeting. Please try again.",
    );
  }

  redirect("/meetings");
}

export async function deleteMeeting(
  formData: FormData,
): Promise<void> {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid meeting ID.");
  }

  try {
    await deleteMeetingDb(id);

    revalidatePath("/meetings");
  } catch (error) {
    console.error(
      "Failed to delete meeting:",
      error,
    );

    throw new Error(
      "Something went wrong while deleting the meeting.",
    );
  }

  redirect("/meetings");
}