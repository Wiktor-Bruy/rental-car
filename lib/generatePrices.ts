export function generatePrices(limit: number) {
  const prices = [];
  for (let i = 10; i <= limit; i += 10) {
    prices.push(i);
  }
  return prices;
}
