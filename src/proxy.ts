import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";

const PUBLIC_ROUTES = [
  "/",
  "/nomadia",
  "/login",
  "/signin",
  "/pricing",
  "/about",
  "/contact",
  "/FAQ",
  "/help",
  "/policy",
  "/privacy-policy",
  "/terms",
  "/auth",
];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => {
    if (route === "/") return pathname === "/";
    return pathname === route || pathname.startsWith(`${route}/`);
  });
}

function isStaticOrExcluded(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/favicon.ico" ||
    pathname.includes(".")
  );
}

function unauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected Area"',
    },
  });
}

function checkBasicAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }

  try {
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(":");

    return (
      username === process.env.BASIC_AUTH_USER &&
      password === process.env.BASIC_AUTH_PASSWORD
    );
  } catch {
    return false;
  }
}


export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isStaticOrExcluded(pathname)) {
    return NextResponse.next();
  }

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
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Get session (reliable in middleware)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  /**
   * Optional: Site-wide basic auth lock
   */
  const basicAuthEnabled = process.env.ENABLE_BASIC_AUTH === "true";

  if (basicAuthEnabled) {
    const isAuthorized = checkBasicAuth(req);
    if (!isAuthorized) {
      return unauthorizedResponse();
    }
  }

  /**
   * Prevent logged-in users from accessing auth pages
   */
  if (session && (pathname === "/login" || pathname === "/signin")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  /**
   * Allow public routes
   */
  if (isPublicRoute(pathname)) {
    return res;
  }

  /**
   * Protect private routes
   */
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};