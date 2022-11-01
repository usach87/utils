import { decimaltoHex } from '../decimaltoHex/decimaltoHex';

export const rgbStringToHex = (rgb: string): string => {
  const colors = rgb.match(/rgba?\((\d{0,3}),\s?(\d{0,3}),\s?(\d{0,3})/)?.slice(1, 4)?.map((color) => Number(color));

  if (!colors || colors.some((color) => Number.isNaN(color))) {
    return rgb;
  }

  return `#${colors.map((color) => decimaltoHex(color)).join('')}`;
};
