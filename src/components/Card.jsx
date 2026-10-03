export default function Card({ card, onClick }) {
  return (
    <button className="card" onClick={() => onClick(card.id)}>
      <img src={card.image} alt={card.name} />
      <span className="card-name">{card.name}</span>
    </button>
  );
}