/**
 * Content for the About page ("Meet the Founder" / "Meet Our Team").
 *  - The founder section is final text; only her photo file is needed (see below).
 *  - The team members are still PLACEHOLDERS: replace the names / roles and overwrite the portraits in
 *    src/assets/team/ (keep a 4:5 portrait shape, e.g. 800x1000, so the cards stay aligned).
 * Stock portraits are credited in /CREDITS.md and should be removed once real photos are used.
 */
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
    "Motoconnect was founded by Late Kamini Kaur Gulati, a woman whose greatest strength was her heart. Known for her positive mindset and her loving, gentle nature, she had a rare ability to make everyone around her feel valued, supported and respected.",
  paragraphs: [
    "Her thinking always reached beyond business. She cared deeply about society, and she was always ready to lend a hand to anyone who needed one. Helping others was not something she did now and then; it was simply who she was.",
    "As our Founder and Mentor, she guided the people of Motoconnect with wisdom, kindness and trust. The values she lived by, honesty, compassion and service to others, remain the foundation of how we treat our customers, our partners and each other. We carry her vision forward with gratitude, and with a promise to keep her spirit at the heart of everything we do.",
  ],
  values: ["Positive mindset", "Loving & caring", "Generous", "Service to society", "Mentor to many"],
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
