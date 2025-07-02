import { relations } from "drizzle-orm";
import { int, sqliteTable } from "drizzle-orm/sqlite-core";
import { event } from "./event";

export const user = sqliteTable("user", {
  id: int().primaryKey({ autoIncrement: true }),
});

export const userRelations = relations(user, ({ many }) => ({
  events: many(event),
}));
