import { useEffect, useState } from "react";
import { type CardData, Card } from "./components/Card/Card";
import { type OpponentData } from "./components/Opponent/Opponent";
import { Opponents } from "./components/Opponents/Opponents";
import { type PlayerData, Player } from "./components/Player/Player";
import "./App.css";

type Match = {
  player: PlayerData | null;
  openCard: CardData | null;
  opponents: OpponentData[];
};

export function App() {
  const [match, setMatch] = useState<Match>({
    player: null,
    openCard: null,
    opponents: [],
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

  const { player, openCard, opponents } = match;
  const started = player != null && openCard != null && opponents.length >= 1;

  if (!started)
    return (
      <main>
        <p>Aguardando início da partida...</p>
      </main>
    );

  return (
    <main>
      <Opponents opponents={opponents} />

      <Card cardData={openCard} index={0} stackable={false} />

      <Player player={player} />
    </main>
  );
}
