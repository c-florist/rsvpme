import type { APIRoute } from "astro";
import UserService from "~/server/services/user/service";
import logger from "~/server/utils/logging";

export const GET: APIRoute = async ({ locals, redirect }) => {
  const { userId: clerkId } = locals.auth();
  if (!clerkId) {
    logger.error("User does not exist after sign in");
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { user, created } = await UserService.ensureExists(clerkId);
    logger.info(
      `User ${created ? "created" : "exists"} with clerkId: ${user.clerkId}`,
    );
  } catch (error) {
    logger.error("Error ensuring user exists", error);
    return new Response("Internal Server Error", { status: 500 });
  }

  return redirect("/");
};
