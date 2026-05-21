import type { MarketProduct } from "@/types/pdp-market";
import { normalizeProductImage } from "@/features/pdp-market/lib/product-image";

export const MOCK_CATALOG_STORAGE_KEY = "pdp-market-mock-catalog";
export const PDP_MARKET_CATALOG_EVENT = "pdp-market:catalog-updated";

export const DEFAULT_MOCK_PRODUCTS: MarketProduct[] = [
  {
    id: 1,
    name: "PDP Portfolio",
    price: 150,
    image: "/pdp-market/portfolio.svg",
    description: "Professional portfolio review session with a career mentor.",
    active: true,
  },
  {
    id: 2,
    name: "Grant Writing Workshop",
    price: 320,
    image: "/pdp-market/workshop.svg",
    description: "Full-day workshop on grant proposal structure and scoring.",
    active: true,
  },
  {
    id: 3,
    name: "MacBook Air M3",
    price: 1200,
    image: "/pdp-market/macbook.svg",
    description: "Laptop reward for top-performing grant students.",
    active: true,
  },
  {
    id: 4,
    name: "PDP Hoodie",
    price: 85,
    image: "/pdp-market/hoodie.svg",
    description: "Official PDP university branded hoodie.",
    active: true,
  },
  {
    id: 5,
    name: "IELTS Prep Voucher",
    price: 450,
    image: "/pdp-market/ielts.svg",
    description: "Voucher for IELTS preparation course at PDP Academy.",
    active: true,
  },
  {
    id: 6,
    name: "Mentor 1:1 Session",
    price: 60,
    image: "/pdp-market/mentor.svg",
    description: "30-minute one-on-one session with your group mentor.",
    active: false,
  },
];

function normalizeCatalog(products: MarketProduct[]): MarketProduct[] {
  return products.map((p) => ({
    ...p,
    image: normalizeProductImage(p.image),
  }));
}

export function readMockCatalog(): MarketProduct[] {
  if (typeof window === "undefined") {
    return normalizeCatalog(DEFAULT_MOCK_PRODUCTS);
  }

  try {
    const raw = localStorage.getItem(MOCK_CATALOG_STORAGE_KEY);
    if (!raw) return normalizeCatalog(DEFAULT_MOCK_PRODUCTS);
    const parsed = JSON.parse(raw) as MarketProduct[];
    return normalizeCatalog(
      parsed.length > 0 ? parsed : DEFAULT_MOCK_PRODUCTS
    );
  } catch {
    return normalizeCatalog(DEFAULT_MOCK_PRODUCTS);
  }
}

export function writeMockCatalog(products: MarketProduct[]): void {
  if (typeof window === "undefined") return;
  const normalized = normalizeCatalog(products);
  localStorage.setItem(
    MOCK_CATALOG_STORAGE_KEY,
    JSON.stringify(normalized)
  );
  window.dispatchEvent(new CustomEvent(PDP_MARKET_CATALOG_EVENT));
}

export function resetMockCatalog(): MarketProduct[] {
  const defaults = normalizeCatalog(DEFAULT_MOCK_PRODUCTS);
  writeMockCatalog(defaults);
  return defaults;
}

export function getActiveMockProducts(): MarketProduct[] {
  return readMockCatalog().filter((p) => p.active !== false);
}
