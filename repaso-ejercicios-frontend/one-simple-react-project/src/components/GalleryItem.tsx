import React, { useEffect, useState } from "react";
import { useCatImage } from "../hooks/useCatImage";
import "../styles/gelleryItem.css";
import catSpinner from "../assets/catSpinner.gif";

type GalleryItemProps = {
  fact: string;
};

export function GalleryItem({ fact }: GalleryItemProps) {
  const { imgCat } = useCatImage(fact);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [imgCat]);

  const showImage = imgCat && typeof fact === "string";
  const showError = imgCat === null;

  return (
    <div className="gallery-item">
      {showError ? (
        <p>Error al cargar la imagen</p>
      ) : (
        <>
          {showImage && (
            <img
              className={`gallery-item-img ${isLoaded ? "fade-in" : ""}`}
              src={imgCat}
              alt={`A cat image from random fact: ${fact
                .split(" ", 3)
                .join(" ")}`}
              onLoad={() => setIsLoaded(true)}
              style={{ display: isLoaded ? "block" : "none" }}
            />
          )}
          {!isLoaded && (
            <img
              className="spinner"
              src={catSpinner}
              alt="Loading cat image..."
            />
          )}
        </>
      )}
    </div>
  );
}
