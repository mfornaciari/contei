import Elysia, { t } from "elysia";
import { auth } from "./plugins/auth";
import { buildMatch, serializeMatchForPlayer } from "./match";
import { addPlayer } from "./player";

export function build(port: number): Elysia {
  const app = new Elysia()
    .state("match", buildMatch())
    .use(auth)
    .get(
      "/contei",
      ({ request }) => {
        app.server?.upgrade(request);
      },
      {
        cookie: t.Cookie({
          p: t.String(),
        }),
      },
    )
    .ws("/contei", {
      open(ws) {
        const match = app.store.match;
        const playerId = ws.data.cookie.p.value;
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
          app.server?.publish(player.id, JSON.stringify(serializedMatch));
        }
      },
    })
    .listen(port);

  return app;
}
