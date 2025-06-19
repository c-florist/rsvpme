// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";

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
    },
  },
});
