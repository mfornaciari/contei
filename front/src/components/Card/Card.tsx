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
} as const;

export function Card({ cardData, index, stackable }: CardProps): JSX.Element {
  const imagePath = new URL(`../../images/cards/${cardData.color}_${cardData.number}.png`, import.meta.url).href;
  const className = stackable ? "card card-stackable" : "card";
  const style = { zIndex: index };

  return (
    <img
      src={imagePath}
      alt={`${cardData.number} ${colorTranslations[cardData.color]}`}
      className={className}
      style={style}
    />
  );
}
