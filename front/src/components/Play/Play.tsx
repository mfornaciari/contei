export type PlayData = {
  kind: "pass";
};

type PlayProps = {
  send: (payload: PlayData) => void;
};

export function Play({ send }: PlayProps) {
  const payload: PlayData = {
    kind: "pass",
  };

  function handleClick() {
    send(payload);
  }

  return (
    <section aria-label="Sua jogada">
      <input type="button" value="Passar" onClick={handleClick} />
    </section>
  );
}
