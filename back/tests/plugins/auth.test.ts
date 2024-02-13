import { type SocketAddress } from "bun";
import { describe, expect, it, mock } from "bun:test";
import { Elysia } from "elysia";
import { auth } from "../../src/plugins/auth";

describe("GET /auth", () => {
  const port = Number(Bun.env.PORT);
  const authCookieName = String(Bun.env.AUTH_COOKIE_NAME);

  it("sets cookie when it hasn't been set yet", async () => {
    const app = new Elysia().use(auth).listen(port);
    const mockUUID = "8acfb12e-f3ea-4fef-aa2e-4473bd49482c";
    crypto.randomUUID = mock(crypto.randomUUID).mockReturnValue(mockUUID);
    const mockRequestIP: SocketAddress = {
      address: "::ffff:127.0.0.1",
      port: 3000,
      family: "IPv6",
    };
    if (app.server != null) app.server.requestIP = mock(app.server.requestIP).mockReturnValue(mockRequestIP);
    const expectedCookie = encodeURIComponent(
      Buffer.from(`${mockUUID};${mockRequestIP.address}`, "binary").toString("base64"),
    );
    const request = new Request(`http://localhost:${port}/auth`);

    const response = await app.handle(request);

    expect(response.status).toBe(200);
    expect(response.headers.getSetCookie()).toEqual([`${authCookieName}=${expectedCookie}; HttpOnly`]);
  });

  it("doesn't set cookie when it has already been set", async () => {
    const app = new Elysia().use(auth).listen(port);
    const mockRequestIP: SocketAddress = {
      address: "::ffff:127.0.0.1",
      port: 3000,
      family: "IPv6",
    };
    if (app.server != null) app.server.requestIP = mock(app.server.requestIP).mockReturnValue(mockRequestIP);
    const request = new Request(`http://localhost:${port}/auth`, { headers: { cookie: `${authCookieName}=ABCD` } });

    const response = await app.handle(request);

    expect(response.status).toBe(200);
    expect(response.headers.getSetCookie()).toBeEmpty();
  });

  it("doesn't set cookie when IP address cannot be found", async () => {
    const app = new Elysia().use(auth).listen(port);
    const request = new Request(`http://localhost:${port}/auth`);

    const response = await app.handle(request);

    expect(response.status).toBe(422);
    expect(response.headers.getSetCookie()).toBeEmpty();
  });
});
