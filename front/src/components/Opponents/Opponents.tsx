import "./Opponents.css";

export type OpponentData = {
  currentPlayer: boolean;
  number: number;
  numberOfCards: number;
};

type OpponentsProps = {
  players: OpponentData[];
};

export function Opponents({ players }: OpponentsProps): JSX.Element {
  const opponentList = players.map(player => <li key={player.number}>{player.numberOfCards}</li>);

  return <ol className="opponents">{opponentList}</ol>;
}
