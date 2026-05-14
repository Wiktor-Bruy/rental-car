export function generatePrices(min: number, max: number) {
  const prices = [];
  for (let i = min; i <= max; i += 10) {
    prices.push(i);
  }
  return prices;
}
