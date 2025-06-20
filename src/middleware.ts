import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId } = auth();

  if (!isPublicRoute(context.request) && !userId) {
    return context.redirect("/sign-in");
  }
});
