export const cutText = (textToCut: string, maxSymbols: number): string => {
  if (textToCut.length <= maxSymbols) {
    return textToCut;
  }

  return (`${textToCut.slice(0, maxSymbols)}...`);
};
