import type { FavoritePokemons } from "@/interfaces/favorites-pokemons";
import { set } from "astro:schema";
import { createSignal, For, Show, type Component } from "solid-js";

interface Props {
  pokemon: FavoritePokemons;
}

export const FavoritePokemon: Component<Props> = ({ pokemon }) => {
  const [isVisible, setIsVisible] = createSignal(true);
  const ImageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const deleteFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem("favorites") ?? "[]"
    ) as FavoritePokemons[];

    const updatedFavorites = favorites.filter((p) => p.id !== pokemon.id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsVisible(false);
  };
  return (
    <Show when={isVisible()}>
      <div class="rounded p-4">
        <div class="border p-4 rounded-lg text-center">
          <a href={`/pokemons/${pokemon.name}`}>
            <h3 class="text-lg capitalize">
              <span class="font-bold">#{pokemon.id}</span> {pokemon.name}
            </h3>
            <img
              src={ImageSrc}
              alt={pokemon.name}
              class="w-20 h-20 mx-auto"
              style={`view-ttransition-name: ${pokemon.name}-image`}
            />
          </a>
          <button
            class="bg-red-500 cursor-pointer text-white px-4 py-2 mt-4 rounded"
            onClick={deleteFavorite}
          >
            Remove
          </button>
        </div>
      </div>
    </Show>
  );
};
