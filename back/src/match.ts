import { type Card, cards } from "./cards";
import {
  type Player,
  type SerializedPlayer,
  type SerializedOtherPlayer,
  serializeOtherPlayer,
  serializePlayer,
} from "./player";

export type Match = {
  players: Player[];
  cards: Card[];
  openCard: Card;
};

const shuffledCards = cards.sort(() => Math.random() - 0.5);
const openCard = shuffledCards.splice(0, 1)[0];

export const match: Match = {
  players: [],
  cards: shuffledCards,
  openCard,
};

export function serializeMatchForPlayer(playerId: string, { players, openCard }: Match): string {
  const { player, otherPlayers } = players.reduce(
    (result: { player: SerializedPlayer | null; otherPlayers: SerializedOtherPlayer[] }, player) => {
      if (player.id === playerId) {
        result.player = serializePlayer(player);
      } else {
        result.otherPlayers.push(serializeOtherPlayer(player));
      }
      return result;
    },
    { player: null, otherPlayers: [] },
  );

  return JSON.stringify({
    player,
    otherPlayers,
    openCard,
  });
}
