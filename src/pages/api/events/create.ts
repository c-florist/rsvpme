import type { APIRoute } from "astro";
import { createEventSchema } from "~/server/services/event/schema";
import EventService from "~/server/services/event/service";
import logger from "~/server/utils/logging";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  const validationResult = createEventSchema.safeParse(body);
  if (!validationResult.success) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid input data",
        details: validationResult.error.issues,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  try {
    const result = await EventService.create(validationResult.data);

    logger.info("Event created successfully", {
      eventUlid: result.ulid,
      title: validationResult.data.title,
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          ulid: result.ulid,
          password: result.password,
        },
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Failed to create event", error);

      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to create event",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    throw error;
  }
};
