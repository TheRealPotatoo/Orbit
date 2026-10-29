const deckBasePrice = 60;
const currencySelect = document.querySelector("#currency-select");
const deckPrice = document.querySelector("#deck-price");
const deckPriceCurrency = document.querySelector("#deck-price-currency");
const currencyEstimate = document.querySelector("#currency-estimate");
let usdExchangeRates = null;
let exchangeRateDate = "";

const regionCurrencies = {
  AU: "AUD", AT: "EUR", BE: "EUR", CA: "CAD", CH: "CHF", CY: "EUR", DE: "EUR",
  ES: "EUR", FI: "EUR", FR: "EUR", GB: "GBP", GR: "EUR", HK: "HKD", IE: "EUR",
  IN: "INR", IT: "EUR", JP: "JPY", LU: "EUR", MT: "EUR", NL: "EUR", NZ: "NZD",
  PT: "EUR", SG: "SGD",
};

function preferredCurrency() {
  const locales = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const locale of locales) {
    try {
      const region = new Intl.Locale(locale).region;
      if (region === "US") return "USD";
      if (regionCurrencies[region]) return regionCurrencies[region];
    } catch {
      const region = locale.match(/[-_]([A-Z]{2})(?:$|[-_])/i)?.[1]?.toUpperCase();
      if (region === "US") return "USD";
      if (regionCurrencies[region]) return regionCurrencies[region];
    }
  }
  return "USD";
}

function renderDeckPrice() {
  const currency = currencySelect.value;
  const rate = usdExchangeRates?.[currency];
  if (!rate) {
    deckPrice.textContent = "$60";
    deckPriceCurrency.textContent = "USD";
    currencyEstimate.textContent = "Live conversion unavailable. Price shown in USD.";
    return;
  }

  const amount = deckBasePrice * rate;
  try {
    deckPrice.textContent = new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "JPY" ? 0 : 2,
    }).format(amount);
  } catch (error) {
    console.error("Could not format the selected deck currency.", error);
    deckPrice.textContent = `${amount.toFixed(currency === "JPY" ? 0 : 2)} ${currency}`;
  }
  deckPriceCurrency.textContent = currency;
  currencyEstimate.textContent = currency === "USD"
    ? "Base price: $60 USD."
    : `Approximate conversion from $60 USD · rates updated ${exchangeRateDate || "recently"}.`;
}

currencySelect.value = preferredCurrency();
currencySelect.addEventListener("change", renderDeckPrice);
renderDeckPrice();

fetch("https://open.er-api.com/v6/latest/USD", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error(`Exchange rate request failed (${response.status}).`);
    return response.json();
  })
  .then((data) => {
    if (data.result !== "success" || !data.rates || typeof data.rates.USD !== "number") {
      throw new Error("Exchange rate service returned an invalid response.");
    }
    usdExchangeRates = data.rates;
    exchangeRateDate = data.time_last_update_utc
      ? new Date(data.time_last_update_utc).toLocaleDateString(navigator.language)
      : "recently";
    renderDeckPrice();
  })
  .catch((error) => {
    console.warn("Could not load live deck currency estimates.", error);
    currencySelect.value = "USD";
    currencySelect.disabled = true;
    renderDeckPrice();
  });
