import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { Invitee } from "~/server/services/event/schema";

export const event = sqliteTable("event", {
  id: int("id").primaryKey({ autoIncrement: true }),
  ulid: text("ulid").notNull(),
  password: text("password").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  address: text("address"),
  date: text("date"),
  rsvpByDate: text("rsvp_by_date"),
  invitees: text("invitees", { mode: "json" }).$type<Invitee[]>(),
  createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});
