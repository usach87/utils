export const createSequenceGenerator = (step = 1): () => number => {
  let lastId = 0;

  return () => {
    lastId += step;

    return lastId;
  };
};
