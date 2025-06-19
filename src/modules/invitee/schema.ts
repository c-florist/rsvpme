import { z } from "zod";

export const InviteeResponses = {
  YES: "yes",
  NO: "no",
  MAYBE: "maybe",
} as const;

const inviteeResponsesSchema = z.enum([
  InviteeResponses.YES,
  InviteeResponses.NO,
  InviteeResponses.MAYBE,
]);

export type InviteeResponse = z.infer<typeof inviteeResponsesSchema>;
