import { useState } from "react";
import { type CardData } from "../components/Card/Card";
import { type OpponentData } from "../components/Opponent/Opponent";
import { type PlayerData } from "../components/Player/Player";

type Match = {
  player: PlayerData | null;
  openCard: CardData | null;
  opponents: OpponentData[];
};

export function useMatch(match: Match) {
  return useState<Match>(match);
}
