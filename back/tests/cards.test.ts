import { describe, expect, it } from "bun:test";
import { buildCards } from "../src/cards";

describe("buildCards", () => {
  it("returns array of 54 cards", () => {
    const cards = buildCards();

    expect(cards).toBeArrayOfSize(54);
    expect(cards.map(card => card.number)).toBeArrayOfSize(54);
  });
});
