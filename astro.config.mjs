import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// import node from "@astrojs/node";
// import cloudflare from "@astrojs/cloudflare";
import node from '@astrojs/node';


import vue from '@astrojs/vue';




// https://astro.build/config
export default defineConfig( {
  site: 'https://example.com',
  integrations: [ mdx(), sitemap(), vue() ],
  output: "hybrid",
  adapter: node( {
    mode: 'standalone'
  } ),
  server: {
    port: process.env.PORT || 3000
  }
} );