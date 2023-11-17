export type Card = {
  number: number;
};

export function buildCards(): Card[] {
  const cards1: Card[] = Array(9).fill({ number: 1 });
  const cards2: Card[] = Array(9).fill({ number: 2 });
  const cards3: Card[] = Array(9).fill({ number: 3 });
  const cards4: Card[] = Array(6).fill({ number: 4 });
  const cards5: Card[] = Array(6).fill({ number: 5 });
  const cards6: Card[] = Array(6).fill({ number: 6 });
  const cards7: Card[] = Array(3).fill({ number: 7 });
  const cards8: Card[] = Array(3).fill({ number: 8 });
  const cards9: Card[] = Array(3).fill({ number: 9 });

  return cards1.concat(cards2, cards3, cards4, cards5, cards6, cards7, cards8, cards9);
}
