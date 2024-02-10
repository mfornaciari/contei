import { useEffect, useRef, useState } from "react";
import { type CardData, Card } from "./components/Card/Card";
import { type OpponentData } from "./components/Opponent/Opponent";
import { Opponents } from "./components/Opponents/Opponents";
import { type PlayData, Play } from "./components/Play/Play";
import { type PlayerData, Player } from "./components/Player/Player";
import "./App.css";

export type MatchData = {
  player: PlayerData | null;
  openCard: CardData | null;
  opponents: OpponentData[];
};

const initialMatch = {
  player: null,
  openCard: null,
  opponents: [],
};

export function App() {
  const webSocket = useRef<WebSocket | null>(null);
  const [match, setMatch] = useState<MatchData>(initialMatch);

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    if (userId == null) {
      const newId = crypto.randomUUID();
      sessionStorage.setItem("userId", newId);
      userId = newId;
    }
    webSocket.current = new WebSocket(`${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}`, userId);
    webSocket.current.addEventListener("message", event => {
      setMatch(JSON.parse(event.data));
    });
    return () => {
      if (webSocket.current != null) webSocket.current.close();
    };
  }, []);

  const { player, openCard, opponents } = match;
  const started = webSocket.current != null && player != null && openCard != null && opponents.length >= 1;

  if (!started)
    return (
      <main>
        <p>Aguardando início da partida...</p>
      </main>
    );

  function send(payload: PlayData) {
    if (webSocket.current != null) webSocket.current.send(JSON.stringify(payload));
  }

  return (
    <main>
      <Opponents opponents={opponents} />

      <section aria-label="Carta na mesa">
        <Card cardData={openCard} index={0} stackable={false} />
      </section>

      {player.currentPlayer && <Play send={send} />}

      <Player player={player} />
    </main>
  );
}
