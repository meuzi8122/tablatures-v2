// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // output: "static"がデフォルトで設定されている
  //（デフォルトはSSG、特定のページをSSRに変更可。v4までは"hybrid"を指定する必要があったが、v5からは不要。）
  vite: {
      plugins: [tailwindcss()],
  },

  adapter: vercel(),
});