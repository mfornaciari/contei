import { describe, expect, it } from "bun:test";
import { type Card } from "../src/cards";
import { type Match } from "../src/match";
import { addPlayer, serializeOpponent, serializePlayer } from "../src/player";

describe("addPlayer", () => {
  it("adds player set as current player to match when match has no other players", () => {
    const cards: Card[] = [
      { color: "blue", number: 1 },
      { color: "blue", number: 2 },
      { color: "blue", number: 3 },
      { color: "blue", number: 4 },
      { color: "blue", number: 5 },
      { color: "blue", number: 6 },
      { color: "blue", number: 7 },
    ];
    const expectedCards = structuredClone(cards);
    const match: Match = {
      players: [],
      cards,
      openCard: { color: "blue", number: 1 },
    };
    const playerId = "id";

    addPlayer(playerId, match);

    expect(match.cards).toBeEmpty();
    expect(match.players).toEqual([
      {
        id: playerId,
        number: 1,
        cards: expectedCards,
        currentPlayer: true,
      },
    ]);
  });

  it("adds player not set as current player to match when match has other players", () => {
    const cards: Card[] = [
      { color: "blue", number: 1 },
      { color: "blue", number: 2 },
      { color: "blue", number: 3 },
      { color: "blue", number: 4 },
      { color: "blue", number: 5 },
      { color: "blue", number: 6 },
      { color: "blue", number: 7 },
    ];
    const existingPlayerCards = structuredClone(cards);
    const existingPlayer = {
      id: "id",
      number: 1,
      cards: existingPlayerCards,
      currentPlayer: true,
    };
    const expectedCards = structuredClone(cards);
    const match: Match = {
      players: [existingPlayer],
      cards,
      openCard: { color: "blue", number: 1 },
    };
    const playerId = "newId";

    addPlayer(playerId, match);

    expect(match.cards).toBeEmpty();
    expect(match.players).toEqual([
      existingPlayer,
      {
        id: playerId,
        number: 2,
        cards: expectedCards,
        currentPlayer: false,
      },
    ]);
  });
});

describe("serializePlayer", () => {
  it("returns object with player's number, cards and whether they are the current player", () => {
    const cards: Card[] = [
      { color: "blue", number: 1 },
      { color: "blue", number: 2 },
      { color: "blue", number: 3 },
      { color: "blue", number: 4 },
      { color: "blue", number: 5 },
      { color: "blue", number: 6 },
      { color: "blue", number: 7 },
    ];
    const player = {
      id: "id",
      number: 1,
      cards,
      currentPlayer: false,
    };

    const serializedPlayer = serializePlayer(player);

    expect(serializedPlayer).toEqual({
      cards: player.cards,
      currentPlayer: player.currentPlayer,
      number: player.number,
    });
  });
});

describe("serializeOpponent", () => {
  it("returns object with player's number, number of cards and whether they are the current player", () => {
    const cards: Card[] = [
      { color: "blue", number: 1 },
      { color: "blue", number: 2 },
      { color: "blue", number: 3 },
      { color: "blue", number: 4 },
      { color: "blue", number: 5 },
      { color: "blue", number: 6 },
      { color: "blue", number: 7 },
    ];
    const player = {
      id: "id",
      number: 1,
      cards,
      currentPlayer: false,
    };

    const serializedOtherPlayer = serializeOpponent(player);

    expect(serializedOtherPlayer).toEqual({
      currentPlayer: player.currentPlayer,
      number: player.number,
      numberOfCards: player.cards.length,
    });
  });
});
