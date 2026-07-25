export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth",
  ADMIN: "/dashboard",
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  "/projects",
  "/experience",
  "/education",
  "/contact",
];

export const AUTH_ROUTES = [ROUTES.LOGIN, "/login", "/forgot-password"];

export const PROTECTED_ROUTES = [ROUTES.ADMIN, "/settings", "/profile"];
