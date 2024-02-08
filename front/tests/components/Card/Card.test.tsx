import { afterEach, describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { type CardData, Card } from "../../../src/components/Card/Card";

describe("Card", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it("renders with correct styles when not stackable", () => {
    const cardData: CardData = { color: "blue", number: 5 };

    render(<Card cardData={cardData} index={1} stackable={false} />);
    const card: HTMLImageElement = screen.getByAltText("5 azul");

    expect(card.src).toContain(`/images/cards/${cardData.color}_${cardData.number}`);
    console.log(card.classList.value);
    expect(card.classList.contains("card")).toBe(true);
    expect(card.classList.contains("card-stackable")).toBe(false);
  });

  it("renders with correct styles when stackable", () => {
    const cardData: CardData = { color: "blue", number: 5 };

    render(<Card cardData={cardData} index={1} stackable={true} />);
    const card: HTMLImageElement = screen.getByAltText("5 azul");

    expect(card.classList.contains("card-stackable")).toBe(true);
  });
});
