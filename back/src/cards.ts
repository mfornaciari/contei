export type Card = {
  color: CardColor;
  number: number;
};

export type CardColor = "blue" | "pink" | "purple";

type BuildCardData = {
  color: CardColor;
  number: number;
  amount: number;
};

const buildCardsData: BuildCardData[] = [
  { color: "blue", number: 1, amount: 3 },
  { color: "blue", number: 2, amount: 3 },
  { color: "blue", number: 3, amount: 3 },
  { color: "blue", number: 4, amount: 2 },
  { color: "blue", number: 5, amount: 2 },
  { color: "blue", number: 6, amount: 2 },
  { color: "blue", number: 7, amount: 1 },
  { color: "blue", number: 8, amount: 1 },
  { color: "blue", number: 9, amount: 1 },
  { color: "pink", number: 1, amount: 3 },
  { color: "pink", number: 2, amount: 3 },
  { color: "pink", number: 3, amount: 3 },
  { color: "pink", number: 4, amount: 2 },
  { color: "pink", number: 5, amount: 2 },
  { color: "pink", number: 6, amount: 2 },
  { color: "pink", number: 7, amount: 1 },
  { color: "pink", number: 8, amount: 1 },
  { color: "pink", number: 9, amount: 1 },
  { color: "purple", number: 1, amount: 3 },
  { color: "purple", number: 2, amount: 3 },
  { color: "purple", number: 3, amount: 3 },
  { color: "purple", number: 4, amount: 2 },
  { color: "purple", number: 5, amount: 2 },
  { color: "purple", number: 6, amount: 2 },
  { color: "purple", number: 7, amount: 1 },
  { color: "purple", number: 8, amount: 1 },
  { color: "purple", number: 9, amount: 1 },
];

export function buildCards(): Card[] {
  return buildCardsData
    .map(data => {
      return Array(data.amount).fill({ color: data.color, number: data.number });
    })
    .flat();
}
