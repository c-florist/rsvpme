import { z } from "zod";

export const InviteeResponses = {
  PENDING: "pending",
  YES: "yes",
  NO: "no",
  MAYBE: "maybe",
} as const;

const inviteeResponseSchema = z.enum([
  InviteeResponses.PENDING,
  InviteeResponses.YES,
  InviteeResponses.NO,
  InviteeResponses.MAYBE,
]);
export type InviteeResponse = z.infer<typeof inviteeResponseSchema>;

const inviteeSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string(),
  response: inviteeResponseSchema,
});
export type Invitee = z.infer<typeof inviteeSchema>;

export const createInviteeSchema = inviteeSchema.pick({
  firstName: true,
  lastName: true,
});
export type CreateInvitee = z.infer<typeof createInviteeSchema>;

export const eventDetailsSchema = z.object({
  title: z.string().max(200).min(1),
  description: z.string().max(5000).nullish(),
  address: z.string().nullish(),
  date: z.string().nullish(),
  rsvpByDate: z.string().nullish(),
});
export type EventDetails = z.infer<typeof eventDetailsSchema>;

export const eventSchema = eventDetailsSchema.extend({
  ulid: z.string().ulid(),
  password: z.string(),
  invitees: z.array(inviteeSchema).nullish(),
});
export type Event = z.infer<typeof eventSchema>;

export const createEventSchema = eventDetailsSchema.extend({
  invitees: z.array(createInviteeSchema),
});
export type CreateEvent = z.infer<typeof createEventSchema>;
