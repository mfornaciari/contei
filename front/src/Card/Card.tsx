import type { CSSProperties } from "react";
import "./Card.css";

export type CardData = {
  number: number;
};

type CardProps = {
  cardData: CardData;
  index: number;
  stackable: boolean;
};

export function Card({ cardData, index, stackable }: CardProps): JSX.Element {
  const style = buildStyle(index, stackable);

  return (
    <article className="card" style={style}>
      <p role="presentation" className="corner-card-number">
        {cardData.number}
      </p>
      <p className="main-card-number">{cardData.number}</p>
    </article>
  );
}

function buildStyle(index: number, stackable: boolean): CSSProperties {
  if (!stackable) return { zIndex: index };

  return {
    zIndex: index,
    gridRowStart: 1,
    gridColumnStart: 1,
  };
}
