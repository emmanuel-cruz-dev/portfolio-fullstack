import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import { ROUTES, AUTH_ROUTES, PROTECTED_ROUTES } from "@/config/routes";

type AppLocale = (typeof routing.locales)[number];

function isLocale(segment: string): segment is AppLocale {
  return (routing.locales as ReadonlyArray<string>).includes(segment);
}

const handleI18nRouting = createMiddleware(routing);

function isRoute(pathname: string, routes: readonly string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function getPathnameWithoutLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    const pathWithoutLocale = "/" + segments.slice(1).join("/");
    return pathWithoutLocale === "" ? "/" : pathWithoutLocale;
  }
  return pathname;
}

function getLocaleFromPathname(pathname: string): AppLocale {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    return segments[0];
  }
  return routing.defaultLocale;
}

export async function updateSession(request: NextRequest) {
  const response = handleI18nRouting(request);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (response.status >= 300 && response.status < 400) {
    return response;
  }

  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPathname(pathname);
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);

  const isProtectedRoute = isRoute(pathnameWithoutLocale, PROTECTED_ROUTES);
  const isAuthRoute = isRoute(pathnameWithoutLocale, AUTH_ROUTES);
  const isHome = pathnameWithoutLocale === ROUTES.HOME;

  const getRedirectUrl = (path: string) => {
    const targetPath = path.startsWith("/") ? path : `/${path}`;
    const localizedPath = `/${locale}${targetPath === "/" ? "" : targetPath}`;
    return new URL(localizedPath, request.url);
  };

  if (!user && isProtectedRoute) {
    const redirectResponse = NextResponse.redirect(
      getRedirectUrl(ROUTES.LOGIN)
    );
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  }

  if (user && isAuthRoute) {
    const redirectResponse = NextResponse.redirect(
      getRedirectUrl(ROUTES.ADMIN)
    );
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  }

  if (user && isHome) {
    const redirectResponse = NextResponse.redirect(
      getRedirectUrl(ROUTES.ADMIN)
    );
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  }

  return response;
}
