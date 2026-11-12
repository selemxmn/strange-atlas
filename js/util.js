/* Shared helpers for The Strange Atlas */
(function () {
  const U = {};
  const R = Math.PI / 180;

  U.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  U.lerp = (a, b, t) => a + (b - a) * t;
  U.easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  U.easeOut = t => 1 - Math.pow(1 - t, 3);
  U.wrapLon = l => ((l + 540) % 360) - 180;

  /* great-circle distance in km */
  U.distKm = (a, b) => {
    const dLat = (b.lat - a.lat) * R, dLon = (b.lon - a.lon) * R;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * R) * Math.cos(b.lat * R) * Math.sin(dLon / 2) ** 2;
    return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(h)));
  };
  U.bearing = (a, b) => {
    const y = Math.sin((b.lon - a.lon) * R) * Math.cos(b.lat * R);
    const x = Math.cos(a.lat * R) * Math.sin(b.lat * R) - Math.sin(a.lat * R) * Math.cos(b.lat * R) * Math.cos((b.lon - a.lon) * R);
    return (Math.atan2(y, x) / R + 360) % 360;
  };
  U.compass = deg => ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'][Math.round(deg / 45) % 8];
  U.fmtKm = km => km < 10 ? 'right here' : Math.round(km).toLocaleString('en-US') + ' km';
  U.fmtCoord = (lat, lon) => Math.abs(lat).toFixed(2) + '°' + (lat >= 0 ? 'N' : 'S') + ' · ' + Math.abs(lon).toFixed(2) + '°' + (lon >= 0 ? 'E' : 'W');
  U.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  U.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  U.pick = a => a[Math.floor(Math.random() * a.length)];
  U.reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  U.isNarrow = () => window.innerWidth <= 820;

  /* Safe localStorage */
  U.store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  /* Approximate the visitor's location from their time zone, without asking for permission. */
  const TZ = {
    'Europe/London': [51.5, -0.1], 'Europe/Dublin': [53.35, -6.26], 'Europe/Lisbon': [38.72, -9.14], 'Europe/Madrid': [40.42, -3.7], 'Europe/Paris': [48.86, 2.35],
    'Europe/Brussels': [50.85, 4.35], 'Europe/Amsterdam': [52.37, 4.9], 'Europe/Berlin': [52.52, 13.4], 'Europe/Zurich': [47.37, 8.54], 'Europe/Rome': [41.9, 12.5],
    'Europe/Vienna': [48.21, 16.37], 'Europe/Prague': [50.08, 14.43], 'Europe/Warsaw': [52.23, 21.01], 'Europe/Stockholm': [59.33, 18.07], 'Europe/Oslo': [59.91, 10.75],
    'Europe/Copenhagen': [55.68, 12.57], 'Europe/Helsinki': [60.17, 24.94], 'Europe/Athens': [37.98, 23.73], 'Europe/Istanbul': [41.01, 28.98], 'Europe/Kiev': [50.45, 30.52],
    'Europe/Kyiv': [50.45, 30.52], 'Europe/Moscow': [55.75, 37.62], 'Europe/Bucharest': [44.43, 26.1], 'Europe/Budapest': [47.5, 19.04], 'Europe/Belgrade': [44.79, 20.45],
    'America/New_York': [40.71, -74.0], 'America/Toronto': [43.65, -79.38], 'America/Chicago': [41.88, -87.63], 'America/Denver': [39.74, -104.99], 'America/Phoenix': [33.45, -112.07],
    'America/Los_Angeles': [34.05, -118.24], 'America/Vancouver': [49.28, -123.12], 'America/Anchorage': [61.22, -149.9], 'America/Mexico_City': [19.43, -99.13], 'America/Bogota': [4.71, -74.07],
    'America/Lima': [-12.05, -77.04], 'America/Santiago': [-33.45, -70.67], 'America/Sao_Paulo': [-23.55, -46.63], 'America/Argentina/Buenos_Aires': [-34.6, -58.38], 'America/Caracas': [10.48, -66.9],
    'America/Halifax': [44.65, -63.57], 'Pacific/Honolulu': [21.31, -157.86], 'Africa/Cairo': [30.04, 31.24], 'Africa/Lagos': [6.52, 3.38], 'Africa/Nairobi': [-1.29, 36.82],
    'Africa/Johannesburg': [-26.2, 28.05], 'Africa/Casablanca': [33.57, -7.59], 'Africa/Accra': [5.6, -0.19], 'Africa/Addis_Ababa': [9.03, 38.74], 'Asia/Dubai': [25.2, 55.27],
    'Asia/Riyadh': [24.71, 46.68], 'Asia/Tehran': [35.69, 51.39], 'Asia/Karachi': [24.86, 67.0], 'Asia/Kolkata': [22.57, 88.36], 'Asia/Calcutta': [22.57, 88.36], 'Asia/Dhaka': [23.81, 90.41],
    'Asia/Bangkok': [13.75, 100.5], 'Asia/Jakarta': [-6.2, 106.85], 'Asia/Singapore': [1.35, 103.82], 'Asia/Kuala_Lumpur': [3.14, 101.69], 'Asia/Manila': [14.6, 120.98],
    'Asia/Shanghai': [31.23, 121.47], 'Asia/Hong_Kong': [22.32, 114.17], 'Asia/Taipei': [25.03, 121.57], 'Asia/Seoul': [37.57, 126.98], 'Asia/Tokyo': [35.68, 139.69],
    'Asia/Jerusalem': [31.77, 35.21], 'Asia/Beirut': [33.89, 35.5], 'Asia/Baghdad': [33.31, 44.36], 'Asia/Almaty': [43.24, 76.89], 'Asia/Tashkent': [41.3, 69.24],
    'Australia/Sydney': [-33.87, 151.21], 'Australia/Melbourne': [-37.81, 144.96], 'Australia/Brisbane': [-27.47, 153.03], 'Australia/Perth': [-31.95, 115.86], 'Australia/Adelaide': [-34.93, 138.6],
    'Pacific/Auckland': [-36.85, 174.76], 'Atlantic/Reykjavik': [64.13, -21.9]
  };
  U.userLocation = () => {
    let tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* ignore */ }
    if (TZ[tz]) return { lat: TZ[tz][0], lon: TZ[tz][1], guess: true, tz };
    const region = tz.split('/')[0];
    const fallback = { Europe: [50, 10], America: [39, -95], Asia: [30, 100], Africa: [5, 20], Australia: [-25, 135], Pacific: [-15, 175], Atlantic: [40, -30] }[region];
    return fallback ? { lat: fallback[0], lon: fallback[1], guess: true, tz } : null;
  };

  /* log-time scale: years ago → 0..1 */
  U.timeX = (year, nowYear) => {
    const ago = Math.max(1, nowYear - year);
    return Math.min(1, (Math.log10(ago + 9) - 1) / (Math.log10(100000) - 1));
  };

  window.AtlasUtil = U;
})();
