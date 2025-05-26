const minify = (src) => {
  const refined = src
    // Remove whitespace between tags
    .replace(/>\s+</g, "><")
    // remove double spaces
    .replace(/\s{2,}/g, " ")
    // remove new lines
    .replace(/\n/g, "");
  return refined;
};

export default function minifyHTML() {
  return {
    name: "vite-plugin-custom-minify",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        return minify(html);
      }
    }
  };
}
