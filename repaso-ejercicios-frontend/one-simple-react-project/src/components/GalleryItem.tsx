import React from "react";
import { useCatImage } from "../hooks/useCatImage";
import "../styles/gelleryItem.css";

type GalleryItemProps = {
  fact: string;
};

export function GalleryItem({ fact }: GalleryItemProps) {
  const { imgCat } = useCatImage(fact);

  return (
    <div className="gallery-item">
      {imgCat ? (
        <img
          src={imgCat}
          alt={`A cat image from random fact: ${fact.split(" ", 3).join(" ")}`}
        />
      ) : (
        <p>Loading cat image...</p>
      )}
    </div>
  );
}
