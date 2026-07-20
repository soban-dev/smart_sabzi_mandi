import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/api/auth/login"];

function isPublic(path: string) {
  if (publicPaths.includes(path)) return true;
  if (path.startsWith("/api/auth/")) return true;
  if (path.startsWith("/_next/") || path.startsWith("/static/")) return true;
  if (path.includes(".")) return true;
  return false;
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (isPublic(path)) {
    return NextResponse.next();
  }

  const session = request.cookies.get("session")?.value;

  if (!session) {
    if (path.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const data = JSON.parse(
      Buffer.from(session, "base64").toString("utf-8")
    );
    if (data.exp && data.exp < Date.now()) {
      if (path.startsWith("/api/")) {
        return NextResponse.json({ error: "Session expired" }, { status: 401 });
      }
      const res = NextResponse.redirect(new URL("/", request.url));
      res.cookies.delete("session");
      return res;
    }
  } catch {
    if (path.startsWith("/api/")) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
