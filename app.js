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

const state = {
  layers: structuredClone(initialLayers),
  activeLayer: 1,
  background: "#f6f0e7",
  wordColor: "#fff9ef",
  font: "'DM Sans', sans-serif",
};

const chart = document.querySelector("#chart");
const layerList = document.querySelector("#layer-list");
const layerEditor = document.querySelector("#layer-editor");
const stage = document.querySelector("#chart-stage");
const toast = document.querySelector("#toast");
let toastTimer;

function polar(cx, cy, radius, angle) {
  const radians = angle * Math.PI / 180;
  return { x: cx + Math.cos(radians) * radius, y: cy - Math.sin(radians) * radius };
}

function sectorPath(cx, cy, innerRadius, outerRadius, startAngle, endAngle) {
  const outerStart = polar(cx, cy, outerRadius, startAngle);
  const outerEnd = polar(cx, cy, outerRadius, endAngle);
  const innerEnd = polar(cx, cy, innerRadius, endAngle);
  const innerStart = polar(cx, cy, innerRadius, startAngle);
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
  const cx = 380;
  const cy = 386;
  const outerRadius = 315;
  const innerRadius = 56;
  const layerWeights = state.layers.map((layer) => {
    const words = layer.words.filter(Boolean);
    const longestWord = words.reduce((longest, word) => Math.max(longest, word.length), 0);
    return 0.3
      + 0.035 * longestWord * ((layer.fontSize ?? 9) / 9)
      + 0.02 * Math.sqrt(words.length);
  });
  const totalWeight = layerWeights.reduce((total, weight) => total + weight, 0);
  let ringStart = innerRadius;
  const outline = svgElement("path", {
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
    const segmentSize = 180 / layer.words.length;
    const layerColors = colorsForLayer(layer);
    layer.words.forEach((word, index) => {
      const startAngle = 180 - index * segmentSize;
      const endAngle = 180 - (index + 1) * segmentSize;
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
      const useTangent = tangentSpan >= 42 && estimatedWidth <= tangentSpan;
      const labelRadius = !useTangent ? r1 - fontSize * 0.7 : midRadius;
      const position = polar(cx, cy, labelRadius, midAngle);
      const labelAngle = useTangent
        ? 90 - midAngle
        : (midAngle <= 90 ? -midAngle : 180 - midAngle);
      const textAnchor = !useTangent
        ? (midAngle <= 90 ? "end" : "start")
        : "middle";
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

    const band = svgElement("path", {
      d: `M ${cx - r0} ${cy} A ${r0} ${r0} 0 0 1 ${cx + r0} ${cy}`,
      fill: "none",
      stroke: "rgba(37, 36, 31, .18)",
      "stroke-width": "1",
    });
    chart.append(band);
    ringStart = r1;
  });

  const hub = svgElement("path", {
    d: `M ${cx - 56} ${cy} A 56 56 0 0 1 ${cx + 56} ${cy} L ${cx - 56} ${cy} Z`,
    fill: "#f1eee5",
    stroke: "rgba(40, 39, 33, .68)",
    "stroke-width": "1.5",
  });
  chart.append(hub);
  const hubText = svgElement("text", {
    x: cx,
    y: cy - 20,
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
    "stroke-width": "1",
    "stroke-linecap": "round",
  });
  hubOrnament.append(
    svgElement("path", { d: `M ${cx} ${cy - 14} V ${cy - 6} M ${cx - 4} ${cy - 10} H ${cx + 4} M ${cx - 3} ${cy - 13} L ${cx + 3} ${cy - 7} M ${cx + 3} ${cy - 13} L ${cx - 3} ${cy - 7}` }),
    svgElement("circle", { cx, cy: cy - 10, r: "1", fill: "#a58e68", stroke: "none" }),
  );
  chart.append(hubOrnament);

  const brandMark = svgElement("g", {
    fill: "none",
    stroke: "#71805b",
    "stroke-width": "1.2",
    "stroke-linecap": "round",
  });
  brandMark.append(
    svgElement("circle", { cx: cx - 22, cy: 406, r: "7" }),
    svgElement("path", { d: `M ${cx - 22} 399 V 413 M ${cx - 29} 406 H ${cx - 15} M ${cx - 27} 401 L ${cx - 17} 411 M ${cx - 17} 401 L ${cx - 27} 411` }),
    svgElement("circle", { cx: cx - 22, cy: 406, r: "1.5", fill: "#71805b", stroke: "none" }),
  );
  chart.append(brandMark);

  const brandName = svgElement("text", {
    x: cx - 10,
    y: 410,
    fill: "#34372f",
    "font-size": "13",
    "font-family": "'Manrope', sans-serif",
    "font-weight": "700",
    "letter-spacing": "-.5",
  });
  brandName.textContent = "orbit.";
  chart.append(brandName);

  const brandSlogan = svgElement("text", {
    x: cx,
    y: 430,
    fill: "#777970",
    "font-size": "7",
    "font-family": "'DM Sans', sans-serif",
    "letter-spacing": ".8",
    "text-anchor": "middle",
  });
  brandSlogan.textContent = "A LITTLE CLARITY, ONE QUESTION AT A TIME";
  chart.append(brandSlogan);

  const words = state.layers.reduce((sum, layer) => sum + layer.words.filter(Boolean).length, 0);
  document.querySelector("#word-count").textContent = `${words} words · ${state.layers.length} ${state.layers.length === 1 ? "layer" : "layers"}`;
  stage.style.setProperty("--chart-bg", state.background);
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

function updateColorInput(inputId, valueId, key) {
  const input = document.querySelector(inputId);
  input.addEventListener("input", () => {
    state[key] = input.value;
    document.querySelector(valueId).textContent = input.value.toUpperCase();
    renderChart();
  });
}

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
  state.background = "#f6f0e7";
  state.wordColor = "#fff9ef";
  state.font = "'DM Sans', sans-serif";
  document.querySelector("#background-color").value = state.background;
  document.querySelector("#background-value").textContent = state.background.toUpperCase();
  document.querySelector("#word-color").value = state.wordColor;
  document.querySelector("#word-value").textContent = state.wordColor.toUpperCase();
  document.querySelector("#font-select").value = state.font;
  renderLayerControls();
  renderThemes();
  renderChart();
  showToast("Example chart restored.");
});

document.querySelector("#export-button").addEventListener("click", async () => {
  const svg = chart.cloneNode(true);
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", "1520");
  svg.setAttribute("height", "880");
  const svgData = new XMLSerializer().serializeToString(svg);
  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1520;
    canvas.height = 880;
    const context = canvas.getContext("2d");
    if (!context) {
      showToast("Could not create the chart image.");
      return;
    }
    context.fillStyle = state.background;
    context.fillRect(0, 0, canvas.width, canvas.height);
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
renderChart();
