import { useEffect, useState } from "react";
import { type CardData, Card } from "./components/Card/Card";
import { type OpponentData } from "./components/Opponent/Opponent";
import { Opponents } from "./components/Opponents/Opponents";
import { type PlayData, Play } from "./components/Play/Play";
import { type PlayerData, Player } from "./components/Player/Player";
import "./App.css";

type Match = {
  player: PlayerData | null;
  openCard: CardData | null;
  opponents: OpponentData[];
};

export function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
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
    const newSocket = new WebSocket("ws://localhost:3001", userId);
    newSocket.addEventListener("message", event => {
      setMatch(JSON.parse(event.data));
    });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  const { player, openCard, opponents } = match;
  const started = socket != null && player != null && openCard != null && opponents.length >= 1;

  if (!started)
    return (
      <main>
        <p>Aguardando início da partida...</p>
      </main>
    );

  function send(payload: PlayData) {
    if (socket != null) socket.send(JSON.stringify(payload));
  }

  return (
    <main>
      <Opponents opponents={opponents} />

      <section aria-label="Carta na mesa">
        <Card cardData={openCard} index={0} stackable={false} />
      </section>

      <Play send={send} />

      <Player player={player} />
    </main>
  );
}
