import { toon, verberg } from "./toast";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const HESOYAM = [..."hesoyam"];
const MODIFIERS = ["Shift", "Control", "Alt", "Meta", "CapsLock", "AltGraph"];

// De fosformodus en de toetsreeks leven alleen in het geheugen.
let fosfor = false;
let recent: string[] = [];

const typt = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || !!el.closest("input, textarea, select"));

const eindigtOp = (reeks: string[]) =>
  recent.length >= reeks.length && reeks.every((t, i) => recent[recent.length - reeks.length + i] === t);

function zetFosfor(aan: boolean) {
  fosfor = aan;
  document.documentElement.classList.toggle("fosfor", aan);
  toon(aan ? "+30 levens. Bij ons heten dat kennissessies." : "Terug naar de werkelijkheid.");
}

document.addEventListener("keydown", (e) => {
  if (typt(e.target)) {
    recent = [];
    return;
  }
  if (e.ctrlKey || e.metaKey || e.altKey || MODIFIERS.includes(e.key)) return;

  if (e.key === "Escape") {
    if (fosfor) zetFosfor(false);
    else verberg();
    return;
  }

  recent.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
  recent = recent.slice(-KONAMI.length);

  if (eindigtOp(KONAMI)) {
    recent = [];
    zetFosfor(!fosfor);
  } else if (eindigtOp(HESOYAM)) {
    recent = [];
    toon("Gezondheid, bepantsering en €250.000. Bij ons heet dat winstdeling.", { href: "/werken-bij/#wat-je-krijgt", tekst: "Werken bij →" });
  }
});

// ClientRouter vervangt de attributen van <html>; de modus blijft dus zelf bijgehouden.
document.addEventListener("astro:after-swap", () => {
  if (fosfor) document.documentElement.classList.add("fosfor");
});
