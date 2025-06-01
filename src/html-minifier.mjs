const minify = (src) => {
  // Split content by script tags to preserve their content
  const parts = src.split(/(<script[\s\S]*?<\/script>)/gi);

  const refined = parts
    .map((part) => {
      // If it's a script tag (odd indices after split), return as-is
      if (part.match(/<script[\s\S]*?<\/script>/gi)) {
        return part;
      }
      // Otherwise, apply minification
      return part
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/>\s+</g, "><")
        .replace(/\s{2,}/g, " ")
        .replace(/\n/g, "");
    })
    .join("");

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
