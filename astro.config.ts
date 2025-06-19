// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  env: {
    schema: {
      DATABASE_URL: envField.string({
        context: "server",
        access: "public",
        optional: false,
      }),
      DATABASE_AUTH_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      CLERK_PUBLIC_KEY: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      CLERK_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
    },
  },
  vite: {
    plugins: [tsconfigPaths()],
  },
});
