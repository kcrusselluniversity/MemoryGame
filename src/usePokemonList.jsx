// TODO: Take into account how rand may produce the same number so need to 
// ensure each random number is unique
import { useEffect, useState } from "react";
import randomNumberArray from "./utils/randomNumberArray";

const NUMBER_OF_POKEMON = 150;

export default function usePokemonList(cardQuantity) {
    const [pokemonArray, setPokemonArray] = useState([])
    const [loading, setLoading] = useState(true);

    const randomIndexesArray = randomNumberArray(NUMBER_OF_POKEMON, cardQuantity);

    useEffect(() => {
        const promiseArray = Array.from({ length: cardQuantity }).map((_, index) => {

            return fetch(`https://pokeapi.co/api/v2/pokemon/${randomIndexesArray[index]}`)
            .then(response => response.json())
            .then(data => {
                const { name } = data;
                const { other } = data.sprites;
                const imgUrl = other["official-artwork"]["front_default"];

                const pokemon = {
                    name, 
                    imgUrl, 
                    disabled: false, 
                    visible: false, 
                }
                
                return pokemon
            })
        })
        
        Promise.all(promiseArray)
        .then(resolvedPokemon => {
            setPokemonArray(resolvedPokemon);
            setLoading(false)
        });
        
    }, [cardQuantity])

    return [pokemonArray, loading]
}