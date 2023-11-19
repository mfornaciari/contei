import "./Opponent.css";

export type OpponentData = {
  currentPlayer: boolean;
  number: number;
  numberOfCards: number;
};

type OpponentProps = {
  opponent: OpponentData;
};

export function Opponent({ opponent }: OpponentProps): JSX.Element {
  return (
    <dl className="opponent">
      <div role="presentation" className="opponent-item">
        <dt>Oponente </dt>
        <dd>{opponent.number}</dd>
      </div>

      <div role="presentation" className="opponent-item">
        <dt>Cartas: </dt>
        <dd>{opponent.numberOfCards}</dd>
      </div>
    </dl>
  );
}
