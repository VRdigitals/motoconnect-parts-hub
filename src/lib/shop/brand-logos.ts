/** Logos for the shop's "Shop by brand" tiles. Keys are lower-case Zoho Books brand names. */
import hero from "../../assets/brands/hero.png";
import honda from "../../assets/brands/honda.png";
import bajaj from "../../assets/brands/bajaj.png";
import tvs from "../../assets/brands/tvs.png";
import unoMinda from "../../assets/brands/uno-minda.png";
import steelBird from "../../assets/brands/steel-bird.png";
import rockman from "../../assets/brands/rockman.png";
import sparkMinda from "../../assets/brands/spark-minda.png";

export const brandLogos: Record<string, string> = {
  hero,
  honda,
  bajaj,
  tvs,
  "uno minda": unoMinda,
  steelbird: steelBird,
  rockman,
  "spark minda": sparkMinda,
};

export const brandLogo = (brand: string): string | null => brandLogos[brand.toLowerCase()] ?? null;
