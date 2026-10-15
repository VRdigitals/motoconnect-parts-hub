/** URL slugs for product pages, e.g. "Clutch Lifter Kit UG-4 150" -> "clutch-lifter-kit-ug-4-150". */

export function slugify(input: string, max = 80): string {
  const s = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s.slice(0, max).replace(/-+$/, "") || "product";
}

/** Zoho Books item ids are long numbers; used to tell an old id-based link from a slug. */
export const looksLikeItemId = (value: string) => /^\d{12,}$/.test(value);

/**
 * Gives every product a unique, stable slug. Products whose names collide get their SKU (or the tail of the id)
 * appended. Within a group of identical names the lowest id keeps the plain slug, so the result does not depend on
 * the order Zoho returns items in.
 */
export function assignSlugs<T extends { id: string; name: string; sku: string | null }>(items: T[]): (T & { slug: string })[] {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const base = slugify(item.name);
    groups.set(base, [...(groups.get(base) ?? []), item]);
  }

  const slugs = new Map<string, string>();
  const taken = new Set<string>();
  for (const [base, group] of groups) {
    const sorted = [...group].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    sorted.forEach((item, index) => {
      let slug = index === 0 ? base : `${base}-${item.sku ? slugify(item.sku, 30) : item.id.slice(-6)}`;
      if (taken.has(slug)) slug = `${slug}-${item.id.slice(-6)}`;
      taken.add(slug);
      slugs.set(item.id, slug);
    });
  }
  return items.map((item) => ({ ...item, slug: slugs.get(item.id)! }));
}
