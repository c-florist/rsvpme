import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { event } from "./event";

export const user = sqliteTable("user", {
  id: int().primaryKey({ autoIncrement: true }),
  clerkId: text("clerk_id").notNull().unique(),
});

export const userRelations = relations(user, ({ many }) => ({
  events: many(event),
}));
