import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { type CardData, Card } from "../../../src/components/Card/Card";

describe("Card", () => {
  it("renders with correct styles when not stackable", () => {
    const cardData: CardData = { color: "blue", number: 5 };

    render(<Card cardData={cardData} index={1} stackable={false} />);
    const card: HTMLImageElement = screen.getByAltText("5 azul");

    expect(card.src).toContain(`/images/cards/${cardData.color}_${cardData.number}`);
    expect(card).toHaveClass("card");
    expect(card).not.toHaveClass("card-stackable");
  });

  it("renders with correct styles when stackable", () => {
    const cardData: CardData = { color: "blue", number: 5 };

    render(<Card cardData={cardData} index={1} stackable={true} />);
    const card: HTMLImageElement = screen.getByAltText("5 azul");

    expect(card).toHaveClass("card card-stackable");
  });
});
