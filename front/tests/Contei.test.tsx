import { afterEach, describe, expect, it } from "bun:test";
import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import { type Server } from "bun";
import { type MatchData, Contei } from "../src/Contei";

describe("Contei", () => {
  let server: Server | null = null;

  afterEach(() => {
    if (server != null) {
      server.stop();
      server = null;
    }
    document.body.replaceChildren();
  });

  it("renders waiting message when match hasn't started yet", () => {
    const startMock: MatchData = {
      player: {
        cards: [{ color: "blue", number: 1 }],
        currentPlayer: true,
        number: 1,
      },
      openCard: { color: "purple", number: 3 },
      opponents: [],
    };
    server = startServer(startMock);
    render(<Contei />);

    expect(screen.queryByText("Aguardando início da partida...")).not.toBeNull();
  });

  it("renders play area only when it's the player's turn", async () => {
    const turn1Mock: MatchData = {
      player: {
        cards: [{ color: "blue", number: 1 }],
        currentPlayer: true,
        number: 1,
      },
      openCard: { color: "purple", number: 3 },
      opponents: [
        {
          currentPlayer: false,
          number: 2,
          numberOfCards: 1,
        },
      ],
    };
    const turn2Mock: MatchData = {
      player: {
        cards: [
          { color: "blue", number: 1 },
          { color: "pink", number: 7 },
        ],
        currentPlayer: false,
        number: 1,
      },
      openCard: { color: "purple", number: 3 },
      opponents: [
        {
          currentPlayer: true,
          number: 2,
          numberOfCards: 1,
        },
      ],
    };

    server = startServer(turn1Mock, turn2Mock);
    render(<Contei />);

    const playArea = await screen.findByRole("region", { name: "Sua jogada" });
    const passButton: HTMLButtonElement = within(playArea).getByRole("button");
    expect(passButton.value).toBe("Passar");

    await user.click(passButton);

    const newPlayArea = screen.queryByRole("region", { name: "Sua jogada" });
    expect(newPlayArea).toBeNull();
  });
});

function startServer(openResponse: MatchData, messageResponse: MatchData | null = null) {
  return Bun.serve<{ authToken: string }>({
    port: import.meta.env.VITE_SERVER_PORT,
    fetch(req, server) {
      const success = server.upgrade(req);
      if (success) return undefined;
    },
    websocket: {
      open(ws) {
        ws.send(JSON.stringify(openResponse));
      },
      message(ws) {
        ws.send(JSON.stringify(messageResponse));
      },
    },
  });
}
