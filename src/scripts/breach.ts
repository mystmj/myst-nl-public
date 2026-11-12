import { bergtopSvg } from "../lib/bergtop.mjs";

const CODES = ["1C", "BD", "55", "E9", "7A", "FF"];
const N = 5;
const BUFFER = 6;
const DAEMON = 3;

type Cel = { r: number; c: number };

const willekeurig = (n: number) => Math.floor(Math.random() * n);
const kies = <T,>(lijst: T[]) => lijst[willekeurig(lijst.length)];

function el<K extends keyof HTMLElementTagNameMap>(tag: K, klas?: string, tekst?: string) {
  const e = document.createElement(tag);
  if (klas) e.className = klas;
  if (tekst !== undefined) e.textContent = tekst;
  return e;
}

// Eerst een geldig pad van BUFFER stappen, dan pas het raster vullen; de doelreeks komt uit dat pad.
function maakPuzzel() {
  for (;;) {
    const raster = Array.from({ length: N }, () => Array.from({ length: N }, () => kies(CODES)));
    const pad: Cel[] = [{ r: 0, c: willekeurig(N) }];
    while (pad.length < BUFFER) {
      const vorige = pad[pad.length - 1];
      const kolom = pad.length % 2 === 1;
      const opties: Cel[] = [];
      for (let i = 0; i < N; i++) {
        const cel = kolom ? { r: i, c: vorige.c } : { r: vorige.r, c: i };
        if (!pad.some((p) => p.r === cel.r && p.c === cel.c)) opties.push(cel);
      }
      pad.push(kies(opties));
    }
    const begin = willekeurig(BUFFER - DAEMON + 1);
    const daemon = pad.slice(begin, begin + DAEMON).map((p) => raster[p.r][p.c]);
    if (daemon.some((code, i) => i > 0 && code === daemon[i - 1])) continue;
    return { raster, daemon };
  }
}

function bouw(sectie: HTMLElement) {
  const { raster, daemon } = maakPuzzel();
  const gekozen: Cel[] = [];
  const buffer: string[] = [];
  let klaar = false;

  const label = el("p", "label", "breach protocol");
  label.insertAdjacentHTML("afterbegin", bergtopSvg);
  const kop = el("h2", undefined, "Of breek in.");
  const spel = el("div", "breach");

  const bord = el("div", "breach__bord");
  const rasterEl = el("div", "breach__raster");
  rasterEl.setAttribute("role", "group");
  rasterEl.setAttribute("aria-label", "Codematrix, 5 bij 5");
  const cellen: HTMLButtonElement[][] = [];
  for (let r = 0; r < N; r++) {
    cellen.push([]);
    for (let c = 0; c < N; c++) {
      const b = el("button", "breach__cel", raster[r][c]);
      b.type = "button";
      b.setAttribute("aria-label", `${raster[r][c]}, rij ${r + 1}, kolom ${c + 1}`);
      b.addEventListener("click", () => kiesCel(r, c));
      cellen[r].push(b);
      rasterEl.append(b);
    }
  }

  const zij = el("div", "breach__zij");
  const daemonBlok = el("div", "breach__blok");
  daemonBlok.append(el("p", "breach__kop", "Daemon"));
  const daemonEl = el("ol", "breach__reeks");
  daemonEl.setAttribute("aria-label", "Daemon, de reeks die je moet vormen");
  const daemonLi = daemon.map((code) => daemonEl.appendChild(el("li", undefined, code)));
  daemonBlok.append(daemonEl);

  // Buffer, status en uitslag staan samen in de aria-live regio.
  const live = el("div", "breach__live");
  live.setAttribute("aria-live", "polite");
  const bufferBlok = el("div", "breach__blok");
  bufferBlok.append(el("p", "breach__kop", "Buffer"));
  const bufferEl = el("ol", "breach__reeks");
  bufferEl.setAttribute("aria-label", "Buffer");
  const bufferLi = Array.from({ length: BUFFER }, () => bufferEl.appendChild(el("li")));
  bufferBlok.append(bufferEl);
  const status = el("p", "breach__status");
  const uitslag = el("div", "breach__uitslag");
  live.append(bufferBlok, status, uitslag);

  zij.append(daemonBlok, live);
  bord.append(rasterEl, zij);
  spel.append(bord);
  sectie.replaceChildren(label, kop, spel);

  // De volgende keuze: bovenste rij, daarna afwisselend de kolom en de rij van de vorige keuze.
  const geldig = (r: number, c: number) => {
    if (klaar || gekozen.some((g) => g.r === r && g.c === c)) return false;
    const vorige = gekozen[gekozen.length - 1];
    if (!vorige) return r === 0;
    return gekozen.length % 2 === 1 ? c === vorige.c : r === vorige.r;
  };

  const lijn = () => {
    const vorige = gekozen[gekozen.length - 1];
    if (!vorige) return "de bovenste rij";
    return gekozen.length % 2 === 1 ? `kolom ${vorige.c + 1}` : `rij ${vorige.r + 1}`;
  };

  const teken = () => {
    const vorige = gekozen[gekozen.length - 1];
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const b = cellen[r][c];
        const gebruikt = gekozen.some((g) => g.r === r && g.c === c);
        const actief = !klaar && (!vorige ? r === 0 : gekozen.length % 2 === 1 ? c === vorige.c : r === vorige.r);
        b.disabled = !geldig(r, c);
        b.classList.toggle("is-gebruikt", gebruikt);
        b.classList.toggle("is-actief", actief);
      }
    }
    bufferLi.forEach((li, i) => {
      const tekst = buffer[i] ?? "";
      if (li.textContent !== tekst) li.textContent = tekst;
    });
    // Hoeveel codes van de daemon staan er al aan het eind van de buffer?
    let treffers = 0;
    for (let k = Math.min(DAEMON, buffer.length); k > 0; k--) {
      if (daemon.slice(0, k).every((code, i) => code === buffer[buffer.length - k + i])) {
        treffers = k;
        break;
      }
    }
    daemonLi.forEach((li, i) => li.classList.toggle("is-treffer", i < treffers));
  };

  const eerstGeldige = () => cellen.flat().find((b) => !b.disabled);

  const eindig = (gewonnen: boolean) => {
    klaar = true;
    teken();
    status.textContent = "";
    if (gewonnen) {
      uitslag.append(el("p", "breach__titel", "BREACH GESLAAGD"), el("p", undefined, "Toegang verleend."));
      const a = el("a", "knop knop--primair", "Open de shell");
      a.href = "https://shell.myst.nl";
      a.target = "_blank";
      a.rel = "noopener";
      uitslag.append(a);
      a.focus();
    } else {
      uitslag.append(el("p", "breach__titel breach__titel--fout", "Breach mislukt."));
      const b = el("button", "knop knop--secundair", "Opnieuw");
      b.type = "button";
      b.addEventListener("click", () => {
        bouw(sectie);
        eerstGeldige()?.focus();
      });
      uitslag.append(b);
      b.focus();
    }
  };

  function kiesCel(r: number, c: number) {
    if (!geldig(r, c)) return;
    gekozen.push({ r, c });
    buffer.push(raster[r][c]);
    const gewonnen = buffer.some((_, i) => daemon.every((code, k) => buffer[i + k] === code));
    if (gewonnen) return eindig(true);
    if (buffer.length === BUFFER) return eindig(false);
    status.textContent = `Kies een code in ${lijn()}.`;
    teken();
    eerstGeldige()?.focus();
  }

  // Pijltjes lopen langs de geldige vakjes van de actieve rij of kolom.
  rasterEl.addEventListener("keydown", (e) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const open = cellen.flat().filter((b) => !b.disabled);
    if (!open.length) return;
    e.preventDefault();
    const i = open.indexOf(document.activeElement as HTMLButtonElement);
    const stap = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
    open[i < 0 ? 0 : (i + stap + open.length) % open.length].focus();
  });

  status.textContent = `Kies een code in ${lijn()}.`;
  teken();
}

function init() {
  const sectie = document.getElementById("breach");
  if (sectie && !sectie.hasChildNodes()) bouw(sectie);
}

document.addEventListener("astro:page-load", init);
