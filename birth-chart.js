const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const ELEMENTS = ["Fire", "Earth", "Air", "Water", "Fire", "Earth", "Air", "Water", "Fire", "Earth", "Air", "Water"];
const ELEMENT_TONE = {
  Fire: "directness, enthusiasm, and a bias for action",
  Earth: "practicality, steady effort, and attention to tangible results",
  Air: "curiosity, lively ideas, and conversation",
  Water: "intuition, emotional insight, and sensitivity",
};
const SIGN_STYLE = [
  { core: "bold and self-starting", feelings: "You feel safest when you can act honestly and regain your independence.", mind: "You think quickly and speak directly; a pause helps your ideas land.", love: "You show affection openly and value excitement, honesty, and room to be yourself.", drive: "You pursue what you want head-on and do best with a clear challenge.", growth: "Growth comes through initiative, courage, and learning when to slow down.", boundary: "Patience and follow-through can be harder than starting fresh." },
  { core: "steady and resourceful", feelings: "You seek comfort, consistency, and time to trust what you feel.", mind: "You prefer practical facts and time to form a considered opinion.", love: "You show affection through loyalty, presence, and tangible care.", drive: "You build momentum steadily and stay powerfully persistent once committed.", growth: "Growth comes through patience, self-trust, and building lasting value.", boundary: "Stability matters, though staying too long with the familiar can limit you." },
  { core: "curious and adaptable", feelings: "You process feelings by naming them, asking questions, and exchanging ideas.", mind: "You connect ideas quickly and communicate with wit and flexibility.", love: "You connect through conversation, humor, and shared curiosity.", drive: "Variety and mental stimulation help you act; too many options can scatter focus.", growth: "Growth comes through learning, conversation, and trying a fresh perspective.", boundary: "Restlessness can make it hard to stay with one choice or feeling." },
  { core: "protective and perceptive", feelings: "You need emotional safety and a trusted place to retreat and restore.", mind: "You read between the lines and remember the feeling behind a conversation.", love: "You offer care and closeness, and need tenderness and trust in return.", drive: "You act with care when something or someone you love needs protection.", growth: "Growth comes through emotional honesty, care, and a stronger sense of belonging.", boundary: "Protectiveness can turn into retreat when a direct conversation is needed." },
  { core: "expressive and wholehearted", feelings: "You feel most alive when appreciated, creatively engaged, and free to be yourself.", mind: "You communicate warmly and confidently, with a gift for bringing people along.", love: "You give affection generously and want warmth, admiration, and sincere loyalty.", drive: "Recognition and a meaningful challenge bring out your courage and leadership.", growth: "Growth comes through creative confidence, generosity, and leading from the heart.", boundary: "Pride can make criticism or sharing the spotlight feel more personal." },
  { core: "thoughtful and improvement-minded", feelings: "You find reassurance in useful routines, clear details, and practical care.", mind: "You notice patterns and specifics; careful editing is a strength.", love: "You show care through attentive help and thoughtful, everyday gestures.", drive: "You work methodically and gain confidence by making a plan more effective.", growth: "Growth comes through discernment, useful skills, and sustainable habits.", boundary: "Perfectionism can make progress feel unfinished even when it is enough." },
  { core: "diplomatic and relationship-aware", feelings: "You regain balance through beauty, fairness, and considerate connection.", mind: "You weigh perspectives carefully and communicate with tact.", love: "You value mutual effort, thoughtful romance, and a sense of equal partnership.", drive: "Cooperation and a clear sense of fairness help you take action.", growth: "Growth comes through reciprocity, good judgment, and choosing with confidence.", boundary: "Keeping the peace can delay a choice or an honest disagreement." },
  { core: "intense and perceptive", feelings: "You need emotional honesty, privacy, and trust before you fully open up.", mind: "You look beneath the surface and prefer candid conversations to small talk.", love: "You seek depth, loyalty, and emotional truth rather than a half-hearted bond.", drive: "Strong focus helps you pursue meaningful change and face difficult truths.", growth: "Growth comes through trust, emotional courage, and letting change reshape you.", boundary: "Guardedness can turn uncertainty into suspicion if concerns stay unspoken." },
  { core: "adventurous and meaning-seeking", feelings: "You feel restored by possibility, movement, humor, and a wider perspective.", mind: "You speak candidly and connect details to the bigger picture.", love: "You value shared adventures, honesty, optimism, and room to grow together.", drive: "A meaningful goal or new horizon gives you energy and direction.", growth: "Growth comes through exploration, study, and testing your beliefs in life.", boundary: "Optimism can outrun the details or other people's need for reassurance." },
  { core: "composed and goal-oriented", feelings: "You feel secure when you can rely on yourself and make steady progress.", mind: "You think strategically and prefer conversations with a purpose.", love: "You show commitment through reliability, respect, and being there over time.", drive: "You are disciplined and effective when a goal has a clear structure.", growth: "Growth comes through patience, mastery, and ambitions built for the long term.", boundary: "Self-reliance can make it difficult to ask for help or show vulnerability." },
  { core: "independent and inventive", feelings: "You need room to think freely and connect without pressure to conform.", mind: "You enjoy original ideas, unusual connections, and big-picture conversations.", love: "You value friendship, authenticity, and freedom within a caring connection.", drive: "A shared ideal or original solution motivates you more than convention.", growth: "Growth comes through community, experimentation, and being true to your ideas.", boundary: "Distance can become a shield when a situation calls for emotional presence." },
  { core: "imaginative and compassionate", feelings: "You absorb atmosphere easily and need quiet, creativity, or kindness to reset.", mind: "You think in images and associations, with a strong feel for subtext.", love: "You offer tenderness and imagination, and need care with clear boundaries.", drive: "Inspiration and meaningful causes move you more than force or competition.", growth: "Growth comes through compassion, creativity, and giving intuition a grounded form.", boundary: "Soft boundaries can blur what you need or what another person has promised." },
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
const PLANET_META = [
  { name: "Sun", symbol: "☉", orbital: null, type: "identity" },
  { name: "Moon", symbol: "☽", orbital: null, type: "emotions" },
  { name: "Mercury", symbol: "☿", orbital: [.38709927, .00000037, .20563593, .00001906, 7.00497902, -.00594749, 252.25032350, 149472.67411175, 77.45779628, .16047689, 48.33076593, -.12534081], type: "mind" },
  { name: "Venus", symbol: "♀", orbital: [.72333566, .00000390, .00677672, -.00004107, 3.39467605, -.00078890, 181.97909950, 58517.81538729, 131.60246718, .00268329, 76.67984255, -.27769418], type: "love" },
  { name: "Mars", symbol: "♂", orbital: [1.52371034, .00001847, .09339410, .00007882, 1.84969142, -.00813131, -4.55343205, 19140.30268499, -23.94362959, .44441088, 49.55953891, -.29257343], type: "drive" },
  { name: "Jupiter", symbol: "♃", orbital: [5.20288700, -.00011607, .04838624, -.00013253, 1.30439695, -.00183714, 34.39644051, 3034.74612775, 14.72847983, .21252668, 100.47390909, .20469106], type: "growth" },
  { name: "Saturn", symbol: "♄", orbital: [9.53667594, -.00125060, .05386179, -.00050991, 2.48599187, .00193609, 49.95424423, 1222.49362201, 92.59887831, -.41897216, 113.66242448, -.28867794], type: "discipline" },
  { name: "Uranus", symbol: "♅", orbital: [19.18916464, -.00196176, .04725744, -.00004397, .77263783, -.00242939, 313.23810451, 428.48202785, 170.95427630, .40805281, 74.01692503, .04240589], type: "change" },
  { name: "Neptune", symbol: "♆", orbital: [30.06992276, .00026291, .00859048, .00005105, 1.77004347, .00035372, -55.12002969, 218.45945325, 44.96476227, -.32241464, 131.78422574, -.00508664], type: "imagination" },
  { name: "Pluto", symbol: "♇", orbital: [39.48211675, -.00031596, .24882730, .00005170, 17.14001206, .00004818, 238.92903833, 145.20780515, 224.06891629, -.04062942, 110.30393684, -.01183482], type: "depth" },
];
const EARTH_ELEMENTS = [1.00000261, .00000562, .01671123, -.00004392, -.00001531, -.01294668, 100.46457166, 35999.37244981, 102.93768193, .32327364, 0, 0];
const ASPECTS = [
  { angle: 0, orb: 8, label: "conjunction" },
  { angle: 60, orb: 5, label: "sextile" },
  { angle: 90, orb: 6, label: "square" },
  { angle: 120, orb: 6, label: "trine" },
  { angle: 180, orb: 8, label: "opposition" },
];
const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const DEG = Math.PI / 180;
const locationInput = document.querySelector("#birth-place");
const locationSuggestions = document.querySelector("#birth-place-suggestions");
const generateButton = document.querySelector("#generate-chart");
const birthStatus = document.querySelector("#birth-status");
const birthMonth = document.querySelector("#birth-month");
const birthDay = document.querySelector("#birth-day");
const birthYear = document.querySelector("#birth-year");
const birthHour = document.querySelector("#birth-hour");
const birthMinute = document.querySelector("#birth-minute");
let geocodedLocations = [];
let selectedBirthLocation = null;
let activeLocationSuggestion = -1;
let locationSearchTimer;
let locationSearchRequest = 0;

for (let year = new Date().getFullYear(); year >= 1800; year -= 1) {
  const option = document.createElement("option");
  option.value = String(year);
  option.textContent = String(year);
  birthYear.append(option);
}

for (let hour = 0; hour < 24; hour += 1) {
  const option = document.createElement("option");
  option.value = String(hour).padStart(2, "0");
  option.textContent = option.value;
  birthHour.append(option);
}

for (let minute = 0; minute < 60; minute += 1) {
  const option = document.createElement("option");
  option.value = String(minute).padStart(2, "0");
  option.textContent = option.value;
  birthMinute.append(option);
}

function updateBirthDays() {
  const previousDay = Number(birthDay.value);
  const month = Number(birthMonth.value);
  const year = Number(birthYear.value);
  const daysInMonth = !month
    ? 0
    : year
      ? new Date(year, month, 0).getDate()
      : month === 2
        ? 29
        : [4, 6, 9, 11].includes(month) ? 30 : 31;
  birthDay.replaceChildren(new Option("Day", ""));
  for (let day = 1; day <= daysInMonth; day += 1) {
    birthDay.append(new Option(String(day).padStart(2, "0"), String(day).padStart(2, "0")));
  }
  birthDay.disabled = !daysInMonth;
  if (previousDay > 0 && previousDay <= daysInMonth) birthDay.value = String(previousDay).padStart(2, "0");
}

birthMonth.addEventListener("change", updateBirthDays);
birthYear.addEventListener("change", updateBirthDays);

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
  const mean = signedDegrees(meanAnomaly) * DEG;
  let estimate = mean;
  for (let iteration = 0; iteration < 8; iteration += 1) {
    const correction = (estimate - eccentricity * Math.sin(estimate) - mean)
      / (1 - eccentricity * Math.cos(estimate));
    estimate -= correction;
    if (Math.abs(correction) < 1e-10) break;
  }
  return estimate;
}

function heliocentricPosition(elements, centuries) {
  const [a0, aRate, e0, eRate, i0, iRate, l0, lRate, p0, pRate, n0, nRate] = elements;
  const semimajorAxis = a0 + aRate * centuries;
  const eccentricity = e0 + eRate * centuries;
  const inclination = (i0 + iRate * centuries) * DEG;
  const node = (n0 + nRate * centuries) * DEG;
  const argument = ((p0 + pRate * centuries) - (n0 + nRate * centuries)) * DEG;
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
    z: Math.sin(argument) * Math.sin(inclination) * orbitalX + Math.cos(argument) * Math.sin(inclination) * orbitalY,
  };
}

function longitudeFromVector(vector) {
  return normalizeDegrees(Math.atan2(vector.y, vector.x) / DEG);
}

function planetLongitude(planet, date) {
  if (planet.name === "Sun") {
    return normalizeDegrees(longitudeFromVector(heliocentricPosition(EARTH_ELEMENTS, (julianDate(date) - 2451545) / 36525)) + 180);
  }
  if (planet.name === "Moon") return moonLongitude(date);
  const centuries = (julianDate(date) - 2451545) / 36525;
  const body = heliocentricPosition(planet.orbital, centuries);
  const earth = heliocentricPosition(EARTH_ELEMENTS, centuries);
  return normalizeDegrees(Math.atan2(body.y - earth.y, body.x - earth.x) / DEG);
}

function moonLongitude(date) {
  const days = julianDate(date) - 2451543.5;
  const meanLongitude = normalizeDegrees(218.316 + 13.176396 * days);
  const elongation = normalizeDegrees(297.850 + 12.190749 * days) * DEG;
  const solarAnomaly = normalizeDegrees(357.529 + .98560028 * days) * DEG;
  const lunarAnomaly = normalizeDegrees(134.963 + 13.064993 * days) * DEG;
  const argumentLatitude = normalizeDegrees(93.272 + 13.229350 * days) * DEG;
  const correction = 6.289 * Math.sin(lunarAnomaly)
    + 1.274 * Math.sin(2 * elongation - lunarAnomaly)
    + .658 * Math.sin(2 * elongation)
    + .214 * Math.sin(2 * lunarAnomaly)
    - .186 * Math.sin(solarAnomaly)
    - .114 * Math.sin(2 * argumentLatitude)
    + .059 * Math.sin(2 * elongation - 2 * lunarAnomaly)
    + .057 * Math.sin(2 * elongation - solarAnomaly - lunarAnomaly)
    + .053 * Math.sin(2 * elongation + lunarAnomaly)
    + .046 * Math.sin(2 * elongation - solarAnomaly)
    + .041 * Math.sin(solarAnomaly - lunarAnomaly)
    - .035 * Math.sin(elongation)
    - .031 * Math.sin(solarAnomaly + lunarAnomaly)
    - .015 * Math.sin(2 * argumentLatitude - 2 * elongation)
    + .011 * Math.sin(2 * elongation - 4 * lunarAnomaly);
  return normalizeDegrees(meanLongitude + correction);
}

function signPosition(longitude) {
  const normalized = normalizeDegrees(longitude);
  const index = Math.floor(normalized / 30);
  return {
    sign: SIGNS[index],
    signIndex: index,
    degree: normalized % 30,
    longitude: normalized,
  };
}

function localBirthDate(dateString, timeString, timeZone) {
  const [year, month, day] = dateString.split("-").map(Number);
  const [hour = 12, minute = 0] = timeString ? timeString.split(":").map(Number) : [12, 0];
  const desired = Date.UTC(year, month - 1, day, hour, minute);
  let candidate = desired;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  });
  for (let iteration = 0; iteration < 4; iteration += 1) {
    const parts = Object.fromEntries(formatter.formatToParts(new Date(candidate)).map(({ type, value }) => [type, Number(value)]));
    const represented = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    candidate += desired - represented;
  }
  const check = Object.fromEntries(formatter.formatToParts(new Date(candidate)).map(({ type, value }) => [type, Number(value)]));
  if (check.year !== year || check.month !== month || check.day !== day || check.hour !== hour || check.minute !== minute) {
    throw new Error("That local birth time does not exist in this time zone because of a clock change. Try another time or omit the time.");
  }
  return new Date(candidate);
}

function ascendantLongitude(date, latitude, longitude) {
  const jd = julianDate(date);
  const centuries = (jd - 2451545) / 36525;
  const greenwichSidereal = normalizeDegrees(
    280.46061837 + 360.98564736629 * (jd - 2451545) + .000387933 * centuries * centuries
      - centuries * centuries * centuries / 38710000,
  );
  const localSidereal = (greenwichSidereal + longitude) * DEG;
  const obliquity = (23.439291 - .0130042 * centuries) * DEG;
  const lat = Math.max(-89.8, Math.min(89.8, latitude)) * DEG;
  const descendant = Math.atan2(
    -Math.cos(localSidereal),
    Math.sin(obliquity) * Math.tan(lat) + Math.cos(obliquity) * Math.sin(localSidereal),
  ) / DEG;
  return normalizeDegrees(descendant + 180);
}

function toLocalDateTime(date, timeZone) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone, dateStyle: "long", timeStyle: "short",
  }).format(date);
}

function ordinal(number) {
  const suffix = number % 100 >= 11 && number % 100 <= 13
    ? "th"
    : ({ 1: "st", 2: "nd", 3: "rd" }[number % 10] || "th");
  return `${number}${suffix}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function describePlanet(planet, position, houseNumber) {
  const style = SIGN_STYLE[position.signIndex];
  const signReading = {
    identity: `With the Sun in ${position.sign}, you are ${style.core}. You express this through ${ELEMENT_TONE[ELEMENTS[position.signIndex]]}, and confidence grows when you let this natural style guide your choices.`,
    emotions: `With the Moon in ${position.sign}, you ${style.feelings.toLowerCase()} This sign describes what helps you feel safe, how you instinctively respond, and the kind of care that restores you.`,
    mind: `Mercury in ${position.sign} shapes how you think, learn, and communicate. ${style.mind} This placement also colors how you make decisions and explain what matters to you.`,
    love: `Venus in ${position.sign} describes how you give and receive affection, what you value, and what helps you feel appreciated. ${style.love}`,
    drive: `Mars in ${position.sign} describes how you take initiative, pursue what you want, and handle frustration. ${style.drive}`,
    growth: `Jupiter in ${position.sign} points to where curiosity, opportunity, and confidence can help you grow. ${style.growth}`,
    discipline: `Saturn in ${position.sign} describes the responsibilities and boundaries that take time to master. ${style.boundary} Consistent effort here can become a lasting strength.`,
    change: `Uranus in ${position.sign} shows where you seek freedom and are willing to question convention. You bring ${style.core} instincts to change, especially around new ideas and ways of living.`,
    imagination: `Neptune in ${position.sign} colors your imagination, ideals, and sensitivity to what is unspoken. Your ${ELEMENTS[position.signIndex].toLowerCase()} nature shapes how you dream, empathize, and find inspiration.`,
    depth: `Pluto in ${position.sign} describes deep change, shared power, and the patterns you are learning to face honestly. You approach transformation in a ${style.core} way; patience with the process helps turn intensity into insight.`,
  };
  const house = houseNumber
    ? ` In your ${ordinal(houseNumber)} house, this part of your chart is especially connected to ${WHOLE_SIGN_HOUSES[houseNumber - 1].focus}.`
    : "";
  const descriptions = {
    identity: signReading.identity,
    emotions: signReading.emotions,
    mind: signReading.mind,
    love: signReading.love,
    drive: signReading.drive,
    growth: signReading.growth,
    discipline: signReading.discipline,
    change: signReading.change,
    imagination: signReading.imagination,
    depth: signReading.depth,
  };
  return `${descriptions[planet.type]}${house}`;
}

function calculateRetrograde(planet, date) {
  if (planet.name === "Sun" || planet.name === "Moon") return false;
  const before = planetLongitude(planet, new Date(date.getTime() - 6 * 3600000));
  const after = planetLongitude(planet, new Date(date.getTime() + 6 * 3600000));
  return signedDegrees(after - before) < 0;
}

function aspectBetween(left, right) {
  const separation = Math.abs(signedDegrees(left - right));
  return ASPECTS.find(({ angle, orb }) => Math.abs(separation - angle) <= orb) || null;
}

function buildChartSvg(placements, ascendant) {
  const size = 440;
  const center = size / 2;
  const outerRadius = 198;
  const signInnerRadius = 162;
  const placementRadius = 132;
  const wheelOffset = ascendant ? 180 - ascendant.longitude : -90;
  const angleForLongitude = (longitude) => (longitude + wheelOffset) * DEG;
  const glyphs = placements.map((placement) => ({ ...placement, ...signPosition(placement.longitude) }));
  const segments = SIGNS.map((sign, index) => {
    const start = angleForLongitude(index * 30);
    const end = angleForLongitude((index + 1) * 30);
    const x1 = center + outerRadius * Math.cos(start);
    const y1 = center + outerRadius * Math.sin(start);
    const x2 = center + outerRadius * Math.cos(end);
    const y2 = center + outerRadius * Math.sin(end);
    const middle = (start + end) / 2;
    const labelRadius = (outerRadius + signInnerRadius) / 2;
    const labelX = center + labelRadius * Math.cos(middle);
    const labelY = center + labelRadius * Math.sin(middle);
    let rotation = middle / DEG + 90;
    if (rotation > 90 && rotation < 270) rotation += 180;
    return `<path class="chart-sign-segment" d="M${(center + signInnerRadius * Math.cos(start)).toFixed(1)} ${(center + signInnerRadius * Math.sin(start)).toFixed(1)} L${x1.toFixed(1)} ${y1.toFixed(1)} A${outerRadius} ${outerRadius} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} L${(center + signInnerRadius * Math.cos(end)).toFixed(1)} ${(center + signInnerRadius * Math.sin(end)).toFixed(1)} A${signInnerRadius} ${signInnerRadius} 0 0 0 ${(center + signInnerRadius * Math.cos(start)).toFixed(1)} ${(center + signInnerRadius * Math.sin(start)).toFixed(1)} Z"/><text class="chart-sign-label" x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" transform="rotate(${rotation.toFixed(1)} ${labelX.toFixed(1)} ${labelY.toFixed(1)})">${sign.toUpperCase()}</text>`;
  }).join("");
  const signDividers = Array.from({ length: 12 }, (_, index) => {
    const angle = angleForLongitude(index * 30);
    const innerX = center + placementRadius * Math.cos(angle);
    const innerY = center + placementRadius * Math.sin(angle);
    const outerX = center + signInnerRadius * Math.cos(angle);
    const outerY = center + signInnerRadius * Math.sin(angle);
    return `<line class="chart-zodiac-divider" x1="${innerX.toFixed(1)}" y1="${innerY.toFixed(1)}" x2="${outerX.toFixed(1)}" y2="${outerY.toFixed(1)}"/>`;
  }).join("");
  const planetPoints = [];
  const positionedGlyphs = glyphs.map((planet) => {
    const trueAngle = angleForLongitude(planet.longitude);
    const candidateAngles = [0, 3, -3, 6, -6, 9, -9, 12, -12, 15, -15, 18, -18, 21, -21, 24, -24, 27, -27, 30, -30, 33, -33, 36, -36];
    const candidateRadii = [signInnerRadius - 15, signInnerRadius - 20, signInnerRadius - 10];
    const candidates = candidateRadii.flatMap((radius) => candidateAngles.map((offset) => {
      const angle = trueAngle + offset * DEG;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { radius, angle, x, y, score: offset ** 2 + (radius - (signInnerRadius - 15)) ** 2 / 4 };
    })).sort((left, right) => left.score - right.score);
    const selected = candidates.find(({ x, y }) => planetPoints.every((point) => (
      Math.abs(x - point.x) >= 14 || Math.abs(y - point.y) >= 15
    )))
      || candidates[0];
    planetPoints.push({ ...selected, name: planet.name });
    return { ...planet, point: selected, trueAngle };
  });
  const aspects = [];
  for (let left = 0; left < positionedGlyphs.length; left += 1) {
    for (let right = left + 1; right < positionedGlyphs.length; right += 1) {
      const aspect = aspectBetween(positionedGlyphs[left].longitude, positionedGlyphs[right].longitude);
      if (aspect) aspects.push({
        left: positionedGlyphs[left],
        right: positionedGlyphs[right],
        aspect,
        separation: Math.abs(signedDegrees(positionedGlyphs[right].longitude - positionedGlyphs[left].longitude)),
      });
    }
  }
  const closeConjunctions = aspects.filter(({ aspect, separation }) => (
    aspect.label === "conjunction" && separation <= 12
  ));
  const bracketAspects = closeConjunctions.filter(({ left, right, separation }) => {
    const direction = Math.sign(signedDegrees(right.longitude - left.longitude));
    const span = Math.abs(signedDegrees(right.longitude - left.longitude));
    return !positionedGlyphs.some((planet) => {
      if (planet === left || planet === right) return false;
      const offset = signedDegrees(planet.longitude - left.longitude) * direction;
      const nearCluster = Math.abs(signedDegrees(planet.longitude - left.longitude)) <= 12
        || Math.abs(signedDegrees(planet.longitude - right.longitude)) <= 12;
      return nearCluster && offset > 0 && offset < span && span <= separation + .001;
    });
  });
  const aspectLines = aspects.map(({ left, right, aspect, separation }) => {
    if (aspect.label === "conjunction" && separation <= 12) {
      if (!bracketAspects.some((pair) => pair.left === left && pair.right === right)) return "";
      const start = { x: left.point.x, y: left.point.y + 1 };
      const end = { x: right.point.x, y: right.point.y + 1 };
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const distance = Math.hypot(dx, dy) || 1;
      const alongX = dx / distance;
      const alongY = dy / distance;
      const acrossX = -alongY;
      const acrossY = alongX;
      const midpoint = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
      const halfHeight = 1.8;
      const halfWidth = 4.75;
      const point = (along, across) => ({
        x: midpoint.x + alongX * along + acrossX * across,
        y: midpoint.y + alongY * along + acrossY * across,
      });
      const topLeft = point(-halfWidth, -halfHeight);
      const topRight = point(halfWidth, -halfHeight);
      const bottomRight = point(halfWidth, halfHeight);
      const bottomLeft = point(-halfWidth, halfHeight);
      return `<path class="chart-aspect chart-aspect-bracket" data-aspect="${aspect.label}" fill="none" d="M${topLeft.x.toFixed(1)} ${topLeft.y.toFixed(1)} L${topRight.x.toFixed(1)} ${topRight.y.toFixed(1)} L${bottomRight.x.toFixed(1)} ${bottomRight.y.toFixed(1)} L${bottomLeft.x.toFixed(1)} ${bottomLeft.y.toFixed(1)}"/>`;
    }
    const leftAngle = angleForLongitude(left.longitude);
    const rightAngle = angleForLongitude(right.longitude);
    const x1 = center + placementRadius * Math.cos(leftAngle);
    const y1 = center + placementRadius * Math.sin(leftAngle);
    const x2 = center + placementRadius * Math.cos(rightAngle);
    const y2 = center + placementRadius * Math.sin(rightAngle);
    return `<line class="chart-aspect" data-aspect="${aspect.label}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  }).join("");
  const conjunctPlanetNames = new Set(bracketAspects
    .flatMap(({ left, right }) => [left.name, right.name]));
  const planetLabels = positionedGlyphs.map((planet) => {
    const { point, trueAngle } = planet;
    const pointerLength = 5;
    const pointerStartX = center + signInnerRadius * Math.cos(trueAngle);
    const pointerStartY = center + signInnerRadius * Math.sin(trueAngle);
    const pointerEndX = center + (signInnerRadius - pointerLength) * Math.cos(trueAngle);
    const pointerEndY = center + (signInnerRadius - pointerLength) * Math.sin(trueAngle);
    const pointer = conjunctPlanetNames.has(planet.name)
      ? ""
      : `<line class="chart-planet-pointer" x1="${pointerStartX.toFixed(1)}" y1="${pointerStartY.toFixed(1)}" x2="${pointerEndX.toFixed(1)}" y2="${pointerEndY.toFixed(1)}"/>`;
    return `<g class="chart-planet" aria-label="${planet.name} in ${planet.sign}">${pointer}<text x="${point.x.toFixed(1)}" y="${(point.y + 6).toFixed(1)}">${planet.symbol}</text></g>`;
  }).join("");
  const ascLine = ascendant
    ? (() => {
      const angle = angleForLongitude(ascendant.longitude);
      const innerX = center + (placementRadius - 1) * Math.cos(angle);
      const innerY = center + (placementRadius - 1) * Math.sin(angle);
      const outerX = center + (signInnerRadius + 1) * Math.cos(angle);
      const outerY = center + (signInnerRadius + 1) * Math.sin(angle);
      return `<line class="chart-ascendant" x1="${innerX.toFixed(1)}" y1="${innerY.toFixed(1)}" x2="${outerX.toFixed(1)}" y2="${outerY.toFixed(1)}"/>`;
    })()
    : "";
  return `<svg class="natal-wheel" viewBox="0 0 ${size} ${size}" role="img" aria-labelledby="natal-wheel-title natal-wheel-description">
    <title id="natal-wheel-title">Birth chart wheel</title>
    <desc id="natal-wheel-description">Zodiac wheel with calculated planetary placements${ascendant ? ` and ${ascendant.sign} ascendant` : "; birth time was not provided, so the ascendant is unavailable"}.</desc>
    <circle class="chart-wheel-bg" cx="${center}" cy="${center}" r="${outerRadius}"/>
    ${segments}
    <circle class="chart-wheel-ring" cx="${center}" cy="${center}" r="${signInnerRadius}"/>
    <circle class="chart-wheel-inner" cx="${center}" cy="${center}" r="${placementRadius}"/>
    ${signDividers}${aspectLines}${ascLine}${planetLabels}
  </svg>`;
}

function renderBirthChart(location, instant, hasBirthTime) {
  const positions = PLANET_META.map((planet) => ({
    planet,
    longitude: planetLongitude(planet, instant),
  })).map((entry) => ({
    ...entry,
    position: signPosition(entry.longitude),
    retrograde: calculateRetrograde(entry.planet, instant),
  }));
  const ascendant = hasBirthTime
    ? signPosition(ascendantLongitude(instant, location.latitude, location.longitude))
    : null;
  const risingIndex = ascendant?.signIndex;
  const placements = positions.map(({ planet, longitude, position, retrograde }) => ({
    ...planet,
    ...position,
    longitude,
    retrograde,
    houseNumber: ascendant === null
      ? null
      : Math.floor(normalizeDegrees(longitude - ascendant.longitude) / 30) + 1,
  }));

  const results = document.querySelector("#birth-results");
  const dateSummary = toLocalDateTime(instant, location.timezone);
  document.querySelector("#chart-birth-summary").textContent = `${dateSummary} · ${location.name}, ${location.country}${hasBirthTime ? "" : " · time not provided (noon used for planetary positions)"}`;
  document.querySelector("#chart-wheel-frame").innerHTML = buildChartSvg(placements, ascendant);
  const placementGroups = new Map();
  if (ascendant) {
    placementGroups.set(`${ascendant.signIndex}:1`, {
      signIndex: ascendant.signIndex,
      houseNumber: 1,
      points: [{ name: "Ascendant", symbol: "↑" }],
    });
  }
  placements.forEach((placement) => {
    const key = `${placement.signIndex}:${placement.houseNumber ?? "unknown"}`;
    if (!placementGroups.has(key)) {
      placementGroups.set(key, {
        signIndex: placement.signIndex,
        houseNumber: placement.houseNumber,
        points: [],
      });
    }
    placementGroups.get(key).points.push(placement);
  });
  const houseRows = [...placementGroups.values()]
    .sort((left, right) => (left.houseNumber ?? 13) - (right.houseNumber ?? 13) || left.signIndex - right.signIndex)
    .map(({ signIndex, houseNumber, points }) => {
      const pointText = points
        .map(({ name, symbol }) => `<span class="chart-placement-point" aria-label="${escapeHtml(name)}">${symbol} ${escapeHtml(name)}</span>`)
        .join("");
      return `<tr><td>${SIGNS[signIndex]}</td><td>${pointText}</td><td>${houseNumber ?? "—"}</td></tr>`;
    }).join("");
  document.querySelector("#chart-placement-table").innerHTML = `
    <table>
      <thead><tr><th scope="col">Sign</th><th scope="col">Planet / point</th><th scope="col">House</th></tr></thead>
      <tbody>${houseRows}</tbody>
    </table>`;
  const sun = placements.find(({ name }) => name === "Sun");
  const moon = placements.find(({ name }) => name === "Moon");
  const ascCard = ascendant
    ? `<article class="chart-highlight"><span class="section-kicker">RISING</span><h3>${ascendant.sign}</h3><p>You may come across as ${SIGN_STYLE[ascendant.signIndex].core}; this sign colors your first impression and approach to new situations.</p></article>`
    : `<article class="chart-highlight"><span class="section-kicker">RISING</span><h3>Birth time needed</h3><p>Add an accurate birth time to calculate your rising sign and houses.</p></article>`;
  document.querySelector("#chart-highlights").innerHTML = `
    <article class="chart-highlight"><span class="section-kicker">SUN</span><h3>${sun.sign}</h3><p>${describePlanet(sun, sun, null)}</p></article>
    <article class="chart-highlight"><span class="section-kicker">MOON</span><h3>${moon.sign}</h3><p>${describePlanet(moon, moon, null)}${hasBirthTime ? "" : " The Moon moves quickly, so verify this placement if you were born near a sign change."}</p></article>
    ${ascCard}`;
  document.querySelector("#placement-grid").innerHTML = placements.map((placement) => {
    const description = describePlanet(placement, placement, placement.houseNumber);
    const retrogradeLabel = placement.retrograde ? " · retrograde" : "";
    const relationshipLink = ["Venus", "Mars"].includes(placement.name)
      ? `<a class="relationship-card-link" href="#relationship-analysis">Your relationship analysis <span aria-hidden="true">→</span></a>`
      : "";
    return `<article class="placement-card" id="placement-${placement.name.toLowerCase()}">
    <div class="placement-card-heading"><span class="planet-symbol" aria-hidden="true">${placement.symbol}</span><div><h3>${placement.name} in ${placement.sign}</h3><p>${Math.floor(placement.degree)}°${retrogradeLabel}${placement.houseNumber ? ` · ${ordinal(placement.houseNumber)} house` : ""}</p></div></div>
    <p>${escapeHtml(description)}</p>
    ${relationshipLink}
    </article>`;
  }).join("");
  const relationshipDetails = document.querySelector(".relationship-details");
  document.querySelectorAll(".relationship-card-link").forEach((link) => {
    link.addEventListener("click", () => { relationshipDetails.open = true; });
  });
  renderRelationshipAnalysis(placements);
  results.hidden = false;
  results.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

function renderRelationshipAnalysis(placements) {
  const venus = placements.find(({ name }) => name === "Venus");
  const mars = placements.find(({ name }) => name === "Mars");
  const venusStyle = SIGN_STYLE[venus.signIndex];
  const marsStyle = SIGN_STYLE[mars.signIndex];
  const sameElement = ELEMENTS[venus.signIndex] === ELEMENTS[mars.signIndex];
  const aspect = aspectBetween(venus.longitude, mars.longitude);
  const aspectReading = aspect
    ? `Your Venus and Mars form a ${aspect.label}. This can ${{
      conjunction: "blend affection and desire into one strong instinct",
      sextile: "make affection and desire easier to coordinate when you act on the opportunity",
      square: "create friction between what feels comforting and what you want to pursue",
      trine: "help affection and desire flow together with less effort",
      opposition: "pull affection and desire in different directions until both needs are named",
    }[aspect.label]}.`
    : "Venus and Mars do not form a major close aspect in this chart, so their signs offer the clearest relationship-style themes.";
  document.querySelector("#relationship-summary").innerHTML = `
    <p><strong>Venus in ${venus.sign}</strong> — ${escapeHtml(venusStyle.love)}</p>
    <p><strong>Mars in ${mars.sign}</strong> — ${escapeHtml(marsStyle.drive)}</p>`;
  document.querySelector("#relationship-deep-dive").innerHTML = `
    <p><strong>Venus in ${venus.sign}:</strong> ${escapeHtml(describePlanet(venus, venus, venus.houseNumber))}</p>
    <p><strong>Mars in ${mars.sign}:</strong> ${escapeHtml(describePlanet(mars, mars, mars.houseNumber))}</p>
    <p>Your Venus and Mars share a ${sameElement ? `${ELEMENTS[venus.signIndex].toLowerCase()}-element rhythm` : "different elemental rhythm"}. ${sameElement ? "Your affection and desire may reinforce one another; notice when intensity starts to build." : "You may want closeness in one way and pursue it in another; naming both needs can prevent crossed signals."}</p>
    <p>${aspectReading}</p>
    <p><strong>When tension rises:</strong> ${escapeHtml(venusStyle.boundary)}</p>
    <p><strong>A useful relationship practice:</strong> Say what helps you feel cared for, and what you need when you are frustrated, before either becomes an unspoken test.</p>`;
}

function birthLocationLabel(place) {
  return [place.name, place.admin1, place.country].filter(Boolean).join(", ");
}

function closeLocationSuggestions() {
  locationSuggestions.hidden = true;
  locationInput.setAttribute("aria-expanded", "false");
  locationInput.removeAttribute("aria-activedescendant");
  activeLocationSuggestion = -1;
}

function chooseBirthLocation(place) {
  selectedBirthLocation = place;
  locationInput.value = birthLocationLabel(place);
  generateButton.disabled = false;
  closeLocationSuggestions();
  birthStatus.textContent = "Birthplace selected. You can generate your chart.";
}

function renderLocationSuggestions() {
  locationSuggestions.replaceChildren();
  geocodedLocations.forEach((place, index) => {
    const item = document.createElement("li");
    item.id = `birth-place-option-${index}`;
    item.className = "birth-place-suggestion";
    item.setAttribute("role", "option");
    item.setAttribute("aria-selected", "false");
    item.textContent = birthLocationLabel(place);
    item.addEventListener("click", () => chooseBirthLocation(place));
    locationSuggestions.append(item);
  });
  locationSuggestions.hidden = geocodedLocations.length === 0;
  locationInput.setAttribute("aria-expanded", String(geocodedLocations.length > 0));
}

function moveLocationSuggestion(direction) {
  if (locationSuggestions.hidden || geocodedLocations.length === 0) return false;
  activeLocationSuggestion = activeLocationSuggestion < 0
    ? (direction > 0 ? 0 : geocodedLocations.length - 1)
    : (activeLocationSuggestion + direction + geocodedLocations.length) % geocodedLocations.length;
  [...locationSuggestions.querySelectorAll('[role="option"]')].forEach((option, index) => {
    const selected = index === activeLocationSuggestion;
    option.setAttribute("aria-selected", String(selected));
    if (selected) {
      locationInput.setAttribute("aria-activedescendant", option.id);
      option.scrollIntoView({ block: "nearest" });
    }
  });
  return true;
}

async function findBirthLocation(query, requestId) {
  if (requestId !== locationSearchRequest || query !== locationInput.value.trim()) return;
  if (query.length < 2) {
    return;
  }
  birthStatus.textContent = "Finding that place…";
  try {
    const url = new URL(GEOCODE_URL);
    url.search = new URLSearchParams({ name: query, count: "8", language: "en", format: "json" });
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Location search failed (${response.status}). Please try again.`);
    const data = await response.json();
    if (requestId !== locationSearchRequest || query !== locationInput.value.trim()) return;
    geocodedLocations = data.results || [];
    if (!geocodedLocations.length) {
      renderLocationSuggestions();
      birthStatus.textContent = "No matching places found. Try adding a region or country.";
      return;
    }
    renderLocationSuggestions();
    birthStatus.textContent = "Choose your birth city or town from the suggestions beneath the field.";
  } catch (error) {
    if (requestId === locationSearchRequest && query === locationInput.value.trim()) {
      geocodedLocations = [];
      renderLocationSuggestions();
      birthStatus.textContent = error.message || "Could not look up that place. Check your connection and try again.";
    }
  }
}

locationInput.addEventListener("input", () => {
  window.clearTimeout(locationSearchTimer);
  locationSearchRequest += 1;
  const query = locationInput.value.trim();
  const matchedLocation = geocodedLocations.find((place) => birthLocationLabel(place) === query);
  if (matchedLocation) {
    chooseBirthLocation(matchedLocation);
    return;
  }
  selectedBirthLocation = null;
  generateButton.disabled = true;
  geocodedLocations = [];
  renderLocationSuggestions();
  if (query.length < 2) {
    birthStatus.textContent = query ? "Enter at least two characters to search." : "";
    return;
  }
  const requestId = locationSearchRequest;
  birthStatus.textContent = "Searching for your birthplace…";
  locationSearchTimer = window.setTimeout(() => findBirthLocation(query, requestId), 350);
});

locationInput.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" && moveLocationSuggestion(1)) {
    event.preventDefault();
  } else if (event.key === "ArrowUp" && moveLocationSuggestion(-1)) {
    event.preventDefault();
  } else if (event.key === "Enter" && activeLocationSuggestion >= 0) {
    event.preventDefault();
    chooseBirthLocation(geocodedLocations[activeLocationSuggestion]);
  } else if (event.key === "Escape" && !locationSuggestions.hidden) {
    closeLocationSuggestions();
  }
});

locationInput.addEventListener("blur", () => {
  window.setTimeout(closeLocationSuggestions, 150);
});

document.querySelector("#birth-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const dateString = `${birthYear.value}-${birthMonth.value}-${birthDay.value}`;
  const hasHour = birthHour.value !== "";
  const hasMinute = birthMinute.value !== "";
  if (hasHour !== hasMinute) {
    birthStatus.textContent = "Choose both an hour and minute, or leave the time blank.";
    (hasHour ? birthMinute : birthHour).focus();
    return;
  }
  const timeString = hasHour ? `${birthHour.value}:${birthMinute.value}` : "";
  const year = Number(dateString.slice(0, 4));
  const selectedLocation = selectedBirthLocation;
  if (!form.reportValidity()) return;
  if (!selectedLocation) {
    birthStatus.textContent = "Search for and select your birthplace first.";
    return;
  }
  const nowAtLocation = new Date();
  const localTodayParts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: selectedLocation.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(nowAtLocation).map(({ type, value }) => [type, value]));
  const latestLocalDate = `${localTodayParts.year}-${localTodayParts.month}-${localTodayParts.day}`;
  if (dateString > latestLocalDate) {
    birthStatus.textContent = "Birth date cannot be in the future.";
    return;
  }
  if (year < 1800 || year > 2100) {
    birthStatus.textContent = "Birth charts are currently supported for dates from 1800 through 2100.";
    return;
  }
  try {
    const instant = localBirthDate(dateString, timeString, selectedLocation.timezone);
    const location = {
      name: selectedLocation.name,
      country: selectedLocation.country || "",
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      timezone: selectedLocation.timezone,
    };
    birthStatus.textContent = "";
    renderBirthChart(location, instant, Boolean(timeString));
  } catch (error) {
    birthStatus.textContent = error.message || "Could not calculate this birth chart. Check the date, time, and location.";
  }
});

const themeToggle = document.querySelector("#theme-toggle");
let theme = document.documentElement.dataset.theme || "light";
function updateThemeButton() {
  const labels = { light: "Dark mode", dark: "Mystical mode", mystical: "Light mode" };
  const ariaLabels = { light: "Switch to dark mode", dark: "Switch to mystical mode", mystical: "Switch to light mode" };
  const icons = {
    dark: '<path d="M16.8 12.1A7 7 0 0 1 7.9 3.2a7.1 7.1 0 1 0 8.9 8.9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    light: '<circle cx="10" cy="10" r="3.2" stroke="currentColor" stroke-width="1.5"/><path d="M10 1.8v2m0 12.4v2M1.8 10h2m12.4 0h2M4.2 4.2l1.4 1.4m8.8 8.8 1.4 1.4m0-11.6-1.4 1.4m-8.8 8.8-1.4 1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    mystical: '<path d="m10 1.8 1.7 5.5 5.5 1.7-5.5 1.7-1.7 5.5-1.7-5.5L2.8 9l5.5-1.7L10 1.8Z" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/><path d="m16.2 13.8.8 2.3 2.2.8-2.2.8-.8 2.3-.8-2.3-2.2-.8 2.2-.8.8-2.3Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>',
  };
  const nextTheme = { light: "dark", dark: "mystical", mystical: "light" }[theme];
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
