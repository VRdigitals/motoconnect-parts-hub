/**
 * PLACEHOLDER CONTENT for the About page ("Meet the Founder" / "Meet Our Team").
 *
 * To go live, edit only this file:
 *  - replace the names / roles / intro text below
 *  - replace the portraits by overwriting the files in src/assets/team/
 *    (keep a 4:5 portrait shape, e.g. 800x1000, so the cards stay aligned)
 * Stock portraits are credited in /CREDITS.md and should be removed once real photos are used.
 */
import founderPhoto from "../assets/team/founder.jpg";
import generalManagerPhoto from "../assets/team/general-manager-sales.jpg";
import salesManagerPhoto from "../assets/team/sales-manager.jpg";
import operationsManagerPhoto from "../assets/team/operations-manager.jpg";

export interface Person {
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
}

const founderName = "[Founder Name]";

export const founder: Person & { intro: string } = {
  name: founderName,
  role: "Founder",
  photo: founderPhoto,
  photoAlt: "Placeholder portrait of the founder",
  intro: `With a passion for motorcycles and a commitment to customer service, ${founderName} started Hero Motors with a clear vision: to provide dependable products and support to riders and businesses. Today, that vision continues to guide our team.`,
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
