import { type Setup } from "./setup";
import { t } from "elysia";
import { type Match, serializeMatchForPlayer } from "../match";
import { addPlayer } from "../player";

export function contei(app: Setup): Setup {
  return app.ws("/game", {
    body: t.Object({
      type: t.Literal("pass"),
    }),
    open(ws) {
      const ipAddress = ws.remoteAddress;
      const match = app.store.match;
      let player = match.players.find(player => player.ipAddress === ipAddress);
      if (player != null) {
        const serializedMatch = serializeMatchForPlayer(player.id, match);
        ws.subscribe(player.id);
        ws.send(serializedMatch);
        return;
      }

      player = addPlayer(ipAddress, match);
      ws.subscribe(player.id);
      for (const player of match.players) {
        const serializedMatch = serializeMatchForPlayer(player.id, match);
        app.server?.publish(player.id, JSON.stringify(serializedMatch));
      }
    },
    message(ws, { type }) {
      const match = app.store.match;
      const ipAddress = ws.remoteAddress;
      if (type === "pass") {
        handlePass(match, ipAddress);
        for (const player of match.players) {
          const serializedMatch = serializeMatchForPlayer(player.id, match);
          app.server?.publish(player.id, JSON.stringify(serializedMatch));
        }
      }
    },
  });
}

function handlePass(match: Match, ipAddress: string): void {
  const player = match.players.find(player => player.ipAddress === ipAddress);
  if (player != null) {
    const card = match.cards.pop();
    if (card != null) player.cards.push(card);
    player.currentPlayer = false;
    let nextPlayer = match.players.find(otherPlayer => otherPlayer.number === player.number + 1);
    if (nextPlayer == null) nextPlayer = match.players.find(otherPlayer => otherPlayer.number === 1);
    if (nextPlayer != null) nextPlayer.currentPlayer = true;
  }
}
