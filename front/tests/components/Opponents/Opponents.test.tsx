import { afterEach, describe, expect, it } from "bun:test";
import { render, screen, within } from "@testing-library/react";
import { Opponents } from "../../../src/components/Opponents/Opponents";

describe("Opponents", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it("renders correct number of players in an ordered list", () => {
    const opponents = [
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

    render(<Opponents opponents={opponents} />);
    const opponentsSection = screen.getByRole("region", { name: "Oponentes" });
    const list = within(opponentsSection).getByRole("list");
    const listItems = within(list).getAllByRole("listitem");

    expect(listItems[0].textContent).toInclude(String(opponents[0].numberOfCards));
    expect(listItems[1].textContent).toInclude(String(opponents[1].numberOfCards));
  });
});
