import { useEffect, useState } from "react";
import { type CardData, Card } from "./Card/Card";
import { type PlayerCurrentData, PlayerCurrent } from "./PlayerCurrent/PlayerCurrent";
import { type PlayerOtherData, PlayersOther } from "./PlayersOther/PlayersOther";
import "./App.css";

type Match = {
  player: PlayerCurrentData | null;
  openCard: CardData | null;
  otherPlayers: PlayerOtherData[];
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

  return (
    <main>
      <PlayersOther players={otherPlayers} />

      <Card cardData={openCard} index={0} stackable={false} />

      <PlayerCurrent player={player} />
    </main>
  );
}
