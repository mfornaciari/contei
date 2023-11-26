import { type CardData, Card } from "../Card/Card";
import "./Player.css";

export type PlayerData = {
  cards: CardData[];
  currentPlayer: boolean;
  number: number;
};

type PlayerProps = {
  player: PlayerData;
};

export function Player({ player }: PlayerProps): JSX.Element {
  const cards = player.cards.map((cardData, index) => {
    return (
      <li key={`${player.number}-${index}`} className="player-card-li">
        <Card cardData={cardData} index={index} stackable={true} />
      </li>
    );
  });
  const style = { gridTemplateColumns: `repeat(${player.cards.length}, 2.5rem)` };

  return (
    <section aria-label="Sua área de jogo">
      <ol aria-label="Suas cartas" className="player-cards" style={style}>
        {cards}
      </ol>
    </section>
  );
}
