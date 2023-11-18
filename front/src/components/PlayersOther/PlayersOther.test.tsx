import { render, screen, within } from "@testing-library/react";
import { PlayersOther } from "./PlayersOther";

describe("PlayersOther", () => {
  it("renders correct number of players in an ordered list", () => {
    const players = [
      {
        currentPlayer: true,
        number: 1,
        numberOfCards: 7,
      },
      {
        currentPlayer: false,
        number: 2,
        numberOfCards: 5,
      },
    ];

    render(<PlayersOther players={players} />);

    const list = screen.getByRole("list");
    const listItems = within(list).getAllByRole("listitem");

    expect(listItems[0]).toHaveTextContent(String(players[0].numberOfCards));
    expect(listItems[1]).toHaveTextContent(String(players[1].numberOfCards));
  });
});
