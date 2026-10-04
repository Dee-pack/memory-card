import Card from "./Card";

export default function CardGrid({ cards, onCardClick, lost }) {
  return (
    <div className={`grid ${lost ? "shake" : ""}`}>
      {cards.map((c) => (
        <Card key={c.id} card={c} onClick={onCardClick} />
      ))}
    </div>
  );
}