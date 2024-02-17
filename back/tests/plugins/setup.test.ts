import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { type Match } from "../../src/match";
import { setup } from "../../src/plugins/setup";

describe("setup", () => {
  it("sets up a match in app's store", () => {
    const app = new Elysia().use(setup);

    function isMatch(object: Match): object is Match {
      return Array.isArray(object.cards) && Array.isArray(object.players) && object.openCard != null;
    }

    expect(isMatch(app.store.match)).toBeTrue();
  });
});
