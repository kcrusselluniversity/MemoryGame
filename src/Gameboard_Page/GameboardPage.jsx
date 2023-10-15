// TODO: FIX USING CSS TO CONTROL EVERYTHING - COULD USE STATE + CONDITIONAL RENDERING INSTEAD OF HIDING
// THIS RESULTS IN UNNECCESSARY PAINTING TO THE DOM PER RENDER OF THE COMPONENT
// TODO: REFACTOR CSS LAYOUT EG (GRID) TO BE SPECIFIC TO EACH PAGE INSTEAD OF SETTING IT ON THE ROOT ELEMENT

import { useState } from "react";
import usePokemonCards from "../hooks/usePokemonCards";
import LoadingSpinner from "./LoadingSpinner";
import PlayersDisplay from "./PlayersDisplay";
import HighScoreDisplay from "./HighScoreDisplay";
import Gameboard from "./Gameboard";
import { useAtomValue } from "jotai";
import { gameStateAtom } from '../atoms/atoms';
import useGameLogic from "../hooks/useGameLogic";

function GameboardPage({ 
    timer, 
    setTimer, 
    highScore }) 
{   
    const gameState = useAtomValue(gameStateAtom)
    const {mode} = gameState;
    const {isLoaded} = gameState;
    const [activeCardIds, setActiveCardIds] = useState([]);
    const [seenPokemon, setSeenPokemon] = useState([]);
    const [pokemonCards, setPokemonCards] = usePokemonCards(mode);

    useGameLogic(activeCardIds, setActiveCardIds, pokemonCards, setPokemonCards, setSeenPokemon, seenPokemon, setTimer);
    
    return (
        <>
            <LoadingSpinner />
            {isLoaded && <>
                <PlayersDisplay />
                <HighScoreDisplay highScore={highScore} />
            </>}
            <Gameboard 
                pokemonCardsState={{pokemonCards, setPokemonCards}}
                activeCardIdsState={{activeCardIds, setActiveCardIds}}
                timerState={{timer, setTimer}}
            />
        </>)         
}

export default GameboardPage