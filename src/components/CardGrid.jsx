// components/CardGrid.jsx
import Card from "./Card";
export default function CardGrid({ cards, onCardClick }) {
  return (
    <div className="grid">
      {cards.map((c) => (
        <Card key={c.id} card={c} onClick={onCardClick} />
      ))}
    </div>
  );
}