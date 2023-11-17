import { render, screen, within } from "@testing-library/react";
import { PlayerCurrent } from "./PlayerCurrent";

describe("PlayerCurrent", () => {
  it("renders correct number of stackable cards in an ordered list", () => {
    const player = {
      cards: [{ number: 1 }, { number: 2 }],
      currentPlayer: true,
      number: 1,
    };

    render(<PlayerCurrent player={player} />);

    const cardList = screen.getByRole("list");
    expect(cardList).toHaveStyle(`gridTemplateColumns: repeat(${player.cards.length}, 2.5rem)`);

    const listItems = within(cardList).getAllByRole("listitem");
    expect(listItems.length).toEqual(2);

    const [item1, item2] = listItems;
    const card1 = within(item1).getByRole("article");
    const card2 = within(item2).getByRole("article");
    expect(card1).toHaveStyle("gridRowStart: 1");
    expect(card1).toHaveStyle("gridColumnStart: 1");
    expect(card2).toHaveStyle("gridRowStart: 1");
    expect(card2).toHaveStyle("gridColumnStart: 1");
  });
});
