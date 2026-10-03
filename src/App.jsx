import { useState } from "react";
import { useCharacters } from "./hooks/useCharacters";
import { shuffle } from "./utils/shuffle";
import Scoreboard from "./components/Scoreboard";
import CardGrid from "./components/CardGrid";
import "./App.css";

export default function App() {
  const { cards, setCards, loading, error } = useCharacters(8);
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  function handleCardClick(id) {
    if (clickedIds.includes(id)) {
      setClickedIds([]);              // round over
    } else {
      const next = [...clickedIds, id];
      setClickedIds(next);
      setBestScore((best) => Math.max(best, next.length));
    }
    setCards((prev) => shuffle(prev));
  }

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;
return (
  <>
    <header className="topbar">
      <h1>Swamp Recall</h1>
      <Scoreboard score={clickedIds.length} best={bestScore} />
    </header>
    <main className="app">
      <p className="instructions">
        Pick a character. Never pick the same one twice.
      </p>
      <CardGrid cards={cards} onCardClick={handleCardClick} />
    </main>
  </>
);
}