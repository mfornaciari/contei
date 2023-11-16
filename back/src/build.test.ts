import { describe, expect, it } from "bun:test";
import { build } from "./build";

describe("app", () => {
  it("does not allow connection if no player ID is received", async () => {
    const app = build();
    const server = app.server;
    if (server != null) {
      const client = new WebSocket(`ws://${server.hostname}:${server.port}`);
      let resolveHandler: (value: string) => void;
      const message = new Promise<string>(resolve => {
        resolveHandler = resolve;
      });
      client.addEventListener("message", async event => {
        resolveHandler(event.data.toString());
        await app.stop();
      });

      expect(await message).toEqual("No player ID received. Closing connection");
      expect(client.readyState).toEqual(3);
    }
  });

  it("adds new player if player ID is received", async () => {
    const app = build();
    const server = app.server;
    const playerId = crypto.randomUUID();
    if (server != null) {
      const client = new WebSocket(`ws://${server.hostname}:${server.port}`, {
        headers: { "sec-websocket-protocol": playerId },
      });
      let resolveHandler: (value: string) => void;
      const message = new Promise<string>(resolve => {
        resolveHandler = resolve;
      });
      client.addEventListener("message", async event => {
        resolveHandler(event.data.toString());
        client.close();
        await app.stop();
      });

      const result = JSON.parse(await message);

      expect(result.player.cards).toBeArrayOfSize(7);
      expect(result.player.currentPlayer).toBeTrue();
      expect(result.player.number).toEqual(1);
      expect(result.otherPlayers).toBeArrayOfSize(0);
      expect(result.openCard).toBeDefined();
    }
  });
});
