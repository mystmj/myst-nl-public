// Zet na de build X-Robots-Tag: noindex in dist/_headers als NOINDEX=1 is gezet.
// Gebruikt door de testomgeving, zodat die niet in zoekmachines komt.
import { readFileSync, writeFileSync } from "node:fs";

export function voegNoindexToe(bestand) {
  const regels = readFileSync(bestand, "utf8").split("\n");
  const i = regels.findIndex((r) => r.trim() === "/*");
  if (i === -1) throw new Error(`Geen /* blok gevonden in ${bestand}`);
  if (regels.some((r) => r.trim().toLowerCase().startsWith("x-robots-tag:"))) return;
  regels.splice(i + 1, 0, "  X-Robots-Tag: noindex");
  writeFileSync(bestand, regels.join("\n"));
}
