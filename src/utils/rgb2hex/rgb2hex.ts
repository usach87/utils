/**
 * Конвертирует 0-255 в hex
 *
 * В следующем мажорном релизе будет удалена и заменена decimaltoHex
 *
 * @param rgb
 * @min 0
 * @max 255
 * @deprecated
 */
export function rgb2hex(rgb: number): string {
  if (!rgb) {
    return '';
  }

  return Math.floor(rgb / 16).toString(16) + (rgb % 16).toString(16);
}
