import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { InviteeResponse } from "../../api/invitee/schema";
import { event } from "./event";

export const invitee = sqliteTable("invitee", {
  id: int("id").primaryKey({ autoIncrement: true }),
  eventId: int("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  response: text("response").$type<InviteeResponse>(),
});

export const inviteeRelations = relations(invitee, ({ one }) => ({
  event: one(event, {
    fields: [invitee.eventId],
    references: [event.id],
  }),
}));
