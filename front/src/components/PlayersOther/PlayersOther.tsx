import "./PlayersOther.css";

export type PlayerOtherData = {
  currentPlayer: boolean;
  number: number;
  numberOfCards: number;
};

type PlayersOtherProps = {
  players: PlayerOtherData[];
};

export function PlayersOther({ players }: PlayersOtherProps): JSX.Element {
  const playersList = players.map(player => <li key={player.number}>{player.numberOfCards}</li>);

  return <ol className="other-players">{playersList}</ol>;
}
