import "server-only";
import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  isAuthed: boolean;
}

export const sessionOptions: SessionOptions = {
  // must be at least 32 chars — set in .env.local
  password: process.env.SESSION_SECRET!,
  cookieName: "parisi_admin",
  cookieOptions: {
    httpOnly: true, // not readable by JS — survives XSS
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // CSRF protection
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );
  return session;
}
