import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

const SESSION_COOKIE = "session";
const SESSION_DURATION = 60 * 60 * 24; // 24 hours

interface SessionData {
  userId: number;
  username: string;
  name: string;
  role: string;
  exp: number;
}

function encodeSession(data: SessionData): string {
  const json = JSON.stringify(data);
  return Buffer.from(json).toString("base64");
}

function decodeSession(token: string): SessionData | null {
  try {
    const json = Buffer.from(token, "base64").toString("utf-8");
    const data = JSON.parse(json) as SessionData;
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function createSession(user: {
  id: number;
  username: string;
  name: string;
  role: string;
}) {
  const cookieStore = await cookies();
  const session: SessionData = {
    userId: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    exp: Date.now() + SESSION_DURATION * 1000,
  };
  cookieStore.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return decodeSession(token);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function seedAdmin() {
  const existing = await prisma.user.findFirst({ where: { role: "admin" } });
  if (!existing) {
    await prisma.user.create({
      data: {
        username: "admin",
        password: await hashPassword("admin123"),
        name: "Administrator",
        role: "admin",
      },
    });
  }
  const shopkeeper = await prisma.user.findFirst({
    where: { role: "shopkeeper" },
  });
  if (!shopkeeper) {
    await prisma.user.create({
      data: {
        username: "shopkeeper",
        password: await hashPassword("shop123"),
        name: "Shop Keeper",
        role: "shopkeeper",
      },
    });
  }
}
