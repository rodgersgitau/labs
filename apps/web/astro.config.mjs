import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";


// https://astro.build/config
export default defineConfig({
  base: "/",
  site: "https://rodgersgitau.github.io/labs",
  integrations: [tailwind(), react()]
});