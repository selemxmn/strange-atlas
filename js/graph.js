/* The Impact Graph: a layered constellation of people -> ideas -> breakthroughs -> modern life. */
(function () {
  const U = window.AtlasUtil;

  function AtlasGraph(svgEl, opts) {
    this.svg = d3.select(svgEl);
    this.opts = opts || {};
    this.focusId = null;
    this.build();
    this.render();
    window.addEventListener('resize', () => { if (!this.hidden()) this.render(true); });
  }

  AtlasGraph.prototype.hidden = function () { return this.svg.node().closest('[hidden]') != null; };

  AtlasGraph.prototype.build = function () {
    const catColor = {};
    window.ATLAS_CATEGORIES.forEach(c => { catColor[c.id] = c.color; });
    const nodes = [], byId = {}, edges = [];
    window.ATLAS_PEOPLE.forEach(p => {
      const n = { id: 'P:' + p.id, pid: p.id, layer: 0, label: p.name, text: p.field, color: catColor[p.cat] || '#c7a4ff', person: p };
      nodes.push(n); byId[n.id] = n;
    });
    const layerColor = ['#c7a4ff', '#8fb4ff', '#f4d35e', '#ffb25e'];
    window.ATLAS_GRAPH.nodes.forEach(g => {
      const n = Object.assign({}, g, { color: layerColor[g.layer] });
      nodes.push(n); byId[n.id] = n;
    });
    window.ATLAS_PEOPLE.forEach(p => p.ideas.forEach(i => { if (byId[i]) edges.push({ s: byId['P:' + p.id], t: byId[i] }); }));
    window.ATLAS_GRAPH.edges.forEach(([a, b]) => { if (byId[a] && byId[b]) edges.push({ s: byId[a], t: byId[b] }); });
    nodes.forEach(n => { n.out = []; n.in = []; });
    edges.forEach(e => { e.s.out.push(e); e.t.in.push(e); });
    this.nodes = nodes; this.byId = byId; this.edges = edges;

    // order each layer to reduce crossings (barycentre sweeps)
    const layers = [0, 1, 2, 3].map(l => nodes.filter(n => n.layer === l));
    layers.forEach(L => L.forEach((n, i) => { n.ord = i; }));
    const bary = (n, dir) => {
      const es = dir > 0 ? n.in : n.out;
      if (!es.length) return n.ord;
      return es.reduce((s, e) => s + (dir > 0 ? e.s.ord : e.t.ord), 0) / es.length;
    };
    for (let it = 0; it < 6; it++) {
      for (let l = 1; l < 4; l++) { layers[l].sort((a, b) => bary(a, 1) - bary(b, 1)); layers[l].forEach((n, i) => { n.ord = i * (layers[0].length / layers[l].length); }); }
      for (let l = 2; l >= 0; l--) { layers[l].sort((a, b) => bary(a, -1) - bary(b, -1)); layers[l].forEach((n, i) => { n.ord = i * (layers[0].length / layers[l].length); }); }
    }
    this.layers = layers;
  };

  /* the set of nodes reachable upstream and downstream from a node */
  AtlasGraph.prototype.reach = function (n) {
    const set = new Set([n]), es = new Set();
    const down = x => x.out.forEach(e => { es.add(e); if (!set.has(e.t)) { set.add(e.t); down(e.t); } });
    const up = x => x.in.forEach(e => { es.add(e); if (!set.has(e.s)) { set.add(e.s); up(e.s); } });
    down(n); up(n);
    return { nodes: set, edges: es };
  };
  AtlasGraph.prototype.downstream = function (id, layer) {
    const n = this.byId[id]; if (!n) return [];
    const out = new Set();
    const walk = x => x.out.forEach(e => { if (e.t.layer === layer) out.add(e.t); walk(e.t); });
    walk(n);
    return [...out];
  };
  AtlasGraph.prototype.upstreamPeople = function (n) {
    const out = new Set();
    const walk = x => x.in.forEach(e => { if (e.s.layer === 0) out.add(e.s); walk(e.s); });
    walk(n);
    return [...out];
  };

  AtlasGraph.prototype.render = function (keepZoom) {
    const svg = this.svg;
    const W = window.innerWidth, H = window.innerHeight;
    const narrow = W <= 820;
    svg.attr('viewBox', '0 0 ' + W + ' ' + H);
    svg.selectAll('*').remove();

    const rowGap = 25, colGap = narrow ? 230 : 300;
    const maxN = Math.max(...this.layers.map(L => L.length));
    const contentH = (maxN - 1) * rowGap;
    this.layers.forEach((L, l) => {
      const span = (L.length - 1) * (contentH / Math.max(1, maxN - 1)) * (l === 0 ? 1 : Math.min(1, 0.55 + L.length / maxN));
      const gap = L.length > 1 ? span / (L.length - 1) : 0;
      const y0 = (contentH - span) / 2;
      L.forEach((n, i) => { n.x = l * colGap; n.y = y0 + i * gap; });
    });
    const contentW = colGap * 3;
    this.colGap = colGap;

    // region to fit into
    const head = document.querySelector('.people-head');
    const headB = head ? head.getBoundingClientRect().bottom : 200;
    let region;
    if (!narrow && W > 1150) region = { x0: 420 + 190, x1: W - 220, y0: 90, y1: H - 70 };
    else if (!narrow) region = { x0: 200, x1: W - 200, y0: headB + 24, y1: H - 60 };
    else region = { x0: 190, x1: W - 30, y0: headB + 26, y1: H - 56 };
    const k = Math.max(narrow ? 0.66 : 0.55, Math.min(1.05, (region.y1 - region.y0) / contentH, narrow ? 9 : (region.x1 - region.x0) / contentW));
    const tx = region.x0, ty = region.y0 + Math.max(0, ((region.y1 - region.y0) - contentH * k) / 2);
    this.fit = d3.zoomIdentity.translate(tx, ty).scale(k);

    const defs = svg.append('defs');
    const lg = defs.append('linearGradient').attr('id', 'flowGrad').attr('gradientUnits', 'userSpaceOnUse').attr('x1', 0).attr('x2', contentW).attr('y1', 0).attr('y2', 0);
    lg.append('stop').attr('offset', '0%').attr('stop-color', '#c7a4ff');
    lg.append('stop').attr('offset', '40%').attr('stop-color', '#8fb4ff');
    lg.append('stop').attr('offset', '70%').attr('stop-color', '#f4d35e');
    lg.append('stop').attr('offset', '100%').attr('stop-color', '#ffb25e');

    const root = svg.append('g');
    this.root = root;
    const zoom = d3.zoom().scaleExtent([0.35, 2.6]).on('zoom', ev => { root.attr('transform', ev.transform); this.t = ev.transform; this.placeHeads(); });
    this.zoom = zoom;
    svg.call(zoom).on('dblclick.zoom', null);
    svg.on('click', ev => { if (ev.target === svg.node()) this.clear(); });

    const self = this;
    const edgeSel = root.append('g').selectAll('path').data(this.edges).join('path')
      .attr('class', 'g-edge')
      .attr('d', e => { const dx = (e.t.x - e.s.x) * 0.5; return `M${e.s.x},${e.s.y} C${e.s.x + dx},${e.s.y} ${e.t.x - dx},${e.t.y} ${e.t.x},${e.t.y}`; });
    if (!keepZoom && !U.reduced()) {
      edgeSel.each(function (e) {
        const len = this.getTotalLength();
        d3.select(this).attr('stroke-dasharray', len + ' ' + len).attr('stroke-dashoffset', len)
          .transition().delay(300 + e.s.layer * 380 + Math.random() * 300).duration(1100).ease(d3.easeCubicOut)
          .attr('stroke-dashoffset', 0).on('end', function () { d3.select(this).attr('stroke-dasharray', null).attr('stroke-dashoffset', null); });
      });
    }
    this.edgeSel = edgeSel;

    const nodeSel = root.append('g').selectAll('g').data(this.nodes).join('g')
      .attr('class', n => 'g-node l' + n.layer)
      .attr('transform', n => `translate(${n.x},${n.y})`)
      .attr('tabindex', 0).attr('role', 'button').attr('aria-label', n => n.label)
      .style('--nc', n => n.color);
    nodeSel.append('circle').attr('class', 'halo').attr('r', n => n.layer === 3 ? 14 : n.layer === 0 ? 11 : 9);
    nodeSel.append('circle').attr('class', 'core').attr('r', n => n.layer === 3 ? 4.6 : n.layer === 0 ? 3.6 : 2.8);
    nodeSel.append('text')
      .attr('x', n => n.layer === 0 ? -14 : 12).attr('dy', '0.35em')
      .attr('text-anchor', n => n.layer === 0 ? 'end' : 'start')
      .text(n => n.label);
    if (!keepZoom && !U.reduced()) {
      nodeSel.attr('opacity', 0).transition().delay(n => 100 + n.layer * 380 + Math.random() * 260).duration(700).attr('opacity', 1);
    }
    nodeSel
      .on('mouseenter', function (ev, n) { if (!self.focusId) self.light(n); self.tip(n, this); })
      .on('mouseleave', () => { if (!self.focusId) self.unlight(); self.hideTip(); })
      .on('click', (ev, n) => { ev.stopPropagation(); self.select(n.id, true); })
      .on('keydown', (ev, n) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); self.select(n.id, true); } });
    this.nodeSel = nodeSel;

    // layer headers in screen space
    const heads = document.getElementById('layerHeads');
    heads.innerHTML = window.ATLAS_GRAPH.layers.map(l => '<span>' + U.esc(l) + '</span>').join('');
    this.t = keepZoom && this.t ? this.t : this.fit;
    svg.call(zoom.transform, this.t);
    if (this.focusId) this.select(this.focusId, false);
  };

  AtlasGraph.prototype.placeHeads = function () {
    const heads = document.querySelectorAll('#layerHeads span');
    const t = this.t; if (!t) return;
    heads.forEach((h, l) => {
      const x = t.applyX(l * this.colGap);
      h.style.left = x + 'px';
      h.style.opacity = x < 10 || x > window.innerWidth - 10 ? 0 : 1;
    });
  };

  AtlasGraph.prototype.light = function (n) {
    const r = this.reach(n);
    this.nodeSel.classed('is-lit', d => r.nodes.has(d)).classed('is-dim', d => !r.nodes.has(d)).classed('is-focus', d => d === n);
    this.edgeSel.classed('is-lit', e => r.edges.has(e)).classed('is-dim', e => !r.edges.has(e));
    this.edgeSel.filter(e => r.edges.has(e)).raise();
  };
  AtlasGraph.prototype.unlight = function () {
    this.nodeSel.classed('is-lit', false).classed('is-dim', false).classed('is-focus', false);
    this.edgeSel.classed('is-lit', false).classed('is-dim', false);
  };
  AtlasGraph.prototype.clear = function () {
    this.focusId = null; this.unlight(); this.hideTip();
    if (this.opts.onClear) this.opts.onClear();
  };

  AtlasGraph.prototype.select = function (id, fromUser) {
    const n = this.byId[id]; if (!n) return;
    this.focusId = id;
    this.light(n);
    if (n.layer === 0) {
      this.hideTip();
      if (fromUser && this.opts.onPerson) this.opts.onPerson(n.pid);
    } else {
      const el = this.nodeSel.filter(d => d === n).node();
      this.tip(n, el, true);
    }
    // bring the node into view if it is off screen
    const t = this.t || this.fit;
    const sx = t.applyX(n.x), sy = t.applyY(n.y);
    const W = window.innerWidth, H = window.innerHeight;
    const panelOpen = document.body.classList.contains('has-panel');
    const maxX = panelOpen && W > 820 ? W - Math.min(600, W * 0.46) - 60 : W - 60;
    const maxY = panelOpen && W <= 820 ? H * 0.34 : H - 60;
    if (n.layer === 0 && panelOpen && W > 820) {
      // fit the whole lit chain into the space left of the panel
      const r = this.reach(n);
      const xs = [...r.nodes].map(d => d.x), ys = [...r.nodes].map(d => d.y);
      const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
      const availW = W - Math.min(600, W * 0.46) - 240 - 200, availH = H - 260;
      const k = U.clamp(Math.min(availW / Math.max(1, x1 - x0), availH / Math.max(1, y1 - y0)), 0.5, 1.15);
      const tx = 220 - x0 * k, ty = 120 + (availH - (y1 - y0) * k) / 2 - y0 * k;
      this.svg.transition().duration(U.reduced() ? 0 : 1000).ease(d3.easeCubicInOut).call(this.zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k));
    } else if (sx < 140 || sx > maxX || sy < 120 || sy > maxY) {
      const tx = (panelOpen && W > 820 ? (W - Math.min(600, W * 0.46)) / 2 : W / 2) - n.x * t.k;
      const ty = (panelOpen && W <= 820 ? H * 0.2 : H / 2) - n.y * t.k;
      this.svg.transition().duration(U.reduced() ? 0 : 900).ease(d3.easeCubicInOut).call(this.zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(t.k));
    }
  };
  AtlasGraph.prototype.focusPerson = function (pid) { this.select('P:' + pid, false); };

  AtlasGraph.prototype.tip = function (n, el, pinned) {
    const tip = document.getElementById('graphTip');
    const kind = ['Person', 'Idea', 'Discovery or invention', 'Modern life'][n.layer];
    let html = '<div class="k">' + kind + '</div><div class="v">' + U.esc(n.label) + '</div><div class="s">' + U.esc(n.text || '') + '</div>';
    if (n.layer > 0) {
      const ppl = this.upstreamPeople(n).map(p => p.label);
      if (ppl.length) html += '<div class="u">Because of ' + U.esc(ppl.slice(0, 5).join(', ')) + (ppl.length > 5 ? ' and ' + (ppl.length - 5) + ' more' : '') + '</div>';
    } else {
      html += '<div class="u">Select to see what changed</div>';
    }
    tip.innerHTML = html;
    tip.style.borderLeftColor = n.color;
    tip.hidden = false;
    const r = el.getBoundingClientRect();
    const tw = tip.offsetWidth, th = tip.offsetHeight;
    let x = r.right + 14, y = r.top - th / 2;
    if (x + tw > window.innerWidth - 12) x = r.left - tw - 14;
    if (x < 8) x = 8;
    y = U.clamp(y, 70, window.innerHeight - th - 12);
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
    this.tipPinned = !!pinned;
  };
  AtlasGraph.prototype.hideTip = function () {
    if (this.tipPinned && this.focusId && this.byId[this.focusId].layer > 0) return;
    document.getElementById('graphTip').hidden = true;
  };

  window.AtlasGraph = AtlasGraph;
})();
