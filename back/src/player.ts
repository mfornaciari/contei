import { type Card } from "./cards";
import { type Match } from "./match";

export type Player = {
  id: string;
  cards: Card[];
  currentPlayer: boolean;
  number: number;
};

export type SerializedPlayer = {
  cards: Card[];
  currentPlayer: boolean;
  number: number;
};

export type SerializedOtherPlayer = {
  currentPlayer: boolean;
  number: number;
  numberOfCards: number;
};

export function addPlayer(playerId: string, match: Match): Player {
  const newPlayer: Player = {
    id: playerId,
    number: match.players.length,
    cards: match.cards.splice(0, 7),
    currentPlayer: match.players.length === 0,
  };
  match.players.push(newPlayer);
  return newPlayer;
}

export function serializePlayer({ cards, currentPlayer, number }: Player): SerializedPlayer {
  return {
    cards,
    currentPlayer,
    number,
  };
}

export function serializeOtherPlayer({ cards, currentPlayer, number }: Player): SerializedOtherPlayer {
  return {
    currentPlayer,
    number,
    numberOfCards: cards.length,
  };
}
