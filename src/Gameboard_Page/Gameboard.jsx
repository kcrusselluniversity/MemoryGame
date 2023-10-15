// FIX BUG WHERE YOU CAN CLICK ON A FACEUP CARD AND IT ACCEPTS
// IT AS A CARD

import classNames from "classnames";
import Card from "./Card";
import { HARD_MODE, MEDIUM_MODE } from "../App";
import { useRef } from "react";

export default function Gameboard({ 
    gameState,
    setGameState,
    pokemonCards,
    setPokemonCards,
    activeCards,
    setActiveCards}) 
{
    const loadedImageCountRef = useRef(0);

    const classList = classNames('gameboard', {
        'displayNone': !gameState.isLoaded,
        'medModeMaxWidth': gameState.mode == MEDIUM_MODE,
        'hardModeMaxWidth': gameState.mode == HARD_MODE 
    });

    return <div className={classList}>
    {pokemonCards.map(pokemon => 
        <Card 
            key={pokemon.id} 
            pokemon={pokemon}
            gameState={gameState}
            setGameState={setGameState}
            pokemonCards={pokemonCards}
            setPokemonCards={setPokemonCards}
            activeCards={activeCards} 
            setActiveCards={setActiveCards} 
            loadedImageCountRef={loadedImageCountRef}
        />)}
</div>
}