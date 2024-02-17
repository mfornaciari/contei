import { type Card } from "./cards";
import { type Match } from "./match";

export type Player = {
  id: string;
  ipAddress: string;
  cards: Card[];
  currentPlayer: boolean;
  number: number;
};

export type SerializedPlayer = {
  cards: Card[];
  currentPlayer: boolean;
  number: number;
};

export type SerializedOpponent = {
  currentPlayer: boolean;
  number: number;
  numberOfCards: number;
};

export function addPlayer(ipAddress: string, match: Match): Player {
  const newPlayer: Player = {
    id: crypto.randomUUID(),
    ipAddress,
    number: match.players.length + 1,
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

export function serializeOpponent({ cards, currentPlayer, number }: Player): SerializedOpponent {
  return {
    currentPlayer,
    number,
    numberOfCards: cards.length,
  };
}
