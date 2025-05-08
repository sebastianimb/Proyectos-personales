import { white } from "jsr:@std/fmt@1.0.3/colors";

/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */
interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
  current(): T | null;
}

class Pokemon {
  constructor(public name: string, public type: string) {}
}

class PokemonCollection {
  public pokemons: Array<Pokemon> = [];
  addPokemon(pokemon: Pokemon) {
    this.pokemons.push(pokemon);
  }
  getPokemonAt(index: number): Pokemon | null {
    if (index > 0 && index < this.pokemons.length) {
      return this.pokemons[index];
    }
    return null;
  }
  getPokemonsLength(): number {
    return this.pokemons.length;
  }
  createIterator(): PokemonIterator {
    return new PokemonIterator(this);
  }
}

class PokemonIterator implements Iterator<Pokemon> {
  private pokemonCollection: PokemonCollection;
  private position: number = 0;
  constructor(collection: PokemonCollection) {
    this.pokemonCollection = collection;
  }
  next(): Pokemon | null {
    if (this.hasNext()) {
      return this.pokemonCollection.getPokemonAt(this.position++);
    }
    return null;
  }
  hasNext(): boolean {
    return this.position < this.pokemonCollection.getPokemonsLength();
  }
  current(): Pokemon | null {
    return this.pokemonCollection.getPokemonAt(this.position);
  }
}

function main() {
  const pokemonCollection = new PokemonCollection();
  pokemonCollection.addPokemon(new Pokemon("Mew", "Psiquico"));
  pokemonCollection.addPokemon(new Pokemon("Mew-Two", "Psiquico"));
  pokemonCollection.addPokemon(new Pokemon("Pikachu", "Electrico"));
  pokemonCollection.addPokemon(new Pokemon("Charmandar", "Fuego"));
  pokemonCollection.addPokemon(new Pokemon("Blastoise", "Agua"));
  const iterator = pokemonCollection.createIterator();
  while (iterator.hasNext()) {
    const pokemon = iterator.next();
    if (pokemon) {
      console.log(`Pokemon: ${pokemon?.name}, de tipo: ${pokemon?.type}`);
    }
  }
}
main();
