export function getLocalStorageItem(name: string): string {
  return localStorage.getItem(name) || '';
}

export function setLocalStorageItem(name: string, value: string): void {
  localStorage.setItem(name, value);
}
