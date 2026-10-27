const mapsSearch = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const mapsEmbed = (address: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

export interface Branch {
  id: string;
  city: string;
  /** Heading used on the contact page; defaults to "<city> Branch". */
  heading?: string;
  /** Branch name, only where one has been provided. */
  name?: string;
  address: string;
  mapsUrl: string;
  embedUrl: string;
}

const dubaiAddress = "Al Ghazal Mall, Showroom SG-15, Dubai, UAE";
const warehouseCoords = "25.1143979,55.2191455"; // from https://maps.app.goo.gl/9rLWtCad5hBb3Zbh9
const abuDhabiAddress = "No. 48, Ar Raha 8 Street, Musaffah M3, Abu Dhabi";

export const branches: Branch[] = [
  {
    id: "dubai",
    city: "Dubai",
    address: dubaiAddress,
    mapsUrl: mapsSearch(dubaiAddress),
    // Existing Dubai map embed, unchanged.
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3745.246913367469!2d55.2724718!3d25.237912599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f436dbed49315%3A0x3110109b76ee9e78!2sMoto%20Connect%20-%20Hero%20Motorcycles-UAE!5e1!3m2!1sen!2sae!4v1786392199349!5m2!1sen!2sae",
  },
  {
    id: "abu-dhabi",
    city: "Abu Dhabi",
    name: "Hero Motors – Abu Dhabi",
    address: abuDhabiAddress,
    mapsUrl: mapsSearch(abuDhabiAddress),
    embedUrl: mapsEmbed(abuDhabiAddress),
  },
  {
    id: "spare-parts-warehouse",
    city: "Spare Parts Warehouse",
    heading: "Spare Parts Warehouse",
    name: "Hero Authorized Service Center – by Moto Connect",
    address: "Dubai, UAE",
    mapsUrl: "https://maps.app.goo.gl/9rLWtCad5hBb3Zbh9",
    embedUrl: `https://www.google.com/maps?q=${warehouseCoords}&output=embed`,
  },
];
