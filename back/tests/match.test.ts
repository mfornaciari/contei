import { describe, expect, it } from "bun:test";
import { type Match, buildMatch, serializeMatchForPlayer } from "../src/match";
import { type Player, serializeOpponent, serializePlayer } from "../src/player";

describe("buildMatch", () => {
  it("returns a match with 53 cards, 1 open card and no players", () => {
    const match = buildMatch();

    expect(match.cards).toBeArrayOfSize(53);
    expect(match.cards.map(card => card.number)).toBeArrayOfSize(53);
    expect(match.openCard).toHaveProperty("number");
    expect(match.players).toBeArrayOfSize(0);
  });
});

describe("serializeMatchForPlayer", () => {
  it("returns serialized player, serialized other players and currently open card for a given player id", () => {
    const player1: Player = {
      id: "id1",
      ipAddress: "::ffff:127.0.0.1",
      number: 1,
      cards: [
        { color: "blue", number: 3 },
        { color: "blue", number: 4 },
      ],
      currentPlayer: true,
    };
    const player2: Player = {
      id: "id2",
      ipAddress: "::ffff:127.0.0.1",
      number: 2,
      cards: [
        { color: "blue", number: 5 },
        { color: "blue", number: 6 },
      ],
      currentPlayer: false,
    };
    const player3: Player = {
      id: "id3",
      ipAddress: "::ffff:127.0.0.1",
      number: 3,
      cards: [
        { color: "pink", number: 7 },
        { color: "purple", number: 8 },
      ],
      currentPlayer: false,
    };
    const match: Match = {
      players: [player1, player2, player3],
      cards: [
        { color: "pink", number: 1 },
        { color: "blue", number: 2 },
      ],
      openCard: { color: "blue", number: 9 },
    };

    const serializedMatch = serializeMatchForPlayer(player1.id, match);

    expect(serializedMatch).toEqual({
      player: serializePlayer(player1),
      opponents: [serializeOpponent(player2), serializeOpponent(player3)],
      openCard: match.openCard,
    });
  });
});
