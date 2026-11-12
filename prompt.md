Build a complete, production-quality interactive web experience called:

THE STRANGE ATLAS OF HUMANITY

This is NOT a traditional country-facts website.

It should feel like an interactive digital museum / visual exploration experience that makes people continuously discover things they did not know.

The core emotion should be:

«“I had no idea.”»

---

THE EXPERIENCE

When the website opens, the user sees a beautiful, cinematic interactive representation of Earth.

The visual centerpiece should immediately communicate that this is an exploration of humanity, not a corporate dashboard.

The user can rotate, zoom and explore the world.

Clicking a country does NOT simply open a standard country information card.

Instead, it opens a curated collection of the strangest, most surprising, unusual or counterintuitive REAL facts connected to that country.

Examples of the type of discovery:

- an extraordinary historical event
- an unusual law
- a bizarre geographical fact
- an unexpected scientific contribution
- a strange cultural tradition
- an extremely unusual natural phenomenon
- an important invention people don't associate with that country
- an unusual historical coincidence
- a person from that country who changed something unexpectedly important
- an absurd-sounding fact that is actually true

The goal is not to find the most famous facts.

The goal is to find the facts that make someone say:

«“How did I never know this?”»

---

IMPORTANT: DON'T MAKE IT A WIKIPEDIA CLONE

Do not create:

Country name
Capital
Population
GDP
Official language
Currency
...and call that an experience.

Those things may exist somewhere in the interface, but they are NOT the product.

The product is discovery.

---

THE VISUAL EXPERIENCE

This is the most important requirement.

Do NOT create the interface primarily from basic HTML rectangles, generic cards, borders and simple SVG geometric shapes.

Do NOT make it look like an AI-generated dashboard.

Do NOT make the world map look like a collection of colored flat polygons with generic cards around it.

The visual quality should be comparable to a high-end interactive editorial website, digital museum, premium data visualization or award-winning web experience.

Use real visual techniques such as:

- WebGL where appropriate
- Three.js / globe rendering where appropriate
- rich SVG/vector geography
- atmospheric backgrounds
- depth
- particles
- animated transitions
- sophisticated typography
- layered information
- visual storytelling
- cinematic transitions
- interactive maps
- beautiful data visualization
- meaningful motion
- carefully composed layouts
- visual hierarchy

The design should feel intentionally art-directed.

Avoid visual gimmicks that don't serve the experience.

---

THE HOME SCREEN

The opening screen should be spectacular.

Possible visual direction:

A dark, atmospheric Earth floating in space.

Subtle particles.

Continents illuminated differently.

Small signals / markers appearing across the planet.

A few discoveries slowly appearing.

For example:

«7,000 km away
Something very strange happened here.»

or:

«1 discovery
You probably don't know this one.»

The user should immediately want to interact.

Include a prominent action such as:

EXPLORE SOMETHING STRANGE

which randomly transports the user to an interesting discovery.

---

COUNTRY EXPLORATION

When the user selects a country:

Do NOT just display a static modal.

Create an immersive transition into that country.

For example:

Earth zooms toward the country.

The country becomes the visual center.

The interface transforms into a discovery scene.

Show approximately 3–6 curated discoveries.

Each discovery should have:

- a strong title
- a short explanation
- why it is surprising
- approximate date/location when relevant
- category
- visual representation
- source/reference

Example structure:

«THE WAR THAT LASTED 38 MINUTES

Britain and Zanzibar went to war in 1896.

The conflict ended in roughly 38–45 minutes, making it one of the shortest wars in recorded history.

ZANZIBAR · 1896

[Explore the story]»

The exact facts must be real.

Do not invent facts merely to make the experience interesting.

---

THE RABBIT HOLE

This is the core mechanic.

Every discovery should contain connections to other discoveries.

For example:

FRANCE
↓
Unexpected historical event
↓
Another country
↓
Scientist
↓
Scientific discovery
↓
Modern technology

The user should be able to follow these connections indefinitely.

Create a visual “rabbit hole” navigation system.

The user should feel like they are falling through a network of human history.

Example:

France

→ strange event

→ Zanzibar

→ British Empire

→ Queen Victoria

→ industrial revolution

→ electricity

→ Nikola Tesla

→ Serbia/Croatia region

→ wireless technology

Each node should feel like another door.

---

THE HUMANITY LAYER

Add another way to explore.

Users can switch from:

WORLD

to:

PEOPLE

The People experience should showcase remarkable scientists, artists, philosophers, inventors, mathematicians, writers, explorers and other influential humans.

But do NOT make this another generic “famous people” list.

Instead show:

WHAT DID THEY CHANGE?

For each person, visually communicate:

Person → Field → Breakthrough → What changed because of them

For example:

Ada Lovelace

Mathematics / Computing

→ early ideas about programmable machines

→ foundational ideas behind modern computing

Another example:

Louis Pasteur

Biology / Medicine

→ germ theory / pasteurization

→ transformed food safety and infectious disease understanding

The interface should visually connect people to ideas, inventions and consequences.

---

THE IMPACT GRAPH

Create a visual network showing relationships between:

PEOPLE
↓
IDEAS
↓
DISCOVERIES
↓
INVENTIONS
↓
MODERN LIFE

For example:

Faraday
↓
Electromagnetism
↓
Electric motor
↓
Electricity
↓
Modern technology

The user should be able to visually follow humanity's chain of influence.

This should feel like exploring a constellation, not reading a spreadsheet.

---

DISCOVERY MODE

Add a button:

SURPRISE ME

It should randomly select an interesting discovery.

Examples:

«“A country you probably couldn't point to on a map invented something you use every day.”»

or:

«“This scientist changed your life without you knowing his name.”»

or:

«“This border makes almost no geographical sense.”»

Then reveal the answer through an animated sequence.

The reveal should be satisfying.

---

VISUAL STORYTELLING

Do not dump all information on screen simultaneously.

Information should appear progressively.

For example:

1. Show the question.
2. Let the user guess / wonder.
3. Reveal the location.
4. Zoom into the location.
5. Reveal the historical context.
6. Reveal the unexpected connection.
7. Offer the next rabbit hole.

Use motion to explain relationships.

Animation should communicate meaning rather than simply decorate the UI.

---

INTERACTION

The website should feel alive.

Examples:

- rotate Earth
- zoom into regions
- hover over discovery points
- click countries
- follow connections
- filter by category
- explore people
- jump randomly
- open a discovery
- follow a rabbit hole
- return to previous discoveries
- build a personal trail

On mobile, all important interactions must work with touch.

---

PERSONAL DISCOVERY TRAIL

Remember what the user has explored using localStorage.

Create a visual:

YOUR TRAIL

showing the discoveries the user has visited.

Example:

France
↓
Zanzibar
↓
Tesla
↓
Electricity
↓
Japan

The trail should look visually interesting, like a journey through knowledge.

Do not require accounts.

---

CATEGORIES

Allow exploration by themes such as:

🌍 Geography
⚔️ History
🧠 Science
🎨 Art
🔬 Inventions
👤 People
🏛️ Civilization
🌋 Nature
🧬 Medicine
🚀 Space
💡 Ideas

---

CONTENT QUALITY

This is critical.

Facts must be:

- real
- specific
- interesting
- concise
- understandable by a general audience

Avoid fake “fun facts”.

Avoid facts that are technically true but boring.

Avoid sensationalizing uncertain claims.

Where a fact is disputed or depends on definitions, explicitly indicate that.

Every discovery should have a source/reference.

---

TECHNICAL REQUIREMENTS

Build the actual working application.

It must:

- run in a browser
- work on desktop and mobile
- require no backend
- require no API keys
- work without authentication
- use localStorage for the exploration trail
- have smooth navigation
- have real interactions
- have no dead buttons
- have no placeholder sections
- have no lorem ipsum
- have no fake loading screens
- have no unfinished components

You may use open-source libraries and CDN-hosted libraries if useful.

Prefer high-quality libraries for:

- globe rendering
- maps
- visualization
- animation
- typography

Do not reinvent complex rendering systems unnecessarily.

---

CRITICAL DESIGN CONSTRAINT

I am specifically evaluating whether you can create something that looks and feels designed by a strong product designer, rather than generated by an AI.

Therefore:

Do NOT default to:

- rounded rectangular cards everywhere
- excessive glassmorphism
- generic purple gradients
- dashboard layouts
- random glowing borders
- basic SVG circles and rectangles
- generic hero sections
- repetitive card grids

If you use cards, they should have a strong visual reason to exist.

Use composition, scale, typography, imagery, motion, geography and data visualization to create the experience.

---

THE WOW MOMENT

The first 30 seconds should contain at least one moment where the user thinks:

«“Okay, this is actually cool.”»

The experience should be something I could send to someone with only this message:

«“Go explore this.”»

They should understand what to do without reading documentation.

---

FINAL REQUIREMENT

Do not spend the response explaining what you plan to build.

Do not give me a tutorial.

Do not give me a wireframe.

Do not give me a mockup.

Do not describe an imaginary future version.

Build the complete experience.

At the end, provide:

1. Complete project files
2. Project structure
3. Launch instructions
4. Short description of the implemented experience

Before finishing, test the main interactions and fix obvious broken states.

The final result should feel like a real interactive product, not an AI coding exercise.

---

ADDITIONS (requests I made after the first version, folded in here)

REGIONAL BALANCE

Do not let the content lean toward Europe and North America. Give the Middle East and North Africa serious attention, with several discoveries per country where the history supports it. Include, among others:

- Hannibal crossing the Alps from Carthage (Tunisia), Ibn Khaldun, Tunisia's 1846 abolition of slavery, the Aghlabid basins of Kairouan
- Ibn Battuta and the Jebel Irhoud fossils (Morocco), Fibonacci learning numerals in Béjaïa and the Tassili rock art (Algeria)
- Eratosthenes measuring the Earth, the first recorded strike, Abu Simbel, Cairo's free medieval hospital (Egypt)
- the Phoenician alphabet (Lebanon), the oldest written song at Ugarit and Damascus steel (Syria), Petra (Jordan), Jericho (Palestine)
- the Code of Ur-Nammu, Baghdad's paper mills, the Banu Musa machines, the medieval cheque (Iraq)
- Yemen's coffee and Shibam, the Saudi mustatils, Oman's capital in Zanzibar, the UAE Mars probe, Libya's Great Man-Made River

THE ISLAMIC GOLDEN AGE AND AL-ANDALUS

Add a strong set of discoveries and people from the Islamic Golden Age, in the Middle East, Persia, Central Asia, North Africa and Muslim Spain. For example: Ibn Firnas, the library of Córdoba, Ziryab, the Toledo translators, the Alhambra's symmetries, Arabic words in Spanish and English, al-Idrisi's map, the first windmills, al-Sufi and the Andromeda galaxy, the Isfahan girih tiles, the Tusi couple and Copernicus, Ulugh Beg's observatory, al-Biruni measuring the Earth.

In People mode include al-Khwarizmi, Ibn al-Haytham, al-Razi, Ibn Sina, Ibn al-Nafis, al-Jazari, al-Kindi, al-Zahrawi, Ibn Rushd, al-Zarqali, Jabir ibn Hayyan, al-Biruni, al-Tusi and Omar Khayyam, each connected in the Impact Graph to the ideas and inventions they led to.

Many famous claims from this period rest on late or thin sources. Flag those as disputed instead of stating them as fact.

SCALE

Aim for roughly 130 or more discoveries across about 90 countries, and about 45 people.

SURPRISE ME

In the guessing step, the answer choices must be visible as soon as the question appears, without the user having to tap anything.

CREDIT LINE

On the home screen, under the main button, add a small credit line: "Built from one prompt with [model name] · about [N] tokens written · by @smnassri_", where @smnassri_ links to https://x.com/smnassri_. Use the real model name and the real token count for the session.

DEPLOYMENT

Use only relative paths and bundle every library and font inside the project, so the folder works both when opened from a local server and when deployed to GitHub Pages under a sub-path. Include a README with launch instructions.
