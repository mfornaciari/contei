import { type CardData, Card } from "../Card/Card";

export type PlayerCurrentData = {
  cards: CardData[];
  currentPlayer: boolean;
  number: number;
};

type PlayerCurrentProps = {
  player: PlayerCurrentData;
};

export function PlayerCurrent({ player }: PlayerCurrentProps): JSX.Element {
  const cards = player.cards.map((cardData, index) => {
    return (
      <li key={`${player.number}-${index}`} className="player-card-li">
        <Card cardData={cardData} index={index} stackable={true} />
      </li>
    );
  });
  const playerCardListStyle = { gridTemplateColumns: `repeat(${player.cards.length}, 2.5rem)` };

  return (
    <ol className="player-cards" style={playerCardListStyle}>
      {cards}
    </ol>
  );
}
