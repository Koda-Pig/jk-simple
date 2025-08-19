const minify = (src) => {
  // Split content by script tags to preserve their content
  const parts = src.split(/(<script[\s\S]*?<\/script>)/gi);

  const refined = parts
    .map((part) => {
      // If it's a script tag with data-no-format attribute
      if (part.match(/<script[\s\S]*?data-no-format[\s\S]*?<\/script>/gi)) {
        const match = part.match(/(<script[^>]*>)([\s\S]*?)(<\/script>)/i);
        if (match) {
          const [, openTag, content, closeTag] = match;

          const lines = content.split("\n");

          // Find the first non-empty line to get the base indentation
          const firstNonEmptyLine = lines.find(
            (line) => line.trim().length > 0
          );

          if (firstNonEmptyLine) {
            const baseIndent = firstNonEmptyLine.match(/^[ \t]*/)[0];
            const indentLength = baseIndent.length;

            // Remove that base indentation from all lines
            const dedentedContent = lines
              .map((line) => {
                if (line.startsWith(baseIndent)) {
                  return line.slice(indentLength);
                }
                return line; // Keep lines with different indentation as-is
              })
              .join("\n");

            return openTag + dedentedContent.trimStart() + closeTag;
          }
        }
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
