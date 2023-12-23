import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  base: "/",
  site: "https://rodgersgitau.github.io/labs",
  integrations: [tailwind()]
});