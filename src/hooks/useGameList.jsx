import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { v4 as uuidv4 } from 'uuid';
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

export default function useGameList(cardQuantity) {
    // const [pokemonCards, setPokemonCards] = useState([])
    const [gameList, setGameList] = useState([])

    const randomPokemonIdArray = randomNumberArray(NUMBER_OF_POKEMON, cardQuantity);

    useEffect(() => {
        const promisesArray = randomPokemonIdArray.map(randomId => fetchPokemon(randomId));
        
        Promise.all(promisesArray)
            .then(resolvedArray => resolvedArray.map(pokemon => addPokemonCardProperties(pokemon)))
            .then(pokemonArray => {
                // Make double of each pokemon and shuffle the array
                const shuffledCards = shuffle([...pokemonArray, ...pokemonArray]);
                
                // Add a unique ID to each card and update gameList
                setGameList(shuffledCards.map(pokemon => {
                    return {...pokemon, id: uuidv4()}
                }))   
            })
    }, [cardQuantity])

    return [gameList, setGameList]
}