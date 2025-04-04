import { defineConfig, sharpImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";
import mdx from '@astrojs/mdx';
import preact from "@astrojs/preact";
import compressor from "astro-compressor";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [compressor(), mdx(), icon(), preact()],
  image: {
    service: sharpImageService()
  },
  site: "https://mrdoc.dev",
  vite: {
    plugins: [tailwindcss(), rawFonts([".ttf", ".woff"])],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  }
});

// vite plugin to import fonts
function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some(e => id.endsWith(e))) {
        const buffer = readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null
        };
      }
    }
  };
}