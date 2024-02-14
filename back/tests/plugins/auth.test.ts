import { describe, expect, it, mock } from "bun:test";
import { Elysia } from "elysia";
import { auth } from "../../src/plugins/auth";

describe("GET /auth", () => {
  const port = Number(Bun.env.PORT);

  it("sets cookie when it hasn't been set yet", async () => {
    const app = new Elysia().use(auth).listen(port);
    const mockUUID = "8acfb12e-f3ea-4fef-aa2e-4473bd49482c";
    crypto.randomUUID = mock(crypto.randomUUID).mockReturnValue(mockUUID);
    const request = new Request(`http://localhost:${port}/auth`);

    const response = await app.handle(request);

    expect(response.status).toBe(200);
    expect(response.headers.getSetCookie()).toEqual([`playerId=${mockUUID}; HttpOnly`]);
  });

  it("doesn't set cookie when it has already been set", async () => {
    const app = new Elysia().use(auth).listen(port);
    const request = new Request(`http://localhost:${port}/auth`, { headers: { cookie: `playerId=ABCD` } });

    const response = await app.handle(request);

    expect(response.status).toBe(200);
    expect(response.headers.getSetCookie()).toBeEmpty();
  });
});
