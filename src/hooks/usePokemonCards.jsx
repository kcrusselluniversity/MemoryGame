import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { v4 as uuidv4 } from "uuid";
import randomNumberArray from "../utils/randomNumberArray";
import fetchPokemon from "../utils/fetchPokemon";

const NUMBER_OF_POKEMON = 700;

// This hook is used to generate an array of pokemon cards
export default function usePokemonCards(cardQuantity) {
    const [pokemonCards, setPokemonCards] = useState([]);

    useEffect(() => {
        const randomPokemonIdArray = randomNumberArray(
            NUMBER_OF_POKEMON,
            cardQuantity
        );
        const promisesArray = randomPokemonIdArray.map((randomId) =>
            fetchPokemon(randomId)
        );

        Promise.all(promisesArray)
            .then((resolvedArray) =>
                resolvedArray.map((pokemon) =>
                    addPokemonCardProperties(pokemon)
                )
            )
            .then((pokemonArray) => {
                // Make double of each pokemon and shuffle the array
                const shuffledCards = shuffle([
                    ...pokemonArray,
                    ...pokemonArray,
                ]);

                // Add a unique ID to each card and update pokemonCards
                setPokemonCards(
                    shuffledCards.map((pokemon) => {
                        return { ...pokemon, id: uuidv4() };
                    })
                );
            });
    }, [cardQuantity]);

    return [pokemonCards, setPokemonCards];
}

function addPokemonCardProperties(pokemon) {
    return {
        ...pokemon,
        disabled: true,
        visible: false,
    };
}
