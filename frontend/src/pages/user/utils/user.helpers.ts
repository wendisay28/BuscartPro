import { UserProfile } from "../types";

export function getUserDisplayName(user: UserProfile): string {
  return `${user.firstName} ${user.lastName}`;
}

export function formatCurrency(value: number, currency: string = "€"): string {
  return `${currency}${value.toLocaleString("es-ES")}`;
}

export function truncateText(text: string, maxLength: number = 100): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
