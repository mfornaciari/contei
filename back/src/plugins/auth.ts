import { type Elysia } from "elysia";

const authCookieName = String(Bun.env.AUTH_COOKIE_NAME);

export function auth(app: Elysia): Elysia {
  return app.get("/auth", ({ cookie, request, set }) => {
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
  });
}
