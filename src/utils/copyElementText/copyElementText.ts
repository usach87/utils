function copyElementTextByExecCommand(element: HTMLElement) {
  const selection = window.getSelection();

  if (!selection) {
    throw new Error('Window doesn\'t have Selection object');
  }

  const range = document.createRange();

  range.selectNodeContents(element);

  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand('copy');

  selection.removeAllRanges();
}

export async function copyElementText(element: HTMLElement): Promise<void> {
  try {
    await window.navigator.clipboard.writeText(element.innerText || '');
  } catch {
    try {
      copyElementTextByExecCommand(element);
    } catch {
      throw new Error('Copying to clipboard is not available');
    }
  }
}
