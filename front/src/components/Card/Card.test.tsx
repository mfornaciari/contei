import { render, screen } from "@testing-library/react";
import { type CardData, Card } from "./Card";

describe("Card", () => {
  it("renders with correct styles when not stackable", () => {
    const cardData: CardData = { color: "blue", number: 5 };

    render(<Card cardData={cardData} index={1} stackable={false} />);
    const card: HTMLImageElement = screen.getByAltText("5 azul");

    expect(card.src).toContain(`/images/cards/${cardData.color}_${cardData.number}`);
    expect(card).toHaveStyle("z-index: 1");
    expect(card).not.toHaveStyle("gridRowStart: 1");
    expect(card).not.toHaveStyle("gridColumnStart: 1");
  });

  it("renders with correct styles when stackable", () => {
    const cardData: CardData = { color: "blue", number: 5 };

    render(<Card cardData={cardData} index={1} stackable={true} />);
    const card: HTMLImageElement = screen.getByAltText("5 azul");

    expect(card).toHaveStyle("z-index: 1");
    expect(card).toHaveStyle("gridRowStart: 1");
    expect(card).toHaveStyle("gridColumnStart: 1");
  });
});
