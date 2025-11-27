import React from "react";
import { useCatImage } from "../hooks/useCatImage";
import { Button } from "../components/Button";
import "../styles/card.css";

type CardProps = {
  fact: string;
  refreshFact: () => void;
};

export function Card({ fact, refreshFact }: CardProps) {
  const { imgCat } = useCatImage(fact);
  return (
    <div className="card">
      <div className="card-header">
        <h2>Random Cat Image</h2>
        <p>Hecho: {fact}</p>
      </div>
      <div className="card-body">
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
      </div>
      <div className="card-footer">
        <Button OnClick={refreshFact} />
      </div>
    </div>
  );
}
