import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const db = drizzle({
  schema: schema,
  connection: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  },
});
