import Elysia from "elysia";
import { buildMatch, serializeMatchForPlayer } from "./match";
import { addPlayer } from "./player";

export function build(port: number): Elysia {
  const app = new Elysia()
    .state("match", buildMatch())
    .ws("/", {
      open(ws) {
        const playerId = ws.data.headers["sec-websocket-protocol"];
        if (playerId == null) {
          ws.send("No player ID received. Closing connection");
          ws.close();
          return;
        }

        const match = ws.data.store.match;
        let player = match.players.find(player => player.id === playerId);
        if (player != null) {
          const serializedMatch = serializeMatchForPlayer(player.id, match);
          ws.subscribe(playerId);
          ws.send(serializedMatch);
          return;
        }

        player = addPlayer(playerId, match);
        ws.subscribe(playerId);
        for (const player of match.players) {
          const serializedMatch = serializeMatchForPlayer(player.id, match);
          app.server?.publish(player.id, serializedMatch);
        }
      },
    })
    .listen(port);

  return app;
}
