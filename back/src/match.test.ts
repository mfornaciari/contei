import { describe, expect, it } from "bun:test";
import { serializeMatchForPlayer } from "./match";
import { serializeOtherPlayer, serializePlayer } from "./player";

describe("serializeMatchForPlayer", () => {
  it("returns serialized player, serialized other players and currently open card for a given player id", () => {
    const player1 = {
      id: "id1",
      number: 1,
      cards: [{ number: 3 }, { number: 4 }],
      currentPlayer: true,
    };
    const player2 = {
      id: "id2",
      number: 2,
      cards: [{ number: 5 }, { number: 6 }],
      currentPlayer: false,
    };
    const player3 = {
      id: "id3",
      number: 3,
      cards: [{ number: 7 }, { number: 8 }],
      currentPlayer: false,
    };
    const match = {
      players: [player1, player2, player3],
      cards: [{ number: 1 }, { number: 2 }],
      openCard: { number: 9 },
    };

    const serializedMatch = serializeMatchForPlayer(player1.id, match);

    expect(serializedMatch).toEqual(
      JSON.stringify({
        player: serializePlayer(player1),
        otherPlayers: [serializeOtherPlayer(player2), serializeOtherPlayer(player3)],
        openCard: match.openCard,
      }),
    );
  });
});
