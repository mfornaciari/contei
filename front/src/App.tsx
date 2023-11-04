import type { CardData } from "./Card";
import { useEffect, useState } from "react";
import { Card } from "./Card";
import "./App.css";

type CurrentPlayer = {
  cards: CardData[];
  currentPlayer: boolean;
  matchId: number;
};
type OtherPlayer = {
  currentPlayer: boolean;
  numberOfCards: number;
  matchId: number;
};
type Match = {
  player: CurrentPlayer | null;
  openCard: CardData | null;
  otherPlayers: OtherPlayer[];
};

export function App() {
  const [match, setMatch] = useState<Match>({
    player: null,
    openCard: null,
    otherPlayers: [],
  });

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    if (userId == null) {
      const newId = crypto.randomUUID();
      sessionStorage.setItem("userId", newId);
      userId = newId;
    }
    const socket = new WebSocket("ws://localhost:3001", userId);
    socket.addEventListener("message", event => {
      console.log(event.data);
      setMatch(JSON.parse(event.data));
    });
    return () => {
      socket.close();
    };
  }, []);

  const { player, openCard, otherPlayers } = match;
  const started = player != null && openCard != null && match.otherPlayers.length >= 1;

  if (!started)
    return (
      <main>
        <p>Aguardando início da partida...</p>
      </main>
    );

  const otherPlayersList = otherPlayers.map(otherPlayer => (
    <li key={`${otherPlayer.matchId}`}>{otherPlayer.numberOfCards}</li>
  ));

  const playerCards = player.cards.map((cardData, index) => {
    return (
      <li key={`${player.matchId}-${index}`} className="player-card-li">
        <Card cardData={cardData} index={index} stackable={true} />
      </li>
    );
  });

  const playerCardListStyle = { gridTemplateColumns: `repeat(${player.cards.length}, 2.5rem)` };

  return (
    <main>
      <ol className="other-players">{otherPlayersList}</ol>

      <Card cardData={openCard} index={0} stackable={false} />

      <ol className="player-cards" style={playerCardListStyle}>
        {playerCards}
      </ol>
    </main>
  );
}
