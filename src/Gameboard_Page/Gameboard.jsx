// FIX BUG WHERE YOU CAN CLICK ON A FACEUP CARD AND IT ACCEPTS
// IT AS A CARD

import classNames from "classnames";
import Card from "../Card";
import { HARD_MODE, MEDIUM_MODE } from "../App";

export default function Gameboard({ 
    pokemonCards, 
    isLoaded, 
    noClickEvents, 
    stateProps, 
    gameState: {mode} }) 
{
    const classList = classNames('gameboard', {
        'displayNone': !isLoaded,
        'noClick': noClickEvents,
        'medModeMaxWidth': mode == MEDIUM_MODE,
        'hardModeMaxWidth': mode == HARD_MODE 
    });

    return <div className={classList}>
    {pokemonCards.map(pokemon => 
        <Card 
            key={pokemon.id} 
            name={pokemon.name} 
            imgUrl={pokemon.imgUrl} 
            disabled={pokemon.disabled}
            visible={pokemon.visible}
            id={pokemon.id}
            {...stateProps}
        />)}
</div>
}