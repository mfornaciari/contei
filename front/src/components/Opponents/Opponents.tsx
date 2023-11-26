import { type OpponentData, Opponent } from "../Opponent/Opponent";
import "./Opponents.css";

type OpponentsProps = {
  opponents: OpponentData[];
};

export function Opponents({ opponents }: OpponentsProps): JSX.Element {
  const opponentList = opponents.map(opponent => (
    <li key={opponent.number}>
      <Opponent opponent={opponent} />
    </li>
  ));

  return (
    <section aria-label="Oponentes">
      <ol className="opponents">{opponentList}</ol>
    </section>
  );
}
