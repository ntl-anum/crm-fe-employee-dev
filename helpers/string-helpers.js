export function toSentenceCase(str) {
  return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str, maxLength) {
  return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
}
