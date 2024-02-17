import { type Setup } from "./setup";
import { serializeMatchForPlayer } from "../match";
import { addPlayer } from "../player";

export function contei(app: Setup): Setup {
  return app.ws("/game", {
    open(ws) {
      const ipAddress = ws.remoteAddress;
      const match = app.store.match;
      let player = match.players.find(player => player.ipAddress === ipAddress);
      if (player != null) {
        const serializedMatch = serializeMatchForPlayer(player.id, match);
        ws.subscribe(player.id);
        ws.send(serializedMatch);
        return;
      }

      player = addPlayer(ipAddress, match);
      ws.subscribe(player.id);
      for (const player of match.players) {
        const serializedMatch = serializeMatchForPlayer(player.id, match);
        app.server?.publish(player.id, JSON.stringify(serializedMatch));
      }
    },
  });
}
