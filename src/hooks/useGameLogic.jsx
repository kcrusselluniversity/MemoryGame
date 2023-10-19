import { useEffect } from "react";
import { useAtom } from "jotai";
import { gameStateAtom } from "../atoms/atoms";
import getPokemonFromId from "../utils/getPokemonFromId";
import resetCards from "../utils/resetCards";
import showCards from "../utils/showCards";
import { cardFlipDuration, resetCardFlipDuration } from "../constants";

//  This hook is used to evaluate the game logic after each move is made
export default function useGameLogic(
    activeCardIds,
    setActiveCardIds,
    pokemonCards,
    setPokemonCards,
    setSeenPokemonIds,
    seenPokemonIds,
    setTimer
) {
    const [gameState, setGameState] = useAtom(gameStateAtom);
    const { mode: gameMode } = gameState;
    const totalCards = 2 * gameMode;

    useEffect(() => {
        switch (activeCardIds.length) {
            case 0:
                resetCards(pokemonCards, setPokemonCards, seenPokemonIds);
                break;
            case 1:
                showCards(
                    pokemonCards,
                    setPokemonCards,
                    activeCardIds,
                    seenPokemonIds
                );
                break;
            case 2:
                showCards(
                    pokemonCards,
                    setPokemonCards,
                    activeCardIds,
                    seenPokemonIds,
                    true
                );
                
                setTimeout(() => {
                    const [firstCardId, secondCardId] = activeCardIds;
                    const firstPokemonName = getPokemonFromId(
                        pokemonCards,
                        firstCardId
                    ).name;
                    const secondPokemonName = getPokemonFromId(
                        pokemonCards,
                        secondCardId
                    ).name;

                    if (firstPokemonName === secondPokemonName) {
                        // Add these pokemon cards to seen
                        setSeenPokemonIds([
                            ...seenPokemonIds,
                            firstCardId,
                            secondCardId,
                        ]);
                    } else {
                        setPokemonCards(pokemonCards.map(pokemon => {
                            if (pokemon.id == firstCardId || pokemon.id == secondCardId) {
                                pokemon.isFlipBackOver = true;
                            }
                            return pokemon
                        }))

                        setTimeout(() => {
                            setPokemonCards(pokemonCards.map(pokemon => {
                                if (pokemon.id == firstCardId || pokemon.id == secondCardId) {
                                    pokemon.isFlipBackOver = false;
                                }
                                return pokemon
                            }))  
                        }, cardFlipDuration)
                    }

                    setActiveCardIds([]);
                }, resetCardFlipDuration);
                break;
        }
    }, [activeCardIds]);

    // Check if end of game
    useEffect(() => {
        if (seenPokemonIds.length == totalCards) {
            setTimer((timer) => [...timer, new Date()]);
            setGameState({ ...gameState, gameOver: true });
        }
    }, [seenPokemonIds]);
}
