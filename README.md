# BNZR portfolio

React + Vite implementation of the approved **Ready for Dev** Figma page, including Home, About, WAEC, Lowbee, Knifebud, Making it Real / DODO, and Jammies.

## Run

Requires Node.js 20.19+ or 22.12+ and pnpm.

```sh
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

## Edit

- `src/pages/`: page copy, structure and image placement.
- `src/styles.css`: shared theme tokens, typography resets and interaction styles.
- `src/design.css`: scoped desktop/mobile styles adapted from Figma, with no Tailwind runtime.
- `src/App.jsx`: routes, image viewer and persistent theme selection.
- `public/assets/`: the 27 original Figma images and the WAEC video poster, saved locally with no expiring links.
- `design-reference/`: local snapshots of the design-context reference code. These are not shipped to browsers. `scripts/prepare-design.mjs` can regenerate the initial page transcription; it will overwrite changes in `src/pages/` and `src/design.css`.

The default theme is dark. Light mode follows visitors between pages and reloads. Content remains native text and React elements; project screenshots and photography remain image assets. The WAEC embedded video is represented by its exact Figma-exported poster because the connector did not expose its source video file. It is not presented as a playable video. Other supplied still images are preserved.

## Navigation

`/`, `/about`, `/work/waec`, `/work/lowbee`, `/work/knifebud`, `/work/gates`, `/jammies`.

For alternative hosts, enable a single-page application fallback to `index.html`. The build includes route entry documents as a fallback for direct links. This project is prepared for a private review deployment through Sites. Publishing to a public domain or replacing the existing Framer site is a separate step.
