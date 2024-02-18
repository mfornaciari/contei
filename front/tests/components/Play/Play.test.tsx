import { afterEach, describe, expect, it, mock } from "bun:test";
import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Play } from "../../../src/components/Play/Play";

describe("Play", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it("renders button that sends payload", async () => {
    const send = mock(() => {});
    render(<Play send={send} />);

    const playArea = screen.getByRole("region", { name: "Sua jogada" });
    const button = within(playArea).getByRole("button", { name: "Passar" });

    await user.click(button);

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ type: "pass" });
  });
});
