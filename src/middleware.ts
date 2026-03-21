import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signin",
  "/pricing",
  "/about",
  "/contact",
  "/blog",
  "/FAQ",
  "/help",
  "/policy",
  "/privacy-policy",
  "/terms",
  "/auth",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  if (isPublic) return NextResponse.next();

  // Allow static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check Supabase session
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/auth).*)",
  ],
};