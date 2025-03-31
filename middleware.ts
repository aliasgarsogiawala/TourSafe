import { NextResponse } from 'next/server';  // Import the Next.js response helper
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/about",
  "/features",
  "/impact",
  "/contact",
  "/track",
  "/cabfare",
  "/sos",
  "/SosConfirm",
  "/report-scam",
  "/chatroom"
]);

export default clerkMiddleware((auth, req) => {
  // Allow public routes to be accessible without auth
  if (isPublicRoute(req)) {
    return NextResponse.next();  // Continue processing the request
  }

  // For protected routes, check if the user is authenticated
  if (!auth().userId) {
    // Redirect to sign-in if not authenticated
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // User is authenticated, allow access to protected route
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
