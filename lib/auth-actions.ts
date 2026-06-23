"use server";

import { redirect } from "next/navigation";
import { timingSafeEqual } from "crypto";
import { getSession } from "@/lib/session";

/** Constant-time string compare to avoid timing attacks. */
function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // pad to equal length so timingSafeEqual doesn't throw
  if (bufA.length !== bufB.length) {
    // still run a comparison to keep timing consistent
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export async function login(
  _prev: { error?: string } | undefined,
  formData: FormData,
) {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected || !safeEqual(password, expected)) {
    return { error: "Wrong password." };
  }

  const session = await getSession();
  session.isAuthed = true;
  await session.save();

  redirect("/admin");
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}
