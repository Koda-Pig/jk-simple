import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import minifyHTML from "./src/html-minifier.mjs";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
      helpers: {
        // format the date for the anchor link
        dateAnchor: (title: string) => {
          const m = /\((\d{2})\/(\d{2})\/(\d{4})\)/.exec(title || "");
          if (!m) return "";
          const [, dd, mm, yyyy] = m;
          return `${yyyy}-${mm}-${dd}`; // e.g. 2025-10-27
        }
      }
    }),
    minifyHTML()
  ],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        blog: "blog.html"
      }
    }
  }
});
