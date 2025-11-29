import React from "react";
import { useFactData } from "../../hooks/useFactData";

function FactItem() {
  const { fact } = useFactData();
  return <li>{fact || "Loading..."}</li>;
}

export function Aside() {
  return (
    <aside>
      <h2>Did you know?</h2>
      <ul>
        {Array.from({ length: 4 }).map((_, index) => (
          <FactItem key={index} />
        ))}
      </ul>
    </aside>
  );
}
