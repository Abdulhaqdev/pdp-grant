const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function formatMonthYear(month: number, year: number): string {
  const name = MONTHS[month - 1];
  return name ? `${name} ${year}` : `${month}/${year}`;
}
