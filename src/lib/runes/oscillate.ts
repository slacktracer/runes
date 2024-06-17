export const oscillate = (input: number, min: number, max: number) => {
  const range = max - min;

  return min + Math.abs(((input + range) % (range * 2)) - range);
};
