import { afterEach, describe, expect, it, mock } from "bun:test";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Play } from "../../../src/components/Play/Play";

describe("Play", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it("renders button that sends payload", async () => {
    const send = mock(() => {});
    render(<Play send={send} />);
    const button = screen.getByRole("button", { name: "Passar" });

    await user.click(button);

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ kind: "pass" });
  });
});
