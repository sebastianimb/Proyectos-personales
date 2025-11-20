import { useEffect, useState } from "react";
import getFact from "../services/facts";

export function useFactData() {
  const [fact, setFact] = useState<string>("");

  const refreshFact = async () => {
    getFact().then((newFact) => setFact(newFact));
  };

  useEffect(() => {
    refreshFact();
  }, []);

  return { fact, refreshFact };
}
