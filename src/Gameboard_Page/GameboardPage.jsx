import { useState } from "react";
import usePokemonCards from "../hooks/usePokemonCards";
import LoadingSpinner from "./LoadingSpinner";
import PlayersDisplay from "./PlayersDisplay";
import HighScoreDisplay from "./HighScoreDisplay";
import Gameboard from "./Gameboard";
import { useAtomValue } from "jotai";
import { gameStateAtom } from "../atoms/atoms";
import useGameLogic from "../hooks/useGameLogic";

function GameboardPage({ timerState, highScore }) {
    const gameState = useAtomValue(gameStateAtom);
    const { mode } = gameState;
    const { isLoaded } = gameState;
    const { timer, setTimer } = timerState;
    const [activeCardIds, setActiveCardIds] = useState([]);
    const [seenPokemonIds, setSeenPokemonIds] = useState([]);
    const [pokemonCards, setPokemonCards] = usePokemonCards(mode);

    //  This hook is used to evaluate the game logic after each move is made
    useGameLogic(
        activeCardIds,
        setActiveCardIds,
        pokemonCards,
        setPokemonCards,
        setSeenPokemonIds,
        seenPokemonIds,
        setTimer
    );

    return (
        <main className="gameboardPage">
            {isLoaded ? (
                <>
                    <PlayersDisplay />
                    <HighScoreDisplay highScore={highScore} />
                </>
            ) : (
                <LoadingSpinner />
            )}
            <Gameboard
                pokemonCardsState={{ pokemonCards, setPokemonCards }}
                activeCardIdsState={{ activeCardIds, setActiveCardIds }}
                timerState={{ timer, setTimer }}
            />
        </main>
    );
}

export default GameboardPage;
