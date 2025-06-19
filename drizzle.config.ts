import { defineConfig } from "drizzle-kit";
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from "astro:env/server";

export default defineConfig({
  schema: "./src/db/schema/*",
  dialect: "turso",
  dbCredentials: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  }
});
