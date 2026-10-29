const SYNODIC_MONTH = 29.530588861;
const NEW_MOON_EPOCH = 2451550.09766;
const DEG = Math.PI / 180;
const PLANETS = [
  { name: "Mercury", key: "mercury", cycle: "communication, learning, and everyday plans", elements: [.38709927, .00000037, .20563593, .00001906, 7.00497902, -.00594749, 252.25032350, 149472.67411175, 77.45779628, .16047689, 48.33076593, -.12534081] },
  { name: "Venus", key: "venus", cycle: "relationships, values, and resources", elements: [.72333566, .00000390, .00677672, -.00004107, 3.39467605, -.00078890, 181.97909950, 58517.81538729, 131.60246718, .00268329, 76.67984255, -.27769418] },
  { name: "Mars", key: "mars", cycle: "motivation, effort, and how energy is directed", elements: [1.52371034, .00001847, .09339410, .00007882, 1.84969142, -.00813131, -4.55343205, 19140.30268499, -23.94362959, .44441088, 49.55953891, -.29257343] },
  { name: "Jupiter", key: "jupiter", cycle: "growth, beliefs, and long-range plans", elements: [5.20288700, -.00011607, .04838624, -.00013253, 1.30439695, -.00183714, 34.39644051, 3034.74612775, 14.72847983, .21252668, 100.47390909, .20469106] },
  { name: "Saturn", key: "saturn", cycle: "responsibility, boundaries, and commitments", elements: [9.53667594, -.00125060, .05386179, -.00050991, 2.48599187, .00193609, 49.95424423, 1222.49362201, 92.59887831, -.41897216, 113.66242448, -.28867794] },
  { name: "Uranus", key: "uranus", cycle: "change, independence, and fresh perspectives", elements: [19.18916464, -.00196176, .04725744, -.00004397, .77263783, -.00242939, 313.23810451, 428.48202785, 170.95427630, .40805281, 74.01692503, .04240589] },
  { name: "Neptune", key: "neptune", cycle: "imagination, ideals, and uncertainty", elements: [30.06992276, .00026291, .00859048, .00005105, 1.77004347, .00035372, -55.12002969, 218.45945325, 44.96476227, -.32241464, 131.78422574, -.00508664] },
];

const ZODIAC = [
  { name: "Aries", dates: "Mar 21 – Apr 19", element: "Fire" },
  { name: "Taurus", dates: "Apr 20 – May 20", element: "Earth" },
  { name: "Gemini", dates: "May 21 – Jun 20", element: "Air" },
  { name: "Cancer", dates: "Jun 21 – Jul 22", element: "Water" },
  { name: "Leo", dates: "Jul 23 – Aug 22", element: "Fire" },
  { name: "Virgo", dates: "Aug 23 – Sep 22", element: "Earth" },
  { name: "Libra", dates: "Sep 23 – Oct 22", element: "Air" },
  { name: "Scorpio", dates: "Oct 23 – Nov 21", element: "Water" },
  { name: "Sagittarius", dates: "Nov 22 – Dec 21", element: "Fire" },
  { name: "Capricorn", dates: "Dec 22 – Jan 19", element: "Earth" },
  { name: "Aquarius", dates: "Jan 20 – Feb 18", element: "Air" },
  { name: "Pisces", dates: "Feb 19 – Mar 20", element: "Water" },
];

const WHOLE_SIGN_HOUSES = [
  { focus: "identity and confidence" },
  { focus: "money and self-worth" },
  { focus: "communication and local travel" },
  { focus: "home and family" },
  { focus: "romance and creativity" },
  { focus: "work habits and wellbeing" },
  { focus: "relationships and agreements" },
  { focus: "shared money, trust, and intimacy" },
  { focus: "beliefs, study, and travel" },
  { focus: "career and reputation" },
  { focus: "friendships and future goals" },
  { focus: "rest and private patterns" },
];

const HOUSE_BRIEF_ADVICE = [
  "Protect your boundaries before making a personal decision.",
  "Pause before spending; don't tie self-worth to money.",
  "Double-check messages and short-trip details.",
  "Talk through family or living plans calmly.",
  "Give romantic and creative plans room to evolve.",
  "Check work messages and leave space to recharge.",
  "Be direct about relationship expectations.",
  "Clarify shared costs and trust before reacting.",
  "Verify travel, study, or legal details before committing.",
  "Clarify responsibilities before making career moves.",
  "Check whether group plans still fit your future goals.",
  "Make room for rest; don't let old worries decide for you.",
];

const PLANET_LANDSCAPE = {
  Mercury: (house) => `A message, plan, or old conversation about ${house.focus} may resurface; clarify the details before acting.`,
  Venus: (house) => `Your priorities around ${house.focus} may shift; notice what feels rewarding and reciprocal.`,
  Mars: (house) => `Impatience around ${house.focus} may show where your effort needs redirecting.`,
  Jupiter: (house) => `A big hope involving ${house.focus} may need a more realistic scale.`,
  Saturn: (house) => `A duty involving ${house.focus} could feel heavier; decide what is yours to carry.`,
  Uranus: (house) => `An unexpected shift may change your usual approach to ${house.focus}; flexibility helps.`,
  Neptune: (house) => `Expectations around ${house.focus} may be hard to read; separate facts from hopes.`,
};

const PLANET_WATCH_OUTS = {
  Mercury: { advice: (house) => `A message about ${house.focus} could be misread; ask rather than assume.` },
  Venus: { advice: (house) => `Don't mistake nostalgia for reciprocity in ${house.focus}; agree on what's fair.` },
  Mars: { advice: (house) => `Pressure around ${house.focus} can spark impatience; pause before reacting.` },
  Jupiter: { advice: (house) => `Don't promise more than you can deliver around ${house.focus}; check your resources first.` },
  Saturn: { advice: (house) => `Slowdowns around ${house.focus} may need patience; avoid rushing a lasting choice.` },
  Uranus: { advice: (house) => `A surprise involving ${house.focus} may tempt a snap response; leave room to adapt.` },
  Neptune: { advice: (house) => `Vague hopes around ${house.focus} can cloud facts; get clear terms.` },
};

const MOON_GUIDANCE = {
  "New Moon": "A traditional moment for setting intentions and giving a new idea room to take shape.",
  "Waxing Crescent": "A growing-light phase: choose one small, practical step toward what you want to build.",
  "First Quarter": "A midpoint for reassessing plans and deciding how to meet an obstacle constructively.",
  "Waxing Gibbous": "A refining phase: notice what is working and make thoughtful adjustments before a culmination.",
  "Full Moon": "A traditional moment for noticing what has come into view, and making room for perspective.",
  "Waning Gibbous": "A reflective phase for integrating what you have learned and sharing what is useful.",
  "Last Quarter": "A point to review what is complete and consider what you are ready to simplify.",
  "Waning Crescent": "A quieter phase that invites rest, reflection, and a little space before the next cycle.",
};

const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const PHASES = [
  { fraction: 0, name: "New Moon" },
  { fraction: .25, name: "First Quarter" },
  { fraction: .5, name: "Full Moon" },
  { fraction: .75, name: "Last Quarter" },
];

function radians(degrees) {
  return degrees * DEG;
}

function normalizeDegrees(degrees) {
  return ((degrees % 360) + 360) % 360;
}

function signedDegrees(degrees) {
  return ((degrees + 540) % 360) - 180;
}

function julianDate(date) {
  return date.getTime() / 86400000 + 2440587.5;
}

function solveKepler(meanAnomaly, eccentricity) {
  const mean = radians(signedDegrees(meanAnomaly));
  let eccentricAnomaly = mean;
  for (let iteration = 0; iteration < 8; iteration += 1) {
    const correction = (eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - mean)
      / (1 - eccentricity * Math.cos(eccentricAnomaly));
    eccentricAnomaly -= correction;
    if (Math.abs(correction) < 1e-10) break;
  }
  return eccentricAnomaly;
}

function heliocentricPosition(elements, centuries) {
  const [a0, aRate, e0, eRate, i0, iRate, l0, lRate, p0, pRate, n0, nRate] = elements;
  const semimajorAxis = a0 + aRate * centuries;
  const eccentricity = e0 + eRate * centuries;
  const inclination = radians(i0 + iRate * centuries);
  const node = radians(n0 + nRate * centuries);
  const argument = radians((p0 + pRate * centuries) - (n0 + nRate * centuries));
  const meanLongitude = l0 + lRate * centuries;
  const perihelion = p0 + pRate * centuries;
  const eccentricAnomaly = solveKepler(meanLongitude - perihelion, eccentricity);
  const orbitalX = semimajorAxis * (Math.cos(eccentricAnomaly) - eccentricity);
  const orbitalY = semimajorAxis * Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(eccentricAnomaly);
  return {
    x: (Math.cos(node) * Math.cos(argument) - Math.sin(node) * Math.sin(argument) * Math.cos(inclination)) * orbitalX
      + (-Math.cos(node) * Math.sin(argument) - Math.sin(node) * Math.cos(argument) * Math.cos(inclination)) * orbitalY,
    y: (Math.sin(node) * Math.cos(argument) + Math.cos(node) * Math.sin(argument) * Math.cos(inclination)) * orbitalX
      + (-Math.sin(node) * Math.sin(argument) + Math.cos(node) * Math.cos(argument) * Math.cos(inclination)) * orbitalY,
    z: Math.sin(argument) * Math.sin(inclination) * orbitalX
      + Math.cos(argument) * Math.sin(inclination) * orbitalY,
  };
}

function geocentricLongitude(planet, date) {
  const centuries = (julianDate(date) - 2451545) / 36525;
  const planetPosition = heliocentricPosition(planet.elements, centuries);
  const earthPosition = heliocentricPosition(EARTH_ELEMENTS, centuries);
  return normalizeDegrees(Math.atan2(planetPosition.y - earthPosition.y, planetPosition.x - earthPosition.x) / DEG);
}

const EARTH_ELEMENTS = [1.00000261, .00000562, .01671123, -.00004392, -.00001531, -.01294668, 100.46457166, 35999.37244981, 102.93768193, .32327364, 0, 0];

function apparentMotion(planet, milliseconds) {
  const before = geocentricLongitude(planet, new Date(milliseconds - 1800000));
  const after = geocentricLongitude(planet, new Date(milliseconds + 1800000));
  return signedDegrees(after - before);
}

function findStation(planet, start, end, retrogradeAtStart) {
  let left = start;
  let right = end;
  for (let iteration = 0; iteration < 30; iteration += 1) {
    const middle = (left + right) / 2;
    const isRetrograde = apparentMotion(planet, middle) < 0;
    if (isRetrograde === retrogradeAtStart) left = middle;
    else right = middle;
  }
  return (left + right) / 2;
}

function retrogradeWindows(planet, now) {
  const step = 86400000;
  const start = now.getTime() - 1300 * step;
  const end = now.getTime() + 1700 * step;
  let previousTime = start;
  let previousRetrograde = apparentMotion(planet, previousTime) < 0;
  let windowStart = previousRetrograde ? start : null;
  const windows = [];

  for (let time = start + step; time <= end; time += step) {
    const currentRetrograde = apparentMotion(planet, time) < 0;
    if (currentRetrograde !== previousRetrograde) {
      const station = findStation(planet, previousTime, time, previousRetrograde);
      if (currentRetrograde) {
        windowStart = station;
      } else if (windowStart !== null) {
        windows.push({ start: windowStart, end: station });
        windowStart = null;
      }
    }
    previousTime = time;
    previousRetrograde = currentRetrograde;
  }
  if (windowStart !== null) windows.push({ start: windowStart, end });
  return windows;
}

function phaseCorrection(k, fraction) {
  const t = k / 1236.85;
  const t2 = t * t;
  const t3 = t2 * t;
  const t4 = t3 * t;
  const e = 1 - .002516 * t - .0000074 * t2;
  const m = 2.5534 + 29.1053567 * k - .0000014 * t2 - .00000011 * t3;
  const moonM = 201.5643 + 385.81693528 * k + .0107582 * t2 + .00001238 * t3 - .000000058 * t4;
  const f = 160.7108 + 390.67050284 * k - .0016118 * t2 - .00000227 * t3 + .000000011 * t4;
  const omega = 124.7746 - 1.56375588 * k + .0020672 * t2 + .00000215 * t3;
  const sin = (angle) => Math.sin(radians(angle));
  let correction;

  if (fraction === 0 || fraction === .5) {
    const isFull = fraction === .5;
    correction = (isFull ? -.40614 : -.40720) * sin(moonM)
      + (isFull ? .17302 : .17241) * e * sin(m)
      + (isFull ? .01614 : .01608) * sin(2 * moonM)
      + (isFull ? .01043 : .01039) * sin(2 * f)
      + (isFull ? .00734 : .00739) * e * sin(moonM - m)
      - .00514 * e * sin(moonM + m)
      + .00209 * e * e * sin(2 * m)
      - .00111 * sin(moonM - 2 * f)
      - .00057 * sin(moonM + 2 * f)
      + .00056 * e * sin(2 * moonM + m)
      - .00042 * sin(3 * moonM)
      + .00042 * e * sin(m + 2 * f)
      + .00038 * e * sin(m - 2 * f)
      - .00024 * e * sin(2 * moonM - m)
      - .00017 * sin(omega);
  } else {
    correction = -.62801 * sin(moonM)
      + .17172 * e * sin(m)
      - .01183 * e * sin(moonM + m)
      + .00862 * sin(2 * moonM)
      + .00804 * sin(2 * f)
      + .00454 * e * sin(moonM - m)
      + .00204 * e * e * sin(2 * m)
      - .00180 * sin(moonM - 2 * f)
      - .00070 * sin(moonM + 2 * f)
      - .00040 * sin(3 * moonM)
      - .00034 * e * sin(2 * moonM - m)
      + .00032 * e * sin(m + 2 * f)
      + .00032 * e * sin(m - 2 * f)
      - .00028 * e * e * sin(moonM + 2 * m)
      + .00027 * e * sin(2 * moonM + m)
      - .00017 * sin(omega);
    const w = .00306 - .00038 * e * Math.cos(radians(m))
      + .00026 * Math.cos(radians(moonM)) - .00002 * Math.cos(radians(moonM - m))
      + .00002 * Math.cos(radians(moonM + m)) + .00002 * Math.cos(radians(2 * f));
    correction += fraction === .25 ? w : -w;
  }
  return correction;
}

function phaseJulianDate(k, fraction) {
  const phaseK = k + fraction;
  const t = phaseK / 1236.85;
  const jde = NEW_MOON_EPOCH + SYNODIC_MONTH * phaseK + .00015437 * t * t
    - .000000150 * t * t * t + .00000000073 * t * t * t * t;
  return jde + phaseCorrection(phaseK, fraction);
}

function dateFromJulian(jd) {
  return new Date((jd - 2440587.5) * 86400000);
}

function lunarEvents(now) {
  const currentJd = julianDate(now);
  const lunation = Math.floor((currentJd - NEW_MOON_EPOCH) / SYNODIC_MONTH);
  const events = [];
  for (let k = lunation - 1; k <= lunation + 2; k += 1) {
    for (const phase of PHASES) {
      events.push({
        name: phase.name,
        date: dateFromJulian(phaseJulianDate(k, phase.fraction)),
        fraction: phase.fraction,
      });
    }
  }
  events.sort((left, right) => left.date - right.date);
  const previousNewMoon = [...events].reverse().find((event) => event.fraction === 0 && event.date <= now);
  const nextEvent = events.find((event) => event.date > now);
  const upcomingEvents = events.filter((event) => event.date > now).slice(0, 4);
  const nextNewMoon = events.find((event) => event.fraction === 0 && event.date > now);
  const progress = (now - previousNewMoon.date) / (nextNewMoon.date - previousNewMoon.date);
  const angle = progress * 2 * Math.PI;
  const illumination = (1 - Math.cos(angle)) / 2;
  const phaseIndex = Math.floor((progress * 8 + .5) % 8);
  const names = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
  return { name: names[phaseIndex], illumination, waxing: progress < .5, nextEvent, upcomingEvents, progress };
}

function formatDate(date, options = { month: "short", day: "numeric", year: "numeric" }) {
  return new Intl.DateTimeFormat(undefined, options).format(date);
}

function formatTime(date) {
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(date);
}

function formatDuration(milliseconds) {
  const days = Math.max(1, Math.round(milliseconds / 86400000));
  if (days < 21) return `${days} days`;
  const months = Math.round(days / 30.44);
  return `about ${months} ${months === 1 ? "month" : "months"}`;
}

function zodiacSign(longitude) {
  return SIGNS[Math.floor(normalizeDegrees(longitude) / 30)];
}

function updateMoon(now) {
  const phase = lunarEvents(now);
  const percent = Math.round(phase.illumination * 100);
  document.querySelector("#current-date").textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  }).format(now);
  document.querySelector("#moon-phase").textContent = phase.name;
  document.querySelector("#moon-illumination").textContent = `${percent}% illuminated · ${phase.waxing ? "waxing" : "waning"}`;
  document.querySelector("#moon-guidance").textContent = MOON_GUIDANCE[phase.name];
  document.querySelector("#moon-visual").style.setProperty("--moon-shadow", String(Math.abs(Math.cos(phase.progress * Math.PI * 2))));
  document.querySelector("#moon-visual").classList.toggle("waxing", phase.waxing);
  document.querySelector("#moon-visual").setAttribute("aria-label", `${phase.name}, ${percent}% illuminated`);
  const next = phase.nextEvent.date;
  const remaining = Math.max(0, next - now);
  document.querySelector("#next-moon-event").textContent = `${phase.nextEvent.name} · ${formatDate(next)} at ${formatTime(next)}`;
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  document.querySelector("#next-moon-countdown").textContent = days > 0
    ? `In ${days} ${days === 1 ? "day" : "days"}${hours ? `, ${hours}h` : ""}`
    : `In ${Math.max(1, hours)} ${hours === 1 ? "hour" : "hours"}`;
  document.querySelector("#lunar-timeline").innerHTML = phase.upcomingEvents.slice(1).map((event) => `
    <div class="lunar-timeline-row"><span>${event.name}</span><span>${formatDate(event.date)} · ${formatTime(event.date)}</span></div>
  `).join("");
  return phase;
}

function updateRetrogrades(now) {
  const list = document.querySelector("#retrograde-list");
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "local time";
  document.querySelector("#local-timezone").textContent = timeZone.replaceAll("_", " ");
  const windowsByPlanet = PLANETS.map((planet) => ({
    planet,
    windows: retrogradeWindows(planet, now),
    longitude: geocentricLongitude(planet, now),
  }));
  const currentCycles = [];

  list.innerHTML = windowsByPlanet.map(({ planet, windows, longitude }) => {
    const current = windows.find((window) => window.start <= now.getTime() && window.end >= now.getTime());
    const upcoming = current || windows.find((window) => window.start > now.getTime());
    const sign = zodiacSign(longitude);
    if (current) currentCycles.push({ planet, sign });
    if (!upcoming) return "";
    const start = new Date(upcoming.start);
    const end = new Date(upcoming.end);
    const duration = formatDuration(upcoming.end - upcoming.start);
    const summary = current
      ? `Retrograde now in ${sign}; ${duration} total, ends ${formatDate(end)}.`
      : `Next in ${zodiacSign(geocentricLongitude(planet, start))}; ${formatDate(start)} – ${formatDate(end)} · ${duration}.`;
    const detail = current
      ? `${planet.name} is currently retrograde in ${sign}, a traditional review period for ${planet.cycle}. It began ${formatDate(start)} and ends ${formatDate(end)} (${duration} total).`
      : `The next ${planet.name} retrograde is expected ${formatDate(start)} through ${formatDate(end)} (${duration}), beginning in ${zodiacSign(geocentricLongitude(planet, start))}. Astrologers traditionally connect this cycle with revisiting ${planet.cycle}.`;
    return `<div class="retrograde-row">
      <span class="retrograde-planet">${planet.name}</span>
      <span class="retrograde-state${current ? " is-retrograde" : ""}"><i></i>${current ? "Retrograde now" : "Direct"}</span>
      <span class="retrograde-detail">${summary} <button type="button" class="retrograde-more" aria-expanded="false">Details</button></span>
      <p class="retrograde-note" hidden>${detail}</p>
    </div>`;
  }).join("");

  list.querySelectorAll(".retrograde-more").forEach((button) => {
    button.addEventListener("click", () => {
      const note = button.closest(".retrograde-row").querySelector(".retrograde-note");
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.textContent = expanded ? "Details" : "Less";
      note.hidden = expanded;
    });
  });
  if (!list.children.length) list.innerHTML = '<p class="astro-panel-intro">No upcoming retrograde dates were found in the calculation window.</p>';
  return currentCycles;
}

function updateZodiac(retrogradePlanets) {
  const retrogradesBySign = new Map();
  retrogradePlanets.forEach(({ planet, sign }) => {
    if (!retrogradesBySign.has(sign)) retrogradesBySign.set(sign, []);
    retrogradesBySign.get(sign).push(planet);
  });
  const activeSummary = [...retrogradesBySign]
    .map(([sign, planets]) => `${planets.map((planet) => planet.name).join(" and ")} in ${sign}`)
    .join("; ");
  const retrogradePrompt = retrogradePlanets.length
    ? `Active retrogrades: ${activeSummary}. Calculated locally from orbital elements, not a live ephemeris feed. Readings are traditional astrology for reflection, not prediction.`
    : "No planets are retrograde right now. Positions are calculated locally, not from a live ephemeris feed.";
  document.querySelector("#current-transits").textContent = retrogradePrompt;
  document.querySelector("#zodiac-grid").innerHTML = ZODIAC.map((sign, signIndex) => {
    const readings = [...retrogradesBySign].map(([transitSign, planets]) => {
      const transitIndex = SIGNS.indexOf(transitSign);
      if (transitIndex < 0) return null;
      const houseNumber = (transitIndex - signIndex + 12) % 12 + 1;
      const house = WHOLE_SIGN_HOUSES[houseNumber - 1];
      const houseOrdinal = `${houseNumber}${houseNumber % 100 >= 11 && houseNumber % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[houseNumber % 10] || "th")}`;
      const planetNames = planets.map((planet) => planet.name).join(" & ");
      const hasSaturnAndNeptune = planets.some((planet) => planet.name === "Saturn")
        && planets.some((planet) => planet.name === "Neptune");
      const interpretation = hasSaturnAndNeptune
        ? `Responsibilities and uncertainty around ${house.focus} may collide; ground plans in facts.`
        : planets
          .map((planet) => PLANET_LANDSCAPE[planet.name]?.(house))
          .filter(Boolean)
          .join(" ");
      return {
        sign: transitSign,
        houseNumber,
        house,
        planetNames,
        landscape: `${planetNames} in ${transitSign} (${houseOrdinal} house): ${interpretation}`,
        watches: planets.map((planet) => ({ name: planet.name, sign: transitSign, house })),
      };
    }).filter(Boolean);
    const landscapeItems = readings.length
      ? (() => {
        const midpoint = Math.ceil(readings.length / 2);
        const firstGroup = readings.slice(0, midpoint);
        const secondGroup = readings.slice(midpoint);
        const mainThemes = firstGroup.map((reading) => reading.landscape).join(" ");
        const additionalThemes = secondGroup.length
          ? secondGroup.map((reading) => reading.landscape).join(" ")
          : `A steady, practical approach to ${firstGroup.map((reading) => reading.house.focus).join(" and ")} may help.`;
        return `<li>${mainThemes}</li><li>${additionalThemes}</li>`;
      })()
      : "<li>No active retrograde themes stand out for your sign right now.</li><li>Keep moving with your current plans and priorities.</li>";

    const watchGroups = [
      { key: "communication", planets: ["Mercury", "Venus", "Neptune"], label: "Mixed signals & unclear expectations" },
      { key: "commitments", planets: ["Saturn", "Jupiter"], label: "Overpromising & delays" },
      { key: "momentum", planets: ["Mars", "Uranus"], label: "Frustration & sudden choices" },
    ];
    const watchOuts = watchGroups.map((group) => {
      const affected = readings.flatMap((reading) => reading.watches
        .filter((planet) => group.planets.includes(planet.name))
        .map((planet) => ({ ...planet, houseNumber: reading.houseNumber })));
      if (!affected.length) return null;
      const details = affected.map((planet) => {
        const watch = PLANET_WATCH_OUTS[planet.name];
        return watch ? `${planet.name} in ${planet.sign}: ${watch.advice(planet.house)}` : "";
      }).filter(Boolean).join(" ");
      const label = group.key === "communication" && affected.some((planet) => planet.houseNumber === 8)
        ? "Trust & intimacy boundaries"
        : group.key === "communication"
          ? "Miscommunications & mixed signals"
        : group.key === "commitments" && affected.some((planet) => planet.houseNumber === 2)
          ? "Financial pressure & delays"
          : group.key === "momentum"
            ? "Frustration & impulsive choices"
            : group.label;
      return `<li><strong>${label}:</strong> ${details}</li>`;
    }).filter(Boolean);
    if (watchOuts.length === 1) {
      watchOuts.push("<li><strong>Decision fatigue:</strong> Keep plans simple and give yourself time to check what matters before responding.</li>");
    }
    if (!watchOuts.length) {
      watchOuts.push(
        "<li><strong>Clear communication:</strong> Confirm important details rather than relying on assumptions.</li>",
        "<li><strong>Steady choices:</strong> Check your priorities and give decisions the time they need.</li>",
      );
    }
    const watchItems = watchOuts.slice(0, 3).join("");
    const shortSummary = readings.length
      ? createBriefTransit(readings)
      : "No active retrogrades stand out for your sign right now. Keep to your own pace and current priorities.";
    const detailsId = `zodiac-details-${sign.name.toLowerCase()}`;
    return `<article class="zodiac-card">
      <div class="zodiac-card-heading"><h3>${sign.name}</h3><span class="zodiac-dates">${sign.dates}</span></div>
      <p class="zodiac-short-reading">${shortSummary}</p>
      <button class="zodiac-details-button" type="button" aria-expanded="false" aria-controls="${detailsId}">Press for details</button>
      <div class="zodiac-details" id="${detailsId}" hidden>
        <section class="zodiac-reading">
          <h4 class="zodiac-point-label">The Emotional &amp; Mental Landscape</h4>
          <ul>${landscapeItems}</ul>
        </section>
        <section class="zodiac-reading">
          <h4 class="zodiac-point-label">What to Watch Out For</h4>
          <ul>${watchItems}</ul>
        </section>
      </div>
    </article>`;
  }).join("");
  document.querySelectorAll(".zodiac-details-button").forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.textContent = expanded ? "Press for details" : "Show less";
      document.getElementById(button.getAttribute("aria-controls")).hidden = expanded;
    });
  });
}

function createBriefTransit(readings) {
  const primary = readings[0];
  const houseIndex = primary.houseNumber - 1;
  const planets = primary.planetNames.split(" & ");
  const isSaturnNeptune = planets.includes("Saturn") && planets.includes("Neptune");
  let firstSentence;
  if (isSaturnNeptune) {
    firstSentence = `Saturn and Neptune in ${primary.sign} bring ${primary.house.focus} into focus.`;
  } else {
    const planet = planets[0];
    const opening = {
      Mercury: "brings",
      Venus: "turns attention to",
      Mars: "stirs activity around",
      Jupiter: "reframes",
      Saturn: "tests",
      Uranus: "shakes up",
      Neptune: "casts uncertainty over",
    }[planet] || "spotlights";
    firstSentence = `${planet} retrograde in ${primary.sign} ${opening} ${primary.house.focus}.`;
  }
  return `${firstSentence} ${HOUSE_BRIEF_ADVICE[houseIndex]}`;
}

function updateCalendar() {
  const now = new Date();
  const phase = updateMoon(now);
  const retrogradePlanets = updateRetrogrades(now);
  updateZodiac(retrogradePlanets);
}

const themeToggle = document.querySelector("#theme-toggle");
let theme = document.documentElement.dataset.theme || "light";
function updateThemeButton() {
  const nextTheme = { light: "dark", dark: "mystical", mystical: "light" }[theme];
  const labels = { light: "Dark mode", dark: "Mystical mode", mystical: "Light mode" };
  const ariaLabels = { light: "Switch to dark mode", dark: "Switch to mystical mode", mystical: "Switch to light mode" };
  const icons = {
    dark: '<path d="M16.8 12.1A7 7 0 0 1 7.9 3.2a7.1 7.1 0 1 0 8.9 8.9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    light: '<circle cx="10" cy="10" r="3.2" stroke="currentColor" stroke-width="1.5"/><path d="M10 1.8v2m0 12.4v2M1.8 10h2m12.4 0h2M4.2 4.2l1.4 1.4m8.8 8.8 1.4 1.4m0-11.6-1.4 1.4m-8.8 8.8-1.4 1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    mystical: '<path d="m10 1.8 1.7 5.5 5.5 1.7-5.5 1.7-1.7 5.5-1.7-5.5L2.8 9l5.5-1.7L10 1.8Z" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/><path d="m16.2 13.8.8 2.3 2.2.8-2.2.8-.8 2.3-.8-2.3-2.2-.8 2.2-.8.8-2.3Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>',
  };
  themeToggle.setAttribute("aria-pressed", String(theme !== "light"));
  themeToggle.setAttribute("aria-label", ariaLabels[theme]);
  themeToggle.querySelector("span").textContent = labels[theme];
  themeToggle.querySelector("svg").innerHTML = icons[nextTheme];
}

themeToggle.addEventListener("click", () => {
  theme = { light: "dark", dark: "mystical", mystical: "light" }[theme];
  if (theme === "light") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = {
    light: "#f4f2ed", dark: "#181818", mystical: "#100d1b",
  }[theme];
  try {
    localStorage.setItem("orbit-theme", theme);
  } catch {}
  updateThemeButton();
});

updateThemeButton();
updateCalendar();
window.setInterval(updateCalendar, 60 * 60 * 1000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) updateCalendar();
});
