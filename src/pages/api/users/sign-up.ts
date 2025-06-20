import type { APIRoute } from "astro";
import UserService from "~/modules/user/service";

export const GET: APIRoute = async ({ locals, redirect }) => {
  const { userId: clerkId } = locals.auth();
  if (!clerkId) {
    console.log("Clerk userId not available after signup");
    return new Response("Unauthorized", { status: 401 });
  }

  await UserService.verifyExists(clerkId);

  return redirect("/");
};
