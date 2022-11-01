export function playSound(src: string, muted = false): Promise<void> {
  const audio = new Audio(src);

  audio.muted = muted;

  return new Promise<void>((resolve, reject) => {
    audio.onended = () => {
      resolve();
    };

    audio.play().catch((e) => {
      reject(e);
    });
  });
}
