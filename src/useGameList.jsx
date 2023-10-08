import usePokemonList from "./usePokemonList";
import { shuffle } from "lodash";

export default function useGameList() {
    const [pokemonArray, loading] = usePokemonList();

    if (loading) return null;

    // Make double of each pokemon and shuffle the array
    return shuffle([...pokemonArray, ...pokemonArray])
}