import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";
import { shuffle } from "lodash";
import { v4 as uuidv4 } from 'uuid';

export default function useGameList(DESIRED_QUANTITY) {
    const [pokemonArray, loading] = usePokemonList(DESIRED_QUANTITY);
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        if (!loading) {
            // Make double of each pokemon and shuffle the array
            const shuffledCards = shuffle([...pokemonArray, ...pokemonArray]);

            // Add a unique ID to each card and update gameList
            setGameList(shuffledCards.map(pokemon => {
                return {...pokemon, id: uuidv4()}
            }))   
        }
    }, [loading, pokemonArray])

    return [gameList, setGameList]
}