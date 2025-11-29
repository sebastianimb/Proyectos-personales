import React from "react";
import "./style.css";
import "./styles/gelleryItem.css";
import { useFactData } from "./hooks/useFactData";
import { Card } from "./components/Card";
import { GalleryItem } from "./components/GalleryItem";
import { Layout } from "./layouts/Layout";

export function App() {
  const { fact, refreshFact } = useFactData();
  return (
    <Layout>
      <main>
        <section className="main-content">
          {fact ? (
            <Card fact={fact} refreshFact={refreshFact} />
          ) : (
            <p>Loading cat fact...</p>
          )}
        </section>
        <section className="random-gallery">
          {Array.from({ length: 5 }).map((_, index) => (
            <GalleryItem key={index} fact={fact} />
          ))}
        </section>
      </main>
    </Layout>
  );
}
