import Elysia, { t } from "elysia";
import { buildMatch, serializeMatchForPlayer } from "./match";
import { addPlayer } from "./player";

const authCookieName = String(Bun.env.AUTH_COOKIE_NAME);

export function build(port: number): Elysia {
  const app = new Elysia()
    .state("match", buildMatch())
    .get("/auth", ({ cookie, request, set }) => {
      const authCookie = cookie[authCookieName];
      if (authCookie.value != null) return;

      const playerIpAddress = app.server?.requestIP(request)?.address;
      if (playerIpAddress == null) {
        set.status = 422;
        return;
      }

      const playerId = crypto.randomUUID();
      authCookie.value = Buffer.from(`${playerId};${playerIpAddress}`, "binary").toString("base64");
      authCookie.httpOnly = true;
    })
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
