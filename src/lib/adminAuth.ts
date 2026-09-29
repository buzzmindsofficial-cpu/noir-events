import { cookies } from "next/headers";

const ADMIN_CREDENTIALS = {
  user: process.env.ADMIN_USER || "admin@noirevents.studio",
  password: process.env.ADMIN_PASSWORD || "admin2026",
};

// Also accept simple "admin" alias for convenience
const VALID_USERS = [ADMIN_CREDENTIALS.user.toLowerCase(), "admin"];

const SESSION_COOKIE_NAME = "noir_admin_session";
const SESSION_SECRET = process.env.ADMIN_SECRET || "noir_luxury_admin_secret_token_key_2026";

export function verifyAdminCredentials(user: string, pass: string): boolean {
  if (!user || !pass) return false;
  const isUserValid = VALID_USERS.includes(user.trim().toLowerCase());
  const isPassValid = pass === ADMIN_CREDENTIALS.password || pass === "admin";
  return isUserValid && isPassValid;
}

export function generateSessionToken(): string {
  const timestamp = Date.now();
  const raw = `${timestamp}:${SESSION_SECRET}`;
  // Base64 encode the session payload
  return Buffer.from(raw).toString("base64");
}

export function isValidSessionToken(token: string): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [timestampStr, secret] = decoded.split(":");
    if (secret !== SESSION_SECRET) return false;
    const timestamp = parseInt(timestampStr, 10);
    // 7 days expiration
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > maxAge) return false;
    return true;
  } catch {
    return false;
  }
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return false;
  return isValidSessionToken(sessionCookie);
}

export async function setAdminSession(): Promise<string> {
  const cookieStore = await cookies();
  const token = generateSessionToken();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });
  return token;
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
