import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Play } from "./Play";

describe("Player", () => {
  it("renders button that sends payload", async () => {
    const send = jest.fn();
    render(<Play send={send} />);
    const button = screen.getByRole("button");

    expect(button).toHaveAccessibleName("Passar");

    await user.click(button);

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ kind: "pass" });
  });
});
