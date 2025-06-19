import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { invitee } from "./invitee";

export const event = sqliteTable("event", {
  id: int("id").primaryKey({ autoIncrement: true }),
  userId: int("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  uuid: text("uuid").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  date: text("date").notNull(),
  rsvpDeadline: text("rsvp_deadline").notNull(),
});

export const eventRelations = relations(event, ({ one, many }) => ({
  user: one(user, {
    fields: [event.userId],
    references: [user.id],
  }),
  invitees: many(invitee),
}));
