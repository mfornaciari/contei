import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders with correct styles when not stackable", () => {
    const cardData = { number: 5 };

    render(<Card cardData={cardData} index={1} stackable={false} />);
    const card = screen.getByRole("article");

    expect(card).toHaveTextContent("5");
    expect(card).toHaveStyle("z-index: 1");
    expect(card).not.toHaveStyle("gridRowStart: 1");
    expect(card).not.toHaveStyle("gridColumnStart: 1");
  });

  it("renders with correct styles when stackable", () => {
    const cardData = { number: 5 };

    render(<Card cardData={cardData} index={1} stackable={true} />);
    const card = screen.getByRole("article");

    expect(card).toHaveStyle("z-index: 1");
    expect(card).toHaveStyle("gridRowStart: 1");
    expect(card).toHaveStyle("gridColumnStart: 1");
  });
});
