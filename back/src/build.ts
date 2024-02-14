import Elysia from "elysia";
import { auth } from "./plugins/auth";
import { setup } from "./plugins/setup";
import { serializeMatchForPlayer } from "./match";
import { addPlayer } from "./player";

export function build(port: number): Elysia {
  const app = new Elysia()
    .use(setup)
    .use(auth)
    .ws("/game", {
      beforeHandle({ cookie: { playerId }, request, set }) {
        const ipAddress = app.server?.requestIP(request)?.address;
        const player = app.store.match.players.find(player => player.id === playerId.value);
        if (player != null && player.ipAddress !== ipAddress) return (set.status = 401);
      },
      open(ws) {
        const authCookie = ws.data.cookie.playerId;
        const [playerId, ipAddress] = Buffer.from(authCookie.value, "base64").toString("utf8").split(";");
        const match = app.store.match;
        let player = match.players.find(player => player.id === playerId);
        if (player != null) {
          const serializedMatch = serializeMatchForPlayer(player.id, match);
          ws.subscribe(playerId);
          ws.send(serializedMatch);
          return;
        }

        player = addPlayer(playerId, ipAddress, match);
        ws.subscribe(playerId);
        for (const player of match.players) {
          const serializedMatch = serializeMatchForPlayer(player.id, match);
          app.server?.publish(player.id, JSON.stringify(serializedMatch));
        }
      },
    })
    .listen(port);

  return app;
}
