/**
 * Конвертирует 0-255 в hex
 *
 * В следующем мажорном релизе заменит rgb2hex
 *
 * @param rgb
 * @min 0
 * @max 255
 */
export const decimaltoHex = (rgb: number): string => (
  Math.floor(rgb / 16).toString(16) + (rgb % 16).toString(16)
);
