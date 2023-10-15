import { useEffect } from "react";
import { useAtom } from "jotai";
import { gameStateAtom } from "../atoms/atoms";

export default function useGameLogic(activeCardIds, setActiveCardIds, pokemonCards, setPokemonCards, setSeenPokemon, seenPokemon, setTimer) {
    const [gameState, setGameState] = useAtom(gameStateAtom);

    // This function reenables call cards except for the active and seen cards
    // const reenableCards = () => {
    //     const updatedCards = pokemonCards.map(pokemon => {
    //         if (activeCardIds.includes(pokemon))
    //     })
    // }

    useEffect(() => {
        if (activeCardIds.length == 1) {
            const activePokemon = activeCardIds[0];

            // Reenable all cards except for the active card
            const updatedPokemonCards = pokemonCards.map(pokemon => {
                pokemon.disabled = pokemon.id === activePokemon.id ? true : false;
                return pokemon;
            });
            setPokemonCards(updatedPokemonCards);
        }

        if (activeCardIds.length == 2) {
            setTimeout(() => {
                const [firstCard, secondCard] = activeCardIds;
                if (firstCard.name === secondCard.name) {
                    // Add this pokemon to seen
                    setSeenPokemon([...seenPokemon, firstCard.name]);

                    // Reenable all cards except for the two active cards (as they match)
                    const updatedPokemonCards = pokemonCards.map(pokemon => {
                        if (pokemon.id != firstCard.id && pokemon.id != secondCard.id && !seenPokemon.find(seen => seen == pokemon.name)) {
                            pokemon.disabled = false;
                            pokemon.visible = false;
                        }
                        return pokemon;
                    });
                    setPokemonCards(updatedPokemonCards);
                }

                const updatedPokemonCards = pokemonCards.map(pokemon => {
                    pokemon.disabled = false;
                    if (!seenPokemon.find(seen => seen == pokemon.name)) pokemon.visible = false;
                    return pokemon;
                });

                setPokemonCards(updatedPokemonCards);
                setActiveCardIds([]);
            }, 300);
        }
    }, [activeCardIds]);

    useEffect(() => {
        // Disable seen Pokemon and let them be visible anytime seenPokemon
        // is updated
        const updatedList = pokemonCards.map(pokemon => {
            if (seenPokemon.includes(pokemon.name)) {
                pokemon.visible = true;
                pokemon.disabled = true;
            }
            return pokemon;
        });
        setPokemonCards(updatedList);
    }, [seenPokemon]);

    useEffect(() => {
        if ((seenPokemon.length === pokemonCards.length / 2) && seenPokemon.length > 0) {
            setTimer(timer => [...timer, new Date()]);
            setGameState({ ...gameState, gameOver: true });
        }
    }, [seenPokemon]);
}

