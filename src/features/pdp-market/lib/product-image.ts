import { APP_CONFIG } from "@/constants/config";

/** Built-in product images shipped under /public/pdp-market */
export const PDP_MARKET_IMAGE_OPTIONS = [
  { value: "/pdp-market/portfolio.svg", label: "Portfolio" },
  { value: "/pdp-market/workshop.svg", label: "Workshop" },
  { value: "/pdp-market/macbook.svg", label: "MacBook" },
  { value: "/pdp-market/hoodie.svg", label: "Hoodie" },
  { value: "/pdp-market/ielts.svg", label: "IELTS" },
  { value: "/pdp-market/mentor.svg", label: "Mentor session" },
] as const;

const FILENAME_TO_ASSET: Record<string, string> = {
  "portfolio.png": "/pdp-market/portfolio.svg",
  "portfolio.svg": "/pdp-market/portfolio.svg",
  "workshop.png": "/pdp-market/workshop.svg",
  "workshop.svg": "/pdp-market/workshop.svg",
  "macbook.png": "/pdp-market/macbook.svg",
  "macbook.svg": "/pdp-market/macbook.svg",
  "hoodie.png": "/pdp-market/hoodie.svg",
  "hoodie.svg": "/pdp-market/hoodie.svg",
  "ielts.png": "/pdp-market/ielts.svg",
  "ielts.svg": "/pdp-market/ielts.svg",
  "mentor.png": "/pdp-market/mentor.svg",
  "mentor.svg": "/pdp-market/mentor.svg",
};

export function resolveProductImageUrl(image: string): string {
  if (!image) return "/pdp-market/portfolio.svg";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/")) {
    return image;
  }

  const mapped = FILENAME_TO_ASSET[image.toLowerCase()];
  if (mapped) return mapped;

  if (image.includes("/")) {
    return image.startsWith("/") ? image : `/${image}`;
  }

  const base = (APP_CONFIG.apiUrl ?? "").replace(/\/$/, "");
  return `${base}/${image.replace(/^\//, "")}`;
}

export function normalizeProductImage(image: string): string {
  return resolveProductImageUrl(image);
}
