import { useEffect, useState } from "react";
import { type CardData, Card } from "./Card/Card";
import { type PlayerCurrentData, PlayerCurrent } from "./PlayerCurrent/PlayerCurrent";
import "./App.css";

type OtherPlayer = {
  currentPlayer: boolean;
  number: number;
  numberOfCards: number;
};
type Match = {
  player: PlayerCurrentData | null;
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
    <li key={`${otherPlayer.number}`}>{otherPlayer.numberOfCards}</li>
  ));

  return (
    <main>
      <ol className="other-players">{otherPlayersList}</ol>

      <Card cardData={openCard} index={0} stackable={false} />

      <PlayerCurrent player={player} />
    </main>
  );
}
