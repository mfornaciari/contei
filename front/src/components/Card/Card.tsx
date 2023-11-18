import { type CSSProperties } from "react";
import "./Card.css";

export type CardData = {
  color: CardColor;
  number: number;
};

type CardColor = "blue" | "pink" | "purple";

type CardProps = {
  cardData: CardData;
  index: number;
  stackable: boolean;
};

const colorTranslations = {
  blue: "azul",
  pink: "rosa",
  purple: "roxo",
};

export function Card({ cardData, index, stackable }: CardProps): JSX.Element {
  const imagePath = new URL(`../../images/cards/${cardData.color}_${cardData.number}.png`, import.meta.url).href;
  const style = buildStyle(index, stackable);

  return (
    <img
      src={imagePath}
      alt={`${cardData.number} ${colorTranslations[cardData.color]}`}
      className="card"
      style={style}
    />
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
