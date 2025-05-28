# Why

I initally built this site with react and next. It was over-engineered, over-abstracted, and over-complicated.
This iteration uses native HTML elements (like `<details>` for menus) and some other things that would generally be considered bad practice (like storing page state in the window object), instead of framework abstractions. Typescript, Sass, and Handlebars are used for a better DX.
No frameworks, but we have components, interactivity and state without it. This site is much faster, smaller, and simpler than the previous iteration.

## Optimisations

- Assets are bundled with vite.
- Fonts converted to woff2, and preloaded.
- Image assets are converted to webp and minified.
- Iframes and videos are only loaded once they are scrolled into view.
- SVG icons are inlined in the html.
- HTML is minified with a custom script.

These optimisations result in a Lighthouse score of (96 ~ 99)/100.

## External links

[joshkoter.com](https://joshkoter.com)
