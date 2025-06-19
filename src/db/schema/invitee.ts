import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { event } from "./event";
import type { InviteeResponse } from "../../api/invitee/schema";

export const invitee = sqliteTable("invitee", {
  id: int("id").primaryKey({ autoIncrement: true }),
  eventId: int("event_id").notNull().references(() => event.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  response: text("response").$type<InviteeResponse>(),
});

export const inviteeRelations = relations(invitee, ({ one }) => ({
  event: one(event, {
    fields: [invitee.eventId],
    references: [event.id],
  }),
}));
