import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("renders play area when it's the player's turn", () => {
    render(<App />);
  });
});
