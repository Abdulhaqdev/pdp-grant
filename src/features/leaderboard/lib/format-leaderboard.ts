export function formatLeaderboardNumber(
  value: number,
  decimals = 1
): string {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(decimals);
}

export function formatLeaderboardPercent(value: number): string {
  return `${formatLeaderboardNumber(value)}%`;
}

export function formatLeaderboardSigned(value: number): string {
  const formatted = formatLeaderboardNumber(value);
  if (value > 0) return `+${formatted}`;
  return formatted;
}

export function getRiskBadgeVariant(
  risk: string
): "default" | "destructive" | "secondary" {
  const lower = risk.toLowerCase();
  if (lower.includes("high chance") || lower.includes("chance")) {
    return "default";
  }
  if (
    lower.includes("low") ||
    lower.includes("at risk") ||
    lower.includes("critical")
  ) {
    return "destructive";
  }
  return "secondary";
}
