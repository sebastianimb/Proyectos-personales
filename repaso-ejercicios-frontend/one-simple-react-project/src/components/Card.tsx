import React from "react";
import { useCatImage } from "../hooks/useCatImage";
import { Button } from "../components/Button";
import "../styles/card.css";
import catSpinner from "../assets/catSpinner.gif";

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
      </div>
      <div className="card-body">
        {imgCat ? (
          <img
            src={imgCat}
            alt={`A cat image from random fact: ${
              typeof fact === "string" ? fact.split(" ", 3).join(" ") : ""
            }`}
            onLoad={(e) => {
              e.currentTarget.classList.add("fade-in");
            }}
          />
        ) : (
          <img src={catSpinner} alt="Loading cat image..." />
        )}
      </div>
      {fact ? (
        <div className="card-footer">
          <p>
            <span>Fact received: </span>
            {fact}
          </p>
          <Button OnClick={refreshFact} />
        </div>
      ) : (
        <div>
          <img
            src={catSpinner}
            width={"100px"}
            height={"100px"}
            alt="Loading cat fact..."
          />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
