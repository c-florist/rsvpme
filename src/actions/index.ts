import { defineAction } from "astro:actions";
import { createEventSchema } from "~/server/services/event/schema";
import EventService from "~/server/services/event/service";

export const server = {
  createEvent: defineAction({
    input: createEventSchema,
    handler: async (input) => {
      return await EventService.create(input);
    },
  }),
};
