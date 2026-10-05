export const APPLICATION_STATUSES = [
  "pending",
  "contacted",
  "approved",
  "rejected",
  "completed",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABEL_BN: Record<ApplicationStatus, string> = {
  pending: "অপেক্ষমাণ",
  contacted: "যোগাযোগ করা হয়েছে",
  approved: "অনুমোদিত",
  rejected: "বাতিল",
  completed: "সম্পন্ন",
};

// Validated categorical palette (validate_palette.js, light mode) — passes lightness
// band, chroma floor, CVD adjacent + normal-vision floors, and surface contrast.
// Keeps the brand hue families (gold/blue/teal/red) but steps them to clear the
// checks; "completed" swaps brand navy (fails the chroma floor, reads as ink) for violet.
export const STATUS_CHART_COLOR: Record<ApplicationStatus, string> = {
  pending: "#B98A2F",
  contacted: "#2D5FA8",
  approved: "#0E9E75",
  rejected: "#C43D30",
  completed: "#5B3FA6",
};
