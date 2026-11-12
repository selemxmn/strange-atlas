# The Strange Atlas of Humanity

An interactive museum of real, surprising facts about our planet: a WebGL night globe, rabbit-hole navigation between 136 sourced discoveries, a People mode with an impact graph (46 people → ideas → inventions → modern life), a "Surprise me" guessing reveal, and a personal trail saved in localStorage.

## Run it
No build step, backend or API keys. All libraries, fonts and map data are bundled.

```
cd strange-atlas
python3 -m http.server 8000      # or: npx serve .
# open http://localhost:8000
```
Opening `index.html` directly also works in Chromium-based browsers.

## Structure
```
index.html            page shell
css/atlas.css         layout, type, motion
css/fonts.css         self-hosted Bodoni Moda, Hanken Grotesk, IBM Plex Mono
js/globe.js           Three.js globe: dot-matrix shader, ID-map country picking, markers, arcs, stars
js/app.js             country/story/person pages, rabbit hole, reveal, filters, trail, routing
js/graph.js           impact graph (d3)
js/util.js            geo maths, storage, time scale
js/data/discoveries.js  136 discoveries with sources, dispute notes and links
js/data/people.js       46 people + impact graph nodes/edges
js/data/world.js        Natural Earth 1:50m countries (world-atlas)
vendor/               three.js r147, d3 7.9, topojson-client 3.1
fonts/                woff2 files (OFL)
```
Deep links: `#d-zanzibar-war`, `#p-tesla`, `#c-250` (ISO numeric), `#people`, `#trail`.
