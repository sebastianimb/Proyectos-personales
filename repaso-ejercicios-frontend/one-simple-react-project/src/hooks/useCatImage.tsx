import { useEffect, useState } from "react";

export function useCatImage(fact: string) {
  const [imgCat, setImgCat] = useState<string | null>("");

  useEffect(() => {
    if (!fact || typeof fact !== "string") return;
    setImgCat("");
    const firstThreeWords = fact.split(" ", 3).join(" ");
    fetch(
      `https://cataas.com/cat/says/${firstThreeWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((data) => {
        const url = data.url;
        setImgCat(url);
      })
      .catch(() => {
        setImgCat(null);
      });
  }, [fact]);

  return { imgCat };
}
