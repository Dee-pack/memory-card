// hooks/useCharacters.js
import { useState, useEffect } from "react";
import { shuffle } from "../utils/shuffle";

export function useCharacters(count = 12) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch(
          "https://api.tvmaze.com/singlesearch/shows?q=amphibia&embed=cast"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        console.log("raw cast:", data._embedded.cast.length);

        const seen = new Set();
        const unique = data._embedded.cast
          .map((c) => c.character)
          .filter((ch) => {
            if (!ch.image || seen.has(ch.id)) return false;
            seen.add(ch.id);
            return true;
          })
          .map((ch) => ({
            id: ch.id,
            name: ch.name,
            image: ch.image.original || ch.image.medium,
          }));
          
       console.log("with images, no duplicates:", unique.length);

        if (!ignore) setCards(shuffle(unique).slice(0, count));
      } catch (e) {
        if (!ignore) setError(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [count]);

  return { cards, setCards, loading, error };
}