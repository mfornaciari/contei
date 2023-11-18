import { type Card, buildCards } from "./cards";
import {
  type Player,
  type SerializedPlayer,
  type SerializedOpponent,
  serializeOpponent,
  serializePlayer,
} from "./player";

export type Match = {
  players: Player[];
  cards: Card[];
  openCard: Card;
};

type SerializedMatch = {
  openCard: Card;
  player: SerializedPlayer;
  opponents: SerializedOpponent[];
};

export function buildMatch(): Match {
  const cards = buildCards();
  const shuffledCards = cards.sort(() => Math.random() - 0.5);
  const openCard = shuffledCards.splice(0, 1)[0];

  return {
    players: [],
    cards: shuffledCards,
    openCard,
  };
}

export function serializeMatchForPlayer(playerId: string, { players, openCard }: Match): SerializedMatch {
  const { player, opponents } = players.reduce(
    (result: { player: SerializedPlayer; opponents: SerializedOpponent[] }, player) => {
      if (player.id === playerId) {
        result.player = serializePlayer(player);
      } else {
        result.opponents.push(serializeOpponent(player));
      }
      return result;
    },
    { player: { cards: [], currentPlayer: false, number: 7 }, opponents: [] },
  );

  return {
    openCard,
    opponents,
    player,
  };
}
