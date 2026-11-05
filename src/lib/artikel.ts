const MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

export function datumNl(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return `${Number(m[3])} ${MAANDEN[Number(m[2]) - 1]} ${m[1]}`;
}

// 200 woorden per minuut, naar boven afgerond
export function leestijd(markdown = ""): number {
  const woorden = markdown.replace(/[#*`>_-]+/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(woorden / 200));
}
