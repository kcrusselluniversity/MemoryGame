// FIX BUG WHERE YOU CAN CLICK ON A FACEUP CARD AND IT ACCEPTS
// IT AS A CARD

import classNames from "classnames";
import Card from "./Card";
import { HARD_MODE, MEDIUM_MODE } from "../App";
import { useRef } from "react";

export default function Gameboard({ 
    pokemonCards, 
    stateProps, gameState, setGameState,
    gameState: {mode, isLoaded} }) 
{
    const loadedImageCountRef = useRef(0);

    const classList = classNames('gameboard', {
        'displayNone': !isLoaded,
        'medModeMaxWidth': mode == MEDIUM_MODE,
        'hardModeMaxWidth': mode == HARD_MODE 
    });

    console.log('Gameboard rerendered')
    console.table({gameState, pokemon:pokemonCards.map(p=>p.name)})

    return <div className={classList}>
    {pokemonCards.map(pokemon => 
        <Card 
            key={pokemon.id} 
            name={pokemon.name} 
            imgUrl={pokemon.imgUrl} 
            disabled={pokemon.disabled}
            visible={pokemon.visible}
            id={pokemon.id}
            mode={mode}
            gameState={gameState}
            setGameState={setGameState}
            loadedImageCountRef={loadedImageCountRef}
            {...stateProps}
        />)}
</div>
}