const dreamThemes = [
  {
    name: "Water & emotion",
    pattern: /\b(?:water|ocean|sea|river|lake|pool|flood|wave|drown(?:ing|ed)?|swim(?:ming|med)?)\b/i,
    reading: "Water can give a dream a strong emotional atmosphere. Its movement, depth, and clarity may mirror how feelings are moving through your life: calm, overwhelming, hidden, or changing.",
    question: "What felt like the emotional current in this dream, and where do you notice something similar while awake?",
  },
  {
    name: "Flying & freedom",
    pattern: /\b(?:fly|flying|flew|flight|floating|soar(?:ing|ed)?)\b/i,
    reading: "Being airborne may bring up freedom, perspective, or a wish to get beyond everyday limits. Notice whether the flight felt easy, exposed, or difficult to control; that detail is often more personal than the symbol itself.",
    question: "What gave you a sense of freedom or perspective, and what—if anything—made it hard to stay aloft?",
  },
  {
    name: "Falling & uncertainty",
    pattern: /\b(?:fall|falling|fell|drop(?:ping|ped)?|plunge|cliff|edge)\b/i,
    reading: "Falling dreams can accompany uncertainty, change, or a sense that something is outside your control. They do not predict an outcome; consider what support or steadiness you might be looking for right now.",
    question: "Where in life would a little more support, time, or room to find your footing help?",
  },
  {
    name: "Being chased",
    pattern: /\b(?:chase|chased|chasing|pursu(?:e|ed|ing)|running away|escape|hiding|hide)\b/i,
    reading: "A pursuit can make an unaddressed worry or pressure feel vivid. The person or thing following you may matter less than your response: running, hiding, turning around, or finding help.",
    question: "Is there something you have been putting off, or a feeling you have not had space to face?",
  },
  {
    name: "Teeth & change",
    pattern: /\b(?:teeth|tooth|teeth falling|tooth falling|dentist)\b/i,
    reading: "Dreams about teeth are often linked in popular interpretations to vulnerability, change, appearance, or communication, but there is no universal key. Think about what teeth meant in this particular scene and how you felt.",
    question: "Did the dream touch on being seen, speaking up, or going through a change?",
  },
  {
    name: "Home & inner life",
    pattern: /\b(?:house|home|room|bedroom|basement|attic|door|hallway|apartment)\b/i,
    reading: "A home can act like a map of private life: familiar rooms, hidden spaces, or rooms you have never seen may echo parts of yourself or your circumstances that feel settled, new, or unexplored.",
    question: "Which part of the place stood out, and what does that space bring to mind in your own life?",
  },
  {
    name: "Transition & endings",
    pattern: /\b(?:death|dead|died|dying|funeral|grave|goodbye|ending)\b/i,
    reading: "Death in a dream is not a prediction. It may be a way of picturing an ending, a transition, a memory, or fear of loss. Your relationship to the person or situation is more meaningful than a fixed symbol definition.",
    question: "Is something changing or asking to be let go of, even if you are not ready to name it yet?",
  },
  {
    name: "Animals & instinct",
    pattern: /\b(?:animal|dog|puppy|cat|horse|bird|snake|spider|wolf|bear|fish|insect)\b/i,
    reading: "The animal's behavior and your own associations matter most. A comforting companion, a watchful creature, or something frightening can each point toward a different feeling or quality you recognize.",
    question: "What did this creature do, and what personal memory or quality comes to mind when you think of it?",
  },
  {
    name: "Travel & direction",
    pattern: /\b(?:travel|trip|journey|road|train|bus|car|plane|airport|station|driving|missed the train|missed the bus)\b/i,
    reading: "A journey may reflect movement through a decision or a new phase. Whether you chose the route, knew the destination, or missed a connection can help you connect the image to your sense of direction.",
    question: "Did you feel in charge of where you were going, and does that resemble any choice you are facing?",
  },
  {
    name: "Feeling lost",
    pattern: /\b(?:lost|couldn't find|could not find|wrong way|maze|wander(?:ing|ed)?)\b/i,
    reading: "Being lost can reflect a moment of uncertainty, unfamiliarity, or searching. It can also be a sign that you are exploring without a clear map yet—something that may call for patience rather than an immediate answer.",
    question: "What are you trying to find or understand at the moment, and what would help you feel oriented?",
  },
  {
    name: "Tests & expectations",
    pattern: /\b(?:exam|test|school|classroom|teacher|homework|graduat(?:e|ion)|forgot my|unprepared)\b/i,
    reading: "School or test dreams can surface pressure, self-evaluation, or the feeling of being unprepared. They may connect to current expectations, even when the dream uses a setting from long ago.",
    question: "Whose expectations did you feel in the dream, and are those expectations still yours?",
  },
  {
    name: "Fire & intensity",
    pattern: /\b(?:fire|flame|burn(?:ing|ed)?|smoke|explosion|heat)\b/i,
    reading: "Fire may carry many meanings—danger, anger, energy, destruction, or renewal. Whether you feared it, tended it, or watched from a distance can help clarify what kind of intensity the image held for you.",
    question: "Did the fire feel like something to escape, something to protect, or a force that was changing things?",
  },
  {
    name: "Connection & memory",
    pattern: /\b(?:mother|mom|mum|father|dad|parent|grandmother|grandfather|friend|partner|loved one|ex\b|family)\b/i,
    reading: "When someone familiar appears, the dream may be revisiting a relationship, a memory, or a quality you associate with them. It does not have to be a message from that person; your own feelings and history are central.",
    question: "What feeling or memory did this person bring forward for you?",
  },
  {
    name: "New beginnings & care",
    pattern: /\b(?:baby|babies|pregnan(?:t|cy)|newborn|birth|child|children)\b/i,
    reading: "A baby or new child can bring up beginnings, vulnerability, responsibility, or a wish to care for something. The image may be literal, metaphorical, or simply shaped by recent experience.",
    question: "Is there something new or tender in your life that needs attention, patience, or protection?",
  },
  {
    name: "Voice & expression",
    pattern: /\b(?:couldn't speak|could not speak|no voice|mute|scream|screaming|shout|shouting|silence|can't talk|cannot talk)\b/i,
    reading: "Difficulty speaking or being heard can echo frustration, inhibition, or a need to express something. If your voice returned—or someone listened—that shift may be worth noticing too.",
    question: "Is there something you want to say, ask for, or have understood?",
  },
];

const feelingNotes = {
  uneasy: "The uneasy feeling may be the clearest clue. Rather than treating it as a warning, consider what has been asking for reassurance or care.",
  peaceful: "The peaceful feeling matters too: it may point toward a source of comfort, acceptance, or safety you can recognize in waking life.",
  curious: "Curiosity can suggest that some part of the dream feels open for exploration, rather than needing to be solved right away.",
  sad: "The sadness may be making room for longing, change, or something you value. You can notice it without needing to turn it into a fixed explanation.",
  excited: "The excitement may reflect energy or anticipation around something emerging in your life. Notice what felt inviting about it.",
  confused: "Confusion does not mean you missed the answer. It may reflect a situation that is still unfolding and needs more time or perspective.",
};

const dreamForm = document.querySelector("#dream-form");
const dreamEntry = document.querySelector("#dream-entry");
const lifeContextEntry = document.querySelector("#life-context");
const characterCount = document.querySelector("#character-count");
const readingEmpty = document.querySelector("#reading-empty");
const readingResult = document.querySelector("#reading-result");
const motifList = document.querySelector("#motif-list");
const feelingReflection = document.querySelector("#feeling-reflection");
const lifeContextReading = document.querySelector("#life-context-reading");

function sentenceForTheme(dream, pattern) {
  const sentences = dream.match(/[^.!?\n]+[.!?]?/g) || [dream];
  return sentences.find((sentence) => pattern.test(sentence))?.trim() || dream.trim();
}

function formatQuote(text, limit = 230) {
  const normalized = text.replace(/\s+/g, " ").trim();
  return normalized.length > limit ? `${normalized.slice(0, limit - 1).trimEnd()}…` : normalized;
}

function connectDreamThemes(matches, dream, feeling) {
  const first = matches[0]?.name;
  const second = matches[1]?.name;
  const hasTheme = (name) => matches.some((theme) => theme.name === name);
  const has = (pattern) => pattern.test(dream);
  const hasNegation = /\b(?:couldn't|could not|wasn't|was not|never|unable to|tried to)\b/i.test(dream);
  const isActive = /\b(?:chose|decided|opened|left|returned|helped|asked|spoke|found|followed|turned|entered|walked|ran|climbed|swam|flew)\b/i.test(dream);
  const feelingLead = {
    uneasy: "The uneasy tone may make the dream feel more like a rehearsal for uncertainty than a message about what will happen.",
    peaceful: "The peaceful tone may be as significant as the images: the dream could be giving you a felt sense of safety, room, or acceptance.",
    curious: "The curiosity in the dream may suggest that its unfamiliar parts are inviting exploration rather than asking for a quick answer.",
    sad: "The sadness may place the dream closer to longing, change, or remembrance than to a literal warning.",
    excited: "The excitement may point toward anticipation or possibility in the dream, not only the events themselves.",
    confused: "The confusion may be part of the dream's meaning: it can mirror a question that has not settled into a clear answer yet.",
  }[feeling];

  let thread;
  if (hasTheme("Water & emotion") && hasTheme("Flying & freedom")
    && dream.search(dreamThemes.find((theme) => theme.name === "Water & emotion").pattern)
      < dream.search(dreamThemes.find((theme) => theme.name === "Flying & freedom").pattern)) {
    thread = "Your account moves from water to flight. One possible reading is a movement from being inside a feeling to gaining distance or perspective on it. That could feel like relief, escape, or simply a change in viewpoint—the waking-life connection depends on whether the flight felt free, urgent, or uncertain.";
  } else if (first === "Water & emotion" && second === "Home & inner life") {
    thread = "The water is placed under a home rather than somewhere separate. That unusual setting can make the feeling seem connected to the dreamer's private or familiar world: something beneath the surface of what 'home' means to them, not necessarily a literal message about a house.";
  } else if (first === "Being chased" && has(/\b(?:fly|flying|flew|escape|escaped|hid|hiding|turned|confronted)\b/i)) {
    thread = "The chase sets up a question of agency: the dream is not only about what pursued you, but about what you could or could not do next. Escape, hiding, turning around, or asking for help would each give the scene a different emotional direction.";
  } else if (first === "Home & inner life" && second === "Travel & direction") {
    thread = "The images shift from a private or familiar place toward a journey. That contrast may echo a pull between what feels known and a direction that is less certain or newly opening.";
  } else if (first === "Feeling lost" && has(/\b(?:found|arrived|home|map|someone helped|showed me)\b/i)) {
    thread = "There is both disorientation and a possible point of orientation in the story. Notice whether you found your own way, were guided by someone, or simply stopped searching; that change may matter more than the image of being lost by itself.";
  } else if (first === "Transition & endings" && second === "New beginnings & care") {
    thread = "The dream places an ending beside an image of new life or care. It may be holding two truths at once: something can be changing or missed while something else is beginning to need your attention.";
  } else if (first && second) {
    thread = `The dream brings ${first.toLowerCase()} together with ${second.toLowerCase()}. Rather than treating either image as a code, look at the relationship between them: did one lead to the other, interrupt it, or change how it felt? That sequence can make this reading more personal than a symbol definition.`;
  } else if (first) {
    thread = `The ${first.toLowerCase()} image stands out in your description. Its meaning is less about a universal symbol and more about the role it played in the scene: what changed around it, what you did, and whether it felt familiar or strange.`;
  } else {
    thread = "No single familiar motif stands out strongly, so the story's specific details may matter most. The place, people, turning point, and your response can be more revealing than matching the dream to a symbol list.";
  }
  if (hasNegation) {
    thread += " You describe something being blocked or difficult to do; that limitation may be important, especially if it resembles a feeling of constraint while awake.";
  } else if (isActive) {
    thread += " You describe taking action in the dream. That agency is worth noticing: even a small choice can change the scene's meaning.";
  }
  if (has(/\b(?:trapped|stuck|unable|couldn't|could not)\b/i)
    && has(/\b(?:then|after|finally|eventually)\b/i)
    && has(/\b(?:relieved|safe|escaped|surfaced|flew|found)\b/i)) {
    thread += " The story also changes from being stuck to reaching a different state. That emotional turn—from constraint toward relief—may be more revealing than the water or flight on its own.";
  }
  if (has(/\b(?:looked back|turned back|kept looking|glanced back)\b/i)) {
    thread += " You also look back after moving away. That detail holds distance and connection together: perhaps part of you wants room to move, while another part is still attending to what you left behind.";
  }
  if (feelingLead) thread += ` ${feelingLead}`;
  return thread;
}

function connectToWakingContext(context, matches, dream) {
  const normalized = context.toLowerCase();
  const themes = matches.map((theme) => theme.name.toLowerCase());

  if (/\b(?:move out|moving out|leave home|leaving home|moving away|move away|leaving the house)\b/.test(normalized)
    && /\b(?:childhood home|home|house|bedroom|room)\b/i.test(dream)) {
    return "Because moving out and leaving home are already on your mind, the childhood home in the dream is a particularly close detail to explore. Being underneath the home in dark water, then surfacing and flying above it, could picture moving from feeling immersed in home toward seeing it from more distance. Looking back complicates that movement: it may hold attachment or uncertainty alongside the wish for independence. Treat this as one possible reflection, not an explanation imposed on you—does it fit how you feel about leaving?";
  }
  if (/\b(?:work|job|career|boss|office|school|exam|deadline)\b/.test(normalized)) {
    return `You mentioned ${themes.length ? themes.join(" and ") : "this dream"} alongside pressure around work or study. You might ask whether the dream's actions mirror feeling evaluated, stuck, responsible, or ready to make a change. The connection is useful only if it resonates with your own experience.`;
  }
  if (/\b(?:relationship|partner|dating|breakup|marriage|friendship|family)\b/.test(normalized)) {
    return `You mentioned a relationship concern, so notice who has agency in the dream: who approaches, withdraws, helps, or is left out? That dynamic may be a more personal lens than assigning a fixed meaning to ${themes.length ? themes.join(" or ") : "an image"}. It may also have no direct connection; see what feels true to you.`;
  }
  if (/\b(?:grief|grieving|loss|miss(?:ing)?|passed away|died)\b/.test(normalized)) {
    return `With the loss you described in mind, the dream's images may be making room for memory, longing, or a changing bond. Notice whether the dream brings comfort, distance, or unfinished words; it does not have to be a message or prediction to matter.`;
  }
  return `You said, “${formatQuote(context, 190).replace(/[.!?]+$/, "")}.” Try placing that beside the dream's sequence—${themes.length ? themes.join(", ") : "the moment that stood out"}—and see whether any feeling or tension appears in both. It may be connected, partly connected, or unrelated; your own associations are the best test.`;
}

function updateDreamThemeButton() {
  const nextTheme = { light: "dark", dark: "mystical", mystical: "light" }[dreamThemeState];
  const button = document.querySelector("#theme-toggle");
  const labels = { light: "Dark mode", dark: "Mystical mode", mystical: "Light mode" };
  const ariaLabels = { light: "Switch to dark mode", dark: "Switch to mystical mode", mystical: "Switch to light mode" };
  const icons = {
    dark: '<path d="M16.8 12.1A7 7 0 0 1 7.9 3.2a7.1 7.1 0 1 0 8.9 8.9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    light: '<circle cx="10" cy="10" r="3.2" stroke="currentColor" stroke-width="1.5"/><path d="M10 1.8v2m0 12.4v2M1.8 10h2m12.4 0h2M4.2 4.2l1.4 1.4m8.8 8.8 1.4 1.4m0-11.6-1.4 1.4m-8.8 8.8-1.4 1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    mystical: '<path d="m10 1.8 1.7 5.5 5.5 1.7-5.5 1.7-1.7 5.5-1.7-5.5L2.8 9l5.5-1.7L10 1.8Z" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"/><path d="m16.2 13.8.8 2.3 2.2.8-2.2.8-.8 2.3-.8-2.3-2.2-.8 2.2-.8.8-2.3Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>',
  };
  button.setAttribute("aria-pressed", String(dreamThemeState !== "light"));
  button.setAttribute("aria-label", ariaLabels[dreamThemeState]);
  button.querySelector("span").textContent = labels[dreamThemeState];
  button.querySelector("svg").innerHTML = icons[nextTheme];
}

let dreamThemeState = document.documentElement.dataset.theme || "light";
document.querySelector("#theme-toggle").addEventListener("click", () => {
  dreamThemeState = { light: "dark", dark: "mystical", mystical: "light" }[dreamThemeState];
  if (dreamThemeState === "light") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = dreamThemeState;
  document.querySelector('meta[name="theme-color"]').content = {
    light: "#f4f2ed", dark: "#181818", mystical: "#100d1b",
  }[dreamThemeState];
  try {
    localStorage.setItem("orbit-theme", dreamThemeState);
  } catch {}
  updateDreamThemeButton();
});
updateDreamThemeButton();

dreamEntry.addEventListener("input", () => {
  characterCount.textContent = `${dreamEntry.value.length} / 3000`;
});

dreamForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!dreamForm.reportValidity()) return;

  const dream = dreamEntry.value.trim();
  const matches = dreamThemes
    .filter((theme) => theme.pattern.test(dream))
    .map((theme) => ({ ...theme, position: dream.search(theme.pattern) }))
    .sort((first, second) => first.position - second.position)
    .slice(0, 3);
  const feeling = document.querySelector("#dream-feeling").value;
  const prompt = document.querySelector("#reflection-prompt");
  const secondPrompt = document.querySelector("#second-prompt");
  const storyReading = document.querySelector("#result-summary");
  motifList.replaceChildren();
  storyReading.textContent = connectDreamThemes(matches, dream, feeling);

  matches.forEach((theme) => {
    const card = document.createElement("article");
    card.className = "motif-card";
    const title = document.createElement("h3");
    title.textContent = theme.name;
    const quote = document.createElement("blockquote");
    quote.textContent = `“${formatQuote(sentenceForTheme(dream, theme.pattern))}”`;
    const reading = document.createElement("p");
    reading.textContent = theme.reading;
    const question = document.createElement("p");
    question.textContent = `To make this personal: ${theme.question}`;
    card.append(title, quote, reading, question);
    motifList.append(card);
  });

  if (!matches.length) {
    const card = document.createElement("article");
    card.className = "motif-card";
    const title = document.createElement("h3");
    title.textContent = "Start with the moment that stayed";
    const quote = document.createElement("blockquote");
    quote.textContent = `“${formatQuote(sentenceForTheme(dream, /./))}”`;
    const reading = document.createElement("p");
    reading.textContent = "Rather than assign this image a ready-made meaning, look at what was happening just before and after this moment. The change in the scene—and how you responded—may point toward what felt important to you.";
    card.append(title, quote, reading);
    motifList.append(card);
    prompt.textContent = "Which moment changed the feeling of the dream, and what does that shift remind you of?";
    secondPrompt.textContent = "If this scene were a small story about your present life, what part would feel familiar—and what part would not?";
  } else {
    prompt.textContent = matches[0].question;
    secondPrompt.textContent = matches.length > 1
      ? `The next image was ${matches[1].name.toLowerCase()}. What changed between those two moments?`
      : "What recent memory, conversation, or feeling does this scene bring to mind for you?";
  }

  const context = lifeContextEntry.value.trim();
  lifeContextReading.hidden = !context;
  if (context) {
    const connection = document.querySelector("#context-connection");
    connection.textContent = connectToWakingContext(context, matches, dream);
  }

  feelingReflection.hidden = !feeling;
  feelingReflection.textContent = feeling ? feelingNotes[feeling] : "";
  readingEmpty.hidden = true;
  readingResult.hidden = false;
  document.querySelector("#reading-title").focus({ preventScroll: true });
  document.querySelector("#dream-reading").scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "nearest",
  });
});
