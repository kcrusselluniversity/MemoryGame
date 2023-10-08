import { useEffect, useState } from "react";

const DESIRED_QUANTITY = 6;
const NUMBER_OF_POKEMON = 150;

export default function usePokemonList() {
    const [pokemonArray, setPokemonArray] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const promiseArray = Array.from({ length: DESIRED_QUANTITY }).map(() => {
            const rand = Math.ceil(Math.random() * NUMBER_OF_POKEMON);

            return fetch(`https://pokeapi.co/api/v2/pokemon/${rand}`)
            .then(response => response.json())
            .then(data => {
                const { name } = data;
                const { other } = data.sprites;
                const imgUrl = other["official-artwork"]["front_default"];

                // A disabled property of the pokemon to indicate whether
                // that pokemons pair has been found
                const pokemon = {name, imgUrl, disabled: false}
                
                return pokemon
            })
        })
        
        Promise.all(promiseArray)
        .then(resolvedPokemon => {
            setPokemonArray(resolvedPokemon);
            setLoading(false)
        });
        
    }, [])

    return [pokemonArray, loading]
}