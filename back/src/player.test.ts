import { describe, expect, it } from "bun:test";
import { addPlayer, serializeOtherPlayer, serializePlayer } from "./player";
import { type Match } from "./match";

describe("addPlayer", () => {
  it("adds player set as current player to match when match has no other players", () => {
    const cards = [
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 4 },
      { number: 5 },
      { number: 6 },
      { number: 7 },
    ];
    const expectedCards = structuredClone(cards);
    const match: Match = {
      players: [],
      cards,
      openCard: { number: 1 },
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
    const cards = [
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 4 },
      { number: 5 },
      { number: 6 },
      { number: 7 },
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
      openCard: { number: 1 },
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
    const cards = [
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 4 },
      { number: 5 },
      { number: 6 },
      { number: 7 },
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

describe("serializeOtherPlayer", () => {
  it("returns object with player's number, number of cards and whether they are the current player", () => {
    const cards = [
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 4 },
      { number: 5 },
      { number: 6 },
      { number: 7 },
    ];
    const player = {
      id: "id",
      number: 1,
      cards,
      currentPlayer: false,
    };

    const serializedOtherPlayer = serializeOtherPlayer(player);

    expect(serializedOtherPlayer).toEqual({
      currentPlayer: player.currentPlayer,
      number: player.number,
      numberOfCards: player.cards.length,
    });
  });
});
