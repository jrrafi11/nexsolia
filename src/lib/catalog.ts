import catalogData from "@/data/aura-catalog-lite.json";

export interface CatalogCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  count: number;
  image: string;
}

export interface CatalogBrand {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface CatalogProduct {
  id: number;
  name: string;
  slug: string;
  type: string;
  sku: string;
  price: number;
  regularPrice: number;
  salePrice: number;
  currencySymbol: string;
  priceRange: { min: number; max: number } | null;
  onSale: boolean;
  discountPercent: number;
  inStock: boolean;
  stockText: string;
  primaryImage: string;
  hoverImage: string | null;
  categories: { id: number; name: string; slug: string }[];
  brands: { id: number; name: string; slug: string }[];
  attrLabels: string[];
}

const categories = catalogData.categories as CatalogCategory[];
const equivalentSlugs = catalogData.equivalentSlugs as Record<string, string[]>;
const allBrands = catalogData.brands as CatalogBrand[];
const allProducts = catalogData.products as CatalogProduct[];

function getLiveProducts(): CatalogProduct[] {
  try {
    if (typeof window === "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require("fs");
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const path = require("path");
      const storePath = path.join(process.cwd(), "src", "data", "products-store.json");
      if (fs.existsSync(storePath)) {
        const stored = JSON.parse(fs.readFileSync(storePath, "utf-8"));
        if (Array.isArray(stored) && stored.length > 0) {
          return stored.map((p: any) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            type: p.type || "simple",
            sku: p.sku || "",
            price: Number(p.price) || 0,
            regularPrice: Number(p.regular_price ?? p.regularPrice ?? p.price) || 0,
            salePrice: Number(p.sale_price ?? p.salePrice ?? 0),
            currencySymbol: p.currency_symbol || p.currencySymbol || "৳",
            priceRange: null,
            onSale: !!(p.on_sale ?? p.onSale),
            discountPercent: Number(p.discount_percent ?? p.discountPercent ?? 0),
            inStock: p.in_stock !== undefined ? Boolean(p.in_stock) : p.inStock !== undefined ? Boolean(p.inStock) : true,
            stockText: p.stock_text || p.stockText || "In stock",
            primaryImage: p.primary_image || p.primaryImage || "",
            hoverImage: p.hover_image || p.hoverImage || null,
            categories: p.categories || [],
            brands: p.brands || [],
            attrLabels: (p.attributes || []).map((a: any) => a.name),
          }));
        }
      }
    }
  } catch {
    // Fallback to static
  }
  return allProducts;
}

const ALIAS_TITLES: Record<string, string> = {
  "water-heater-high-load-switches": "High Load Switches",
  "camera-accessories": "Security & CCTV Accessories",
  "roller-blind-motors": "Roller Blind Motors",
  "curtain-shutter-controllers": "Curtain & Shutter Controls",
  "misc-smart-devices": "Miscellaneous Smart Devices",
  "network-racks-cables": "Racks & Cables",
  "pbx-telephones": "PBX & Telephones",
  "audio-accessories": "Audio System Accessories",
  "gate-accessories": "Automatic Gate Accessories",
  "ready-smart-home-packages": "Smart Home Packages",
  "knx-dimmers": "KNX Dimming Actuators",
  "knx-curtain-shutter-actuators": "KNX Shutter & Blind Actuators",
  "knx-hvac-control": "KNX HVAC Controllers",
};

export function getAllCategories(): CatalogCategory[] {
  return categories;
}

export function getAllBrands(): CatalogBrand[] {
  return allBrands;
}

export function getAllProducts(): CatalogProduct[] {
  return getLiveProducts();
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  const decoded = decodeURIComponent(slug);
  const products = getLiveProducts();
  return products.find((p) => p.slug === decoded || p.slug === slug);
}

export function resolveCategoryBySlug(slug: string): CatalogCategory | undefined {
  const clean = decodeURIComponent(slug).toLowerCase();
  const exact = categories.find((c) => c.slug.toLowerCase() === clean);
  if (exact) return exact;

  const eqList = equivalentSlugs[clean];
  if (eqList && eqList.length > 0) {
    for (const candidate of eqList) {
      const found = categories.find((c) => c.slug.toLowerCase() === candidate.toLowerCase());
      if (found) {
        return {
          ...found,
          slug: clean,
          name: ALIAS_TITLES[clean] || found.name,
        };
      }
    }
  }
  return undefined;
}

export function getExpandedCategorySlugs(slug: string): Set<string> {
  const clean = decodeURIComponent(slug).toLowerCase();
  const result = new Set<string>([clean]);

  const eqs = equivalentSlugs[clean] || [];
  for (const eq of eqs) {
    result.add(eq.toLowerCase());
  }

  // Find category IDs matching any of these slugs
  const matchedCatIds = new Set<number>();
  for (const c of categories) {
    if (result.has(c.slug.toLowerCase())) {
      matchedCatIds.add(c.id);
    }
  }

  // Add direct and nested child categories
  let added = true;
  while (added) {
    added = false;
    for (const c of categories) {
      if (c.parent && matchedCatIds.has(c.parent) && !matchedCatIds.has(c.id)) {
        matchedCatIds.add(c.id);
        result.add(c.slug.toLowerCase());
        const childEqs = equivalentSlugs[c.slug.toLowerCase()] || [];
        for (const ceq of childEqs) {
          result.add(ceq.toLowerCase());
        }
        added = true;
      }
    }
  }

  return result;
}

export function getProductsForCategory(slug: string): CatalogProduct[] {
  const clean = decodeURIComponent(slug).toLowerCase();
  const expanded = getExpandedCategorySlugs(clean);

  // Separate direct matches (tagged with the exact slug) so they appear first, just like aura.eg
  const directMatches: CatalogProduct[] = [];
  const childOrTwinMatches: CatalogProduct[] = [];

  for (const p of allProducts) {
    const prodSlugs = p.categories.map((c) => c.slug.toLowerCase());
    if (prodSlugs.includes(clean)) {
      directMatches.push(p);
    } else if (prodSlugs.some((s) => expanded.has(s))) {
      childOrTwinMatches.push(p);
    }
  }

  return [...directMatches, ...childOrTwinMatches];
}

export function getSubcategoriesForCategory(cat: CatalogCategory): CatalogCategory[] {
  // First check direct children of this category ID
  let children = categories.filter((c) => c.parent === cat.id);

  // If this category has no direct children or few, check equivalent top-level category
  if (children.length === 0) {
    const eqs = equivalentSlugs[cat.slug] || [];
    for (const eq of eqs) {
      const twin = categories.find((c) => c.slug === eq && c.id !== cat.id);
      if (twin) {
        const twinChildren = categories.filter((c) => c.parent === twin.id);
        if (twinChildren.length > 0) {
          children = twinChildren;
          break;
        }
      }
    }
  }

  // Compute actual product counts for each subcategory (if count is 0, compute from products)
  return children.map((ch) => {
    const prods = getProductsForCategory(ch.slug);
    const displayCount = ch.count > 0 ? ch.count : prods.length;
    return {
      ...ch,
      count: displayCount,
    };
  });
}

export function getMainShopSubcatCards(): CatalogCategory[] {
  // Exact main category cards displayed at the top of https://aura.eg/en/shop/
  const preferredSlugs = [
    "smart-locks",
    "lighting-power-automation",
    "security-monitoring",
    "smart-curtain",
    "control-voice-systems",
    "wifi-network-solutions",
    "audio-systems",
    "gate-automation-systems",
    "smart-home-packages",
    "accessories",
  ];

  const cards: CatalogCategory[] = [];
  for (const slug of preferredSlugs) {
    const c = categories.find((cat) => cat.slug === slug);
    if (c) {
      const prods = getProductsForCategory(c.slug);
      cards.push({
        ...c,
        count: c.count > 0 ? c.count : prods.length,
      });
    }
  }
  return cards;
}

export interface SidebarCategoryTreeItem {
  category: CatalogCategory;
  children: CatalogCategory[];
}

export function getShopSidebarCategoryTree(): SidebarCategoryTreeItem[] {
  // Top-level categories shown in the Shop sidebar on aura.eg/en/shop/
  const topCats = categories.filter((c) => c.parent === 0 && c.slug !== "uncategorized");
  return topCats.map((tc) => ({
    category: tc,
    children: categories.filter((ch) => ch.parent === tc.id),
  }));
}

export function getBrandsForProducts(products: CatalogProduct[]): CatalogBrand[] {
  const slugSet = new Set<string>();
  for (const p of products) {
    for (const b of p.brands) {
      slugSet.add(b.slug);
    }
  }
  const matched = allBrands.filter((b) => slugSet.has(b.slug));
  if (matched.length > 0) return matched;
  // Fallback to top brands if a small category has no explicit brand tags
  return allBrands.filter((b) =>
    ["akubela-en", "generic", "sonoff", "tuya", "aqara", "avatto", "ezviz", "hikvision", "moes", "zemismart"].includes(b.slug)
  );
}
