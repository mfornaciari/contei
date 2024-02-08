import { afterEach, describe, it } from "bun:test";
import { render } from "@testing-library/react";
import { App } from "../src/App";

describe("App", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it("renders play area when it's the player's turn", () => {
    render(<App />);
  });
});
