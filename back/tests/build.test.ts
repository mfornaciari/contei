import { describe, expect, it } from "bun:test";
import { build } from "../src/build";

describe("build", () => {
  const port = Number(Bun.env.PORT);

  it("does not allow connection if no player ID is received", async () => {
    const app = build(port);
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

  it("adds new player if player ID is received and match has no other players", async () => {
    const app = build(port);
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

  it("adds new player if player ID is received and match has other players", async () => {
    const app = build(port);
    const server = app.server;

    if (server != null) {
      // First player
      const player1Id = crypto.randomUUID();
      const client1 = new WebSocket(`ws://${server.hostname}:${server.port}`, {
        headers: { "sec-websocket-protocol": player1Id },
      });
      let client1MessageCounter = 0;
      let resolveHandler1: (value: string) => void;
      const message1 = new Promise<string>(resolve => {
        resolveHandler1 = resolve;
      });
      client1.addEventListener("message", async event => {
        if (client1MessageCounter === 1) {
          resolveHandler1(event.data.toString());
          client1.close();
          await app.stop();
        }
        client1MessageCounter += 1;
      });

      // Second player
      const player2Id = crypto.randomUUID();
      const client2 = new WebSocket(`ws://${server.hostname}:${server.port}`, {
        headers: { "sec-websocket-protocol": player2Id },
      });
      let resolveHandler2: (value: string) => void;
      const message2 = new Promise<string>(resolve => {
        resolveHandler2 = resolve;
      });
      client2.addEventListener("message", event => {
        resolveHandler2(event.data.toString());
        client2.close();
      });

      const result1 = JSON.parse(await message1);
      expect(result1.player.cards).toBeArrayOfSize(7);
      expect(result1.player.currentPlayer).toBeTrue();
      expect(result1.player.number).toEqual(1);
      expect(result1.otherPlayers).toBeArrayOfSize(1);
      expect(result1.openCard).toBeDefined();

      const result2 = JSON.parse(await message2);
      expect(result2.player.cards).toBeArrayOfSize(7);
      expect(result2.player.currentPlayer).toBeFalse();
      expect(result2.player.number).toEqual(2);
      expect(result2.otherPlayers).toBeArrayOfSize(1);
      expect(result2.openCard).toBeDefined();
    }
  });
});
