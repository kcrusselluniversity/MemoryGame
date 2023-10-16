import { useEffect } from "react";
import { useAtom } from "jotai";
import { gameStateAtom } from "../atoms/atoms";
import getPokemonFromId from "../utils/getPokemonFromId";

export default function useGameLogic(activeCardIds, setActiveCardIds, pokemonCards, setPokemonCards, setSeenPokemonIds, seenPokemonIds, setTimer) {
    const [gameState, setGameState] = useAtom(gameStateAtom);
    console.log(activeCardIds)

    // This function shows all cards except for the active and seen cards,
    // The parameter allows you to control whether the remaining cards are
    // disabled or enabled
    const showCards = (isDisabled=false) => {
        const updatedPokemonCards = pokemonCards.map(pokemon => {
            if(activeCardIds.includes(pokemon.id) || seenPokemonIds.includes(pokemon.id)) {
                pokemon.disabled = true;
                pokemon.visible = true;
            } else {
                pokemon.disabled = isDisabled;
            }
            return pokemon
        })
        setPokemonCards(updatedPokemonCards)
    }

    // This function resets the cards after two cards have been turned face up
    const resetCards = () => {
        const updatedPokemonCards = pokemonCards.map(pokemon => {
            if(seenPokemonIds.includes(pokemon.id)) {
                pokemon.disabled = true;
                pokemon.visible = true;
            } else {
                pokemon.disabled = false;
                pokemon.visible = false;
            }
            return pokemon
        })
        setPokemonCards(updatedPokemonCards)
    }

    useEffect(() => {
        switch(activeCardIds.length) {
            case 0:
                resetCards()
                break;
            case 1:
                showCards()
                break;
            case 2: 
                showCards(true)   
        
                setTimeout(() => {
                    const [firstCardId, secondCardId] = activeCardIds;
                    const firstPokemonName = getPokemonFromId(pokemonCards, firstCardId).name;
                    const secondPokemonName = getPokemonFromId(pokemonCards, secondCardId).name;
                    if (firstPokemonName === secondPokemonName) {
                        console.log('Working!')
                        // Add this pokemon to seen
                        setSeenPokemonIds([...seenPokemonIds, firstCardId, secondCardId]);
                    }
        
                    setActiveCardIds([]);
                }, 500);
                break;
        }    
    }, [activeCardIds]);

    // Endgame check
    useEffect(() => {
        if ((seenPokemonIds.length === pokemonCards.length / 2) && seenPokemonIds.length > 0) {
            setTimer(timer => [...timer, new Date()]);
            setGameState({ ...gameState, gameOver: true });
        }
    }, [seenPokemonIds]);
}

