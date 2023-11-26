import { render, screen, within } from "@testing-library/react";
import { type PlayerData, Player } from "./Player";

describe("Player", () => {
  it("renders correct number of stackable cards in an ordered list", () => {
    const player: PlayerData = {
      cards: [
        { color: "blue", number: 1 },
        { color: "blue", number: 2 },
      ],
      currentPlayer: true,
      number: 1,
    };

    render(<Player player={player} />);

    const playerSection = screen.getByRole("region");
    expect(playerSection).toHaveAccessibleName("Sua área de jogo");
    const cardList = within(playerSection).getByRole("list");
    expect(cardList).toHaveAccessibleName("Suas cartas");
    expect(cardList).toHaveStyle(`gridTemplateColumns: repeat(${player.cards.length}, 2.5rem)`);

    const listItems = within(cardList).getAllByRole("listitem");
    expect(listItems.length).toEqual(2);

    const [item1, item2] = listItems;
    const card1 = within(item1).getByAltText("1 azul");
    const card2 = within(item2).getByAltText("2 azul");
    expect(card1).toHaveClass("card card-stackable");
    expect(card2).toHaveClass("card card-stackable");
  });
});
