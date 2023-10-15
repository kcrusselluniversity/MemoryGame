import { useEffect, useState } from "react";
import randomNumberArray from "../utils/randomNumberArray";
import fetchPokemon from "../utils/fetchPokemon";

const NUMBER_OF_POKEMON = 700;

function addPokemonCardProperties(pokemon) {
    return {
        ...pokemon,
        disabled: false, 
        visible: false,         
    }
}

export default function usePokemonList(cardQuantity) {
    const [pokemonArray, setPokemonArray] = useState([])
    const [loading, setLoading] = useState(true);
    
    const randomIdArray = randomNumberArray(NUMBER_OF_POKEMON, cardQuantity);

    useEffect(() => {
        const promisesArray = randomIdArray.map(randomId => fetchPokemon(randomId));
        
        Promise.all(promisesArray)
            .then(resolvedArray => resolvedArray.map(pokemon => addPokemonCardProperties(pokemon)))
            .then(resolvedPokemonCardArray => {
                setPokemonArray(resolvedPokemonCardArray);
                setLoading(false);
            })
    }, [cardQuantity])

    return [pokemonArray, loading]
}