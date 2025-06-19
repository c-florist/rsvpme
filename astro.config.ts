// @ts-check
import { defineConfig, envField } from "astro/config";

import node from "@astrojs/node";
import react from "@astrojs/react";
import clerk from "@clerk/astro";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

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
    plugins: [tailwindcss(), tsconfigPaths()],
  },

  adapter: node({
    mode: "standalone",
  }),
});
