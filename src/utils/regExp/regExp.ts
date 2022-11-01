/**
 * Attention! Может экранировать не все спецсимволы. При необходимости нужно добавить недостающие в регулярку.
 */
export function escapeTextForRegExp(text: string): string {
  return text.replace(/[-[\]{}()*+?.\\^$|]/g, '\\$&');
}
