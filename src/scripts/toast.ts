// Gedeelde toast, rechtsonder. De regio staat in Base.astro en blijft bij een View Transition bestaan.
let timer: number | undefined;

const regio = () => document.getElementById("toast-regio");

export function verberg() {
  window.clearTimeout(timer);
  regio()?.replaceChildren();
}

export function toon(tekst: string, link?: { href: string; tekst: string }) {
  const doel = regio();
  if (!doel) return;
  window.clearTimeout(timer);

  const toast = document.createElement("div");
  toast.className = "toast";
  const p = document.createElement("p");
  p.textContent = tekst;
  toast.append(p);

  if (link) {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.tekst;
    a.addEventListener("click", verberg);
    toast.append(a);
  }

  const sluit = document.createElement("button");
  sluit.type = "button";
  sluit.className = "toast__sluit";
  sluit.setAttribute("aria-label", "Sluiten");
  sluit.textContent = "×";
  sluit.addEventListener("click", verberg);
  toast.append(sluit);

  doel.replaceChildren(toast);
  timer = window.setTimeout(verberg, 6000);
}
