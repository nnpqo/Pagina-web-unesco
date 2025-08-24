export type EvalResult = { score: number; band: string; flags: string[] };

const SUSPICIOUS = [
  "URGENTE", "ULTIMO MOMENTO", "ÚLTIMO MOMENTO", "COMPARTE",
  "GRATIS", "CLICK AQUÍ", "HAZ CLICK", "CADENA", "100% REAL",
  "SI NO COMPARTES", "RUMOR", "BULO"
];

function bandFor(score: number): string {
  if (score >= 81) return "Muy alta credibilidad";
  if (score >= 61) return "Alta credibilidad";
  if (score >= 41) return "Credibilidad media";
  if (score >= 21) return "Baja credibilidad";
  return "Muy baja credibilidad";
}

export function evaluate(text: string, title?: string): EvalResult {
  const T = (title || "") + " " + (text || "");
  const flags: string[] = [];
  let score = 100;

  const exclam = (T.match(/!/g) || []).length;
  if (exclam >= 3) { score -= 10; flags.push("Exceso de signos de exclamación"); }

  const allCapsWords = T.split(/\s+/).filter(w => w.length >= 5 && /^[A-ZÁÉÍÓÚÜÑ]+$/.test(w));
  if (allCapsWords.length >= 3) { score -= 15; flags.push("Muchos términos en MAYÚSCULAS"); }

  const suspiciousHits = SUSPICIOUS.filter(s => T.toUpperCase().includes(s));
  if (suspiciousHits.length > 0) {
    score -= Math.min(25, suspiciousHits.length * 6);
    flags.push("Términos sospechosos: " + suspiciousHits.join(", "));
  }

  const urls = T.match(/https?:\/\/\S+/gi) || [];
  if (urls.length === 0 && T.length > 200) {
    score -= 10; flags.push("No se citan fuentes/enlaces verificables");
  }

  const percClaims = (T.match(/\b\d{2,3}%/g) || []).length;
  if (percClaims >= 2) { score -= 7; flags.push("Múltiples afirmaciones porcentuales"); }

  score = Math.max(0, Math.min(100, score));
  return { score, band: bandFor(score), flags };
}
