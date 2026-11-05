// One entry per KT Lab venture. The title card's colour grade and mark come
// from `sector` (see sectors.js); set `icon` to use the venture's own mark instead.
export const ventures = [
  {
    id: "aqvera",
    name: "Aqvera",
    sector: "agriculture",
    tag: "Agriculture & Water",
    phase: { step: 3, label: "Live" },
    logline:
      "Satellite-powered abstraction fairness and licence-risk scoring for UK water regulators and river trusts.",
    url: "https://aqvera.co.uk",
  },
];

export const PHASE_COUNT = 4;

// The Lab layout is picked from how many ventures exist, so the section
// stays deliberate whether there are two ventures or twenty.
export function layoutFor(count) {
  if (count <= 3) return "feature";
  if (count <= 8) return "reel";
  return "index";
}
