export function parseBase64<T>(base64String: string): T | undefined {
  const encodedString = Buffer.from(base64String, 'base64').toString('utf8');

  try {
    return JSON.parse(encodedString);
  } catch (error) {
    return undefined;
  }
}
