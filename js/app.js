/* THE STRANGE ATLAS OF HUMANITY: application logic */
(function () {
  const U = window.AtlasUtil;
  const CATS = window.ATLAS_CATEGORIES, DISC = window.ATLAS_DISCOVERIES, PEOPLE = window.ATLAS_PEOPLE;
  const NOW = new Date().getFullYear();
  const $ = s => document.querySelector(s);
  const body = document.body;

  const catById = {}; CATS.forEach(c => { catById[c.id] = c; });
  const discById = {}; DISC.forEach(d => { discById[d.id] = d; });
  const personById = {}; PEOPLE.forEach(p => { personById[p.id] = p; });

  /* ---------- geography (shared with the globe) ---------- */
  const topo = window.WORLD_TOPO;
  const features = topojson.feature(topo, topo.objects.countries).features;
  const landGeo = topojson.merge(topo, topo.objects.countries.geometries);
  const NAME_FIX = {
    'United States of America': 'United States', 'Dem. Rep. Congo': 'DR Congo', 'Central African Rep.': 'Central African Republic', 'Bosnia and Herz.': 'Bosnia and Herzegovina',
    'Dominican Rep.': 'Dominican Republic', 'Eq. Guinea': 'Equatorial Guinea', 'S. Sudan': 'South Sudan', 'Solomon Is.': 'Solomon Islands', 'Turkey': 'Türkiye',
    'W. Sahara': 'Western Sahara', 'Fr. S. Antarctic Lands': 'French Southern Lands', 'Falkland Is.': 'Falkland Islands', 'Marshall Is.': 'Marshall Islands',
    'Cayman Is.': 'Cayman Islands', 'Faeroe Is.': 'Faroe Islands', 'Br. Indian Ocean Ter.': 'British Indian Ocean Territory', 'St. Vin. and Gren.': 'St Vincent and the Grenadines',
    'Antigua and Barb.': 'Antigua and Barbuda', 'N. Cyprus': 'Northern Cyprus', 'Heard I. and McDonald Is.': 'Heard and McDonald Islands', 'S. Geo. and the Is.': 'South Georgia',
    'Fr. Polynesia': 'French Polynesia', 'N. Mariana Is.': 'Northern Mariana Islands', 'Cook Is.': 'Cook Islands', 'Wallis and Futuna Is.': 'Wallis and Futuna',
    'Turks and Caicos Is.': 'Turks and Caicos', 'U.S. Virgin Is.': 'US Virgin Islands', 'British Virgin Is.': 'British Virgin Islands', 'St. Pierre and Miquelon': 'St Pierre and Miquelon',
    'São Tomé and Principe': 'São Tomé and Príncipe', 'Pitcairn Is.': 'Pitcairn Islands', 'Ashmore and Cartier Is.': 'Ashmore and Cartier Islands', 'Indian Ocean Ter.': 'Indian Ocean Territories'
  };
  const nameOfIdx = idx => { const f = features[idx - 1]; if (!f) return ''; const n = f.properties.name; return NAME_FIX[n] || n; };
  const idxOfCode = {};
  features.forEach((f, i) => { if (f.id && !idxOfCode[f.id]) idxOfCode[f.id] = i + 1; });
  const EXTRA_NAMES = { '798': 'Tuvalu' };
  NAME_FIX['Palestine'] = 'Palestine';
  const nameOfCode = code => idxOfCode[code] ? nameOfIdx(idxOfCode[code]) : (EXTRA_NAMES[code] || code);
  const countryLabel = {};
  features.forEach((f, i) => {
    let best = f, bestA = -1;
    if (f.geometry && f.geometry.type === 'MultiPolygon') f.geometry.coordinates.forEach(poly => { const g = { type: 'Feature', geometry: { type: 'Polygon', coordinates: poly } }; const a = d3.geoArea(g); if (a > bestA) { bestA = a; best = g; } });
    const c = d3.geoCentroid(best); const b = d3.geoBounds(best);
    let w = b[1][0] - b[0][0]; if (w < 0) w += 360;
    countryLabel[i + 1] = { lat: c[1], lon: c[0], ext: Math.max(w * Math.cos(c[1] * Math.PI / 180), b[1][1] - b[0][1]) };
  });

  const discByCode = {}; DISC.forEach(d => { (discByCode[d.c] = discByCode[d.c] || []).push(d); });
  const peopleByCode = {}; PEOPLE.forEach(p => { (peopleByCode[p.c] = peopleByCode[p.c] || []).push(p); });

  /* ---------- references: "d:id", "p:id" ---------- */
  const refOfLink = l => l.startsWith('p:') ? l : 'd:' + l;
  const resolve = ref => {
    const [k, id] = [ref.slice(0, 1), ref.slice(2)];
    if (k === 'd' && discById[id]) { const d = discById[id]; return { ref, kind: 'd', id, item: d, title: d.title, place: d.place, code: d.c, lat: d.lat, lon: d.lon, cat: d.cat, color: catById[d.cat].color }; }
    if (k === 'p' && personById[id]) { const p = personById[id]; return { ref, kind: 'p', id, item: p, title: p.name, place: p.born, code: p.c, lat: p.lat, lon: p.lon, cat: 'people', color: catById.people.color }; }
    return null;
  };

  /* ---------- state ---------- */
  const user = U.userLocation();
  const state = { mode: 'world', filter: null, current: null, back: [], hole: [], countryCode: null, teasers: [], revealing: false };
  let globe = null, graph = null;
  const G = fn => { if (globe) try { fn(globe); } catch (e) { console.error(e); } };

  /* ---------- trail (localStorage) ---------- */
  const TRAIL_KEY = 'strange-atlas.trail.v1', SCORE_KEY = 'strange-atlas.guesses.v1';
  let trail = U.store.get(TRAIL_KEY, []).filter(t => t && resolve(t.ref));
  function addTrail(ref) {
    const last = trail[trail.length - 1];
    if (last && last.ref === ref) return;
    trail.push({ ref, ts: Date.now() });
    if (trail.length > 300) trail = trail.slice(-300);
    U.store.set(TRAIL_KEY, trail);
    updateTrailCount();
    refreshInfo();
  }
  function updateTrailCount() {
    const n = new Set(trail.map(t => t.ref)).size;
    $('#trailCount').textContent = n;
  }

  /* ---------- globe info & markers ---------- */
  function matches(d) { return !state.filter || d.cat === state.filter; }
  function refreshInfo() {
    const visited = new Set(trail.map(t => { const r = resolve(t.ref); return r && r.code; }));
    G(g => g.setInfo((idx, f) => {
      const list = discByCode[f.id] || [];
      const ppl = peopleByCode[f.id] || [];
      const r = list.length ? 150 + Math.min(list.length, 3) * 35 : 0;
      const m = state.filter === 'people' ? (ppl.length || list.some(matches)) : list.some(matches);
      return [r, m ? 255 : 0, visited.has(f.id) ? 255 : 0, ppl.length ? 255 : 0];
    }));
    G(g => { g.setFilterOn(!!state.filter); g.setMarkerActive(m => m.kind === 'person' ? (!state.filter || state.filter === 'people' || state.filter === m.person.cat) : matches(m.disc)); });
  }

  /* ---------- categories ---------- */
  function buildCats() {
    const track = $('#catsTrack');
    const counts = {}; DISC.forEach(d => { counts[d.cat] = (counts[d.cat] || 0) + 1; });
    counts.people = (counts.people || 0) + PEOPLE.length;
    let html = '<button type="button" class="cat is-on" data-cat="" style="--c:#efe8d8"><i></i>Everything<span class="n">' + (DISC.length + PEOPLE.length) + '</span></button>';
    CATS.forEach(c => { html += '<button type="button" class="cat" data-cat="' + c.id + '" style="--c:' + c.color + '" aria-pressed="false"><i></i><span aria-hidden="true">' + c.glyph + '</span> ' + c.label + '<span class="n">' + (counts[c.id] || 0) + '</span></button>'; });
    track.innerHTML = html;
    track.addEventListener('click', e => {
      const b = e.target.closest('.cat'); if (!b) return;
      setFilter(b.dataset.cat || null);
    });
  }
  function setFilter(cat) {
    state.filter = cat;
    document.querySelectorAll('.cat').forEach(b => { const on = (b.dataset.cat || null) === cat; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    refreshInfo();
    rotateTeasers(true);
    if (cat) {
      const c = catById[cat];
      const n = cat === 'people' ? PEOPLE.length + DISC.filter(matches).length : DISC.filter(matches).length;
      toast(n + ' ' + c.label.toLowerCase() + (cat === 'people' ? ' stories and people' : ' stories') + ' lit up on the globe');
    }
  }

  /* ---------- tooltip ---------- */
  const tip = $('#tip');
  function showTip(p, x, y) {
    if (!p || p.type === 'ocean' || state.mode !== 'world' || state.revealing) { tip.hidden = true; return; }
    let html, color;
    if (p.type === 'marker') {
      const m = p.marker;
      if (m.kind === 'person') { color = catById.people.color; html = '<div class="k">Person · ' + U.esc(m.person.field) + '</div><div class="v">' + U.esc(m.person.name) + '</div><div class="s">' + U.esc(m.person.born) + '</div>'; }
      else { const d = m.disc; color = catById[d.cat].color; html = '<div class="k">' + catById[d.cat].label + ' · ' + U.esc(d.year) + '</div><div class="v">' + U.esc(d.title) + '</div><div class="s">' + U.esc(d.place) + '</div>'; }
    } else {
      const f = features[p.idx - 1];
      const list = (f && discByCode[f.id]) || [], ppl = (f && peopleByCode[f.id]) || [];
      color = list.length ? '#ffb25e' : '#7c8294';
      let s = list.length ? list.length + (list.length === 1 ? ' strange story' : ' strange stories') : 'Nothing catalogued yet';
      if (ppl.length) s += ' · ' + ppl.length + (ppl.length === 1 ? ' person' : ' people');
      html = '<div class="k">' + (list.length ? 'Open the country' : 'See what is nearby') + '</div><div class="v">' + U.esc(nameOfIdx(p.idx)) + '</div><div class="s">' + s + '</div>';
    }
    tip.innerHTML = html;
    tip.style.setProperty('--c', color);
    tip.hidden = false;
    const tw = tip.offsetWidth, th = tip.offsetHeight;
    let tx = x + 18, ty = y + 16;
    if (tx + tw > window.innerWidth - 10) tx = x - tw - 18;
    if (ty + th > window.innerHeight - 10) ty = y - th - 16;
    tip.style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
  }

  /* ---------- teasers on the home screen ---------- */
  const TEASE = {
    history: 'Something very strange happened here.', geography: 'This place breaks a rule you thought was fixed.', science: 'Someone here worked out something nobody believed.',
    art: 'A story began here that you have probably met.', inventions: 'Something you use every day leads back here.', people: 'Someone here did something hard to believe.',
    civilization: 'People here do something you have never heard of.', nature: 'The planet did something unusual here.', medicine: 'A medical story from here sounds made up. It is not.',
    space: 'This place has an unexpected link to space.', ideas: 'An idea from here changed how people think.'
  };
  const labels = $('#labels');
  let teaserTimer = 0, teaserCount = 0;
  function rotateTeasers(now) {
    clearTimeout(teaserTimer);
    state.teasers.forEach(t => { t.el.classList.add('is-out'); setTimeout(() => t.el.remove(), 500); });
    state.teasers = [];
    if (now === 'stop') return;
    const run = () => {
      if (state.mode === 'world' && !state.current && !state.revealing && globe) {
        const W = window.innerWidth, H = window.innerHeight, narrow = U.isNarrow();
        const cands = DISC.filter(matches).filter(d => {
          const p = globe.project(d.lat, d.lon);
          if (!p.visible || p.facing < 0.45) return false;
          if (narrow) return p.y > 110 && p.y < H * 0.5 && p.x > 30 && p.x < W - 30;
          return p.x > W * 0.42 && p.x < W - 60 && p.y > 140 && p.y < H - 140;
        });
        const chosen = [];
        U.shuffle(cands).forEach(d => {
          if (chosen.length >= (narrow ? 1 : 2)) return;
          const p = globe.project(d.lat, d.lon);
          if (chosen.every(c => { const q = globe.project(c.lat, c.lon); return Math.hypot(p.x - q.x, p.y - q.y) > 260; })) chosen.push(d);
        });
        chosen.forEach(d => {
          teaserCount++;
          const el = document.createElement('div');
          el.className = 'teaser';
          el.style.setProperty('--c', catById[d.cat].color);
          const dist = user ? U.fmtKm(U.distKm(user, d)) + ' from you' : d.year;
          const line = teaserCount % 3 === 0 ? ['1 discovery', 'You probably do not know this one.'] : [dist, TEASE[d.cat]];
          el.innerHTML = '<span class="stem"></span><div class="bub"><div class="dist">' + U.esc(line[0]) + '</div><div class="say">' + U.esc(line[1]) + '</div></div>';
          el.addEventListener('click', () => openDiscovery(d.id, { fresh: true }));
          labels.appendChild(el);
          state.teasers.push({ el, d });
        });
      }
      teaserTimer = setTimeout(() => rotateTeasers(), 6500);
    };
    teaserTimer = setTimeout(run, now === true ? 300 : 900);
  }
  function placeLabels() {
    if (!globe) return;
    const W = window.innerWidth;
    state.teasers.forEach(t => {
      const p = globe.project(t.d.lat, t.d.lon);
      t.el.style.visibility = p.visible ? 'visible' : 'hidden';
      t.el.classList.toggle('is-left', p.x > W * 0.78);
      t.el.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
    });
    if (countryTag.code && state.mode === 'world') {
      const p = globe.project(countryTag.lat, countryTag.lon, 1.02);
      countryTag.el.style.opacity = p.visible ? 1 : 0;
      countryTag.el.style.transform = 'translate(' + (p.x - countryTag.el.offsetWidth / 2) + 'px,' + (p.y - 34) + 'px)';
    }
  }
  const countryTag = { el: null, code: null };
  function setCountryTag(code, lat, lon) {
    if (!countryTag.el) { countryTag.el = document.createElement('div'); countryTag.el.className = 'clabel'; labels.appendChild(countryTag.el); }
    countryTag.code = code; countryTag.lat = lat; countryTag.lon = lon;
    countryTag.el.textContent = code ? nameOfCode(code) : '';
    countryTag.el.style.display = code ? '' : 'none';
  }

  /* ---------- camera choreography ---------- */
  function homeOffset() {
    if (state.mode !== 'world') return [0, 0];
    return U.isNarrow() ? [0, 0.22] : [-0.15, 0.02];
  }
  function panelOffset() {
    if (!state.current) return homeOffset();
    if (U.isNarrow()) return [0, 0.31];
    const pw = Math.min(600, window.innerWidth * 0.46);
    return [pw / (2 * window.innerWidth), 0];
  }
  function distForExtent(extDeg) {
    if (!globe) return 3;
    const W = window.innerWidth, H = window.innerHeight, narrow = U.isNarrow();
    const vis = narrow ? Math.min(W * 0.8, H * 0.3) : Math.min((W - Math.min(600, W * 0.46)) * 0.62, H * 0.6);
    const ppr = vis / Math.max(extDeg * Math.PI / 180, 0.02);
    const tanH = Math.tan(17.5 * Math.PI / 180);
    return U.clamp(1 + (H / 2) / tanH / ppr, 1.42, globe.homeDist() * (narrow ? 1.05 : 0.9));
  }
  function aimAt(lat, lon, code, opt) {
    opt = opt || {};
    const idx = code ? idxOfCode[code] : -1;
    const ext = idx > 0 ? countryLabel[idx].ext : 12;
    const dist = opt.dist || distForExtent(U.clamp(ext, 4, 70) * (opt.zoomOut || 1));
    const [ox, oy] = panelOffset();
    G(g => { g.setOffset(ox, oy); g.setSelected(idx || -1); g.autoRotate = false; });
    setCountryTag(code, idx > 0 ? countryLabel[idx].lat : lat, idx > 0 ? countryLabel[idx].lon : lon);
    return globe ? globe.flyTo(lat, lon, dist, opt) : Promise.resolve();
  }

  /* ---------- panel ---------- */
  const panel = $('#panel'), panelBody = $('#panelBody'), panelScroll = $('#panelScroll');
  function showPanel() {
    body.classList.remove('quiet-intro');
    panel.classList.remove('is-out');
    panel.hidden = false;
    body.classList.add('has-panel');
  }
  function hidePanel() {
    if (panel.hidden) return;
    panel.classList.add('is-out');
    body.classList.remove('has-panel');
    setTimeout(() => { if (panel.classList.contains('is-out')) { panel.hidden = true; panel.classList.remove('is-out'); } }, 430);
  }
  function setBody(html, opts) {
    opts = opts || {};
    panelBody.innerHTML = html;
    panelScroll.scrollTop = 0;
    $('#panelBack').style.visibility = state.back.length ? 'visible' : 'hidden';
    panel.classList.toggle('is-tall', !!opts.tall);
  }
  function pushBack() { if (state.current) state.back.push(state.current); if (state.back.length > 60) state.back.shift(); }

  function crumb(text) { $('#panelCrumb').textContent = text || ''; }

  const ARROW = '<svg class="go" viewBox="0 0 28 28" aria-hidden="true"><path d="M5 14h17M17 8l6 6-6 6"/></svg>';

  /* --- country page --- */
  function openCountry(code, opts) {
    opts = opts || {};
    const idx = idxOfCode[code];
    if (!idx) return;
    if (!opts.fromBack) pushBack();
    if (!opts.keepHole) { state.hole = []; renderHole(); G(g => g.clearArcs()); }
    state.current = { type: 'c', code };
    setMode('world', true);
    showPanel();
    const list = discByCode[code] || [];
    const ppl = peopleByCode[code] || [];
    const lab = countryLabel[idx];
    const name = nameOfCode(code);
    let html = '<div class="stage">';
    if (!list.length) return renderNearby(code, lab, name, ppl);
    html += '<p class="eyebrow" style="--i:0"><span>' + U.fmtCoord(lab.lat, lab.lon) + '</span>' + (user ? '<span class="sep">/</span><span>' + U.fmtKm(U.distKm(user, lab)) + ' from you</span>' : '') + '</p>';
    html += '<h2 class="country-name" style="--i:1">' + U.esc(name) + '</h2>';
    html += '<p class="country-sub" style="--i:2"><b>' + list.length + (list.length === 1 ? ' strange story' : ' strange stories') + '</b> catalogued here' + (ppl.length ? ', and ' + ppl.length + (ppl.length === 1 ? ' person' : ' people') + ' who changed what came next.' : '.') + ' Pick a door.</p>';
    html += '<ol class="toc" style="--i:3">';
    list.forEach((d, i) => {
      const c = catById[d.cat];
      html += '<li><button type="button" data-open="d:' + d.id + '" style="--cat:' + c.color + '"><span class="num">' + String(i + 1).padStart(2, '0') + '</span><span><span class="meta">' + c.label + ' · ' + U.esc(d.year) + '</span><span class="ttl">' + U.esc(d.title) + '</span><span class="hk">' + U.esc(d.hook) + '</span></span>' + ARROW + '</button></li>';
    });
    html += '</ol>';
    if (ppl.length) html += peopleList(ppl, 4);
    html += '</div>';
    setBody(html);
    crumb(name);
    setHash('c-' + code);
    G(g => g.setSelectedMarker(-1));
    aimAt(lab.lat, lab.lon, code);
    rotateTeasers('stop');
  }
  function peopleList(ppl, i) {
    let html = '<p class="sub-h" style="--i:' + i + '">People from here</p><ol class="toc" style="--i:' + (i + 1) + '">';
    ppl.forEach(p => {
      html += '<li><button type="button" data-open="p:' + p.id + '" style="--cat:' + catById.people.color + '"><span class="num">✦</span><span><span class="meta">' + U.esc(p.field) + ' · ' + U.esc(p.years) + '</span><span class="ttl">' + U.esc(p.name) + '</span><span class="hk">' + U.esc(p.hook) + '</span></span>' + ARROW + '</button></li>';
    });
    return html + '</ol>';
  }
  function renderNearby(code, lab, name, ppl) {
    const near = DISC.map(d => ({ d, km: U.distKm(lab, d) })).sort((a, b) => a.km - b.km).slice(0, 4);
    let html = '<div class="stage">';
    html += '<p class="eyebrow" style="--i:0"><span>' + U.fmtCoord(lab.lat, lab.lon) + '</span></p>';
    html += '<h2 class="country-name" style="--i:1">' + U.esc(name) + '</h2>';
    html += '<p class="country-sub" style="--i:2">The atlas has no strange story filed under ' + U.esc(name) + ' yet' + (ppl.length ? '' : '') + '. These are the closest ones, measured from the middle of the country.</p>';
    html += '<ol class="toc" style="--i:3">';
    near.forEach(({ d, km }) => {
      const c = catById[d.cat];
      const dir = U.compass(U.bearing(lab, d));
      html += '<li><button type="button" data-open="d:' + d.id + '" style="--cat:' + c.color + '"><span class="num">↗</span><span><span class="meta">' + U.fmtKm(km) + ' ' + dir + ' · ' + U.esc(nameOfCode(d.c)) + '</span><span class="ttl">' + U.esc(d.title) + '</span><span class="hk">' + U.esc(d.hook) + '</span></span>' + ARROW + '</button></li>';
    });
    html += '</ol>';
    if (ppl.length) html += peopleList(ppl, 4);
    html += '</div>';
    setBody(html);
    crumb(name);
    setHash('c-' + code);
    aimAt(lab.lat, lab.lon, code);
    rotateTeasers('stop');
  }

  /* --- story page --- */
  function openDiscovery(id, opts) {
    opts = opts || {};
    const d = discById[id]; if (!d) return;
    const ref = 'd:' + id;
    if (!opts.fromBack) pushBack();
    if (opts.fresh) { state.hole = []; G(g => g.clearArcs()); }
    if (!state.hole.length || state.hole[state.hole.length - 1] !== ref) state.hole.push(ref);
    state.current = { type: 'd', id };
    setMode('world', true);
    showPanel();
    addTrail(ref);
    renderHole();
    renderStory(d, opts);
    setHash('d-' + id);
    const mi = globe ? globe.markers.findIndex(m => m.disc === d) : -1;
    G(g => g.setSelectedMarker(mi));
    rotateTeasers('stop');
    const fly = opts.noFly ? Promise.resolve() : aimAt(d.lat, d.lon, d.c, { zoomOut: 1.6 });
    fly.then(() => drawDoorArcs(d.lat, d.lon, d.links.map(l => refOfLink(l[0]))));
  }

  function renderStory(d, opts) {
    const c = catById[d.cat];
    const slow = opts && opts.reveal;
    let i = 0;
    const si = () => ' style="--i:' + (i++) + '"';
    let html = '<article class="stage' + (slow ? ' slow' : '') + '" style="--cat:' + c.color + '">';
    html += '<p class="eyebrow"' + si() + '><span class="c">' + c.label + '</span><span class="sep">/</span><span>' + U.esc(d.place) + '</span><span class="sep">/</span><span>' + U.esc(d.year) + '</span></p>';
    html += '<h2 class="story-title"' + si() + '>' + U.esc(d.title) + '</h2>';
    html += '<div class="figure"' + si() + '><div><div class="fig-v">' + U.esc(d.fig[0]) + '</div><div class="fig-c">' + U.esc(d.fig[1]) + '</div></div><figure class="locator"><canvas width="264" height="264" aria-label="Locator globe showing ' + U.esc(d.place) + '"></canvas><figcaption>' + U.fmtCoord(d.lat, d.lon) + '</figcaption></figure></div>';
    html += '<p class="story-text"' + si() + '>' + U.esc(d.text) + '</p>';
    html += '<div class="why"' + si() + '><span class="k">Why it is surprising</span><p>' + U.esc(d.why) + '</p></div>';
    if (d.note) html += '<p class="note"' + si() + '><b>Disputed</b><span>' + U.esc(d.note) + '</span></p>';
    html += '<div class="ribbon"' + si() + '><div class="k"><span>Where it sits in human time</span><span>' + U.esc(d.year) + '</span></div><div class="rib"></div></div>';
    html += '<p class="source"' + si() + '><b>Source</b><a href="' + U.esc(d.src[1]) + '" target="_blank" rel="noopener">' + U.esc(d.src[0]) + '</a></p>';
    html += doorsHtml(d.links, { lat: d.lat, lon: d.lon }, si());
    html += '<div class="next-row"' + si() + '><button type="button" class="btn-line" data-act="surprise">Jump somewhere random <svg viewBox="0 0 18 12"><path d="M0 6h15M11 2l4 4-4 4"/></svg></button>' + (discByCode[d.c].length > 1 ? '<button type="button" class="btn-line" data-open="c:' + d.c + '">More from ' + U.esc(nameOfCode(d.c)) + '</button>' : '') + '</div>';
    html += '</article>';
    setBody(html);
    crumb(state.hole.length > 1 ? 'Rabbit hole · depth ' + state.hole.length : nameOfCode(d.c));
    drawLocator(panelBody.querySelector('.locator canvas'), d.lat, d.lon, d.c, c.color);
    drawRibbon(panelBody.querySelector('.rib'), d);
  }

  function doorsHtml(links, from, attr) {
    if (!links || !links.length) return '';
    let html = '<section' + attr + '><div class="doors-h"><h3>Fall further</h3><span>' + links.length + ' doors</span></div><ul class="doors">';
    links.forEach(([to, why]) => {
      const r = resolve(refOfLink(to)); if (!r) return;
      const km = U.distKm(from, r);
      const meta = (r.kind === 'p' ? 'Person · ' : catById[r.cat].label + ' · ') + U.esc(nameOfCode(r.code)) + (km > 30 ? ' · ' + U.fmtKm(km) + ' away' : ' · same place');
      html += '<li class="door" style="--dc:' + r.color + '"><button type="button" data-door="' + r.ref + '"><span class="door-ico" aria-hidden="true"><svg viewBox="0 0 56 56"><rect class="frame" x="16" y="6" width="24" height="44" rx="12"/><rect class="glow" x="16" y="6" width="24" height="44" rx="12"/><rect class="slit" x="16" y="6" width="24" height="44" rx="12"/></svg></span><span><span class="why-link">' + U.esc(why) + '</span><span class="dest">' + U.esc(r.title) + '</span><span class="meta">' + meta + '</span></span></button></li>';
    });
    return html + '</ul></section>';
  }

  function drawDoorArcs(lat, lon, refs) {
    if (!globe || state.mode !== 'world') return;
    globe.clearArcs('doors');
    refs.forEach((ref, i) => {
      const r = resolve(ref); if (!r) return;
      if (U.distKm({ lat, lon }, r) < 40) return;
      setTimeout(() => { if (state.current && globe) globe.addArc({ lat, lon }, r, { color: r.color, tag: 'doors', alpha: 0.45, duration: 1.1 }); }, i * 180);
    });
  }

  /* --- person page --- */
  function openPerson(id, opts) {
    opts = opts || {};
    const p = personById[id]; if (!p) return;
    const ref = 'p:' + id;
    if (!opts.fromBack) pushBack();
    if (opts.fresh) { state.hole = []; G(g => g.clearArcs()); }
    if (!state.hole.length || state.hole[state.hole.length - 1] !== ref) state.hole.push(ref);
    state.current = { type: 'p', id };
    if (!opts.inGraph) setMode('world', true);
    showPanel();
    addTrail(ref);
    renderHole();
    const color = catById.people.color;
    let i = 0;
    const si = () => ' style="--i:' + (i++) + '"';
    const gr = ensureGraph(true);
    const modern = gr ? gr.downstream('P:' + id, 3) : [];
    const inventions = gr ? gr.downstream('P:' + id, 2) : [];
    let html = '<article class="stage" style="--cat:' + color + '">';
    html += '<p class="eyebrow"' + si() + '><span class="c">Person</span><span class="sep">/</span><span>' + U.esc(p.field) + '</span></p>';
    html += '<h2 class="person-name"' + si() + '>' + U.esc(p.name) + '</h2>';
    html += '<p class="person-years"' + si() + '>' + U.esc(p.years) + ' · ' + U.esc(p.born) + '</p>';
    html += '<ol class="chain"' + si() + '>';
    html += '<li><div class="k">Field</div><div class="v">' + U.esc(p.field) + '</div></li>';
    html += '<li><div class="k">Breakthrough</div><div class="v big">' + U.esc(p.breakthrough) + '</div></li>';
    if (inventions.length) html += '<li><div class="k">Which led to</div><div class="reach">' + inventions.map(n => '<span>' + U.esc(n.label) + '</span>').join('') + '</div></li>';
    html += '<li><div class="k">What changed because of them</div><div class="v it">' + U.esc(p.changed) + '</div>' + (modern.length ? '<div class="reach">' + modern.map(n => '<span>' + U.esc(n.label) + '</span>').join('') + '</div>' : '') + '</li>';
    html += '</ol>';
    html += '<div class="why"' + si() + '><span class="k">The part nobody tells you</span><p>' + U.esc(p.story) + '</p></div>';
    if (p.note) html += '<p class="note"' + si() + '><b>Disputed</b><span>' + U.esc(p.note) + '</span></p>';
    html += '<p class="source"' + si() + '><b>Source</b><a href="' + U.esc(p.src[1]) + '" target="_blank" rel="noopener">' + U.esc(p.src[0]) + '</a></p>';
    const links = (p.links || []).map(l => [l, (discById[l] ? 'Connected story · ' + catById[discById[l].cat].label : 'Connected story')]);
    html += doorsHtml(links, p, si());
    html += '<div class="next-row"' + si() + '>' + (opts.inGraph
      ? '<button type="button" class="btn-line" data-act="globe-person" data-id="' + p.id + '">See where they were born <svg viewBox="0 0 18 12"><path d="M0 6h15M11 2l4 4-4 4"/></svg></button>'
      : '<button type="button" class="btn-line" data-act="graph-person" data-id="' + p.id + '">Light up their chain of influence <svg viewBox="0 0 18 12"><path d="M0 6h15M11 2l4 4-4 4"/></svg></button>') + '</div>';
    html += '</article>';
    setBody(html);
    crumb(state.hole.length > 1 ? 'Rabbit hole · depth ' + state.hole.length : 'People');
    setHash('p-' + id);
    if (!opts.inGraph) {
      const mi = globe ? globe.markers.findIndex(m => m.person === p) : -1;
      G(g => g.setSelectedMarker(mi));
      const fly = opts.noFly ? Promise.resolve() : aimAt(p.lat, p.lon, p.c, { zoomOut: 1.6 });
      fly.then(() => drawDoorArcs(p.lat, p.lon, (p.links || []).map(l => 'd:' + l)));
    } else if (graph) graph.focusPerson(id);
    rotateTeasers('stop');
  }

  /* --- the rabbit hole --- */
  function followDoor(toRef) {
    const from = state.current && state.current.type !== 'c' ? resolve(state.current.type + ':' + (state.current.id)) : null;
    const to = resolve(toRef); if (!to) return;
    if (!from || state.mode !== 'world' || !globe) { open(toRef); return; }
    G(g => g.clearArcs('doors'));
    const km = U.distKm(from, to);
    panelBody.style.transition = 'opacity .35s'; panelBody.style.opacity = '0.15';
    if (km < 40) { panelBody.style.opacity = ''; open(toRef, { keepHole: true }); return; }
    const ang = km / 6371;
    const dur = U.reduced() ? 0.01 : U.clamp(1.0 + ang * 0.55, 1.1, 2.4);
    globe.addArc(from, to, { color: to.color, tag: 'path', alpha: 0.85, duration: dur * 0.92, flow: true });
    const [ox, oy] = panelOffset();
    globe.setOffset(ox, oy);
    const idx = idxOfCode[to.code] || -1;
    const ext = idx > 0 ? countryLabel[idx].ext : 12;
    globe.flyTo(to.lat, to.lon, distForExtent(U.clamp(ext, 4, 70) * 1.6), { duration: dur }).then(() => {
      panelBody.style.opacity = '';
      open(toRef, { noFly: true, keepHole: true });
    });
    globe.setSelected(idx);
    setCountryTag(to.code, idx > 0 ? countryLabel[idx].lat : to.lat, idx > 0 ? countryLabel[idx].lon : to.lon);
  }
  function open(ref, opts) {
    opts = opts || {};
    if (ref.startsWith('d:')) openDiscovery(ref.slice(2), opts);
    else if (ref.startsWith('p:')) openPerson(ref.slice(2), Object.assign({ inGraph: state.mode === 'people' }, opts));
    else if (ref.startsWith('c:')) openCountry(ref.slice(2), opts);
  }
  function renderHole() {
    const list = $('#holeList');
    body.classList.toggle('has-hole', state.hole.length > 1);
    $('#holeDepth').textContent = 'depth ' + state.hole.length;
    list.innerHTML = state.hole.map((ref, i) => {
      const r = resolve(ref); if (!r) return '';
      const here = i === state.hole.length - 1;
      return '<li class="' + (here ? 'is-here' : '') + '" style="--c:' + r.color + '"><button type="button" data-hole="' + i + '"><span class="hk">' + U.esc(nameOfCode(r.code)) + '</span><span class="ht">' + U.esc(r.title) + '</span></button></li>';
    }).join('');
    list.parentElement.scrollTop = list.parentElement.scrollHeight;
  }
  function redrawPathArcs() {
    if (!globe) return;
    globe.clearArcs('path');
    for (let i = 1; i < state.hole.length; i++) {
      const a = resolve(state.hole[i - 1]), b = resolve(state.hole[i]);
      if (a && b && U.distKm(a, b) > 40) globe.addArc(a, b, { color: b.color, tag: 'path', alpha: 0.6, instant: true, flow: true });
    }
  }

  /* ---------- small visuals ---------- */
  function drawLocator(canvas, lat, lon, code, color) {
    if (!canvas) return;
    const s = canvas.width, ctx = canvas.getContext('2d');
    const proj = d3.geoOrthographic().rotate([-lon, -lat * 0.85]).translate([s / 2, s / 2]).scale(s / 2 - 4).clipAngle(90).precision(0.6);
    const path = d3.geoPath(proj, ctx);
    ctx.clearRect(0, 0, s, s);
    const gr = ctx.createRadialGradient(s * 0.38, s * 0.34, s * 0.05, s / 2, s / 2, s / 2);
    gr.addColorStop(0, '#0f1828'); gr.addColorStop(1, '#05080e');
    ctx.beginPath(); path({ type: 'Sphere' }); ctx.fillStyle = gr; ctx.fill();
    ctx.beginPath(); path(d3.geoGraticule10()); ctx.strokeStyle = 'rgba(134,182,255,.10)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); path(landGeo); ctx.fillStyle = '#1c2638'; ctx.fill();
    const idx = idxOfCode[code];
    if (idx) {
      ctx.beginPath(); path(features[idx - 1]); ctx.fillStyle = color; ctx.globalAlpha = 0.75; ctx.fill(); ctx.globalAlpha = 1;
      ctx.strokeStyle = '#fff5e6'; ctx.lineWidth = 1.2; ctx.stroke();
    }
    const p = proj([lon, lat]);
    if (p) {
      const g2 = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 26);
      g2.addColorStop(0, 'rgba(255,240,220,.9)'); g2.addColorStop(0.25, color); g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 0.55; ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(p[0], p[1], 26, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(p[0], p[1], 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p[0], p[1], 11, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.beginPath(); path({ type: 'Sphere' }); ctx.strokeStyle = 'rgba(134,182,255,.45)'; ctx.lineWidth = 1.5; ctx.stroke();
  }

  function drawRibbon(el, d) {
    if (!el) return;
    const w = Math.max(240, el.clientWidth || 400), h = 58;
    const x = year => (1 - U.timeX(year, NOW)) * (w - 8) + 4;
    const ticks = [[NOW - 100000, '100k yrs ago'], [NOW - 10000, '10k'], [NOW - 1000, '1,000'], [NOW - 100, '100'], [NOW, 'now']];
    let s = '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" aria-hidden="true">';
    s += '<line class="base" x1="4" x2="' + (w - 4) + '" y1="34" y2="34"/>';
    ticks.forEach(([y, l], i) => { const tx = x(y); s += '<line class="tk" x1="' + tx + '" x2="' + tx + '" y1="30" y2="38"/><text class="lbl" x="' + tx + '" y="54" text-anchor="' + (i === 0 ? 'start' : i === ticks.length - 1 ? 'end' : 'middle') + '">' + l + '</text>'; });
    DISC.forEach(o => { if (o !== d) { const ox = x(o.t); s += '<line class="other" x1="' + ox + '" x2="' + ox + '" y1="28" y2="34"/>'; } });
    const hx = x(d.t);
    const anchor = hx < 60 ? 'start' : hx > w - 60 ? 'end' : 'middle';
    s += '<line class="here" x1="' + hx + '" x2="' + hx + '" y1="16" y2="40"/><circle class="here-dot" cx="' + hx + '" cy="34" r="4"/><text class="here-lbl" x="' + hx + '" y="11" text-anchor="' + anchor + '">' + U.esc(d.year) + '</text>';
    s += '</svg>';
    el.innerHTML = s;
  }

  /* ---------- surprise / reveal ---------- */
  const reveal = $('#reveal'), revealInner = $('#revealInner');
  function surprise() {
    if (state.revealing) return;
    let pool = DISC.filter(matches);
    if (!pool.length) pool = DISC;
    const recent = new Set(trail.slice(-40).map(t => t.ref));
    const fresh = pool.filter(d => !recent.has('d:' + d.id) && (!state.current || state.current.id !== d.id));
    const d = U.pick(fresh.length ? fresh : pool);
    runReveal(d);
  }
  function runReveal(d) {
    body.classList.remove('quiet-intro');
    state.revealing = true;
    body.classList.add('is-revealing');
    setMode('world', true);
    hidePanel();
    state.current = null;
    tip.hidden = true;
    rotateTeasers('stop');
    G(g => { g.clearArcs(); g.setSelected(-1); g.setSelectedMarker(-1); g.setOffset(0, 0); g.autoRotate = false; g.flyTo(U.clamp(-d.lat * 0.4, -30, 30), d.lon + 180, g.homeDist() * 1.25, { duration: 2.2, hop: 0 }); });
    setCountryTag(null);

    // three answers: the right country and two decoys from elsewhere
    const right = nameOfCode(d.c);
    const others = U.shuffle([...new Set(DISC.map(x => x.c))].filter(c => c !== d.c && U.distKm(countryLabel[idxOfCode[c]] || d, d) > 1500)).slice(0, 2).map(nameOfCode);
    const opts = U.shuffle([right].concat(others));
    const words = d.hook.split(' ');
    const wDelay = U.reduced() ? 0 : 70;
    let html = '<p class="rv-k">Somewhere on Earth · ' + catById[d.cat].label + '</p>';
    html += '<h2 class="rv-q">' + words.map((w, i) => '<span class="w" style="animation-delay:' + (300 + i * wDelay) + 'ms">' + U.esc(w) + '</span>').join(' ') + '</h2>';
    const t0 = 300 + words.length * wDelay + 500;
    html += '<p class="rv-ask" style="animation-delay:' + t0 + 'ms">Where do you think this happened?</p>';
    html += '<div class="rv-opts">' + opts.map((o, i) => '<button type="button" class="rv-opt" data-ans="' + U.esc(o) + '" style="animation-delay:' + (t0 + 150 + i * 120) + 'ms">' + U.esc(o) + '</button>').join('') + '</div>';
    html += '<div class="rv-verdict" aria-live="polite"></div>';
    html += '<button type="button" class="rv-skip" style="animation-delay:' + (t0 + 600) + 'ms" data-ans="">Just show me</button>';
    revealInner.innerHTML = html;
    reveal.classList.remove('is-out');
    reveal.hidden = false;
    let answered = false;
    revealInner.onclick = e => {
      const b = e.target.closest('[data-ans]'); if (!b || answered) return;
      answered = true;
      const pick = b.dataset.ans;
      const score = U.store.get(SCORE_KEY, { right: 0, total: 0 });
      const verdict = revealInner.querySelector('.rv-verdict');
      revealInner.querySelectorAll('.rv-opt, .rv-ask').forEach(o => { o.style.animation = 'none'; o.style.opacity = ''; });
      revealInner.querySelectorAll('.rv-opt').forEach(o => {
        o.disabled = true;
        if (o.dataset.ans === right) o.classList.add('is-right');
        else if (o.dataset.ans === pick) o.classList.add('is-wrong');
        else o.classList.add('is-dim');
      });
      if (pick) {
        score.total++; if (pick === right) score.right++;
        U.store.set(SCORE_KEY, score);
        verdict.innerHTML = (pick === right ? 'Yes. ' + U.esc(right) + '.' : 'Not quite. It was ' + U.esc(right) + '.') + '<span class="rv-score">Your guesses: ' + score.right + ' of ' + score.total + ' right</span>';
      } else verdict.textContent = U.esc(right) + '.';
      setTimeout(() => finishReveal(d), pick ? 1500 : 500);
    };
  }
  function finishReveal(d) {
    reveal.classList.add('is-out');
    setTimeout(() => { reveal.hidden = true; }, 700);
    // stamp the location while the planet turns
    const loc = $('#locate');
    const name = nameOfCode(d.c);
    loc.querySelector('.locate-country').innerHTML = [...name].map((ch, i) => '<span style="animation-delay:' + (i * 45) + 'ms">' + (ch === ' ' ? '&nbsp;' : U.esc(ch)) + '</span>').join('');
    loc.querySelector('.locate-meta').textContent = U.fmtCoord(d.lat, d.lon) + (user ? ' · ' + U.fmtKm(U.distKm(user, d)) + ' from you' : '');
    loc.classList.remove('is-on'); void loc.offsetWidth; loc.classList.add('is-on');
    const idx = idxOfCode[d.c] || -1;
    G(g => { g.setSelected(idx); g.setOffset(0, U.isNarrow() ? 0.08 : 0); });
    const go = globe ? globe.flyTo(d.lat, d.lon, distForExtent(U.clamp(idx > 0 ? countryLabel[idx].ext : 10, 4, 60) * 1.5), { duration: U.reduced() ? 0.01 : 2.2 }) : Promise.resolve();
    go.then(() => {
      setTimeout(() => {
        state.revealing = false;
        body.classList.remove('is-revealing');
        openDiscovery(d.id, { fresh: true, reveal: true });
      }, U.reduced() ? 0 : 500);
    });
  }

  /* ---------- modes ---------- */
  function setMode(mode, quiet) {
    if (state.mode === mode) return;
    const prev = state.mode;
    state.mode = mode;
    body.classList.toggle('mode-people', mode === 'people');
    body.classList.toggle('mode-trail', mode === 'trail');
    document.querySelectorAll('.mode').forEach(b => { const on = b.dataset.mode === mode; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    $('#people').hidden = mode !== 'people';
    $('#trail').hidden = mode !== 'trail';
    tip.hidden = true;
    if (mode === 'people') {
      if (state.current && state.current.type !== 'p') closePanel(true);
      G(g => { g.setFade(0); g.setOffset(0, 0); });
      ensureGraph();
      if (graph) graph.render(true);
      if (!quiet) setHash('people');
      rotateTeasers('stop');
    } else if (mode === 'trail') {
      closePanel(true);
      G(g => { g.setFade(0.35); g.setOffset(0, 0); });
      renderTrail();
      if (!quiet) setHash('trail');
      rotateTeasers('stop');
    } else {
      G(g => g.setFade(1));
      $('#graphTip').hidden = true;
      if (prev !== 'world' && !quiet) { closePanel(); }
    }
  }
  function ensureGraph(silent) {
    if (graph) return graph;
    if ($('#people').hidden && silent) {
      // build data-only helpers without rendering
      return { downstream: (id, layer) => AtlasGraph.prototype.downstream.call(graphData(), id, layer) };
    }
    graph = new AtlasGraph($('#graph'), {
      onPerson: id => openPerson(id, { inGraph: true }),
      onClear: () => { if (state.current && state.current.type === 'p' && state.mode === 'people') closePanel(true); }
    });
    const dl = $('#graphFindList');
    dl.innerHTML = graph.nodes.map(n => '<option value="' + U.esc(n.label) + '"></option>').join('');
    return graph;
  }
  let _gd = null;
  function graphData() {
    if (_gd) return _gd;
    const tmp = Object.create(AtlasGraph.prototype);
    tmp.build();
    _gd = tmp; return tmp;
  }

  function closePanel(keepMode) {
    hidePanel();
    state.current = null;
    state.back = [];
    state.hole = [];
    renderHole();
    G(g => { g.clearArcs(); g.setSelected(-1); g.setSelectedMarker(-1); g.setOffset(...homeOffset()); g.autoRotate = true; });
    setCountryTag(null);
    if (!keepMode && state.mode === 'world') {
      G(g => { g.distT = g.homeDist(); });
      setHash('');
      rotateTeasers(true);
    }
    if (state.mode === 'people' && graph) { graph.focusId = null; graph.unlight(); graph.svg.transition().duration(U.reduced() ? 0 : 900).call(graph.zoom.transform, graph.fit); }
  }
  function goBack() {
    const prev = state.back.pop();
    if (!prev) { closePanel(); return; }
    if (prev.type === 'c') openCountry(prev.code, { fromBack: true });
    else if (prev.type === 'd') {
      // stepping back also climbs out of the rabbit hole
      const at = state.hole.lastIndexOf('d:' + prev.id);
      if (at >= 0) state.hole = state.hole.slice(0, at);
      openDiscovery(prev.id, { fromBack: true });
      redrawPathArcs();
    } else if (prev.type === 'p') {
      const at = state.hole.lastIndexOf('p:' + prev.id);
      if (at >= 0) state.hole = state.hole.slice(0, at);
      openPerson(prev.id, { fromBack: true, inGraph: state.mode === 'people' });
      redrawPathArcs();
    }
  }

  /* ---------- trail view ---------- */
  function renderTrail() {
    const items = [];
    trail.forEach(t => { const r = resolve(t.ref); if (r && (!items.length || items[items.length - 1].ref !== r.ref)) items.push(r); });
    const stats = $('#trailStats'), actions = $('#trailActions'), map = $('#trailMap');
    if (!items.length) {
      stats.innerHTML = '';
      actions.innerHTML = '';
      map.innerHTML = '<div class="trail-empty"><p>Your trail is empty. Every story and person you open is added here, so you can see the path you took through human history.</p><button type="button" class="cta" data-act="surprise"><span>Start with something strange</span><svg viewBox="0 0 40 12" aria-hidden="true"><path d="M0 6h37M32 1l5 5-5 5"/></svg></button></div>';
      return;
    }
    let km = 0; for (let i = 1; i < items.length; i++) km += U.distKm(items[i - 1], items[i]);
    const countries = new Set(items.map(r => r.code)).size;
    const catCount = {}; items.forEach(r => { catCount[r.cat] = (catCount[r.cat] || 0) + 1; });
    const uniq = new Set(items.map(r => r.ref)).size;
    stats.innerHTML = '<div><div class="v">' + uniq + '</div><div class="k">Stops</div></div><div><div class="v">' + countries + '</div><div class="k">Countries</div></div>' +
      '<div><div class="v">' + Math.round(km).toLocaleString('en-US') + '</div><div class="k">Kilometres travelled</div></div><div><div class="v">' + (km / 40075).toFixed(1) + '×</div><div class="k">Around the Earth</div></div>' +
      '<div class="bars"><div class="k">Themes</div><div class="cat-bar">' + CATS.filter(c => catCount[c.id]).map(c => '<i title="' + c.label + '" style="--c:' + c.color + ';flex:' + catCount[c.id] + '"></i>').join('') + '</div></div>';
    actions.innerHTML = '<button type="button" class="btn-line" data-act="trail-globe">Draw it on the globe <svg viewBox="0 0 18 12"><path d="M0 6h15M11 2l4 4-4 4"/></svg></button><button type="button" class="ghost pill" data-act="trail-clear">Clear trail</button>';

    const W = Math.max(280, map.clientWidth || 600);
    const narrow = W < 520;
    const step = 92;
    const amp = Math.min(narrow ? 34 : 120, W * 0.2);
    const pts = items.map((r, i) => ({ r, x: 26 + amp + Math.sin(i * 0.95) * amp, y: 30 + i * step }));
    const H = pts[pts.length - 1].y + 50;
    const line = d3.line().x(p => p.x).y(p => p.y).curve(d3.curveCatmullRom.alpha(0.5));
    let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" height="' + H + '" role="list" aria-label="Your trail"><defs><linearGradient id="trailGrad" x1="0" y1="0" x2="0" y2="' + H + '" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#efe8d8" stop-opacity=".35"/><stop offset="1" stop-color="#ffb25e"/></linearGradient></defs>';
    s += '<path class="t-path" d="' + line(pts) + '"/>';
    for (let i = 1; i < pts.length; i++) {
      const k = U.distKm(pts[i - 1].r, pts[i].r);
      if (k > 30) s += '<text class="t-leg" x="' + ((pts[i - 1].x + pts[i].x) / 2 - 16) + '" y="' + ((pts[i - 1].y + pts[i].y) / 2 + 4) + '" text-anchor="end">↓ ' + U.fmtKm(k) + '</text>';
    }
    const labelX = 26 + amp * 2 + 30;
    pts.forEach((p, i) => {
      const last = i === pts.length - 1;
      const maxChars = Math.max(18, Math.floor((W - labelX) / (narrow ? 9.5 : 10.5)));
      const t = p.r.title.length > maxChars ? p.r.title.slice(0, maxChars - 1) + '…' : p.r.title;
      s += '<g class="t-stop" role="listitem" tabindex="0" data-open="' + p.r.ref + '" style="--c:' + p.r.color + '">';
      s += '<line x1="' + p.x + '" x2="' + (labelX - 10) + '" y1="' + p.y + '" y2="' + p.y + '" stroke="rgba(239,232,216,.08)"/>';
      s += '<circle class="ring" cx="' + p.x + '" cy="' + p.y + '" r="' + (last ? 10 : 8) + '"/><circle class="dot" cx="' + p.x + '" cy="' + p.y + '" r="' + (last ? 4.5 : 3) + '"/>';
      s += '<text class="tm" x="' + labelX + '" y="' + (p.y - 12) + '">' + String(i + 1).padStart(2, '0') + ' · ' + U.esc(nameOfCode(p.r.code)) + (p.r.kind === 'p' ? ' · person' : '') + '</text>';
      s += '<text class="tt" x="' + labelX + '" y="' + (p.y + 12) + '"' + (narrow ? ' style="font-size:17px"' : '') + '>' + U.esc(t) + '</text></g>';
    });
    s += '</svg>';
    map.innerHTML = s;
    const path = map.querySelector('.t-path');
    if (path && !U.reduced()) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
      path.getBoundingClientRect();
      path.style.transition = 'stroke-dashoffset ' + Math.min(4, 0.8 + items.length * 0.15) + 's cubic-bezier(.2,.7,.1,1)';
      path.style.strokeDashoffset = 0;
    }
  }
  function drawTrailOnGlobe() {
    const items = [];
    trail.forEach(t => { const r = resolve(t.ref); if (r && (!items.length || items[items.length - 1].ref !== r.ref)) items.push(r); });
    setMode('world', true);
    closePanel(true);
    setHash('');
    G(g => {
      g.autoRotate = false;
      const last = items[items.length - 1];
      g.flyTo(last.lat, last.lon, g.homeDist() * 1.1, { duration: 1.6 });
      for (let i = 1; i < items.length; i++) {
        const a = items[i - 1], b = items[i];
        if (U.distKm(a, b) < 40) continue;
        setTimeout(() => g.addArc(a, b, { color: b.color, tag: 'trail', alpha: 0.75, duration: 0.9, flow: true }), 400 + i * 260);
      }
    });
    body.classList.add('quiet-intro');
    toast('Your trail across the planet: ' + items.length + ' stops. Tap any light to keep going.');
  }

  /* ---------- toast ---------- */
  let toastT = 0;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.hidden = false;
    t.style.animation = 'none'; void t.offsetWidth; t.style.animation = '';
    clearTimeout(toastT);
    toastT = setTimeout(() => { t.hidden = true; }, 3400);
  }

  /* ---------- routing ---------- */
  let hashLock = false;
  function setHash(h) {
    const want = h ? '#' + h : '';
    if (location.hash === want || (!h && !location.hash)) return;
    hashLock = true;
    try { history.replaceState(null, '', want || location.pathname + location.search); } catch (e) { location.hash = want; }
    setTimeout(() => { hashLock = false; }, 0);
  }
  function route() {
    if (hashLock) return;
    const h = decodeURIComponent(location.hash.slice(1));
    if (!h) return;
    if (h === 'people') setMode('people');
    else if (h === 'trail') setMode('trail');
    else if (h.startsWith('d-') && discById[h.slice(2)]) openDiscovery(h.slice(2), { fresh: true });
    else if (h.startsWith('p-') && personById[h.slice(2)]) openPerson(h.slice(2), { fresh: true });
    else if (h.startsWith('c-') && idxOfCode[h.slice(2)]) openCountry(h.slice(2));
  }

  /* ---------- events ---------- */
  function bind() {
    $('#ctaExplore').addEventListener('click', surprise);
    $('#surpriseTop').addEventListener('click', surprise);
    $('#brand').addEventListener('click', () => { setMode('world', true); closePanel(); });
    $('#panelClose').addEventListener('click', () => closePanel(state.mode !== 'world'));
    $('#panelBack').addEventListener('click', goBack);
    document.querySelectorAll('.mode').forEach(b => b.addEventListener('click', () => {
      const m = b.dataset.mode;
      if (m === state.mode) { if (m === 'world') closePanel(); return; }
      setMode(m);
      if (m === 'world') { setHash(''); rotateTeasers(true); G(g => g.setOffset(...homeOffset())); }
    }));
    document.addEventListener('click', e => {
      const o = e.target.closest('[data-open]');
      if (o) { e.preventDefault(); const ref = o.dataset.open; if (ref.startsWith('c:')) openCountry(ref.slice(2)); else open(ref, { fresh: state.mode === 'trail' || !state.current }); return; }
      const dr = e.target.closest('[data-door]');
      if (dr) { followDoor(dr.dataset.door); return; }
      const hl = e.target.closest('[data-hole]');
      if (hl) {
        const i = +hl.dataset.hole;
        const ref = state.hole[i];
        if (i === state.hole.length - 1) return;
        state.hole = state.hole.slice(0, i);
        open(ref, {});
        redrawPathArcs();
        return;
      }
      const a = e.target.closest('[data-act]');
      if (!a) return;
      const act = a.dataset.act;
      if (act === 'surprise') surprise();
      else if (act === 'graph-person') { const id = a.dataset.id; setMode('people'); openPerson(id, { inGraph: true, fromBack: true }); }
      else if (act === 'globe-person') { const id = a.dataset.id; setMode('world', true); openPerson(id, { fresh: true }); }
      else if (act === 'trail-globe') drawTrailOnGlobe();
      else if (act === 'trail-clear') {
        $('#trailActions').innerHTML = '<div class="confirm"><span>Erase every stop from this device?</span><button type="button" class="btn-danger" data-act="trail-clear-yes">Erase trail</button><button type="button" class="ghost pill" data-act="trail-clear-no">Keep it</button></div>';
      } else if (act === 'trail-clear-yes') { trail = []; U.store.set(TRAIL_KEY, trail); updateTrailCount(); refreshInfo(); renderTrail(); toast('Trail cleared'); }
      else if (act === 'trail-clear-no') renderTrail();
    });
    document.addEventListener('keydown', e => {
      if (e.target.matches('input, textarea')) return;
      if (e.key === 'Escape') {
        if (state.revealing) { const s = revealInner.querySelector('.rv-skip'); if (s) s.click(); }
        else if (state.current) closePanel(state.mode !== 'world');
        else if (state.mode !== 'world') { setMode('world'); setHash(''); rotateTeasers(true); }
      }
      if (e.target.matches('.t-stop') && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
    });
    $('#graphFind').addEventListener('change', e => {
      const v = e.target.value.trim().toLowerCase(); if (!v || !graph) return;
      const n = graph.nodes.find(x => x.label.toLowerCase() === v) || graph.nodes.find(x => x.label.toLowerCase().includes(v));
      if (n) { graph.select(n.id, true); e.target.value = ''; } else toast('No person or idea called “' + e.target.value + '”');
    });
    $('#graphRandom').addEventListener('click', () => { const p = U.pick(PEOPLE); if (graph) graph.select('P:' + p.id, true); });
    window.addEventListener('hashchange', route);
    window.addEventListener('resize', () => {
      if (globe && state.mode === 'world') { const [ox, oy] = panelOffset(); globe.setOffset(ox, oy); }
      if (state.mode === 'trail') renderTrail();
    });
    document.addEventListener('visibilitychange', () => { if (!document.hidden && globe) globe.clock.getDelta(); });
  }

  /* ---------- boot ---------- */
  function boot() {
    buildCats();
    bind();
    updateTrailCount();
    const nCountries = new Set(DISC.map(d => d.c).concat(PEOPLE.map(p => p.c))).size;
    try {
      globe = new window.AtlasGlobe($('#world'));
    } catch (err) {
      console.error(err);
      globe = null;
      $('#introHint').textContent = 'Your browser could not start the 3D globe, but every story still works.';
    }
    if (globe) {
      const markers = DISC.map(d => ({ kind: 'disc', lat: d.lat, lon: d.lon, color: catById[d.cat].color, disc: d }))
        .concat(PEOPLE.map(p => ({ kind: 'person', lat: p.lat, lon: p.lon, color: catById.people.color, person: p })));
      globe.setMarkers(markers);
      refreshInfo();
      globe.onHover = showTip;
      globe.onClick = p => {
        if (state.revealing || state.mode !== 'world' || !p) return;
        if (p.type === 'marker') { if (p.marker.kind === 'person') openPerson(p.marker.person.id, { fresh: true }); else openDiscovery(p.marker.disc.id, { fresh: true }); }
        else if (p.type === 'country') { const f = features[p.idx - 1]; if (f && f.id) openCountry(f.id); else toast(nameOfIdx(p.idx) + ' has no stories yet.'); }
      };
      globe.onFrame = placeLabels;
      globe.startIntro(user ? user.lon + 30 : 20);
      globe.setOffset(...homeOffset()); globe.offX = globe.offXT; globe.offY = globe.offYT; globe.applyOffset();
    }
    requestAnimationFrame(() => {
      body.classList.remove('is-loading');
      body.classList.add('is-booting');
      const stats = $('#introStats');
      const total = DISC.length;
      const t0 = performance.now();
      const tick = now => {
        const k = U.easeOut(U.clamp((now - t0 - 1200) / 2200, 0, 1));
        stats.textContent = Math.round(total * k) + ' true stories · ' + Math.round(nCountries * k) + ' countries · ' + Math.round(PEOPLE.length * k) + ' people who changed everything';
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      setTimeout(() => body.classList.remove('is-booting'), U.reduced() ? 0 : 1500);
      setTimeout(() => { if (location.hash) route(); else rotateTeasers(); }, U.reduced() ? 50 : 3600);
    });
  }

  boot();
  window.Atlas = { surprise, openDiscovery, openPerson, openCountry, setMode, state };
})();
