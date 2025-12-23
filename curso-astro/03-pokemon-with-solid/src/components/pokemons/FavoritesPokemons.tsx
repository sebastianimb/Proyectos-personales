import type { FavoritePokemons } from "@/interfaces/favorites-pokemons";
import { createSignal, For } from "solid-js";
import { FavoritePokemon } from "./FavoritePokemon";

const getLocalStoragePokemons = (): FavoritePokemons[] => {
  const pokemons = JSON.parse(localStorage.getItem("favorites") ?? "[]");
  return pokemons;
};

export const FavoritesPokemons = () => {
  const [pokemons, setPokemons] = createSignal(getLocalStoragePokemons());
  return (
    <div class="grid grid-cols-2 sm:grid-cols-4">
      <For each={pokemons()}>
        {(pokemon) => <FavoritePokemon pokemon={pokemon} />}
      </For>
    </div>
  );
};
