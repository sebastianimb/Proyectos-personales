import React from "react";
import "./style.css";
import "./styles/gelleryItem.css";
import { useFactData } from "./hooks/useFactData";
import { Card } from "./components/Card";
import { GalleryItem } from "./components/GalleryItem";

export function App() {
  const { fact, refreshFact } = useFactData();
  return (
    <main>
      <h1>Random Cat Image by a Random Fact</h1>
      <section className="main-content">
        {fact ? (
          <Card fact={fact} refreshFact={refreshFact} />
        ) : (
          <p>Loading cat fact...</p>
        )}
      </section>
      <h1> Gallery: </h1>
      <div className="random-gallery">
        {Array.from({ length: 8 }).map((_, index) => (
          <GalleryItem key={index} fact={fact} />
        ))}
      </div>
    </main>
  );
}
