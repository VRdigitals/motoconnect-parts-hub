/**
 * Content for the About page ("Meet the Founder" / "Meet Our Team").
 *  - The founder section is final text; only her photo file is needed (see below).
 *  - The team members are still PLACEHOLDERS: replace the names / roles and overwrite the portraits in
 *    src/assets/team/ (keep a 4:5 portrait shape, e.g. 800x1000, so the cards stay aligned).
 * Stock portraits are credited in /CREDITS.md and should be removed once real photos are used.
 */
import rajaPhoto from "../assets/team/raja-singh-gulati.webp";
import generalManagerPhoto from "../assets/team/general-manager-sales.jpg";
import salesManagerPhoto from "../assets/team/sales-manager.jpg";
import operationsManagerPhoto from "../assets/team/operations-manager.jpg";

// The founder's portrait: save it as src/assets/team/kamini-kaur-gulati.jpg (or .png / .jpeg / .webp).
// Until that file exists the About page shows a neutral "KG" monogram instead of a photo.
const founderPhotos = import.meta.glob("../assets/team/kamini-kaur-gulati.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

export interface Person {
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
}

export const founder = {
  name: "Late Kamini Kaur Gulati",
  role: "Founder & Mentor",
  photo: Object.values(founderPhotos)[0] ?? null,
  photoAlt: "Portrait of Late Kamini Kaur Gulati, Founder & Mentor of Motoconnect",
  initials: "KG",
  /** Shown larger, as the opening line. */
  intro:
    "Motoconnect was founded by Late Kamini Kaur Gulati, who built the business on a simple belief: a company earns its place by serving its customers, its partners and its community well.",
  paragraphs: [
    "She brought vision, a positive mindset and sound judgement to everything she built, and favoured long-term relationships over quick wins. She led with clarity, backed good people and set a standard of integrity that the whole team was expected to meet.",
    "As Founder and Mentor, she guided the team with a clear sense of direction and encouraged people to grow into their roles. Her principles of fair dealing, accountability and giving back to society continue to shape how Motoconnect works with customers and partners today. We carry her vision forward with pride.",
  ],
  values: ["Visionary mindset", "Integrity", "Business leadership", "Mentorship", "Community focus"],
};

export const coFounder = {
  name: "Raja Singh Gulati",
  role: "Co-Founder & CEO",
  photo: rajaPhoto as string | null,
  photoAlt: "Portrait of Raja Singh Gulati, Co-Founder and CEO of Motoconnect, standing beside a Hero Xpulse 200",
  initials: "RG",
  intro:
    "Raja Singh Gulati is Co-Founder and CEO of Motoconnect. A lifetime learner, an optimist, an entrepreneur and an investor, he leads the company with curiosity, ambition and a long-term view.",
  paragraphs: [
    "As a lifetime learner, he keeps questioning, studying and improving, and expects the same openness from the team. That habit shapes how Motoconnect adapts to new products, new markets and the changing needs of its customers.",
    "An optimist by nature, he sees opportunity where others see obstacles, and an entrepreneur and investor by instinct, he builds for the long run. Under his leadership Motoconnect continues to grow its range of genuine spare parts, its distribution network and its service to workshops, dealers and riders across the UAE.",
  ],
  values: ["Lifetime learner", "Optimist", "Entrepreneur", "Investor"],
};

export const team: Person[] = [
  {
    name: "[Team Member Name]",
    role: "General Manager – Sales",
    photo: generalManagerPhoto,
    photoAlt: "Placeholder portrait of the General Manager – Sales",
  },
  {
    name: "[Team Member Name]",
    role: "Sales Manager",
    photo: salesManagerPhoto,
    photoAlt: "Placeholder portrait of the Sales Manager",
  },
  {
    name: "[Team Member Name]",
    role: "Operations Manager",
    photo: operationsManagerPhoto,
    photoAlt: "Placeholder portrait of the Operations Manager",
  },
];
