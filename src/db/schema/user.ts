import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: int().primaryKey({ autoIncrement: true }),
  clerkId: text("clerk_id").notNull().unique(),
});
