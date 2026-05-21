export interface MarketProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  active?: boolean;
}

export interface PdpMarketResponse {
  products: MarketProduct[];
  student_balance: number;
  potential_points: number;
}

export type ProductAffordability = "affordable" | "close" | "locked";

export function getProductAffordability(
  potentialPoints: number,
  price: number
): ProductAffordability {
  if (potentialPoints >= price) return "affordable";
  if (potentialPoints >= price * 0.75) return "close";
  return "locked";
}

export function pointsProgress(potentialPoints: number, price: number): number {
  if (price <= 0) return 100;
  return Math.min(100, Math.round((potentialPoints / price) * 100));
}
