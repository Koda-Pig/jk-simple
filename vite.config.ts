import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import minifyHTML from "./src/html-minifier.mjs";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials")
    }),
    minifyHTML()
  ]
});
