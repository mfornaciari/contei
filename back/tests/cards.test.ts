import { describe, expect, it } from "bun:test";
import { type Card, type CardColor, buildCards } from "../src/cards";

describe("buildCards", () => {
  it("returns array of 54 cards", () => {
    const cards = buildCards();

    expect(cards).toBeArrayOfSize(54);
    expect(cards.filter(card => filterCard(card, 1, "blue"))).toBeArrayOfSize(3);
    expect(cards.filter(card => filterCard(card, 2, "blue"))).toBeArrayOfSize(3);
    expect(cards.filter(card => filterCard(card, 3, "blue"))).toBeArrayOfSize(3);
    expect(cards.filter(card => filterCard(card, 4, "blue"))).toBeArrayOfSize(2);
    expect(cards.filter(card => filterCard(card, 5, "blue"))).toBeArrayOfSize(2);
    expect(cards.filter(card => filterCard(card, 6, "blue"))).toBeArrayOfSize(2);
    expect(cards.filter(card => filterCard(card, 7, "blue"))).toBeArrayOfSize(1);
    expect(cards.filter(card => filterCard(card, 8, "blue"))).toBeArrayOfSize(1);
    expect(cards.filter(card => filterCard(card, 9, "blue"))).toBeArrayOfSize(1);
    expect(cards.filter(card => filterCard(card, 1, "pink"))).toBeArrayOfSize(3);
    expect(cards.filter(card => filterCard(card, 2, "pink"))).toBeArrayOfSize(3);
    expect(cards.filter(card => filterCard(card, 3, "pink"))).toBeArrayOfSize(3);
    expect(cards.filter(card => filterCard(card, 4, "pink"))).toBeArrayOfSize(2);
    expect(cards.filter(card => filterCard(card, 5, "pink"))).toBeArrayOfSize(2);
    expect(cards.filter(card => filterCard(card, 6, "pink"))).toBeArrayOfSize(2);
    expect(cards.filter(card => filterCard(card, 7, "pink"))).toBeArrayOfSize(1);
    expect(cards.filter(card => filterCard(card, 8, "pink"))).toBeArrayOfSize(1);
    expect(cards.filter(card => filterCard(card, 9, "pink"))).toBeArrayOfSize(1);
    expect(cards.filter(card => filterCard(card, 1, "purple"))).toBeArrayOfSize(3);
    expect(cards.filter(card => filterCard(card, 2, "purple"))).toBeArrayOfSize(3);
    expect(cards.filter(card => filterCard(card, 3, "purple"))).toBeArrayOfSize(3);
    expect(cards.filter(card => filterCard(card, 4, "purple"))).toBeArrayOfSize(2);
    expect(cards.filter(card => filterCard(card, 5, "purple"))).toBeArrayOfSize(2);
    expect(cards.filter(card => filterCard(card, 6, "purple"))).toBeArrayOfSize(2);
    expect(cards.filter(card => filterCard(card, 7, "purple"))).toBeArrayOfSize(1);
    expect(cards.filter(card => filterCard(card, 8, "purple"))).toBeArrayOfSize(1);
    expect(cards.filter(card => filterCard(card, 9, "purple"))).toBeArrayOfSize(1);
  });
});

function filterCard(card: Card, number: number, color: CardColor): boolean {
  return card.number === number && card.color === color;
}
