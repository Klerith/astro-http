import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// import node from "@astrojs/node";
import cloudflare from "@astrojs/cloudflare";


import vue from "@astrojs/vue";

import db from "@astrojs/db";



// https://astro.build/config
export default defineConfig( {
  site: 'https://example.com',
  integrations: [ mdx(), sitemap(), vue(), db() ],
  output: "hybrid",
  adapter: cloudflare(),

  // Desde la versión 4.15, ya no es experimental
  // experimental: {
  //   actions: true,
  // },
} );