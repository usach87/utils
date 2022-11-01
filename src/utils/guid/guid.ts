function s4(): string {
  return (((Math.random() + 1) * 0x10000) | 0).toString(16).substring(1);
}

export function guid(): string {
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}
