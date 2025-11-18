import React from "react";
import "./style.css";
import { useCatImage } from "./hooks/useCatImage";
import { useFactData } from "./hooks/useFactData";

export function App() {
  const { fact, refreshFact } = useFactData();
  const { imgCat } = useCatImage(fact);
  return (
    <main>
      <h1>Random Cat Image by a Random Fact</h1>
      <section>
        {fact ? <p>{fact}</p> : <p>Loading cat fact...</p>}
        {imgCat ? (
          <img
            src={imgCat}
            alt={`A cat image from random fact: ${fact
              .split(" ", 3)
              .join(" ")}`}
          />
        ) : (
          <p>Loading cat image...</p>
        )}
        {fact && imgCat && <button onClick={refreshFact}>Search Fact</button>}
      </section>
    </main>
  );
}
