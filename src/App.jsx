import { useState, useEffect } from "react";
import { useCharacters } from "./hooks/useCharacters";
import { shuffle } from "./utils/shuffle";
import Scoreboard from "./components/Scoreboard";
import CardGrid from "./components/CardGrid";
import "./App.css";
import WinModal from "./components/WinModal";

export default function App() {
  const { cards, setCards, loading, error } = useCharacters(8);
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [lost, setLost] = useState(false);
   const hasWon = cards.length > 0 && clickedIds.length === cards.length;
    // Clear the loss flag shortly after it's set
  useEffect(() => {
    if (!lost) return;
    const timer = setTimeout(() => setLost(false), 500);
    return () => clearTimeout(timer);
  }, [lost]);

  
  
   function handleCardClick(id) {
    if (hasWon) return;
    if (clickedIds.includes(id)) {
      setClickedIds([]);  
      setLost(true);            // round over
    } else {
      const next = [...clickedIds, id];
      setClickedIds(next);
      setBestScore((best) => Math.max(best, next.length));
    }
    setCards((prev) => shuffle(prev));
  }
    function handlePlayAgain() {
    setClickedIds([]);
    setCards((prev) => shuffle(prev));
  }

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
  <>
    <header className="topbar">
      <h1>Swamp Recall</h1>
      <Scoreboard score={clickedIds.length} best={bestScore} lost={lost} />
    </header>
    <main className="app">
      <p className="instructions">
        Pick a character. Never pick the same one twice.
      </p>
      <CardGrid cards={cards} onCardClick={handleCardClick} lost={lost} />
    </main>
    {hasWon && (
      <WinModal score={clickedIds.length} onPlayAgain={handlePlayAgain} />
    )}
  </>
);
}