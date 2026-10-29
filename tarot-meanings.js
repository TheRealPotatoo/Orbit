const meaningFilters = [...document.querySelectorAll(".meaning-filter")];
const meaningCards = [...document.querySelectorAll(".meaning-card")];
const meaningSearch = document.querySelector("#meaning-search");
const meaningCount = document.querySelector("#meaning-count");
const meaningEmpty = document.querySelector("#meaning-empty");
let activeMeaningFilter = "all";

function filterMeaningCards() {
  if (!meaningCards.length) return;
  const query = meaningSearch.value.trim().toLocaleLowerCase();
  let visibleCount = 0;
  meaningCards.forEach((card) => {
    const matchesCategory = activeMeaningFilter === "all" || card.dataset.category === activeMeaningFilter;
    const matchesQuery = !query || card.dataset.search.includes(query);
    card.hidden = !matchesCategory || !matchesQuery;
    if (!card.hidden) visibleCount += 1;
  });
  meaningCount.textContent = `${visibleCount} ${visibleCount === 1 ? "card" : "cards"}`;
  meaningEmpty.hidden = visibleCount > 0;
}

meaningFilters.forEach((button) => {
  button.addEventListener("click", () => {
    activeMeaningFilter = button.dataset.filter;
    meaningFilters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    filterMeaningCards();
  });
});
meaningSearch?.addEventListener("input", filterMeaningCards);
filterMeaningCards();

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
