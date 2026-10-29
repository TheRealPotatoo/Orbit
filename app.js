const initialLayers = [
  {
    name: "Answer",
    words: ["No", "Yes"],
    colors: ["#f04f49", "#9af568"],
    colorMode: "palette",
    themeIndex: 0,
  },
  {
    name: "Intention",
    words: ["Intuition", "Movement", "Wisdom", "Service", "Flow of life", "Consciousness"],
    colors: ["#819665", "#819665", "#819665", "#819665", "#819665", "#819665"],
    colorMode: "single",
    singleColor: "#819665",
  },
  {
    name: "Frequencies",
    words: ["20Hz | Shame", "30Hz | Guilt", "50Hz | Apathy", "75Hz | Grief", "100Hz | Fear", "125Hz | Desire", "150Hz | Anger", "175Hz | Pride", "200Hz | Courage", "250Hz | Neutrality", "310Hz | Willingness", "350Hz | Acceptance", "400Hz | Reason", "450Hz | Abundance", "480Hz | Hope", "500Hz | Love", "520Hz | Surrender", "540Hz | Joy", "550Hz | Compassion", "580Hz | Wholeness", "600Hz | Peace", "660Hz | Clarity", "700Hz | Enlightenment"],
    colors: ["#a83d2d", "#b83a29", "#a94127", "#a44a22", "#a85c22", "#a66b24", "#9f7924", "#a08b29", "#96902b", "#819431", "#648d39", "#43854b", "#428879", "#347d93", "#286d94", "#204c7a", "#192c71", "#251360", "#35105f", "#4d115d", "#5a155d", "#65185b", "#711b59"],
    colorMode: "palette",
    paletteIndex: 0,
  },
];

const themes = [
  { name: "Earth", colors: ["#a83d2d", "#b83a29", "#a94127", "#a44a22", "#a85c22", "#a66b24", "#9f7924", "#a08b29", "#96902b", "#819431", "#648d39", "#43854b", "#428879", "#347d93", "#286d94", "#204c7a", "#192c71", "#251360", "#35105f", "#4d115d", "#5a155d", "#65185b", "#711b59"] },
  { name: "Ocean", colors: ["#d1a05a", "#c88f54", "#9b9b62", "#5c9286", "#4d91a5", "#386c94", "#344e78", "#554a74"] },
  { name: "Bloom", colors: ["#ce766f", "#d28c73", "#d4a66b", "#a6a676", "#7e9a82", "#7885a0", "#967c9e", "#b47a8e"] },
  { name: "Midnight", colors: ["#a94c46", "#b66a39", "#a58a36", "#70834b", "#3c8071", "#316786", "#334f7d", "#57426f"] },
];

const makePresetLayer = (name, words, paletteIndex = 0, fontSize = 9) => ({
  name,
  words,
  colors: [],
  colorMode: "palette",
  paletteIndex,
  singleColor: themes[paletteIndex].colors[0],
  fontSize,
});

const makePreset = (id, name, category, description, shape, layers, paletteIndex = 0) => ({
  id,
  name,
  category,
  description,
  shape,
  layers: layers.map(([layerName, words, layerPalette = paletteIndex, fontSize = 9]) => (
    makePresetLayer(layerName, words, layerPalette, fontSize)
  )),
  background: "#f6f0e7",
  wordColor: "#fff9ef",
  font: "'DM Sans', sans-serif",
});

const presetLibrary = [
  makePreset("yes-no", "Yes / No", "Everyday", "Quick binary answers", "half", [
    ["Answer", ["No", "Yes"], 0],
  ]),
  makePreset("yes-no-maybe", "Yes / No / Maybe", "Everyday", "Three simple response options", "half", [
    ["Answer", ["No", "Maybe", "Yes"], 2],
  ]),
  makePreset("yes-no-rephrase", "Yes / No / Rephrase", "Everyday", "A pause option for unclear questions", "half", [
    ["Answer", ["No", "Rephrase", "Yes"], 2],
  ]),
  makePreset("four-directions", "Four directions", "Everyday", "North, east, south, and west", "full", [
    ["Direction", ["North", "East", "South", "West"], 1],
  ]),
  makePreset("eight-directions", "Eight directions", "Everyday", "Cardinal and intercardinal points", "full", [
    ["Direction", ["N", "NE", "E", "SE", "S", "SW", "W", "NW"], 1],
  ]),
  makePreset("percentage", "Percentage scale", "Everyday", "Estimate from 0 to 100 percent", "half", [
    ["Percentage", ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"], 0, 8],
  ]),
  makePreset("five-point", "Five-point scale", "Everyday", "Very low through very high", "half", [
    ["Scale", ["Very low", "Low", "Medium", "High", "Very high"], 2],
  ]),
  makePreset("ten-point", "Ten-point scale", "Everyday", "A simple 1-to-10 scale", "half", [
    ["Scale", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], 1],
  ]),
  makePreset("numbers-zero-nine", "Numbers 0–9", "Everyday", "Single-digit number selection", "full", [
    ["Number", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 3],
  ]),
  makePreset("numbers-one-twelve", "Numbers 1–12", "Everyday", "Twelve-number selector", "full", [
    ["Number", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], 1],
  ]),
  makePreset("alphabet", "Alphabet A–Z", "Everyday", "Find a letter or spelling clue", "half", [
    ["Letter", "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), 3, 8],
  ]),
  makePreset("alphabet-groups", "Alphabet by group", "Everyday", "Narrow letters down in three stages", "half", [
    ["Group", ["A–I", "J–R", "S–Z"], 2],
    ["Letter", "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), 3, 8],
  ]),
  makePreset("vowels-consonants", "Vowel or consonant", "Everyday", "Two-step letter sorting", "half", [
    ["Letter type", ["Vowel", "Consonant"], 2],
    ["Vowel", ["A", "E", "I", "O", "U"], 3],
    ["Consonant", "BCDFGHJKLMNPQRSTVWXYZ".split(""), 1, 8],
  ]),
  makePreset("colors", "Color selector", "Everyday", "Choose from common colors", "half", [
    ["Color", ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "White", "Black", "Brown"], 2],
  ]),
  makePreset("elements", "Classical elements", "Symbols & nature", "Earth, water, fire, air, and ether", "full", [
    ["Element", ["Earth", "Water", "Fire", "Air", "Ether"], 0],
  ]),
  makePreset("two-options", "Two-option choice", "Decisions", "Replace with any two options", "half", [
    ["Choice", ["Option A", "Option B"], 1],
  ]),
  makePreset("three-options", "Three-option choice", "Decisions", "Compare three possible paths", "half", [
    ["Choice", ["Option A", "Option B", "Option C"], 2],
  ]),
  makePreset("four-options", "Four-option choice", "Decisions", "Compare four possible paths", "full", [
    ["Choice", ["Option A", "Option B", "Option C", "Option D"], 2],
  ]),
  makePreset("six-options", "Six-option choice", "Decisions", "Compare options A through F", "full", [
    ["Choice", ["A", "B", "C", "D", "E", "F"], 1],
  ]),
  makePreset("decision-check", "Decision check-in", "Decisions", "A reflective pause before choosing", "half", [
    ["Prompt", ["Pause", "Gather info", "Ask for help", "Choose"], 2],
  ]),
  makePreset("next-step", "Next step", "Decisions", "Explore a gentle next action", "half", [
    ["Next step", ["Rest", "Reflect", "Research", "Discuss", "Begin", "Release"], 1],
  ]),
  makePreset("day-of-week", "Days of the week", "Time & cycles", "Seven-day selector", "full", [
    ["Day", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], 0, 8],
  ]),
  makePreset("months", "Months of the year", "Time & cycles", "Twelve-month selector", "full", [
    ["Month", ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 2, 8],
  ]),
  makePreset("time-of-day", "Time of day", "Time & cycles", "Eight broad daily time windows", "full", [
    ["Time", ["Dawn", "Morning", "Midday", "Afternoon", "Dusk", "Evening", "Night", "Late night"], 1, 8],
  ]),
  makePreset("time-window", "Time window", "Time & cycles", "Find a broad planning window", "half", [
    ["When", ["Today", "Tomorrow", "This week", "Next week", "This month", "Later"], 0],
  ]),
  makePreset("seasons", "Four seasons", "Time & cycles", "Spring, summer, autumn, and winter", "full", [
    ["Season", ["Spring", "Summer", "Autumn", "Winter"], 2],
  ]),
  makePreset("moon-phases", "Moon phases", "Time & cycles", "Eight familiar lunar phases", "full", [
    ["Phase", ["New", "Waxing crescent", "First quarter", "Waxing gibbous", "Full", "Waning gibbous", "Last quarter", "Waning crescent"], 3, 8],
  ]),
  makePreset("reflection-focus", "Reflection focus", "Self-reflection", "Choose a journal prompt theme", "half", [
    ["Focus", ["Gratitude", "Boundaries", "Change", "Rest", "Connection", "Creativity", "Courage", "Acceptance"], 2],
  ]),
  makePreset("values", "Personal values", "Self-reflection", "Explore values that feel important", "half", [
    ["Value", ["Belonging", "Curiosity", "Freedom", "Honesty", "Kindness", "Learning", "Play", "Purpose", "Security", "Service", "Trust", "Wisdom"], 1, 8],
  ]),
  makePreset("needs", "Needs check-in", "Self-reflection", "Name a need to reflect on", "half", [
    ["Need", ["Rest", "Space", "Support", "Movement", "Food", "Water", "Quiet", "Connection", "Boundaries", "Play"], 2],
  ]),
  makePreset("feelings", "Feelings wheel", "Self-reflection", "A small vocabulary for noticing feelings", "half", [
    ["Feeling", ["Calm", "Curious", "Hopeful", "Joyful", "Tender", "Tired", "Worried", "Frustrated", "Sad", "Overwhelmed", "Unsure", "Grateful"], 2, 8],
  ]),
  makePreset("communication", "Communication approach", "Self-reflection", "Consider what kind of conversation may help", "half", [
    ["Approach", ["Listen", "Ask", "Share", "Clarify", "Pause", "Set a boundary"], 1],
  ]),
  makePreset("intentions", "Intention setting", "Self-reflection", "Choose a theme for your next intention", "half", [
    ["Intention", ["Patience", "Presence", "Courage", "Kindness", "Focus", "Balance", "Trust", "Joy"], 0],
  ]),
  makePreset("self-care", "Self-care menu", "Wellbeing", "Everyday restorative activities", "half", [
    ["Care idea", ["Rest", "Walk", "Stretch", "Create", "Connect", "Tidy", "Read", "Breathe"], 2],
  ]),
  makePreset("energy-check", "Energy check-in", "Wellbeing", "Reflect on how your energy feels", "half", [
    ["Energy", ["Very low", "Low", "Steady", "Good", "High"], 1],
  ]),
  makePreset("mood-check", "Mood check-in", "Wellbeing", "A gentle, non-clinical mood reflection", "half", [
    ["Mood", ["Settled", "Bright", "Tender", "Restless", "Low", "Mixed"], 2],
  ]),
  makePreset("body-awareness", "Body awareness", "Wellbeing", "Notice an area to check in with gently", "half", [
    ["Area", ["Head", "Shoulders", "Chest", "Belly", "Back", "Hands", "Legs", "Whole body"], 1],
  ]),
  makePreset("chakra-reflection", "Chakra reflection", "Wellbeing", "Seven traditional chakra names for reflection", "full", [
    ["Focus", ["Root", "Sacral", "Solar plexus", "Heart", "Throat", "Third eye", "Crown"], 3, 8],
  ]),
  makePreset("balance-check", "Balance check-in", "Wellbeing", "Reflect across everyday life areas", "half", [
    ["Area", ["Rest", "Work", "Play", "Health", "Learning", "Home", "Friends", "Nature"], 0],
  ]),
  makePreset("natural-world", "Natural world", "Symbols & nature", "Explore familiar nature themes", "full", [
    ["Theme", ["Mountain", "River", "Forest", "Ocean", "Sky", "Garden", "Desert", "Meadow"], 1],
  ]),
  makePreset("directions-elements", "Directions & elements", "Symbols & nature", "Pair directions with classical elements", "full", [
    ["Direction", ["North", "East", "South", "West"], 1],
    ["Element", ["Earth", "Air", "Fire", "Water"], 0],
  ]),
  makePreset("symbolic-animals", "Animal symbols", "Symbols & nature", "A customizable set of animal names", "half", [
    ["Animal", ["Bear", "Butterfly", "Deer", "Dolphin", "Fox", "Hawk", "Owl", "Wolf"], 2],
  ]),
  makePreset("tarot-suits", "Tarot suits", "Symbols & nature", "Four suits of the tarot minor arcana", "full", [
    ["Suit", ["Wands", "Cups", "Swords", "Pentacles"], 3],
  ]),
  makePreset("crystal-families", "Crystal families", "Symbols & nature", "A small, editable crystal-name selector", "half", [
    ["Stone", ["Amethyst", "Clear quartz", "Citrine", "Jade", "Labradorite", "Moonstone", "Rose quartz", "Tiger's eye"], 1],
  ]),
  makePreset("reflection-three", "Past / present / possibility", "Self-reflection", "A three-part reflective prompt, not prediction", "half", [
    ["Perspective", ["Past", "Present", "Possibility"], 2],
  ]),
];

const state = {
  layers: structuredClone(initialLayers),
  activeLayer: 1,
  shape: "half",
  activePreset: null,
  background: "#f6f0e7",
  backgroundCustomized: false,
  wordColor: "#fff9ef",
  font: "'DM Sans', sans-serif",
  theme: document.documentElement.dataset.theme || "light",
};

const chart = document.querySelector("#chart");
const layerList = document.querySelector("#layer-list");
const layerEditor = document.querySelector("#layer-editor");
const stage = document.querySelector("#chart-stage");
const toast = document.querySelector("#toast");
let toastTimer;

function chartBackground() {
  if (state.backgroundCustomized) return state.background;
  if (state.theme === "mystical") return "#211b2d";
  return state.theme === "dark" ? "#252525" : state.background;
}

function drawMysticalExportBackground(context, width, height) {
  const sky = context.createLinearGradient(0, 0, width, height);
  sky.addColorStop(0, "#0b0816");
  sky.addColorStop(0.48, "#171027");
  sky.addColorStop(1, "#100b1b");
  context.fillStyle = sky;
  context.fillRect(0, 0, width, height);

  const nebulae = [
    { x: 0.18, y: 0.2, radius: 0.48, color: "rgba(130, 76, 164, .34)" },
    { x: 0.79, y: 0.52, radius: 0.43, color: "rgba(55, 91, 157, .26)" },
    { x: 0.56, y: 0.92, radius: 0.4, color: "rgba(105, 57, 132, .2)" },
    { x: 0.39, y: 0.53, radius: 0.34, color: "rgba(132, 91, 171, .16)" },
    { x: 0.91, y: 0.18, radius: 0.3, color: "rgba(94, 122, 190, .13)" },
  ];
  nebulae.forEach(({ x, y, radius, color }) => {
    const centerX = x * width;
    const centerY = y * height;
    const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * Math.max(width, height));
    glow.addColorStop(0, color);
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
  });

  const milkyWay = context.createLinearGradient(0, height * 0.9, width, height * 0.1);
  milkyWay.addColorStop(0.2, "rgba(177, 143, 211, 0)");
  milkyWay.addColorStop(0.49, "rgba(202, 169, 220, .075)");
  milkyWay.addColorStop(0.58, "rgba(111, 146, 206, .045)");
  milkyWay.addColorStop(0.76, "rgba(177, 143, 211, 0)");
  context.fillStyle = milkyWay;
  context.fillRect(0, 0, width, height);

  let seed = 20261026;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const starCount = Math.round(width * height / 900);
  for (let index = 0; index < starCount; index += 1) {
    const x = random() * width;
    const y = random() * height;
    const radius = random() > 0.94 ? 1.8 : random() > 0.72 ? 1.1 : 0.65;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = random() > 0.45 ? "rgba(255, 247, 230, .8)" : "rgba(224, 211, 255, .76)";
    context.fill();
  }
}

function polar(cx, cy, radius, angle) {
  const radians = angle * Math.PI / 180;
  return { x: cx + Math.cos(radians) * radius, y: cy - Math.sin(radians) * radius };
}

function sectorPath(cx, cy, innerRadius, outerRadius, startAngle, endAngle) {
  const outerStart = polar(cx, cy, outerRadius, startAngle);
  const outerEnd = polar(cx, cy, outerRadius, endAngle);
  const innerEnd = polar(cx, cy, innerRadius, endAngle);
  const innerStart = polar(cx, cy, innerRadius, startAngle);
  if (Math.abs(endAngle - startAngle) >= 359.999) {
    const outerOpposite = polar(cx, cy, outerRadius, startAngle - 180);
    const innerOpposite = polar(cx, cy, innerRadius, startAngle - 180);
    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerRadius} ${outerRadius} 0 0 1 ${outerOpposite.x} ${outerOpposite.y}`,
      `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${innerRadius} ${innerRadius} 0 0 0 ${innerOpposite.x} ${innerOpposite.y}`,
      `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`,
      "Z",
    ].join(" ");
  }
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function svgElement(name, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
  return element;
}

function wrapLabel(text, maxCharacters) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";

  for (const word of words) {
    if (word.length > maxCharacters) {
      if (line) {
        lines.push(line);
        line = "";
      }
      for (let start = 0; start < word.length; start += maxCharacters) {
        lines.push(word.slice(start, start + maxCharacters));
      }
      continue;
    }

    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxCharacters && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function isYesNoLayer(layer) {
  return layer.words.length === 2
    && layer.words.some((word) => word.trim().toLowerCase() === "yes")
    && layer.words.some((word) => word.trim().toLowerCase() === "no");
}

function interpolateColor(start, end, amount) {
  const from = Number.parseInt(start.slice(1), 16);
  const to = Number.parseInt(end.slice(1), 16);
  const channel = (shift) => Math.round(
    ((from >> shift) & 255) * (1 - amount) + ((to >> shift) & 255) * amount,
  );
  return `#${[channel(16), channel(8), channel(0)].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function paletteColors(paletteIndex, count) {
  const stops = themes[paletteIndex].colors;
  return Array.from({ length: count }, (_, index) => {
    if (count <= 1) return stops[0];
    const position = index / (count - 1) * (stops.length - 1);
    const stopIndex = Math.floor(position);
    const nextIndex = Math.min(stops.length - 1, stopIndex + 1);
    return interpolateColor(stops[stopIndex], stops[nextIndex], position - stopIndex);
  });
}

function colorsForLayer(layer) {
  if (isYesNoLayer(layer)) {
    return layer.words.map((word) => word.trim().toLowerCase() === "no" ? "#dc685d" : "#91c879");
  }
  if (layer.colorMode === "single") {
    if (layer.preserveSampleColors) return layer.colors;
    return layer.words.map(() => layer.singleColor ?? "#71805b");
  }
  if (layer.colorMode === "palette") return paletteColors(layer.paletteIndex ?? 0, layer.words.length);
  return layer.colors;
}

function renderChart() {
  chart.replaceChildren();
  chart.style.fontFamily = state.font;
  const fullCircle = state.shape === "full";
  const cx = 380;
  const cy = fullCircle ? 335 : 386;
  const outerRadius = 315;
  const innerRadius = 56;
  const angleSweep = fullCircle ? 360 : 180;
  chart.setAttribute("viewBox", fullCircle ? "0 0 760 720" : "0 0 760 440");
  stage.classList.toggle("full-circle", fullCircle);
  chart.setAttribute("aria-label", `Your customizable ${fullCircle ? "full" : "half"} circle pendulum chart`);
  document.querySelector("#shape-half").classList.toggle("active", !fullCircle);
  document.querySelector("#shape-half").setAttribute("aria-pressed", String(!fullCircle));
  document.querySelector("#shape-full").classList.toggle("active", fullCircle);
  document.querySelector("#shape-full").setAttribute("aria-pressed", String(fullCircle));
  const layerWeights = state.layers.map((layer) => {
    const words = layer.words.filter(Boolean);
    const longestWord = words.reduce((longest, word) => Math.max(longest, word.length), 0);
    return 0.3
      + 0.035 * longestWord * ((layer.fontSize ?? 9) / 9)
      + 0.02 * Math.sqrt(words.length);
  });
  const totalWeight = layerWeights.reduce((total, weight) => total + weight, 0);
  let ringStart = innerRadius;
  const outline = fullCircle
    ? svgElement("circle", {
      cx, cy, r: outerRadius, fill: "none",
      stroke: "rgba(50, 47, 40, .38)", "stroke-width": "1.5",
    })
    : svgElement("path", {
      d: `M ${cx - outerRadius} ${cy} A ${outerRadius} ${outerRadius} 0 0 1 ${cx + outerRadius} ${cy}`,
      fill: "none",
      stroke: "rgba(50, 47, 40, .38)",
      "stroke-width": "1.5",
    });
  chart.append(outline);

  state.layers.forEach((layer, layerIndex) => {
    const r0 = ringStart;
    const ringSize = (outerRadius - innerRadius) * layerWeights[layerIndex] / totalWeight;
    const r1 = r0 + ringSize;
    const segmentSize = angleSweep / layer.words.length;
    const layerColors = colorsForLayer(layer);
    layer.words.forEach((word, index) => {
      const startAngle = (fullCircle ? 90 : 180) - index * segmentSize;
      const endAngle = (fullCircle ? 90 : 180) - (index + 1) * segmentSize;
      const fill = layerColors[index % layerColors.length] || "#71805b";
      const wedge = svgElement("path", {
        d: sectorPath(cx, cy, r0, r1, startAngle, endAngle),
        fill,
        stroke: "rgba(40, 39, 33, .68)",
        "stroke-width": layerIndex === 0 ? "2.2" : "1.5",
        "stroke-linejoin": "round",
      });
      chart.append(wedge);

      const midAngle = (startAngle + endAngle) / 2;
      const midRadius = (r0 + r1) / 2;
      const tangentSpan = Math.max(0, 2 * midRadius * Math.sin(segmentSize * Math.PI / 360) - 8);
      const radialSpan = Math.max(0, ringSize - 10);
      const fontSize = layer.fontSize ?? 9;
      const estimatedWidth = word.length * fontSize * 0.56;
      const frequencyLabels = /frequenc/i.test(layer.name);
      const useTangent = !frequencyLabels && tangentSpan >= 42 && estimatedWidth <= tangentSpan;
      const labelRadius = useTangent ? midRadius : r1 - fontSize * 0.7;
      const position = polar(cx, cy, labelRadius, midAngle);
      const normalizedMidAngle = ((midAngle + 180) % 360 + 360) % 360 - 180;
      let labelAngle;
      let textAnchor;
      if (fullCircle) {
        labelAngle = useTangent
          ? 90 - midAngle
          : (normalizedMidAngle <= 90 && normalizedMidAngle >= -90
            ? -normalizedMidAngle
            : 180 - normalizedMidAngle);
        while (labelAngle > 90) labelAngle -= 180;
        while (labelAngle < -90) labelAngle += 180;
        textAnchor = useTangent
          ? "middle"
          : (normalizedMidAngle <= 90 && normalizedMidAngle >= -90 ? "end" : "start");
      } else {
        labelAngle = useTangent
          ? 90 - midAngle
          : (midAngle <= 90 ? -midAngle : 180 - midAngle);
        textAnchor = !useTangent
          ? (midAngle <= 90 ? "end" : "start")
          : "middle";
      }
      const labelSpan = useTangent ? tangentSpan : radialSpan;
      const lines = useTangent ? [word] : wrapLabel(word, Math.max(1, Math.floor(labelSpan / (fontSize * 0.56))));
      const label = svgElement("text", {
        x: position.x,
        y: position.y,
        fill: state.wordColor,
        "font-size": fontSize,
        "font-weight": "500",
        "letter-spacing": ".1",
        "text-anchor": textAnchor,
        "dominant-baseline": "middle",
        transform: `rotate(${labelAngle} ${position.x} ${position.y})`,
      });
      lines.forEach((line, lineIndex) => {
        const tspan = svgElement("tspan", {
          x: position.x,
          dy: lineIndex === 0
            ? `${-((lines.length - 1) * fontSize * 0.55) / 2}px`
            : `${fontSize * 0.55}px`,
        });
        tspan.textContent = line;
        label.append(tspan);
      });
      chart.append(label);
    });

    const band = fullCircle
      ? svgElement("circle", { cx, cy, r: r0, fill: "none", stroke: "rgba(37, 36, 31, .18)", "stroke-width": "1" })
      : svgElement("path", {
        d: `M ${cx - r0} ${cy} A ${r0} ${r0} 0 0 1 ${cx + r0} ${cy}`,
        fill: "none",
        stroke: "rgba(37, 36, 31, .18)",
        "stroke-width": "1",
      });
    chart.append(band);
    ringStart = r1;
  });

  const hub = fullCircle
    ? svgElement("circle", { cx, cy, r: innerRadius, fill: "#f1eee5", stroke: "rgba(40, 39, 33, .68)", "stroke-width": "1.5" })
    : svgElement("path", {
      d: `M ${cx - 56} ${cy} A 56 56 0 0 1 ${cx + 56} ${cy} L ${cx - 56} ${cy} Z`,
      fill: "#f1eee5",
      stroke: "rgba(40, 39, 33, .68)",
      "stroke-width": "1.5",
    });
  chart.append(hub);
  const hubText = svgElement("text", {
    x: cx,
    y: fullCircle ? cy - 5 : cy - 20,
    fill: "#596448",
    "font-size": "14",
    "font-family": "'Playfair Display', serif",
    "font-style": "italic",
    "text-anchor": "middle",
  });
  hubText.textContent = "breathe";
  chart.append(hubText);
  const hubOrnament = svgElement("g", {
    stroke: "#a58e68",
    "stroke-width": ".55",
    "stroke-linecap": "round",
  });
  hubOrnament.append(
    svgElement("path", {
      d: fullCircle
        ? `M ${cx} ${cy + 6} V ${cy + 14} M ${cx - 4} ${cy + 10} H ${cx + 4} M ${cx - 3} ${cy + 7} L ${cx + 3} ${cy + 13} M ${cx + 3} ${cy + 7} L ${cx - 3} ${cy + 13}`
        : `M ${cx} ${cy - 14} V ${cy - 6} M ${cx - 4} ${cy - 10} H ${cx + 4} M ${cx - 3} ${cy - 13} L ${cx + 3} ${cy - 7} M ${cx + 3} ${cy - 13} L ${cx - 3} ${cy - 7}`,
    }),
    svgElement("circle", { cx, cy: fullCircle ? cy + 10 : cy - 10, r: "1", fill: "#a58e68", stroke: "none" }),
  );
  chart.append(hubOrnament);

  const brandMark = svgElement("g", {
    fill: "none",
    stroke: "#71805b",
    "stroke-width": "1.2",
    "stroke-linecap": "round",
  });
  const chartBottom = fullCircle ? cy + outerRadius : cy;
  const brandY = chartBottom + 20;
  const brandX = cx - 22;
  const brandMarkSize = 7;
  brandMark.append(
    svgElement("circle", { cx: brandX, cy: brandY, r: brandMarkSize }),
    svgElement("path", { d: `M ${brandX} ${brandY - brandMarkSize} V ${brandY + brandMarkSize} M ${brandX - brandMarkSize} ${brandY} H ${brandX + brandMarkSize} M ${brandX - brandMarkSize + 2} ${brandY - brandMarkSize + 2} L ${brandX + brandMarkSize - 2} ${brandY + brandMarkSize - 2} M ${brandX + brandMarkSize - 2} ${brandY - brandMarkSize + 2} L ${brandX - brandMarkSize + 2} ${brandY + brandMarkSize - 2}` }),
    svgElement("circle", { cx: brandX, cy: brandY, r: "1.5", fill: "#71805b", stroke: "none" }),
  );
  chart.append(brandMark);

  const brandName = svgElement("text", {
    x: cx - 10,
    y: brandY + 4,
    fill: state.theme !== "light" ? "#f2f2ee" : "#34372f",
    "font-size": "13",
    "font-family": "'Manrope', sans-serif",
    "font-weight": "700",
    "letter-spacing": "-.5",
  });
  brandName.textContent = "orbit.";
  chart.append(brandName);

  const brandSlogan = svgElement("text", {
    x: cx,
    y: brandY + 24,
    fill: state.theme !== "light" ? "#c8bdd7" : "#777970",
    "font-size": "7",
    "font-family": "'DM Sans', sans-serif",
    "letter-spacing": ".8",
    "text-anchor": "middle",
  });
  brandSlogan.textContent = "A LITTLE CLARITY, ONE QUESTION AT A TIME";
  chart.append(brandSlogan);

  const words = state.layers.reduce((sum, layer) => sum + layer.words.filter(Boolean).length, 0);
  document.querySelector("#word-count").textContent = `${words} words · ${state.layers.length} ${state.layers.length === 1 ? "layer" : "layers"} · ${fullCircle ? "full" : "half"} circle`;
  stage.style.setProperty("--chart-bg", chartBackground());
}

function renderLayerControls() {
  layerList.replaceChildren();
  state.layers.forEach((layer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `layer-tab${state.activeLayer === index ? " active" : ""}`;
    button.setAttribute("aria-pressed", String(state.activeLayer === index));
    button.innerHTML = `<span>${escapeHTML(layer.name)}</span><span class="tab-count">${layer.words.length}</span>`;
    button.addEventListener("click", () => {
      state.activeLayer = index;
      renderLayerControls();
      renderThemes();
    });
    layerList.append(button);
  });

  const active = state.layers[state.activeLayer];
  if (!active) return;
  layerEditor.replaceChildren();

  const nameInput = document.createElement("input");
  nameInput.className = "layer-name-input";
  nameInput.type = "text";
  nameInput.maxLength = 28;
  nameInput.value = active.name;
  nameInput.setAttribute("aria-label", "Layer name");
  nameInput.addEventListener("input", () => {
    active.name = nameInput.value.trim() || "Untitled";
    const tab = layerList.children[state.activeLayer];
    if (tab) tab.firstElementChild.textContent = active.name;
    const styleOption = document.querySelector("#style-layer-select").options[state.activeLayer];
    if (styleOption) styleOption.textContent = active.name;
    renderChart();
  });

  const textarea = document.createElement("textarea");
  textarea.className = "words-input";
  textarea.value = active.words.join(", ");
  textarea.setAttribute("aria-label", `Words in ${active.name} layer`);
  textarea.placeholder = "Type words separated by commas";
  textarea.addEventListener("input", () => {
    const entries = textarea.value.split(/[\n,]/).map((word) => word.trim()).filter(Boolean).slice(0, 60);
    active.words = entries.length ? entries : [""];
    active.colors = active.words.map((_, index) => active.colors[index] || themes[1].colors[index % themes[1].colors.length]);
    const tab = layerList.children[state.activeLayer];
    if (tab) tab.lastElementChild.textContent = active.words.filter(Boolean).length;
    renderLayerSizeControl(active);
    renderThemes();
    renderChart();
  });

  const hint = document.createElement("div");
  hint.className = "input-hint";
  const hintText = document.createElement("span");
  hintText.textContent = "Separate words with commas";
  hint.append(hintText);
  if (state.layers.length > 1) {
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-layer";
    remove.textContent = "Remove layer";
    remove.addEventListener("click", () => {
      state.layers.splice(state.activeLayer, 1);
      state.activeLayer = Math.max(0, state.activeLayer - 1);
      renderLayerControls();
      renderThemes();
      renderChart();
    });
    hint.append(remove);
  }
  layerEditor.append(nameInput, textarea, hint);
  renderLayerSizeControl(active);
}

function renderLayerSizeControl(layer) {
  const existing = layerEditor.querySelector(".layer-size-controls");
  if (existing) existing.remove();

  const controls = document.createElement("div");
  controls.className = "layer-size-controls";

  const label = document.createElement("label");
  label.className = "layer-size-label";
  label.htmlFor = "layer-size-range";
  label.textContent = `Word size · ${layer.name}`;

  const rangeRow = document.createElement("div");
  rangeRow.className = "layer-size-range-row";
  const range = document.createElement("input");
  range.type = "range";
  range.min = "6";
  range.max = "16";
  range.step = "1";
  range.id = "layer-size-range";
  range.value = String(layer.fontSize ?? 9);
  range.setAttribute("aria-label", `Word size for ${layer.name} layer`);
  const value = document.createElement("output");
  value.className = "layer-size-value";
  value.textContent = `${range.value}px`;

  range.addEventListener("input", () => {
    layer.fontSize = Number(range.value);
    value.textContent = `${range.value}px`;
    renderChart();
  });

  rangeRow.append(range, value);
  controls.append(label, rangeRow);
  layerEditor.append(controls);
}

function renderThemes() {
  const layerSelect = document.querySelector("#style-layer-select");
  layerSelect.replaceChildren();
  state.layers.forEach((layer, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = layer.name;
    layerSelect.append(option);
  });
  state.activeLayer = Math.min(state.activeLayer, state.layers.length - 1);
  layerSelect.value = String(state.activeLayer);
  layerSelect.onchange = () => {
    state.activeLayer = Number(layerSelect.value);
    renderLayerControls();
    renderThemes();
  };

  const active = state.layers[state.activeLayer];
  const binary = isYesNoLayer(active);
  active.singleColor ??= active.colors[Math.floor(active.colors.length / 2)] ?? "#71805b";
  const selectSingleColor = () => {
    if (active.preserveSampleColors) {
      active.singleColor = active.colors[Math.floor(active.colors.length / 2)] ?? "#71805b";
    }
    active.colorMode = "single";
    active.preserveSampleColors = false;
  };

  const container = document.querySelector("#style-swatches");
  container.replaceChildren();
  themes.forEach((theme, index) => {
    const button = document.createElement("button");
    button.type = "button";
    const isSelected = !binary && active.colorMode === "palette" && active.paletteIndex === index;
    button.className = `theme-swatch${isSelected ? " selected" : ""}`;
    button.setAttribute("aria-pressed", String(isSelected));
    button.style.setProperty("--swatch", `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[Math.floor(theme.colors.length / 2)]} 48%, ${theme.colors[theme.colors.length - 1]})`);
    button.setAttribute("aria-label", `${theme.name} chart colors`);
    button.setAttribute("title", theme.name);
    button.disabled = binary;
    button.addEventListener("click", () => {
      if (binary) return;
      active.colorMode = "palette";
      active.paletteIndex = index;
      active.preserveSampleColors = false;
      renderChart();
      renderThemes();
    });
    container.append(button);
  });

  const customOption = document.createElement("div");
  customOption.className = "custom-color-option";
  const customButton = document.createElement("button");
  customButton.type = "button";
  customButton.className = `theme-swatch custom-color-swatch${!binary && active.colorMode === "single" ? " selected" : ""}`;
  customButton.setAttribute("aria-pressed", String(!binary && active.colorMode === "single"));
  customButton.style.setProperty("--swatch", active.singleColor);
  customButton.setAttribute("aria-label", "One color");
  customButton.setAttribute("title", "One color");
  customButton.disabled = binary;
  const customPicker = document.createElement("input");
  customPicker.type = "color";
  customPicker.value = active.singleColor;
  customPicker.setAttribute("aria-label", "Choose one color for this layer");
  customPicker.disabled = binary;
  customPicker.addEventListener("click", (event) => {
    event.stopPropagation();
    selectSingleColor();
    customPicker.value = active.singleColor;
    customButton.style.setProperty("--swatch", active.singleColor);
    customButton.classList.add("selected");
    customButton.setAttribute("aria-pressed", "true");
    container.querySelectorAll(".theme-swatch:not(.custom-color-swatch)").forEach((paletteButton) => {
      paletteButton.classList.remove("selected");
      paletteButton.setAttribute("aria-pressed", "false");
    });
    renderChart();
  });
  customPicker.addEventListener("input", () => {
    active.singleColor = customPicker.value;
    active.colorMode = "single";
    active.preserveSampleColors = false;
    customButton.style.setProperty("--swatch", active.singleColor);
    customButton.classList.add("selected");
    customButton.setAttribute("aria-pressed", "true");
    container.querySelectorAll(".theme-swatch:not(.custom-color-swatch)").forEach((paletteButton) => {
      paletteButton.classList.remove("selected");
      paletteButton.setAttribute("aria-pressed", "false");
    });
    renderChart();
  });
  customButton.addEventListener("click", () => {
    if (binary) return;
    selectSingleColor();
    renderChart();
    renderThemes();
  });
  customButton.append(customPicker);
  const customLabel = document.createElement("span");
  customLabel.className = "custom-color-label";
  customLabel.textContent = "One color";
  customOption.append(customButton, customLabel);
  container.append(customOption);

  document.querySelector("#style-swatches").setAttribute("aria-label", "Color palettes for selected layer.");
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2400);
}

function renderPresets() {
  const grid = document.querySelector("#preset-grid");
  const search = document.querySelector("#preset-search").value.trim().toLowerCase();
  const category = document.querySelector("#preset-category").value;
  const matches = presetLibrary.filter((preset) => {
    const searchableText = [
      preset.name,
      preset.category,
      preset.description,
      ...preset.layers.flatMap((layer) => [layer.name, ...layer.words]),
    ].join(" ").toLowerCase();
    return (category === "all" || preset.category === category) && searchableText.includes(search);
  });
  grid.replaceChildren();
  document.querySelector("#preset-count").textContent = `${matches.length} of ${presetLibrary.length} presets`;
  if (!matches.length) {
    const empty = document.createElement("p");
    empty.className = "preset-empty";
    empty.textContent = "No presets match. Try a different search or category.";
    grid.append(empty);
    return;
  }
  matches.forEach((preset) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `preset-card${state.activePreset === preset.id ? " selected" : ""}`;
    button.setAttribute("aria-pressed", String(state.activePreset === preset.id));
    button.title = `${preset.description} · ${preset.category}`;
    const name = document.createElement("span");
    name.className = "preset-card-title";
    name.textContent = preset.name;
    const meta = document.createElement("span");
    meta.className = "preset-card-meta";
    meta.textContent = `${preset.category} · ${preset.shape === "full" ? "Full" : "Half"} circle`;
    button.append(name, meta);
    button.addEventListener("click", () => applyPreset(preset));
    grid.append(button);
  });
}

function applyPreset(preset) {
  state.layers = structuredClone(preset.layers);
  state.activeLayer = 0;
  state.shape = preset.shape;
  state.background = preset.background;
  state.backgroundCustomized = false;
  state.wordColor = preset.wordColor;
  state.font = preset.font;
  state.activePreset = preset.id;
  document.querySelector("#background-color").value = chartBackground();
  document.querySelector("#background-value").textContent = chartBackground().toUpperCase();
  document.querySelector("#word-color").value = state.wordColor;
  document.querySelector("#word-value").textContent = state.wordColor.toUpperCase();
  document.querySelector("#font-select").value = state.font;
  document.querySelector("#preset-status").textContent = `${preset.name} loaded into the live preview. Edit its layers and styles below.`;
  if (presetDialog.open) presetDialog.close();
  renderPresets();
  renderLayerControls();
  renderThemes();
  renderChart();
}

const presetCategorySelect = document.querySelector("#preset-category");
const presetCategories = [...new Set(presetLibrary.map((preset) => preset.category))];
presetCategories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  presetCategorySelect.append(option);
});
document.querySelector("#preset-search").addEventListener("input", renderPresets);
presetCategorySelect.addEventListener("change", renderPresets);
renderPresets();

const presetDialog = document.querySelector("#preset-dialog");
const openPresetDialog = () => {
  presetDialog.showModal();
  document.querySelector("#preset-search").focus();
};
document.querySelector("#browse-presets").addEventListener("click", openPresetDialog);
document.querySelector("#preset-close").addEventListener("click", () => presetDialog.close());
presetDialog.addEventListener("click", (event) => {
  if (event.target === presetDialog) presetDialog.close();
});

function updateColorInput(inputId, valueId, key) {
  const input = document.querySelector(inputId);
  input.addEventListener("input", () => {
    state[key] = input.value;
    if (key === "background") state.backgroundCustomized = true;
    document.querySelector(valueId).textContent = input.value.toUpperCase();
    renderChart();
  });
}

function updateThemeButton() {
  const nextTheme = { light: "dark", dark: "mystical", mystical: "light" }[state.theme];
  const button = document.querySelector("#theme-toggle");
  const labels = { light: "Dark mode", dark: "Mystical mode", mystical: "Light mode" };
  const ariaLabels = { light: "Switch to dark mode", dark: "Switch to mystical mode", mystical: "Switch to light mode" };
  const icons = {
    dark: '<path d="M16.8 12.1A7 7 0 0 1 7.9 3.2a7.1 7.1 0 1 0 8.9 8.9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    light: '<circle cx="10" cy="10" r="3.2" stroke="currentColor" stroke-width="1.5"/><path d="M10 1.8v2m0 12.4v2M1.8 10h2m12.4 0h2M4.2 4.2l1.4 1.4m8.8 8.8 1.4 1.4m0-11.6-1.4 1.4m-8.8 8.8-1.4 1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    mystical: '<path d="m10 1.8 1.7 5.5 5.5 1.7-5.5 1.7-1.7 5.5-1.7-5.5L2.8 9l5.5-1.7L10 1.8Z" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/><path d="m16.2 13.8.8 2.3 2.2.8-2.2.8-.8 2.3-.8-2.3-2.2-.8 2.2-.8.8-2.3Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>',
  };
  button.setAttribute("aria-pressed", String(state.theme !== "light"));
  button.setAttribute("aria-label", ariaLabels[state.theme]);
  button.querySelector("span").textContent = labels[state.theme];
  button.querySelector("svg").innerHTML = icons[nextTheme];
}

function setTheme(theme) {
  state.theme = theme;
  if (theme === "light") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = {
    light: "#f4f2ed", dark: "#181818", mystical: "#100d1b",
  }[theme];
  try {
    localStorage.setItem("orbit-theme", theme);
  } catch {}
  updateThemeButton();
  document.querySelector("#background-color").value = chartBackground();
  document.querySelector("#background-value").textContent = chartBackground().toUpperCase();
}

document.querySelector("#theme-toggle").addEventListener("click", () => {
  const nextTheme = { light: "dark", dark: "mystical", mystical: "light" }[state.theme];
  setTheme(nextTheme);
  renderChart();
});

document.querySelector("#shape-half").addEventListener("click", () => {
  state.shape = "half";
  renderChart();
});
document.querySelector("#shape-full").addEventListener("click", () => {
  state.shape = "full";
  renderChart();
});

document.querySelector("#add-layer-button").addEventListener("click", () => {
  if (state.layers.length >= 6) {
    showToast("You can add up to 6 chart layers.");
    return;
  }
  state.layers.push({ name: `Layer ${state.layers.length + 1}`, words: ["New word"], colors: ["#a83d2d"], fontSize: 9, singleColor: "#71805b", colorMode: "palette", paletteIndex: 0 });
  state.activeLayer = state.layers.length - 1;
  renderLayerControls();
  renderThemes();
  renderChart();
});

updateColorInput("#background-color", "#background-value", "background");
updateColorInput("#word-color", "#word-value", "wordColor");
document.querySelector("#font-select").addEventListener("change", (event) => {
  state.font = event.target.value;
  renderChart();
});

document.querySelector("#reset-button").addEventListener("click", () => {
  state.layers = structuredClone(initialLayers);
  state.activeLayer = 1;
  state.shape = "half";
  state.activePreset = null;
  state.background = "#f6f0e7";
  state.backgroundCustomized = false;
  state.wordColor = "#fff9ef";
  state.font = "'DM Sans', sans-serif";
  document.querySelector("#background-color").value = chartBackground();
  document.querySelector("#background-value").textContent = chartBackground().toUpperCase();
  document.querySelector("#word-color").value = state.wordColor;
  document.querySelector("#word-value").textContent = state.wordColor.toUpperCase();
  document.querySelector("#font-select").value = state.font;
  renderLayerControls();
  renderThemes();
  renderChart();
  document.querySelector("#preset-status").textContent = "Example chart restored. Choose any preset to start from it.";
  renderPresets();
  showToast("Example chart restored.");
});

document.querySelector("#export-button").addEventListener("click", async () => {
  const svg = chart.cloneNode(true);
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const exportWidth = 1520;
  const viewBox = svg.getAttribute("viewBox").split(/\s+/).map(Number);
  const fullCircle = state.shape === "full";
  if (fullCircle) {
    const chartArtwork = svgElement("g", { transform: "translate(0 40)" });
    while (svg.firstChild) chartArtwork.append(svg.firstChild);
    svg.append(chartArtwork);
    viewBox[0] = -160;
    viewBox[2] = 1080;
    viewBox[3] = 760;
    svg.setAttribute("viewBox", viewBox.join(" "));
  }
  const captionColor = state.theme === "mystical"
    ? "rgba(242, 230, 205, .78)"
    : (state.theme === "dark" ? "rgba(238, 235, 222, .68)" : "rgba(55, 53, 45, .55)");
  const captionX = viewBox[0] + 8.5;
  const caption = svgElement("g", { transform: `translate(${captionX} 7.5)` });
  caption.append(
    svgElement("path", {
      d: "M 8 1.5v13M 1.5 8h13M 3.4 3.4l9.2 9.2m0-9.2-9.2 9.2",
      fill: "none",
      stroke: state.theme === "mystical" ? "#d5b77b" : "#a28764",
      "stroke-width": "0.55",
      "stroke-linecap": "round",
      transform: "scale(.75)",
    }),
    svgElement("text", {
      x: 17,
      y: 11.5,
      fill: captionColor,
      "font-family": "'Playfair Display', serif",
      "font-size": "12",
      "font-style": "italic",
    }),
  );
  caption.lastElementChild.textContent = "A little clarity, one question at a time.";
  svg.append(caption);
  const exportHeight = Math.round(exportWidth * viewBox[3] / viewBox[2]);
  svg.setAttribute("width", String(exportWidth));
  svg.setAttribute("height", String(exportHeight));
  const svgData = new XMLSerializer().serializeToString(svg);
  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = exportWidth;
    canvas.height = exportHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      showToast("Could not create the chart image.");
      return;
    }
    if (state.theme === "mystical") {
      drawMysticalExportBackground(context, canvas.width, canvas.height);
    } else {
      context.fillStyle = chartBackground();
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) {
        showToast("Could not export the chart image.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "my-pendulum-chart.png";
      link.click();
      URL.revokeObjectURL(url);
      showToast("Your chart was downloaded.");
    }, "image/png");
  };
  image.onerror = () => showToast("Could not export the chart. Please try again.");
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
});

renderThemes();
renderLayerControls();
updateThemeButton();
document.querySelector("#background-color").value = chartBackground();
document.querySelector("#background-value").textContent = chartBackground().toUpperCase();
renderChart();
