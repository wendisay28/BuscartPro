/**
 * Formatea un número como precio en pesos colombianos
 * Ejemplo: 120000 -> "$120K"
 */
export function formatPriceCOP(price: number): string {
  if (price >= 1000) {
    return `$${Math.round(price / 1000)}K`;
  }
  return `$${price}`;
}

/**
 * Acorta una distancia para mostrarla con unidad
 * Ejemplo: 2.5 -> "2.5 km"
 */
export function formatDistance(distanceKm: number): string {
  return `${distanceKm.toFixed(1)} km`;
}

/**
 * Capitaliza la primera letra de una palabra o frase
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Formatea una duración estimada
 */
export function formatDeliveryTime(days: number): string {
  return `${days} día${days !== 1 ? 's' : ''}`;
}