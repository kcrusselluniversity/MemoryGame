import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";
import { shuffle } from "lodash";

export default function useGameList() {
    const [pokemonArray, loading] = usePokemonList();
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        if (!loading) {
            // Make double of each pokemon and shuffle the array
            setGameList(shuffle([...pokemonArray, ...pokemonArray]));
        }
    }, [loading, pokemonArray])

    return [gameList, setGameList]
}