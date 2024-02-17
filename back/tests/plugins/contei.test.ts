import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { wsClose, wsMessage, wsOpen } from "../utils";
import { type Match } from "../../src/match";
import { setup } from "../../src/plugins/setup";
import { contei } from "../../src/plugins/contei";

describe("contei", () => {
  it("adds new player if no player with the same IP is found and match has no other players", async () => {
    const app = new Elysia().use(setup).use(contei).listen(0);
    const server = app.server;

    if (server != null) {
      const client = new WebSocket(`ws://${server.hostname}:${server.port}/game`);
      const message = await wsMessage(client);
      await wsClose(client);
      await app.stop();
      const parsedMessage = JSON.parse(message);

      expect(parsedMessage.player.cards).toBeArrayOfSize(7);
      expect(parsedMessage.player.currentPlayer).toBeTrue();
      expect(parsedMessage.player.number).toEqual(1);
      expect(parsedMessage.opponents).toBeArrayOfSize(0);
      expect(parsedMessage.openCard).toBeDefined();
    }
  });

  it("adds new player if no player with the same IP is found and match has other players", async () => {
    const app = new Elysia().use(setup).use(contei).listen(0);
    const server = app.server;

    if (server != null) {
      const client1 = new WebSocket(`ws://${server.hostname}:${server.port}/game`);
      await wsOpen(client1);
      app.store.match.players[0].ipAddress = "::ffff:127.0.0.2";
      const client2 = new WebSocket(`ws://${server.hostname}:${server.port}/game`);
      await wsOpen(client2);
      const [client1Message, client2Message] = await Promise.all([wsMessage(client1), wsMessage(client2)]);
      await Promise.all([wsClose(client1), wsClose(client2)]);
      await app.stop();
      const client1ParsedMessage = JSON.parse(client1Message);
      const client2ParsedMessage = JSON.parse(client2Message);

      expect(client1ParsedMessage.player.cards).toBeArrayOfSize(7);
      expect(client1ParsedMessage.player.currentPlayer).toBeTrue();
      expect(client1ParsedMessage.player.number).toEqual(1);
      expect(client1ParsedMessage.opponents).toBeArrayOfSize(1);
      expect(client1ParsedMessage.openCard).toBeDefined();

      expect(client2ParsedMessage.player.cards).toBeArrayOfSize(7);
      expect(client2ParsedMessage.player.currentPlayer).toBeFalse();
      expect(client2ParsedMessage.player.number).toEqual(2);
      expect(client2ParsedMessage.opponents).toBeArrayOfSize(1);
      expect(client2ParsedMessage.openCard).toBeDefined();
    }
  });

  it("associates client to existing player if they have the same IP", async () => {
    const app = new Elysia().use(setup).use(contei).listen(0);
    const match: Match = {
      players: [
        {
          id: "id1",
          ipAddress: "::ffff:127.0.0.1",
          number: 1,
          cards: [
            { color: "blue", number: 3 },
            { color: "blue", number: 4 },
          ],
          currentPlayer: true,
        },
        {
          id: "id2",
          ipAddress: "::ffff:127.0.0.2",
          number: 2,
          cards: [
            { color: "blue", number: 4 },
            { color: "pink", number: 5 },
          ],
          currentPlayer: false,
        },
      ],
      cards: [
        { color: "pink", number: 1 },
        { color: "blue", number: 2 },
      ],
      openCard: { color: "blue", number: 9 },
    };
    app.store.match = match;
    const server = app.server;

    if (server != null) {
      const client = new WebSocket(`ws://${server.hostname}:${server.port}/game`);
      const message = await wsMessage(client);
      await wsClose(client);
      await app.stop();
      const parsedMessage = JSON.parse(message);

      expect(parsedMessage.player.cards).toMatchObject(match.players[0].cards);
      expect(parsedMessage.player.currentPlayer).toBe(match.players[0].currentPlayer);
      expect(parsedMessage.player.number).toEqual(match.players[0].number);
      expect(parsedMessage.opponents).toBeArrayOfSize(1);
      expect(parsedMessage.openCard).toMatchObject(match.openCard);
    }
  });
});
