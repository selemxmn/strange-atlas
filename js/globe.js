/* The night planet: a WebGL globe with a dot-matrix land surface, country picking
   through an ID map, glowing discovery markers, travelling arcs and a starfield. */
(function () {
  const U = window.AtlasUtil;
  const D2R = Math.PI / 180;
  const FOV = 35;

  function vecFrom(lat, lon, r) {
    const la = lat * D2R, lo = lon * D2R;
    return new THREE.Vector3(r * Math.cos(la) * Math.sin(lo), r * Math.sin(la), r * Math.cos(la) * Math.cos(lo));
  }

  /* ---------- texture builders ---------- */
  function buildIdMap(features) {
    const W = 2048, H = 1024;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    const proj = d3.geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]).precision(0.2);
    const path = d3.geoPath(proj, ctx);
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    features.forEach((f, i) => {
      const id = i + 1;
      ctx.fillStyle = 'rgb(' + id + ',' + ((id * 37) & 255) + ',' + ((id * 91) & 255) + ')';
      ctx.beginPath(); path(f); ctx.fill();
    });
    const img = ctx.getImageData(0, 0, W, H).data;
    const ids = new Uint8Array(W * H);
    const rgba = new Uint8Array(W * H * 4);
    const max = features.length;
    for (let y = 0; y < H; y++) {
      let prev = 0;
      for (let x = 0; x < W; x++) {
        const p = (y * W + x) * 4;
        const r = img[p], g = img[p + 1], b = img[p + 2];
        let id = (g === ((r * 37) & 255) && b === ((r * 91) & 255) && r <= max) ? r : prev;
        // a blended pixel never survives the checksum; inherit the neighbour instead
        ids[y * W + x] = id; rgba[p] = id; rgba[p + 3] = 255; prev = id;
      }
    }
    const tex = new THREE.DataTexture(rgba, W, H, THREE.RGBAFormat);
    tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false;
    tex.wrapS = THREE.RepeatWrapping; tex.needsUpdate = true;
    return { tex, ids, W, H };
  }

  function buildLineMap(topo, big) {
    const W = big ? 4096 : 2048, H = W / 2;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    const proj = d3.geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]).precision(0.1);
    const path = d3.geoPath(proj, ctx);
    const obj = topo.objects.countries;
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgb(255,0,0)'; ctx.lineWidth = W / 4096 * 1.25;
    ctx.beginPath(); path(topojson.mesh(topo, obj, (a, b) => a !== b)); ctx.stroke();
    ctx.strokeStyle = 'rgb(0,255,0)'; ctx.lineWidth = W / 4096 * 1.6;
    ctx.beginPath(); path(topojson.mesh(topo, obj, (a, b) => a === b)); ctx.stroke();
    const tex = new THREE.CanvasTexture(c);
    tex.flipY = false; tex.wrapS = THREE.RepeatWrapping; tex.anisotropy = 4;
    return tex;
  }

  function buildGlowMap(land) {
    const W = 1024, H = 512;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    const proj = d3.geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]);
    const path = d3.geoPath(proj, ctx);
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,.35)';
    ctx.shadowColor = '#fff';
    [24, 12, 5].forEach(b => { ctx.shadowBlur = b; ctx.beginPath(); path(land); ctx.fill(); });
    const tex = new THREE.CanvasTexture(c);
    tex.flipY = false; tex.wrapS = THREE.RepeatWrapping;
    return tex;
  }

  /* ---------- shaders ---------- */
  const globeVert = `
    varying vec3 vObj; varying vec3 vN; varying vec3 vV;
    void main() {
      vObj = position;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vN = normalize(normalMatrix * normal);
      vV = -mv.xyz;
      gl_Position = projectionMatrix * mv;
    }`;

  const globeFrag = `
    precision highp float;
    uniform sampler2D idMap; uniform sampler2D lineMap; uniform sampler2D glowMap; uniform sampler2D infoMap;
    uniform float uHover; uniform float uSel; uniform float uTime; uniform float uSpA; uniform float uSpB; uniform float uMix;
    uniform float uIntro; uniform float uFilterOn; uniform float uFade; uniform vec2 uTexel;
    varying vec3 vObj; varying vec3 vN; varying vec3 vV;
    #define PI 3.141592653589793
    vec2 toUV(float lat, float lon) { return vec2(lon / (2.0 * PI) + 0.5, 0.5 - lat / PI); }
    float idAt(vec2 uv) { return floor(texture2D(idMap, uv).r * 255.0 + 0.5); }
    vec4 infoOf(float id) { return texture2D(infoMap, vec2((id + 0.5) / 256.0, 0.5)); }
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float dots(float lat, float lon, float sp, out float idc, out float h) {
      float row = floor((lat + PI * 0.5) / sp);
      float latC = (row + 0.5) * sp - PI * 0.5;
      float n = max(1.0, floor(2.0 * PI * cos(latC) / sp));
      float cw = 2.0 * PI / n;
      float col = floor((lon + PI) / cw);
      float lonC = (col + 0.5) * cw - PI;
      vec2 d = vec2((lon - lonC) * cos(lat), lat - latC) / sp;
      float r = length(d);
      float aa = fwidth(r) + 1e-4;
      idc = idAt(toUV(latC, lonC));
      h = hash(vec2(row, col));
      return 1.0 - smoothstep(0.30 - aa, 0.30 + aa, r);
    }
    vec3 dotColor(float idc, float day, float h) {
      vec4 inf = infoOf(idc);
      float m = mix(1.0, inf.g, uFilterOn);
      float warm = inf.r * m;
      vec3 cool = vec3(0.26, 0.33, 0.46) * mix(0.42, 1.0, day);
      vec3 amber = vec3(0.86, 0.56, 0.30) * (0.55 + 0.25 * day) * (0.55 + 0.6 * h);
      vec3 c = mix(cool, amber, warm * 0.85);
      c = mix(c, c * 0.35, uFilterOn * (1.0 - inf.g) * step(0.01, inf.r));
      if (abs(idc - uHover) < 0.5) c = mix(c, vec3(1.0, 0.95, 0.86), 0.55);
      if (abs(idc - uSel) < 0.5) c = vec3(1.25, 1.02, 0.74);
      return c;
    }
    void main() {
      vec3 n = normalize(vObj);
      float lat = asin(clamp(n.y, -1.0, 1.0));
      float lon = atan(n.x, n.z);
      vec2 uv = toUV(lat, lon);
      vec3 N = normalize(vN); vec3 V = normalize(vV);
      float ndv = max(dot(N, V), 0.0);
      float fres = pow(1.0 - ndv, 2.6);
      vec3 sun = normalize(vec3(-0.55, 0.45, 0.70));
      float day = smoothstep(-0.25, 0.55, dot(N, sun));

      // ocean
      vec3 col = mix(vec3(0.010, 0.016, 0.030), vec3(0.030, 0.055, 0.100), day);
      float g = texture2D(glowMap, uv).r;
      col += vec3(0.05, 0.09, 0.16) * g * (0.35 + 0.65 * day);
      // graticule every 15 degrees
      vec2 gr = vec2(lat, lon) / (15.0 * PI / 180.0);
      vec2 gw = fwidth(gr) + 1e-5;
      vec2 gl = abs(fract(gr + 0.5) - 0.5) / gw;
      float grid = 1.0 - smoothstep(0.0, 1.0, min(gl.x, gl.y));
      col += vec3(0.20, 0.30, 0.50) * grid * 0.07;

      // land fill
      float id = idAt(uv);
      float land = step(0.5, id);
      vec4 inf = infoOf(id);
      vec3 fill = vec3(0.045, 0.062, 0.095) * (0.55 + 0.6 * day);
      fill += vec3(0.16, 0.09, 0.035) * inf.r * mix(1.0, inf.g, uFilterOn) * 0.16;
      fill += vec3(0.20, 0.13, 0.06) * inf.b * 0.25;
      if (abs(id - uHover) < 0.5) fill += vec3(0.07, 0.08, 0.10);
      if (abs(id - uSel) < 0.5) fill += vec3(0.20, 0.12, 0.05) * (0.85 + 0.15 * sin(uTime * 2.0));
      col = mix(col, fill, land * 0.92);

      // borders & coasts
      vec4 ln = texture2D(lineMap, uv);
      float near = 0.0;
      if (uSel > 0.5) {
        float s1 = idAt(uv + vec2(uTexel.x * 2.0, 0.0)); float s2 = idAt(uv - vec2(uTexel.x * 2.0, 0.0));
        float s3 = idAt(uv + vec2(0.0, uTexel.y * 2.0)); float s4 = idAt(uv - vec2(0.0, uTexel.y * 2.0));
        near = max(max(step(abs(s1 - uSel), 0.5), step(abs(s2 - uSel), 0.5)), max(max(step(abs(s3 - uSel), 0.5), step(abs(s4 - uSel), 0.5)), step(abs(id - uSel), 0.5)));
      }
      float edge = max(ln.r, ln.g);
      col += vec3(0.35, 0.45, 0.62) * ln.r * 0.28 * (0.5 + 0.5 * day);
      col += vec3(0.42, 0.55, 0.78) * ln.g * 0.30 * (0.5 + 0.5 * day);
      col = mix(col, vec3(1.0, 0.78, 0.48), edge * near * 0.95);

      // dot matrix, two levels of detail cross-faded with zoom
      float idA; float hA; float idB; float hB;
      float cA = dots(lat, lon, uSpA, idA, hA);
      float cB = dots(lat, lon, uSpB, idB, hB);
      cA *= step(0.5, idA) * step(fract(hA * 7.31), uIntro * 1.05);
      cB *= step(0.5, idB) * step(fract(hB * 7.31), uIntro * 1.05);
      vec3 dc = dotColor(idA, day, hA) * cA * (1.0 - uMix) + dotColor(idB, day, hB) * cB * uMix;
      float dcov = cA * (1.0 - uMix) + cB * uMix;
      col = mix(col, dc / max(dcov, 1e-4), dcov * 0.92);

      // atmosphere rim
      col += vec3(0.30, 0.52, 1.0) * fres * 0.55;
      col += vec3(1.0, 0.70, 0.40) * pow(fres, 6.0) * 0.12 * day;
      col *= smoothstep(0.0, 0.35, uIntro);
      gl_FragColor = vec4(col, uFade);
    }`;

  const atmoVert = `
    varying vec3 vN; varying vec3 vV;
    void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }`;
  const atmoFrag = `
    uniform float uFade; varying vec3 vN; varying vec3 vV;
    void main() {
      float d = dot(normalize(vN), normalize(vV));
      float i = pow(clamp(0.62 + d, 0.0, 1.0), 5.0) * 1.4;
      vec3 c = mix(vec3(0.25, 0.45, 1.0), vec3(0.55, 0.75, 1.0), i);
      gl_FragColor = vec4(c * i * uFade, 1.0);
    }`;

  const markerVert = `
    attribute vec3 aColor; attribute float aBirth; attribute float aKind; attribute float aActive; attribute float aIdx; attribute float aSeed;
    uniform float uIntroT; uniform float uPR; uniform float uSize; uniform float uHover; uniform float uSel; uniform float uFade;
    varying vec3 vC; varying float vA; varying float vKind; varying float vSeed; varying float vActive; varying float vHot;
    void main() {
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vec3 nrm = normalize(wp.xyz);
      vec3 toCam = normalize(cameraPosition - wp.xyz);
      float facing = dot(nrm, toCam);
      float born = clamp((uIntroT - aBirth) / 0.7, 0.0, 1.0);
      float hot = max(step(abs(aIdx - uHover), 0.5), step(abs(aIdx - uSel), 0.5));
      vHot = hot; vC = aColor; vKind = aKind; vSeed = aSeed; vActive = aActive;
      vA = smoothstep(0.02, 0.3, facing) * born * mix(0.18, 1.0, aActive) * uFade;
      float pop = 1.0 + 1.6 * (1.0 - born) * born * 4.0 * step(0.001, born);
      gl_PointSize = uSize * uPR * mix(0.75, 1.0, aActive) * (1.0 + hot * 0.7) * pop;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`;
  const markerFrag = `
    uniform float uTime;
    varying vec3 vC; varying float vA; varying float vKind; varying float vSeed; varying float vActive; varying float vHot;
    void main() {
      vec2 p = gl_PointCoord * 2.0 - 1.0;
      float r = vKind > 0.5 ? (abs(p.x) + abs(p.y)) * 0.78 : length(p);
      float core = 1.0 - smoothstep(0.10, 0.17, r);
      float halo = exp(-r * r * 9.0) * 0.6;
      float ph = fract(uTime * 0.38 + vSeed);
      float ring = (1.0 - smoothstep(0.0, 0.05, abs(r - ph * 0.92))) * (1.0 - ph) * 0.75 * vActive;
      float hotRing = vHot * (1.0 - smoothstep(0.0, 0.05, abs(r - 0.5))) * 0.9;
      float a = (core + halo + ring + hotRing) * vA;
      vec3 c = mix(vC, vec3(1.0), core * 0.55);
      gl_FragColor = vec4(c * a, a);
    }`;

  const arcVert = `
    attribute float aT; uniform float uProg; uniform float uPR; uniform float uSize; varying float vT; varying float vHead;
    void main() {
      vT = aT;
      vHead = exp(-pow((aT - uProg) * 22.0, 2.0)) * (1.0 - step(0.999, uProg));
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = uPR * (uSize + vHead * 16.0);
      gl_Position = projectionMatrix * mv;
    }`;
  const arcFrag = `
    uniform vec3 uColor; uniform float uProg; uniform float uAlpha; uniform float uTime; uniform float uFlow; uniform float uFade;
    varying float vT; varying float vHead;
    void main() {
      vec2 p = gl_PointCoord * 2.0 - 1.0;
      float r = dot(p, p);
      float soft = exp(-r * 4.0);
      float shown = step(vT, uProg);
      float flow = 0.5 + 0.5 * sin(vT * 40.0 - uTime * 5.0);
      float a = uAlpha * soft * (shown * (0.5 + 0.5 * mix(1.0, flow, uFlow)) + vHead * 1.6) * uFade;
      gl_FragColor = vec4(mix(uColor, vec3(1.0), vHead * 0.7 + soft * 0.15) * a, a);
    }`;

  const starVert = `
    attribute float aSize; attribute float aSeed; attribute vec3 aColor; uniform float uPR; uniform float uTime;
    varying float vTw; varying vec3 vC;
    void main() {
      vTw = 0.6 + 0.4 * sin(uTime * (0.6 + aSeed * 1.8) + aSeed * 40.0);
      vC = aColor;
      gl_PointSize = aSize * uPR;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`;
  const starFrag = `
    uniform float uAlpha; varying float vTw; varying vec3 vC;
    void main() {
      vec2 p = gl_PointCoord * 2.0 - 1.0; float r = dot(p, p);
      float a = exp(-r * 5.0) * vTw * uAlpha;
      gl_FragColor = vec4(vC * a, a);
    }`;

  /* ---------- the globe ---------- */
  function Globe(canvas) {
    const self = this;
    const topo = window.WORLD_TOPO;
    const features = topojson.feature(topo, topo.objects.countries).features;
    const land = topojson.merge(topo, topo.objects.countries.geometries);
    this.features = features;
    this.topo = topo;
    this.land = land;
    this.codeToIdx = {};
    features.forEach((f, i) => { if (f.id) (self.codeToIdx[f.id] = self.codeToIdx[f.id] || []).push(i + 1); });

    // label point = centroid of the largest polygon
    this.labelPts = features.map(f => {
      let best = f, bestA = -1;
      if (f.geometry && f.geometry.type === 'MultiPolygon') {
        f.geometry.coordinates.forEach(poly => {
          const g = { type: 'Feature', geometry: { type: 'Polygon', coordinates: poly } };
          const a = d3.geoArea(g);
          if (a > bestA) { bestA = a; best = g; }
        });
      }
      const c = d3.geoCentroid(best);
      const b = d3.geoBounds(best);
      let w = b[1][0] - b[0][0]; if (w < 0) w += 360;
      const h = b[1][1] - b[0][1];
      return { lat: c[1], lon: c[0], ext: Math.max(w * Math.cos(c[1] * D2R), h) };
    });

    const big = !U.isNarrow() && (window.devicePixelRatio || 1) <= 2;
    const idm = buildIdMap(features);
    this.ids = idm.ids; this.idW = idm.W; this.idH = idm.H;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x04060a, 1);
    this.renderer = renderer;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.05, 200);
    this.scene = scene; this.camera = camera;

    const group = new THREE.Group();
    group.rotation.order = 'XYZ';
    scene.add(group);
    this.group = group;

    // country info lookup texture (256 x 1)
    this.infoData = new Uint8Array(256 * 4);
    this.infoTex = new THREE.DataTexture(this.infoData, 256, 1, THREE.RGBAFormat);
    this.infoTex.magFilter = THREE.NearestFilter; this.infoTex.minFilter = THREE.NearestFilter; this.infoTex.needsUpdate = true;

    this.globeUniforms = {
      idMap: { value: idm.tex }, lineMap: { value: buildLineMap(topo, big) }, glowMap: { value: buildGlowMap(land) }, infoMap: { value: this.infoTex },
      uHover: { value: -1 }, uSel: { value: -1 }, uTime: { value: 0 }, uSpA: { value: 0.02 }, uSpB: { value: 0.01 }, uMix: { value: 0 },
      uIntro: { value: 0 }, uFilterOn: { value: 0 }, uFade: { value: 1 }, uTexel: { value: new THREE.Vector2(1 / idm.W, 1 / idm.H) }
    };
    const globeMat = new THREE.ShaderMaterial({ vertexShader: globeVert, fragmentShader: globeFrag, uniforms: this.globeUniforms, transparent: true });
    globeMat.extensions = { derivatives: true };
    const globeMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 160, 120), globeMat);
    group.add(globeMesh);

    this.atmoUniforms = { uFade: { value: 1 } };
    const atmo = new THREE.Mesh(new THREE.SphereGeometry(1.16, 96, 64), new THREE.ShaderMaterial({
      vertexShader: atmoVert, fragmentShader: atmoFrag, uniforms: this.atmoUniforms, side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
    }));
    scene.add(atmo);
    this.atmo = atmo;

    // stars
    const starN = U.isNarrow() ? 1400 : 2600;
    const sp = new Float32Array(starN * 3), ss = new Float32Array(starN), sd = new Float32Array(starN), sc = new Float32Array(starN * 3);
    for (let i = 0; i < starN; i++) {
      const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, r = 40 + Math.random() * 40;
      const s = Math.sqrt(1 - u * u);
      sp[i * 3] = r * s * Math.cos(th); sp[i * 3 + 1] = r * u; sp[i * 3 + 2] = r * s * Math.sin(th);
      ss[i] = Math.random() < 0.06 ? 3.2 + Math.random() * 2.5 : 1.2 + Math.random() * 1.6;
      sd[i] = Math.random();
      const warm = Math.random();
      sc[i * 3] = 0.8 + 0.2 * warm; sc[i * 3 + 1] = 0.82 + 0.1 * warm; sc[i * 3 + 2] = 1.0 - 0.25 * warm;
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    sg.setAttribute('aSize', new THREE.BufferAttribute(ss, 1));
    sg.setAttribute('aSeed', new THREE.BufferAttribute(sd, 1));
    sg.setAttribute('aColor', new THREE.BufferAttribute(sc, 3));
    this.starUniforms = { uPR: { value: renderer.getPixelRatio() }, uTime: { value: 0 }, uAlpha: { value: 0 } };
    const stars = new THREE.Points(sg, new THREE.ShaderMaterial({ vertexShader: starVert, fragmentShader: starFrag, uniforms: this.starUniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(stars);
    this.stars = stars;

    // drifting dust close to the planet
    const dustN = 380;
    const dp = new Float32Array(dustN * 3), ds = new Float32Array(dustN), dd = new Float32Array(dustN), dc = new Float32Array(dustN * 3);
    for (let i = 0; i < dustN; i++) {
      const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, r = 1.3 + Math.pow(Math.random(), 1.5) * 1.6;
      const s = Math.sqrt(1 - u * u);
      dp[i * 3] = r * s * Math.cos(th); dp[i * 3 + 1] = r * u * 0.6; dp[i * 3 + 2] = r * s * Math.sin(th);
      ds[i] = 1 + Math.random() * 1.8; dd[i] = Math.random();
      dc[i * 3] = 1.0; dc[i * 3 + 1] = 0.78; dc[i * 3 + 2] = 0.55;
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
    dg.setAttribute('aSize', new THREE.BufferAttribute(ds, 1));
    dg.setAttribute('aSeed', new THREE.BufferAttribute(dd, 1));
    dg.setAttribute('aColor', new THREE.BufferAttribute(dc, 3));
    this.dustUniforms = { uPR: { value: renderer.getPixelRatio() }, uTime: { value: 0 }, uAlpha: { value: 0 } };
    const dust = new THREE.Points(dg, new THREE.ShaderMaterial({ vertexShader: starVert, fragmentShader: starFrag, uniforms: this.dustUniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(dust);
    this.dust = dust;

    // markers
    this.markerUniforms = { uTime: { value: 0 }, uIntroT: { value: -10 }, uPR: { value: renderer.getPixelRatio() }, uSize: { value: 30 }, uHover: { value: -1 }, uSel: { value: -1 }, uFade: { value: 1 } };
    this.markers = [];
    this.markerPoints = null;

    this.arcs = [];

    // camera state
    this.lat = 20; this.lon = 0; this.dist = 9; this.distT = 4;
    this.vLat = 0; this.vLon = 0;
    this.offX = 0; this.offY = 0; this.offXT = 0; this.offYT = 0;
    this.anim = null;
    this.autoRotate = true;
    this.fade = 1; this.fadeT = 1;
    this.introStart = -1;
    this.hoverIdx = -1; this.hoverMarker = -1;
    this.onHover = null; this.onClick = null; this.onFrame = null;
    this.interacting = false;
    this.lastInteract = 0;
    this.time = 0;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.bindInput(canvas);
    this.clock = new THREE.Clock();
    const loop = () => { this.frame(); this.raf = requestAnimationFrame(loop); };
    this.raf = requestAnimationFrame(loop);
  }

  Globe.prototype.resize = function () {
    const w = window.innerWidth, h = window.innerHeight;
    this.W = w; this.H = h;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.applyOffset();
  };

  Globe.prototype.applyOffset = function () {
    const w = this.W, h = this.H;
    this.camera.setViewOffset(w, h, this.offX * w, this.offY * h, w, h);
    this.camera.updateProjectionMatrix();
  };

  /* distance at which the globe fills a comfortable share of the visible area */
  Globe.prototype.homeDist = function (scale) {
    const w = this.W, h = this.H;
    const tanH = Math.tan(FOV / 2 * D2R);
    const narrow = w <= 820;
    const rpx = Math.min(h * (narrow ? 0.25 : 0.40), w * (narrow ? 0.44 : 0.36)) * (scale || 1);
    return 1 / Math.sin(Math.atan(rpx / (h / 2) * tanH));
  };
  /* pixels per radian at the centre of the globe */
  Globe.prototype.pxPerRad = function () {
    const tanH = Math.tan(FOV / 2 * D2R);
    return (this.H / 2) / tanH / Math.max(this.dist - 1, 0.05);
  };

  Globe.prototype.setOffset = function (x, y) { this.offXT = x; this.offYT = y; };
  Globe.prototype.setFade = function (v) { this.fadeT = v; };

  Globe.prototype.startIntro = function (lon) {
    const reduced = U.reduced();
    this.introStart = this.time;
    this.lon = lon - (reduced ? 0 : 120); this.lat = 18;
    this.dist = reduced ? this.homeDist() : this.homeDist() * 2.6;
    this.distT = this.homeDist();
    this.anim = { t0: this.time, dur: reduced ? 0.01 : 3.4, lat0: this.lat, lat1: 22, lon0: this.lon, lon1: lon, d0: this.dist, d1: this.distT, hop: 0, ease: U.easeOut };
  };

  /* fly the planet so (lat, lon) faces the camera */
  Globe.prototype.flyTo = function (lat, lon, dist, opt) {
    opt = opt || {};
    const reduced = U.reduced();
    const dLon = U.wrapLon(lon - this.lon);
    const ang = U.distKm({ lat: this.lat, lon: this.lon }, { lat, lon }) / 6371;
    const dur = reduced ? 0.01 : (opt.duration || U.clamp(1.0 + ang * 0.55, 1.1, 2.4));
    const d1 = dist || this.distT;
    const hop = opt.hop != null ? opt.hop : U.clamp(ang * 0.7, 0, 1.6) * (d1 < 2.4 ? 1 : 0.5);
    this.vLat = this.vLon = 0;
    this.distT = d1;
    return new Promise(res => {
      this.anim = { t0: this.time, dur, lat0: this.lat, lat1: U.clamp(lat, -70, 75), lon0: this.lon, lon1: this.lon + dLon, d0: this.dist, d1, hop, ease: U.easeInOut, done: res };
    });
  };

  Globe.prototype.countryAt = function (lat, lon) {
    const x = Math.floor((lon + 180) / 360 * this.idW) % this.idW;
    const y = U.clamp(Math.floor((90 - lat) / 180 * this.idH), 0, this.idH - 1);
    return this.ids[y * this.idW + x];
  };
  Globe.prototype.featureOf = function (idx) { return this.features[idx - 1]; };

  Globe.prototype.setInfo = function (fn) {
    const d = this.infoData;
    for (let i = 1; i <= this.features.length && i < 256; i++) {
      const v = fn(i, this.features[i - 1]) || [0, 0, 0, 0];
      d[i * 4] = v[0]; d[i * 4 + 1] = v[1]; d[i * 4 + 2] = v[2]; d[i * 4 + 3] = v[3];
    }
    this.infoTex.needsUpdate = true;
  };
  Globe.prototype.setFilterOn = function (on) { this.globeUniforms.uFilterOn.value = on ? 1 : 0; };
  Globe.prototype.setSelected = function (idx) { this.globeUniforms.uSel.value = idx > 0 ? idx : -1; };
  Globe.prototype.setSelectedMarker = function (i) { this.markerUniforms.uSel.value = i >= 0 ? i : -1; };

  Globe.prototype.setMarkers = function (items) {
    this.markers = items;
    const n = items.length;
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), birth = new Float32Array(n), kind = new Float32Array(n), act = new Float32Array(n), idx = new Float32Array(n), seed = new Float32Array(n);
    const c = new THREE.Color();
    items.forEach((m, i) => {
      const v = vecFrom(m.lat, m.lon, 1.006);
      m.vec = v;
      pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z;
      c.set(m.color); col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      birth[i] = 1.2 + ((m.lon + 180) / 360) * 1.9 + Math.random() * 0.25;
      kind[i] = m.kind === 'person' ? 1 : 0; act[i] = 1; idx[i] = i; seed[i] = Math.random();
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    g.setAttribute('aBirth', new THREE.BufferAttribute(birth, 1));
    g.setAttribute('aKind', new THREE.BufferAttribute(kind, 1));
    g.setAttribute('aActive', new THREE.BufferAttribute(act, 1));
    g.setAttribute('aIdx', new THREE.BufferAttribute(idx, 1));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    if (this.markerPoints) { this.group.remove(this.markerPoints); this.markerPoints.geometry.dispose(); }
    this.markerPoints = new THREE.Points(g, new THREE.ShaderMaterial({
      vertexShader: markerVert, fragmentShader: markerFrag, uniforms: this.markerUniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    }));
    this.markerPoints.renderOrder = 3;
    this.group.add(this.markerPoints);
  };
  Globe.prototype.setMarkerActive = function (fn) {
    if (!this.markerPoints) return;
    const a = this.markerPoints.geometry.getAttribute('aActive');
    this.markers.forEach((m, i) => { a.array[i] = fn(m) ? 1 : 0; m.active = !!a.array[i]; });
    a.needsUpdate = true;
  };

  /* ---------- arcs ---------- */
  Globe.prototype.addArc = function (a, b, opt) {
    opt = opt || {};
    const va = vecFrom(a.lat, a.lon, 1).normalize(), vb = vecFrom(b.lat, b.lon, 1).normalize();
    const ang = va.angleTo(vb);
    const N = Math.max(40, Math.round(ang * 90));
    const pts = new Float32Array((N + 1) * 3), ts = new Float32Array(N + 1);
    const lift = 0.03 + 0.42 * (ang / Math.PI);
    const q = new THREE.Quaternion(), axis = new THREE.Vector3().crossVectors(va, vb);
    if (axis.lengthSq() < 1e-8) axis.set(0, 1, 0);
    axis.normalize();
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      q.setFromAxisAngle(axis, ang * t);
      const p = va.clone().applyQuaternion(q).multiplyScalar(1.004 + Math.sin(Math.PI * t) * lift);
      pts[i * 3] = p.x; pts[i * 3 + 1] = p.y; pts[i * 3 + 2] = p.z; ts[i] = t;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    g.setAttribute('aT', new THREE.BufferAttribute(ts, 1));
    const u = { uPR: { value: this.renderer.getPixelRatio() }, uSize: { value: opt.size || 4.2 }, uColor: { value: new THREE.Color(opt.color || '#ffb25e') }, uProg: { value: opt.instant ? 1 : 0 }, uAlpha: { value: opt.alpha != null ? opt.alpha : 0.9 }, uTime: { value: 0 }, uFlow: { value: opt.flow ? 1 : 0 }, uFade: { value: 1 } };
    const line = new THREE.Points(g, new THREE.ShaderMaterial({ vertexShader: arcVert, fragmentShader: arcFrag, uniforms: u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    line.renderOrder = 2;
    this.group.add(line);
    const arc = { line, u, tag: opt.tag || '', t0: this.time, dur: opt.duration || 1.4, alphaT: u.uAlpha.value, dying: false };
    this.arcs.push(arc);
    return arc;
  };
  Globe.prototype.clearArcs = function (tag) {
    this.arcs.forEach(a => { if (tag == null || a.tag === tag) a.dying = true; });
  };

  /* screen projection */
  const tmpV = new THREE.Vector3();
  Globe.prototype.project = function (lat, lon, r) {
    tmpV.copy(vecFrom(lat, lon, r || 1.006));
    this.group.localToWorld(tmpV);
    const facing = tmpV.clone().normalize().dot(this.camera.position.clone().sub(tmpV).normalize());
    tmpV.project(this.camera);
    return { x: (tmpV.x + 1) / 2 * this.W, y: (1 - tmpV.y) / 2 * this.H, facing, visible: facing > 0.08 && tmpV.z < 1 };
  };

  /* ---------- input ---------- */
  Globe.prototype.bindInput = function (el) {
    const self = this;
    const pointers = new Map();
    let down = null, pinch0 = 0, dist0 = 0, lastMove = 0;
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

    function pick(cx, cy) {
      ndc.set(cx / self.W * 2 - 1, -(cy / self.H) * 2 + 1);
      ray.setFromCamera(ndc, self.camera);
      // markers first: nearest on screen within a radius
      let best = -1, bestD = U.isNarrow() ? 22 : 15;
      self.markers.forEach((m, i) => {
        if (m.active === false) return;
        const p = self.project(m.lat, m.lon);
        if (!p.visible) return;
        const d = Math.hypot(p.x - cx, p.y - cy);
        if (d < bestD) { bestD = d; best = i; }
      });
      if (best >= 0) return { type: 'marker', marker: self.markers[best], index: best };
      // sphere intersection
      const o = ray.ray.origin, dvec = ray.ray.direction;
      const b = o.dot(dvec), c = o.dot(o) - 1, disc = b * b - c;
      if (disc < 0) return null;
      const t = -b - Math.sqrt(disc);
      const hit = o.clone().add(dvec.clone().multiplyScalar(t));
      self.group.worldToLocal(hit);
      hit.normalize();
      const lat = Math.asin(U.clamp(hit.y, -1, 1)) / D2R, lon = Math.atan2(hit.x, hit.z) / D2R;
      const idx = self.countryAt(lat, lon);
      return { type: idx ? 'country' : 'ocean', idx, lat, lon };
    }
    this.pick = pick;

    el.addEventListener('pointerdown', e => {
      el.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) {
        down = { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0 };
        self.vLat = self.vLon = 0;
        self.anim = null;
      } else if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch0 = Math.hypot(a.x - b.x, a.y - b.y); dist0 = self.distT;
        if (down) down.moved = 99;
      }
      self.interacting = true; self.lastInteract = self.time;
    });
    el.addEventListener('pointermove', e => {
      if (!pointers.has(e.pointerId)) {
        if (e.pointerType === 'mouse') {
          const now = performance.now();
          if (now - lastMove < 30) return; lastMove = now;
          const p = pick(e.clientX, e.clientY);
          self.setHover(p, e.clientX, e.clientY);
        }
        return;
      }
      const prev = pointers.get(e.pointerId);
      const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinch0 > 0) self.distT = U.clamp(1 + (dist0 - 1) * pinch0 / d, 1.18, self.homeDist() * 1.5);
        return;
      }
      if (!down) return;
      down.moved += Math.abs(dx) + Math.abs(dy);
      if (down.moved > 4) el.classList.add('is-dragging');
      const k = 1 / self.pxPerRad() / D2R;
      self.lon -= dx * k; self.lat = U.clamp(self.lat + dy * k, -75, 80);
      self.vLon = -dx * k * 60; self.vLat = dy * k * 60;
      self.lastInteract = self.time;
    });
    const end = e => {
      if (!pointers.has(e.pointerId)) return;
      pointers.delete(e.pointerId);
      el.classList.remove('is-dragging');
      if (pointers.size === 0) {
        self.interacting = false;
        if (down && down.moved < 7 && performance.now() - down.t < 600) {
          self.vLat = self.vLon = 0;
          const p = pick(e.clientX, e.clientY);
          if (self.onClick) self.onClick(p, e);
        }
        down = null; pinch0 = 0;
      }
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && !pointers.size) self.setHover(null); });
    el.addEventListener('wheel', e => {
      e.preventDefault();
      self.anim = null;
      self.distT = U.clamp(1 + (self.distT - 1) * Math.exp(e.deltaY * 0.0012), 1.18, self.homeDist() * 1.5);
      self.lastInteract = self.time;
    }, { passive: false });
  };

  Globe.prototype.setHover = function (p, x, y) {
    const idx = p && p.type === 'country' ? p.idx : -1;
    const mi = p && p.type === 'marker' ? p.index : -1;
    this.globeUniforms.uHover.value = idx;
    this.markerUniforms.uHover.value = mi;
    this.renderer.domElement.classList.toggle('is-pointing', !!(p && (p.type === 'marker' || p.type === 'country')));
    if (this.onHover) this.onHover(p, x, y);
  };

  /* ---------- frame ---------- */
  Globe.prototype.frame = function () {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.time += dt;
    const t = this.time;

    if (this.anim) {
      const a = this.anim;
      const k = U.clamp((t - a.t0) / a.dur, 0, 1);
      const e = a.ease(k);
      this.lat = U.lerp(a.lat0, a.lat1, e);
      this.lon = U.lerp(a.lon0, a.lon1, e);
      this.dist = U.lerp(a.d0, a.d1, e) + a.hop * Math.sin(Math.PI * e);
      if (k >= 1) { this.anim = null; this.dist = a.d1; if (a.done) a.done(); }
    } else {
      if (!this.interacting) {
        this.lon += this.vLon * dt; this.lat = U.clamp(this.lat + this.vLat * dt, -75, 80);
        const damp = Math.pow(0.04, dt);
        this.vLon *= damp; this.vLat *= damp;
        if (this.autoRotate && t - this.lastInteract > 2.5 && !U.reduced()) this.lon += dt * 2.6;
      }
      this.dist += (this.distT - this.dist) * (1 - Math.pow(0.002, dt));
    }

    // view offset easing
    const ok = 1 - Math.pow(0.02, dt);
    const nx = this.offX + (this.offXT - this.offX) * ok, ny = this.offY + (this.offYT - this.offY) * ok;
    if (Math.abs(nx - this.offX) > 1e-5 || Math.abs(ny - this.offY) > 1e-5) { this.offX = nx; this.offY = ny; this.applyOffset(); }
    this.fade += (this.fadeT - this.fade) * (1 - Math.pow(0.01, dt));

    this.group.rotation.x = this.lat * D2R;
    this.group.rotation.y = -this.lon * D2R;
    this.camera.position.set(0, 0, this.dist);
    this.camera.lookAt(0, 0, 0);

    // dot-matrix level of detail: aim for ~6px between dots
    const ppr = this.pxPerRad();
    const want = ((this.renderer.getPixelRatio() >= 1.5) ? 5.0 : 6.2) / ppr;
    const base = 1.1 * D2R;
    const L = Math.max(0, Math.log2(base / want));
    const lo = Math.floor(L);
    const f = L - lo;
    const gu = this.globeUniforms;
    gu.uSpA.value = base / Math.pow(2, lo);
    gu.uSpB.value = base / Math.pow(2, lo + 1);
    gu.uMix.value = U.clamp((f - 0.55) / 0.4, 0, 1);
    gu.uTime.value = t;
    const introT = this.introStart < 0 ? -10 : t - this.introStart;
    gu.uIntro.value = this.introStart < 0 ? 0 : U.clamp((introT - 0.2) / 2.4, 0, 1);
    gu.uFade.value = this.fade;
    this.atmoUniforms.uFade.value = this.fade * U.clamp(introT / 1.5, 0, 1);
    this.atmo.visible = this.fade > 0.01;
    this.group.visible = this.fade > 0.01;
    this.starUniforms.uTime.value = t; this.starUniforms.uAlpha.value = U.clamp(introT / 2, 0, 1);
    this.dustUniforms.uTime.value = t; this.dustUniforms.uAlpha.value = U.clamp(introT / 3, 0, 0.5) * this.fade;
    this.stars.rotation.y = -this.lon * D2R * 0.06; this.stars.rotation.x = this.lat * D2R * 0.04;
    this.dust.rotation.y = t * 0.02 - this.lon * D2R * 0.2;
    const mu = this.markerUniforms;
    mu.uTime.value = t; mu.uIntroT.value = introT; mu.uFade.value = this.fade;
    mu.uSize.value = U.clamp(34 + (4.2 - this.dist) * 6, 28, 52);

    for (let i = this.arcs.length - 1; i >= 0; i--) {
      const a = this.arcs[i];
      a.u.uTime.value = t; a.u.uFade.value = this.fade;
      if (a.u.uProg.value < 1) a.u.uProg.value = U.clamp((t - a.t0) / a.dur, 0, 1);
      if (a.dying) {
        a.u.uAlpha.value -= dt * 2.2;
        if (a.u.uAlpha.value <= 0) { this.group.remove(a.line); a.line.geometry.dispose(); a.line.material.dispose(); this.arcs.splice(i, 1); }
      }
    }

    if (this.onFrame) this.onFrame(t);
    this.renderer.render(this.scene, this.camera);
  };

  window.AtlasGlobe = Globe;
  window.AtlasGlobe.vecFrom = vecFrom;
})();
