export function hexToRGB(color: string, opacity: number): string {
  const redChannel = parseInt(color.substr(1, 2), 16);
  const greenChannel = parseInt(color.substr(3, 2), 16);
  const blueChannel = parseInt(color.substr(5, 2), 16);

  return `rgba(${redChannel}, ${greenChannel}, ${blueChannel}, ${opacity})`;
}
