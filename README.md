I initally built this site with react and next. It was over-engineered, over-abstracted, and over-complicated.
This iteration is a simple static site without frameworks. It's essentially just html, css and js, but typescript, sass, and handlebars are used for a better dev experience. It's compiled with vite.
It makes use of native html elements for interactivity where possible, such as the details element for the expandable menu.

## Optimisations

- Assets are bundled with vite.
- Fonts converted to woff2, and preloaded.
- Image assets are converted to webp and minified.
- Iframes and videos are loaded once they are scrolled into view using an intersection observer.
- SVG icons are inlined in the html.

These optimisations result in a Lighthouse score of ~ 97/100.
