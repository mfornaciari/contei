import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { Opponent } from "../../../src/components/Opponent/Opponent";

describe("Opponent", () => {
  it("renders opponent data", () => {
    const opponent = {
      currentPlayer: false,
      number: 2,
      numberOfCards: 7,
    };

    render(<Opponent opponent={opponent} />);
    const items = screen.getAllByRole("presentation");

    expect(items[0]).toHaveTextContent("Oponente 2");
    expect(items[1]).toHaveTextContent("Cartas: 7");
  });
});
