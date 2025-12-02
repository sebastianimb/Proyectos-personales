import React, { useEffect, useState, useRef } from "react";
import type { PokeSearch } from "../interfaces/pokemon-by-name.response";
const url = "https://pokeapi.co/api/v2/pokemon/";

export default function Search() {
  const [pokeData, setPokeData] = useState<PokeSearch | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  async function fetchData(e: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value.trim().toLowerCase(); // API requiere minúsculas
    if (searchTerm === "") {
      setPokeData(null);
      return;
    }

    if (controllerRef.current) {
      controllerRef.current.abort();
      console.log("Peticion abortada.");
    }

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    try {
      const searchUrl = url + searchTerm;
      const response = await fetch(searchUrl, { signal });
      if (!response.ok) {
        setPokeData(null);
        return;
      }

      const data = (await response.json()) as PokeSearch;
      setPokeData(data);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Petición cancelada intencionalmente");
      } else {
        console.log("Error en la búsqueda: ", error);
        setPokeData(null);
      }
    }
  }

  return (
    <div className="mt-8">
      <input
        type="text"
        name="pokemon"
        id="pokemon"
        onChange={(e) => {
          fetchData(e);
        }}
        className="p-2 px-4 rounded-md w-full min-h-10 border border-gray-500 "
      />
      <div className="p-16">
        {pokeData && (
          <div className="border w-full bg-teal-600 border-gray-200 rounded-xl flex flex-col justify-center">
            <h2 className="text-gray-200 bg-teal-700 rounded-tl-xl rounded-tr-xl py-4 text-3xl font-bold capitalize border-b-2 w-full">
              {pokeData.name}
            </h2>
            <img src={pokeData.sprites?.front_default} alt={pokeData.name} />
          </div>
        )}
      </div>
    </div>
  );
}
