import { z } from "zod";

export const InviteeResponses = {
  YES: "yes",
  NO: "no",
  MAYBE: "maybe",
} as const;

const inviteeResponseSchema = z.enum([
  InviteeResponses.YES,
  InviteeResponses.NO,
  InviteeResponses.MAYBE,
]);
export type InviteeResponse = z.infer<typeof inviteeResponseSchema>;

const inviteeSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  response: inviteeResponseSchema,
});
export type Invitee = z.infer<typeof inviteeSchema>;

export const eventSchema = z.object({
  uuid: z.string().uuid(),
  password: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  address: z.string().nullish(),
  date: z.string().nullish(),
  rsvpByDate: z.string().nullish(),
  invitees: z.array(inviteeSchema).nullish(),
});
export type Event = z.infer<typeof eventSchema>;
