import { type Elysia } from "elysia";

export const authCookieName = String(Bun.env.AUTH_COOKIE_NAME);

export function auth(app: Elysia): Elysia {
  return app.get("/auth", ({ cookie: { playerId } }) => {
    if (playerId.value != null) return;

    playerId.value = crypto.randomUUID();
    playerId.httpOnly = true;
  });
}
