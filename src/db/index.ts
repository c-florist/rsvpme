import { drizzle } from "drizzle-orm/libsql";
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from "astro:env/server";

export const db = drizzle({
  connection: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN
  }
});
