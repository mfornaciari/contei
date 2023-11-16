import { Elysia } from "elysia";
import { match, serializeMatchForPlayer } from "./match";
import { addPlayer } from "./player";

const app = new Elysia()
  .state("match", match)
  .ws("/", {
    open(ws) {
      const playerId = ws.data.headers["sec-websocket-protocol"];
      if (playerId == null) {
        ws.send("No player ID received. Closing connection");
        ws.close();
        return;
      }

      let player = match.players.find(player => player.id === playerId);
      if (player != null) {
        const serializedMatch = serializeMatchForPlayer(player.id, match);
        ws.subscribe(playerId);
        ws.send(serializedMatch);
        return;
      }

      player = addPlayer(playerId, ws.data.store.match);
      ws.subscribe(playerId);
      for (const player of match.players) {
        const serializedMatch = serializeMatchForPlayer(player.id, match);
        app.server?.publish(player.id, serializedMatch);
      }
    },
  })
  .listen(3001);

console.log(`Running at ${app.server?.hostname}:${app.server?.port}`);
