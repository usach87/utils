export const numberWithSpaces = (x: number): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
