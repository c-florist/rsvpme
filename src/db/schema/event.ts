import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { invitee } from "./invitee";
import { user } from "./user";

export const event = sqliteTable("event", {
  id: int("id").primaryKey({ autoIncrement: true }),
  userId: int("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  uuid: text("uuid").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  address: text("address"),
  date: text("date"),
  rsvpDeadline: text("rsvp_deadline"),
});

export const eventRelations = relations(event, ({ one, many }) => ({
  user: one(user, {
    fields: [event.userId],
    references: [user.id],
  }),
  invitees: many(invitee),
}));
