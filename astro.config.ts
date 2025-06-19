// @ts-check
import { defineConfig, envField } from "astro/config";

import tsconfigPaths from "vite-tsconfig-paths";
import react from "@astrojs/react";
import node from "@astrojs/node";
import clerk from "@clerk/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",

  integrations: [react(), clerk()],

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
      PUBLIC_CLERK_PUBLISHABLE_KEY: envField.string({
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

  adapter: node({
    mode: "standalone",
  }),
});
